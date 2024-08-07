import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import CircularProgress from '@mui/material/CircularProgress'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
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
import { functionalityCommonFileNameRemoveAndAddExtension } from '@/features/functionality_common/utils/functionalityCommonIndex'
import { functionalityCommonSnackNotifications } from '@/features/functionality_common/utils/functionalityCommonNotificationTool'

type IFunctionalityPdfPageImageInfoType = {
  image: string
  page: number
}

type IFunctionalityPdfPageListInfoType = IFunctionalityCommonImageInfo & {
  name: string
  page: number
  fileId: string
  isSelected: boolean
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

interface ISeparatePdfItem {
  file: Uint8Array
  fileName: string
}

const FunctionalityPdfExtractPageDetail: FC<IFunctionalityPdfMergeDetail> = ({
  fileList,
  onRemoveFile,
}) => {
  const { t } = useTranslation()
  const isReadFile = useRef(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isDownloadLoading, setIsDownloadLoading] = useState<boolean>(false)
  const [isSelectedAll, setIsSelectedAll] = useState<boolean>(false)
  const [isSeparatePDF, setIsSeparatePDF] = useState<boolean>(false)
  const [noSelectedPage, setNoSelectedPage] = useState<boolean>(true)

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
          isSelected: false,
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
        console.log(`pageInfo:`, pageInfo)
        if (!pageInfo.isSelected) continue
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

  const onDownloadPDF = async () => {
    if (pdfPageInfoList) {
      setIsDownloadLoading(true)
      console.log(`isSeparatePDF:`, isSeparatePDF);
      
      if (!isSeparatePDF) {
        const { pdfBytes, newDocumentName } = await mergePdfFiles()
        if (pdfBytes) {
          downloadUrl(
            pdfBytes,
            `${newDocumentName}-pages-deleted(Powered by MaxAI).pdf`,
          )
        }
      } else {
        const pdfUnit8ArrayList = await getSplitPdfFiles()
        onDownloadPdfImagesZip(pdfUnit8ArrayList)
      }
      setIsDownloadLoading(false)
    }
  }

  /**
   * 分割选中的PDF页数为多个文件
   * @returns pdfUnit8ArrayList
   */
  const getSplitPdfFiles = async () => {
    const pdfUint8ArrayList: ISeparatePdfItem[] = []
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
      const newPdfDoc = await PDFDocument.create() //创建新的pdf文档
      const pageInfo = pdfPageInfoList[i]
      if (!pageInfo.isSelected) continue
      const sourcePdf = pdfMap.get(pageInfo.fileId)
      if (sourcePdf) {
        const [copiedPage] = await newPdfDoc.copyPages(sourcePdf.pdfDoc, [
          pageInfo.page - 1,
        ])
        newPdfDoc.addPage(copiedPage)
        const pdfBytes = await newPdfDoc.save() //保存pdf
        pdfUint8ArrayList.push({
          file: pdfBytes,
          fileName: sourcePdf.name,
        })
      }
    }

    return pdfUint8ArrayList
  }

  const onDownloadPdfImagesZip = async (list: ISeparatePdfItem[]) => {
    const zip = new JSZip()
    const folderName = functionalityCommonFileNameRemoveAndAddExtension(
      'extract - ' + list[0].fileName || '',
      'pdf',
      '',
    )
    const zipTool = zip.folder(folderName)
    for (let i = 0; i < list.length; i++) {
      zipTool?.file(
        `${list[i].fileName}-extract-page-${i + 1}(Powered by MaxAI).pdf`,
        list[i].file,
      )
    }
    zip.generateAsync({ type: 'blob' }).then((content) => {
      FileSaver.saveAs(content, folderName + '.zip')
    })
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

  const onSelectPdfPage = (id: string) => {
    if (pdfPageInfoList && !currentIsLoading) {
      const newPdfInfoList = pdfPageInfoList.map((pdf) => {
        if (pdf.id === id) {
          return {
            ...pdf,
            isSelected: !pdf.isSelected,
          }
        } else return pdf
      })
      if (newPdfInfoList.length === 0) {
        onRemoveFile()
      }
      setPdfPageInfoList(newPdfInfoList)
    }
  }

  const isHavePdfInfoList = pdfPageInfoList.length > 0

  //按钮配置列表
  const buttonConfigs: IButtonConfig[] | any[] = useMemo(() => {
    const resBtnConfig = [
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
          tooltip: t('pages__pdf_tools__extractpage_pdf:extract_download_tooltip'),
          children: t('pages__pdf_tools__extractpage_pdf:confirm_to_extract'),
          variant: 'contained',
          disabled: pdfPageInfoList.length < 1 || currentIsLoading || noSelectedPage,
          color: 'primary',
          onClick: () => {
            onDownloadPDF()
          },
        },
      })
    return resBtnConfig
  }, [currentIsLoading, isLoading, t, isMobile, pdfPageInfoList, isSeparatePDF, noSelectedPage])

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

  const hasNumSelected = useCallback((minCount) => {
    return pdfPageInfoList.filter((pdf) => pdf.isSelected).length > minCount;
  }, [pdfPageInfoList]);

  useEffect(() => {
    const tagSelectedPdf = pdfPageInfoList.filter((pdf) => pdf.isSelected)
    if (tagSelectedPdf.length <= 1) {
      setIsSeparatePDF(false)
    }
    if (tagSelectedPdf.length === 0) {
      setNoSelectedPage(true)
    } else setNoSelectedPage(false)
  }, [pdfPageInfoList])

  useEffect(() => {
    if (fileList) {
      if (isReadFile.current) {
        return
      }
      isReadFile.current = true
      onUploadFile(fileList, true)
    }
  }, [fileList])

  useEffect(() => {
    if (pdfPageInfoList.length > 0) {
      setPdfPageInfoList((pev) => {
        return pev.map((pdf) => ({
          ...pdf,
          isSelected: isSelectedAll,
        }))
      })
    }
  }, [isSelectedAll])

  return (
    <React.Fragment>
      {isHavePdfInfoList && (
        <FunctionalityCommonButtonListView buttonConfigs={buttonConfigs} />
      )}
      {isHavePdfInfoList && (
        <Stack
          direction={'row'}
          spacing={2}
          justifyContent={'center'}
          sx={{ mt: '10px' }}
        >
          <Stack
            direction={'row'}
            alignItems={'center'}
            justifyContent='flex-end'
            sx={{ width: '50%' }}
          >
            <Checkbox
              disabled={currentIsLoading}
              checked={isSelectedAll}
              onChange={() => setIsSelectedAll(!isSelectedAll)}
            />
            <Typography
              variant='body2'
              sx={{ fontSize: '16px !important', color: 'rgb(26, 26, 26)' }}
            >
              {t('pages__pdf_tools__extractpage_pdf:select_all')}
            </Typography>
          </Stack>
          <Stack direction={'row'} alignItems={'center'} sx={{ width: '50%' }}>
            <Switch
              disabled={currentIsLoading || !hasNumSelected(1)}
              checked={isSeparatePDF}
              onChange={() => setIsSeparatePDF(!isSeparatePDF)}
            />
            <Typography
              variant='body2'
              sx={{
                fontSize: '16px !important',
                color: 'rgb(26, 26, 26)',
                whiteSpace: 'nowrap',
              }}
            >
              {t('pages__pdf_tools__extractpage_pdf:separate_pdfs')}
            </Typography>
          </Stack>
        </Stack>
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
              <Box
                sx={{
                  '&:hover .btn-delete-container': {
                    display: 'block',
                  },
                }}
              >
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
                      className='btn-delete-container'
                      sx={{
                        display: 'none',
                        position: 'absolute',
                        top: 6,
                        left: 6,
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
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                    }}
                  >
                    <Checkbox
                      disabled={currentIsLoading}
                      checked={imageInfo.isSelected}
                      onChange={() => onSelectPdfPage(imageInfo.id)}
                    />
                  </Box>
                </FunctionalityCommonImage>
              </Box>
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
            position: 'fixed',
            bottom: '0',
            background: '#fff',
            padding: '16px',
          }}
        >
          <Grid item xs={10} md={2}>
            <FunctionalityCommonTooltip
              title={t('pages__pdf_tools__extractpage_pdf:extract_download_tooltip')}
            >
              <Button
                sx={{ width: '100%', height: 48 }}
                size='large'
                disabled={pdfPageInfoList.length < 1 || currentIsLoading || noSelectedPage}
                variant='contained'
                onClick={() => onDownloadPDF()}
              >
                {isDownloadLoading ? (
                  <CircularProgress size={26} />
                ) : (
                  t('pages__pdf_tools__extractpage_pdf:confirm_to_extract')
                )}
              </Button>
            </FunctionalityCommonTooltip>
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  )
}
export default FunctionalityPdfExtractPageDetail
