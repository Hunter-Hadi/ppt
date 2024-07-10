import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Grid,
  Stack,
} from '@mui/material'
import FileSaver from 'file-saver'
import JSZip from 'jszip'
import { useTranslation } from 'next-i18next'
import { PDFDocument } from 'pdf-lib'
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import {
  FunctionalityCommonButtonListView,
  IButtonConfig,
} from '@/features/functionality_common/components/FunctionalityCommonButtonListView'
import FunctionalityCommonImage from '@/features/functionality_common/components/FunctionalityCommonImage'
import FunctionalityCommonTooltip from '@/features/functionality_common/components/FunctionalityCommonTooltip'
import { useFunctionalityCommonChangeScale } from '@/features/functionality_common/hooks/useFunctionalityCommonChangeScale'
import useFunctionalityCommonConvertedContentSelector from '@/features/functionality_common/hooks/useFunctionalityCommonConvertedContentSelector'
import useFunctionalityCommonPdfToImageConversion, {
  IFunctionalityPdfToImageType,
} from '@/features/functionality_common/hooks/useFunctionalityCommonPdfToImageConversion'
import { downloadUrl } from '@/features/functionality_common/utils/functionalityCommonDownload'
import { fileToUInt8Array } from '@/features/functionality_common/utils/functionalityCommonFileToUInt8Array'
import { functionalityCommonFileNameRemoveAndAddExtension } from '@/features/functionality_common/utils/functionalityCommonIndex'
import { functionalityCommonSnackNotifications } from '@/features/functionality_common/utils/functionalityCommonNotificationTool'

interface IFunctionalityPdfSplitDetail {
  file: File
  onRemoveFile: () => void
}

