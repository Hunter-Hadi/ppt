import { Box, Button, CircularProgress, Grid, IconButton } from '@mui/material'
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
import { pdfjs } from 'react-pdf'
import { v4 as uuidV4 } from 'uuid'

import {
  FunctionalityCommonButtonListView,
  IButtonConfig,
} from '@/features/functionality_common/components/FunctionalityCommonButtonListView'
import FunctionalityCommonDragSortableList from '@/features/functionality_common/components/FunctionalityCommonDragSortableList'
import FunctionalityCommonIcon from '@/features/functionality_common/components/FunctionalityCommonIcon'
import FunctionalityCommonImage from '@/features/functionality_common/components/FunctionalityCommonImage'
import FunctionalityCommonTooltip from '@/features/functionality_common/components/FunctionalityCommonTooltip'
import useFunctionalityCommonIsMobile from '@/features/functionality_common/hooks/useFunctionalityCommonIsMobile'
import { IFunctionalityCommonImageInfo } from '@/features/functionality_common/types/functionalityCommonImageType'
import { downloadUrl } from '@/features/functionality_common/utils/functionalityCommonDownload'
import { functionalityCommonSnackNotifications } from '@/features/functionality_common/utils/functionalityCommonNotificationTool'

type IFunctionalityPdfPageImageInfoType = {
  image: string
  page: number
}

export type IFunctionalityPdfPageListInfoType =
  IFunctionalityCommonImageInfo & {
    name: string
    page: number
    fileId: string
  }

type IFunctionalityPdfFileInfoDeleteType = {
  name: string
  file: File
  fileId: string
}
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString()

interface IFunctionalityPdfMergeDetail {
  fileList: FileList
  onRemoveFile: () => void
}