export const FunctionalityPdfSplitDetail: FC<IFunctionalityPdfSplitDetail> = ({
  file,
  onRemoveFile,
}) => {
  const { t } = useTranslation()
  const isReadFile = useRef(false)

  const [isFileLoading, setIsFileLoading] = useState<boolean>(false)
  const [isSplitDownloadLoading, setIsSplitDownloadLoading] =
    useState<boolean>(false) //是否正在剪切下载
  const [pdfLoadDoc, setPdfLoadDoc] = useState<PDFDocument | null>(null)
  const [activeFile, setActiveFile] = useState<File | null>(null) //保存在这里是为了方便对源数据后续操作
  const [isMergeSinglePDf, setIsMergeSinglePDf] = useState<boolean>(false) //是否是合并单个pdf

  const {
    convertedPdfImages,
    setConvertedPdfImages,
    pdfIsLoading,
    onReadPdfToImages,
    onCancelPdfActive,
    pdfTotalPages,
    currentPdfActionNum,
    setPdfTotalPages,
  } = useFunctionalityCommonPdfToImageConversion()
  const { changeScale, currentScale } = useFunctionalityCommonChangeScale()
  const { isSelectAll, onSwitchSelect, onSwitchAllSelect } =
    useFunctionalityCommonConvertedContentSelector<IFunctionalityPdfToImageType>(
      {
        list: convertedPdfImages,
        setList: setConvertedPdfImages,
      },
    )

  const onUploadFile = async (fileList: FileList) => {
    try {
      if (fileList && fileList.length > 0) {
        setIsFileLoading(true)
        const file = fileList[0]
        setActiveFile(fileList[0])

        const uInt8data = await fileToUInt8Array(file)
        const pdfLoadDoc = await PDFDocument.load(uInt8data)
        setPdfLoadDoc(pdfLoadDoc) //保存pdf文档,方便后续操作
        const isReadSuccess = await onReadPdfToImages(fileList[0], 'png', false)
        if (!isReadSuccess) {
          onRemoveFile()
          setActiveFile(null)
        }
        setIsFileLoading(false)
      }
    } catch (e) {
      console.error('simply onUploadFile error', e)
      setIsFileLoading(false)
      functionalityCommonSnackNotifications(
        t('functionality__ocr_pdf:components__ocr_pdf__main__upload_error'),
      )
    }
  }
  useEffect(() => {
    if (file) {
      if (isReadFile.current) {
        return
      }
      isReadFile.current = true
      onUploadFile([file] as unknown as FileList)
    }
  }, [file])
  const selectPdfPageList = useMemo(
    () => convertedPdfImages.filter((item) => item.isSelect),
    [convertedPdfImages],
  )
  const getMergePdfFiles = async (fileList: IFunctionalityPdfToImageType[]) => {
    try {
      const pdfDoc = await PDFDocument.create()
      if (pdfLoadDoc) {
        //复制选中的pdf
        const copyPages = await pdfDoc.copyPages(
          pdfLoadDoc,
          fileList.filter((p) => p.isSelect).map((p) => p.definedIndex - 1),
        )

        for (const page of copyPages) {
          pdfDoc.addPage(page) //添加到新的pdf文档
        }
        return await pdfDoc.save()
      }
    } catch (e) {
      setIsFileLoading(false)
      console.error('simply mergePdfFiles error', e)
      functionalityCommonSnackNotifications(
        t('functionality__pdf_split:components__pdf_split__error_maximum'),
      )
    }
  }
  const getSplitPdfFiles = async (fileList: IFunctionalityPdfToImageType[]) => {
    const pdfUint8ArrayList: Uint8Array[] = []
    if (pdfLoadDoc) {
      for (let index = 0; index < fileList.length; index++) {
        const pdfDoc = await PDFDocument.create() //创建新的pdf文档
        const [copiedPage] = await pdfDoc.copyPages(pdfLoadDoc, [
          fileList[index].definedIndex - 1,
        ]) //复制选中的pdf
        pdfDoc.addPage(copiedPage) //添加到新的pdf文档

        const pdfBytes = await pdfDoc.save() //保存pdf
        pdfUint8ArrayList.push(pdfBytes)
      }
    }

    return pdfUint8ArrayList
  }
  const confirmToSplit = async () => {
    setIsSplitDownloadLoading(true)
    setPdfTotalPages(0)
    if (selectPdfPageList.length > 0) {
      if (isMergeSinglePDf) {
        const downloadPdfData = await getMergePdfFiles(selectPdfPageList)
        const fileName = functionalityCommonFileNameRemoveAndAddExtension(
          'split-' + activeFile?.name || '',
        )
        if (downloadPdfData) {
          downloadUrl(downloadPdfData, fileName)
        }
      } else {
        const pdfUint8ArrayList = await getSplitPdfFiles(selectPdfPageList)
        onDownloadPdfImagesZip(pdfUint8ArrayList)
      }
    }
    setIsSplitDownloadLoading(false)
  }
  const onDownloadPdfImagesZip = async (list: Uint8Array[]) => {
    const zip = new JSZip()
    const folderName = functionalityCommonFileNameRemoveAndAddExtension(
      'split-' + activeFile?.name || '',
      'pdf',
      '',
    )
    const zipTool = zip.folder(folderName)
    for (let i = 0; i < list.length; i++) {
      zipTool?.file(`split-${i + 1}(Powered by MaxAI).pdf`, list[i])
    }
    zip.generateAsync({ type: 'blob' }).then((content) => {
      FileSaver.saveAs(content, folderName + '.zip')
    })
  }

  const currentInitializeLoading = pdfIsLoading || isFileLoading //文件加载和pdf加载 初始化
  const currentIsLoading = currentInitializeLoading || isSplitDownloadLoading
  //按钮配置列表
  const buttonConfigs: IButtonConfig[] = useMemo(
    () => [
      {
        type: 'button',
        buttonProps: {
          children: isSelectAll
            ? t('functionality__pdf_split:components__pdf_split__deselect_all')
            : t('functionality__pdf_split:components__pdf_split__select_all'),
          variant: 'outlined',
          disabled: currentIsLoading || convertedPdfImages.length === 0,
          onClick: () => onSwitchAllSelect(),
        },
      },
      {
        type: 'button',
        buttonProps: {
          tooltip: t(
            'functionality__pdf_split:components__pdf_split__button__remove__tooltip',
          ),
          children: t(
            'functionality__pdf_split:components__pdf_split__remove_pdf',
          ),
          variant: 'outlined',
          color: 'error',
          disabled: currentIsLoading,
          onClick: () => onRemoveFile(),
        },
      },
      {
        isShow: currentIsLoading,
        type: 'button',
        buttonProps: {
          tooltip: t(
            'functionality__pdf_split:components__pdf_split__button__cancel__tooltip',
          ),
          children: t('functionality__pdf_split:components__pdf_split__cancel'),
          variant: 'outlined',
          color: 'error',
          onClick: () => onCancelPdfActive(),
        },
      },
      {
        isShow: !currentIsLoading,
        type: 'iconButton',
        iconButtonProps: [
          {
            name: 'ControlPointTwoTone',
            onClick: () => changeScale('enlarge'),
            tooltip: t(
              'functionality__pdf_to_image:components__to_image_detail__button__zoom_in__tooltip',
            ),
          },
          {
            name: 'RemoveCircleTwoTone',
            onClick: () => changeScale('narrow'),
            tooltip: t(
              'functionality__pdf_to_image:components__to_image_detail__button__zoom_out__tooltip',
            ),
            sx: {
              marginLeft: 1,
            },
          },
        ],
      },
    ],
    [currentIsLoading, isSelectAll, convertedPdfImages, t],
  )
  const StackViewWrap = useCallback(
    (props) => (
      <Stack
        direction='row'
        flexWrap='wrap'
        justifyContent='center'
        my={3}
        gap={2}
        sx={{
          position: 'relative',
          minHeight: 200,
        }}
      >
        {props.children}
      </Stack>
    ),
    [],
  )
  const isHaveConvertedPdfImages = convertedPdfImages.length > 0
  return (
    <React.Fragment>
      {isHaveConvertedPdfImages && (
        <FunctionalityCommonButtonListView buttonConfigs={buttonConfigs} />
      )}

      {isHaveConvertedPdfImages && !currentInitializeLoading && (
        <StackViewWrap>
          {convertedPdfImages.map((imageInfo, index) => (
            <FunctionalityCommonImage
              key={imageInfo.id}
              name={String(index + 1)}
              imageInfo={imageInfo}
              onClick={() => !currentIsLoading && onSwitchSelect(imageInfo.id)}
              wrapSx={{
                width: currentScale * 50,
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                }}
              >
                <Checkbox
                  disabled={currentIsLoading}
                  checked={imageInfo.isSelect}
                />
              </Box>
            </FunctionalityCommonImage>
          ))}
        </StackViewWrap>
      )}
      {currentInitializeLoading && (
        <StackViewWrap>
          <Stack
            flexDirection='column'
            alignItems='center'
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 15,
              bottom: 0,
              bgcolor: 'rgba(255,255,255,0.3)',
              paddingTop: 10,
            }}
          >
            <CircularProgress />
            {pdfTotalPages > 0 ? `${currentPdfActionNum}/${pdfTotalPages}` : ''}
          </Stack>
        </StackViewWrap>
      )}
      {isHaveConvertedPdfImages && (
        <Stack
          direction='row'
          alignItems='center'
          sx={{ mt: 2, cursor: 'pointer' }}
          onClick={() =>
            !currentIsLoading ? setIsMergeSinglePDf(!isMergeSinglePDf) : null
          }
        >
          <Checkbox disabled={currentIsLoading} checked={isMergeSinglePDf} />
          {t('functionality__pdf_split:components__pdf_split__is_single_pdf')}
        </Stack>
      )}
      {isHaveConvertedPdfImages && (
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
          sx={{ mt: 1 }}
        >
          <Grid item xs={10} md={2}>
            <FunctionalityCommonTooltip
              title={t(
                'functionality__pdf_split:components__pdf_split__button__download__tooltip',
              )}
            >
              <Button
                sx={{ width: '100%', height: 48 }}
                disabled={currentIsLoading || selectPdfPageList.length === 0}
                size='large'
                variant='contained'
                onClick={() => confirmToSplit()}
              >
                {isSplitDownloadLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  t(
                    'functionality__pdf_split:components__pdf_split__confirm_split',
                  )
                )}
              </Button>
            </FunctionalityCommonTooltip>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  )
}
export default FunctionalityPdfSplitDetail