const FunctionalityPdfMergeDetail: FC<IFunctionalityPdfMergeDetail> = ({
  fileList,
  onRemoveFile,
}) => {
  const { t } = useTranslation()
  const isReadFile = useRef(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDownloadLoading, setIsDownloadLoading] = useState<boolean>(false)

  const [pdfInfoList, setPdfInfoList] = useState<
    IFunctionalityPdfFileInfoDeleteType[]
  >([]) //展示的pdf信息 列表

  const [pdfPageInfoList, setPdfPageInfoList] = useState<
    IFunctionalityPdfPageListInfoType[]
  >([])
  const isMobile = useFunctionalityCommonIsMobile()

  const setFileId = (fileList) => {
    const fileInfoList: IFunctionalityPdfFileInfoDeleteType[] = []
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i]
      fileInfoList.push({
        fileId: uuidV4(),
        name: fileList[i].name,
        file: file,
      })
    }
    return fileInfoList
  }

  const onUploadFile = async (fileList: FileList, isEmptyClose?: boolean) => {
    setIsLoading(true)

    const newFileList = await setFileId(fileList)
    const newFilePageList = await getPdfPageInfoList(newFileList)
    setPdfPageInfoList((list) => [...list, ...newFilePageList])
    setPdfInfoList((list) => [...list, ...newFileList])

    setIsLoading(false)
    if (isEmptyClose && newFilePageList.length === 0) {
      //如果是空文件则关闭
      onRemoveFile()
    }
  }

  /**
   * 获取pdf所有页面的图片
   */
  const getPDFPagesImage = async (file: File) => {
    try {
      const buff = await file.arrayBuffer()
      const pdfDoc = await PDFDocument.load(buff) //load来判断pdf是否加密或者无法提取，异常则进入catch

      const loadingTask = pdfjs.getDocument(buff)
      const pdfDocument = await loadingTask.promise
      const pdfPageNumber = pdfDoc.getPageCount() // 获取 PDF 页数

      const pdfImageInfo: IFunctionalityPdfPageImageInfoType[] = []

      for (let i = 0; i < pdfPageNumber; i++) {
        const page = await pdfDocument.getPage(i + 1)
        const viewport = page.getViewport({ scale: 1.0 })
        const canvas = document.createElement('canvas')
        const context = canvas.getContext('2d')

        canvas.height = viewport.height
        canvas.width = viewport.width
        if (context) {
          const renderContext = {
            canvasContext: context,
            viewport: viewport,
          }

          renderContext && (await page.render(renderContext).promise)

          const image = canvas.toDataURL('image/png')

          pdfImageInfo.push({ image, page: i + 1 })
        }
      }
      return pdfImageInfo
    } catch (e) {
      console.log('getPageInfoError', e)

      if (file.name) {
        functionalityCommonSnackNotifications(
          `${file.name} ${t(
            'functionality__common:components__common__pdf_encryption_tip',
          )}`,
        )
      }
      return []
    }
  }

  const getPdfPageInfoList = async (
    fileList: IFunctionalityPdfFileInfoDeleteType[],
  ) => {
    const filePageInfoList: IFunctionalityPdfPageListInfoType[] = []
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i].file
      const pdfImageInfo = await getPDFPagesImage(file)
      for (let k = 0; k < pdfImageInfo.length; k++) {
        const pageInfo = {
          id: uuidV4(),
          name: file.name,
          imageUrlString: pdfImageInfo[k].image || '',
          page: pdfImageInfo[k].page,
          fileId: fileList[i].fileId,
        }
        filePageInfoList.push(pageInfo)
      }
    }

    return filePageInfoList
  }

  const mergePdfFiles = async () => {
    try {
      // 创建一个新的 PDF 文档，它将成为最终合并的文档
      // console.log(`pdfInfoList:`, pdfInfoList)
      // console.log(`pdfPageInfoList:`, pdfPageInfoList)

      // 创建一个新的PDF文档用于合并
      const mergedPdf = await PDFDocument.create()
      let newDocumentName = ''
      // 创建一个Map来存储fileId和PDFDocument的对应关系
      const pdfMap = new Map()

      // 首先,加载所有的源PDF文件
      for (const pdfInfo of pdfInfoList) {
        const pdfBytes = await pdfInfo.file.arrayBuffer()
        const pdfDoc = await PDFDocument.load(pdfBytes)
        pdfMap.set(pdfInfo.fileId, {
          pdfDoc: pdfDoc,
          name: pdfInfo.name,
        })
      }

      // 遍历pdfPageInfoList,复制指定的页面到新文档
      for (let i = 0; i < pdfPageInfoList.length; i++) {
        const pageInfo = pdfPageInfoList[i]
        const sourcePdf = pdfMap.get(pageInfo.fileId)
        if (sourcePdf) {
          const [copiedPage] = await mergedPdf.copyPages(sourcePdf.pdfDoc, [
            pageInfo.page - 1,
          ])
          mergedPdf.addPage(copiedPage)
          if (i === 0) {
            newDocumentName = sourcePdf.name
          }
        }
      }

      // 保存合并后的PDF
      const pdfBytes = await mergedPdf.save()

      // 返回合并后的PDF字节数组
      return { pdfBytes, newDocumentName }
    } catch (error) {
      console.log('onDownloadZipError', error)
      return { pdfBytes: null, newDocumentName: '' }
    }
  }

  const onDownloadZip = async () => {
    if (pdfPageInfoList) {
      setIsDownloadLoading(true)
      const { pdfBytes, newDocumentName } = await mergePdfFiles()
      if (pdfBytes) {
        downloadUrl(
          pdfBytes,
          `${newDocumentName}-pages-deleted(Powered by MaxAI).pdf`,
        )
      }
      setIsDownloadLoading(false)
    }
  }

  const currentIsLoading = isLoading || isDownloadLoading

  const onDeletePdf = (id: string) => {
    if (pdfPageInfoList && !currentIsLoading) {
      const newPdfInfoList = pdfPageInfoList.filter((pdf) => pdf.id !== id)
      if (newPdfInfoList.length === 0) {
        onRemoveFile()
      }
      setPdfPageInfoList(newPdfInfoList)
    }
  }
  const isHavePdfInfoList = pdfPageInfoList.length > 0

  //按钮配置列表
  const buttonConfigs: IButtonConfig[] = useMemo(() => {
    const resBtnConfig: IButtonConfig[] = [
      {
        type: 'upload' as const,
        uploadProps: {
          tooltip: t(
            'functionality__pdf_merge:components__pdf_merge__button__add_pdfs__tooltip',
          ),
          onChange: onUploadFile,
          isDrag: false,
          buttonProps: {
            variant: 'outlined',
            disabled: currentIsLoading,
            sx: {
              height: 48,
              width: '100%',
            },
          },
          inputProps: {
            accept: 'application/pdf',
            multiple: true,
          },
          children: t(
            'functionality__pdf_merge:components__pdf_merge__add_pdf',
          ),
        },
      },
      {
        type: 'button' as const,
        buttonProps: {
          tooltip: t(
            'functionality__pdf_merge:components__pdf_merge__button__clear_pdf__tooltip',
          ),
          children: t(
            'functionality__pdf_merge:components__pdf_merge__empty_pdf',
          ),
          variant: 'outlined',
          disabled: currentIsLoading,
          color: 'error',
          onClick: () => {
            setPdfInfoList([])
            onRemoveFile()
          },
        },
      },
    ]
    if (!isMobile)
      resBtnConfig.push({
        type: 'button',
        buttonProps: {
          tooltip: t('pages__pdf_tools__deletepage_pdf:delete_download'),
          children: t('pages__pdf_tools__deletepage_pdf:confirm_to_delete'),
          variant: 'contained',
          disabled: pdfPageInfoList.length < 1 || currentIsLoading,
          color: 'primary',
          onClick: () => {
            onDownloadZip()
          },
        },
      })
    return resBtnConfig
  }, [currentIsLoading, isLoading, t, isMobile, pdfPageInfoList])

  const BoxViewWrap = useCallback(
    (props) => (
      <Box
        sx={{
          width: '100%',
          position: 'relative',
          minHeight: 200,
        }}
      >
        {props.children}
      </Box>
    ),
    [],
  )

  useEffect(() => {
    if (fileList) {
      if (isReadFile.current) {
        return
      }
      isReadFile.current = true
      onUploadFile(fileList, true)
    }
  }, [fileList])

  return (
    <React.Fragment>
      {isHavePdfInfoList && (
        <FunctionalityCommonButtonListView buttonConfigs={buttonConfigs} />
      )}
      {isHavePdfInfoList && !isLoading && (
        <BoxViewWrap>
          <FunctionalityCommonDragSortableList
            list={pdfPageInfoList}
            onUpdateList={setPdfPageInfoList}
            disabled={currentIsLoading}
            replacementElement={(dragInfo) => (
              <FunctionalityCommonImage
                sx={{
                  bgcolor: 'transparent',
                  '&:hover': {
                    bgcolor: 'transparent',
                  },
                }}
                imageInfo={dragInfo}
              />
            )}
          >
            {(imageInfo, index, currentDragInfo) => (
              <FunctionalityCommonImage
                key={imageInfo.id}
                name={imageInfo.name}
                pageNumber={imageInfo.page}
                imageInfo={imageInfo}
                sx={{
                  border:
                    currentDragInfo?.id === imageInfo.id
                      ? '1px dashed #64467b'
                      : 'none',
                }}
                imgStyle={{
                  opacity: currentDragInfo?.id === imageInfo.id ? 0 : 1,
                }}
              >
                {!currentDragInfo ? (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                    }}
                  >
                    <IconButton
                      size='small'
                      onClick={() => onDeletePdf(imageInfo.id)}
                    >
                      <FunctionalityCommonIcon
                        name='CloseTwoTone'
                        fontSize='small'
                        sx={{
                          bgcolor: currentIsLoading ? '#f6f6f6' : '#9065B0',
                          borderRadius: 3,
                          color: '#fff',
                        }}
                      />
                    </IconButton>
                  </Box>
                ) : null}
              </FunctionalityCommonImage>
            )}
          </FunctionalityCommonDragSortableList>
        </BoxViewWrap>
      )}
      {isLoading && (
        <BoxViewWrap>
          <Box
            sx={{
              position: 'absolute',
              top: 50,
              left: '50%',
              transform: 'translateX(-50%)',
            }}
          >
            <CircularProgress />
          </Box>
        </BoxViewWrap>
      )}
      {isMobile && isHavePdfInfoList && (
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
          sx={{
            mt: 5,
            position: 'fixed',
            bottom: '0',
            background: '#fff',
            padding: '16px',
          }}
        >
          <Grid item xs={10} md={2}>
            <FunctionalityCommonTooltip
              title={t('pages__pdf_tools__deletepage_pdf:delete_download')}
            >
              <Button
                sx={{ width: '100%', height: 48 }}
                size='large'
                disabled={pdfPageInfoList.length < 1 || currentIsLoading}
                variant='contained'
                onClick={() => onDownloadZip()}
              >
                {isDownloadLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  t('pages__pdf_tools__deletepage_pdf:confirm_to_delete')
                )}
              </Button>
            </FunctionalityCommonTooltip>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  )
}
export default FunctionalityPdfMergeDetail
