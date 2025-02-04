import {
  Autocomplete,
  Box,
  CircularProgress,
  Grid,
  Stack,
  TextField,
  TextFieldProps,
  Typography,
} from '@mui/material'
import { useTranslation } from 'next-i18next'
import { PDFDocument } from 'pdf-lib'
import { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import React from 'react'
import { pdfjs } from 'react-pdf'

import {
  FunctionalityCommonButtonListView,
  IButtonConfig,
} from '@/features/functionality_common/components/FunctionalityCommonButtonListView'
import FunctionalityCommonOptionSelector from '@/features/functionality_common/components/FunctionalityCommonOptionSelector'
import { downloadUrl } from '@/features/functionality_common/utils/functionalityCommonDownload'
import { fileToUInt8Array } from '@/features/functionality_common/utils/functionalityCommonFileToUInt8Array'
import { functionalityCommonFileNameRemoveAndAddExtension } from '@/features/functionality_common/utils/functionalityCommonIndex'
import { functionalityCommonSnackNotifications } from '@/features/functionality_common/utils/functionalityCommonNotificationTool'
import { pdfPageBackgroundToCanvas } from '@/features/functionality_common/utils/functionalityCommonPdfPageBackgroundToCanvas'
import { textGetLanguageName } from '@/features/functionality_common/utils/functionalityCommonTextGetLanguageName'
import { ocrOfficialSupportLanguages } from '@/features/functionality_ocr_pdf/constant/ocrOfficialSupportLanguages'
import { ocrCanvasToPdfReturnBlob } from '@/features/functionality_ocr_pdf/utils/ocrCanvasToPdfReturnBlob'
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString()
type PDFDocumentProxy = any //没有导出PDFDocumentProxy，所以这里用any代替，并且代码感知规范好一点

interface IFunctionalityOcrPdfDetail {
  file: File
  onRemoveFile: () => void
}

const FunctionalityOcrPdfDetail: FC<IFunctionalityOcrPdfDetail> = ({
  file,
  onRemoveFile,
}) => {
  const { t } = useTranslation()
  const defaultScanningGrade = 'default' //默认图片分辨率扫描canvas分辨率等级  默认为原来分辨率的2倍  高为4倍
  const isReadFile = useRef(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loadingTitle, setLoadingTitle] = useState<string>('') //loading标题
  const [scanningLanguage, setScanningLanguage] = useState<string>('eng') //当前用户选择的扫描语言
  const oldScanningGrade = useRef('eng') //上一次用户选择的扫描等级
  const [scanningGrade, setScanningGrade] = useState<'default' | 'high'>(
    defaultScanningGrade,
  ) //当前用户选择的图片分辨率扫描等级
  const [pagesBackgroundCanvas, setPagesBackgroundCanvas] = useState<
    HTMLCanvasElement[]
  >([]) //pdf背景图片数据列表，会在识别的时候用到
  const [pdFDocument, setPdFDocument] = useState<PDFDocumentProxy | undefined>(
    undefined,
  ) //pdf文档数据，会在识别的时候用到
  useEffect(() => {
    if (!isLoading) {
      //如果不是loading状态，默认清空loading标题
      setLoadingTitle('')
    }
  }, [isLoading])
  //获取PDF的图片Canvas
  const renderFilesToBackgroundCanvas = useCallback(
    async (pdFDocument: PDFDocumentProxy) => {
      const insertPages: HTMLCanvasElement[] = []
      for (let index = 1; index < pdFDocument.numPages + 1; index++) {
        setLoadingTitle(
          `${t(
            'functionality__ocr_pdf:components__ocr_pdf__main__ocr_loading',
          )} ${index}/${pdFDocument.numPages}`,
        )
        const page = await pdFDocument.getPage(index) //获取PDF页面数据
        const canvas = await pdfPageBackgroundToCanvas(page, {
          viewportScale: scanningGrade === defaultScanningGrade ? 2 : 4,
        }) //获取背景图片Canvas
        insertPages.push(canvas)
      }
      oldScanningGrade.current = scanningGrade
      return insertPages
    },
    [scanningGrade, t],
  )
  //OCR识别PDF并下载
  const onOcrPdfAndDownload = useCallback(async () => {
    try {
      //开始识别
      setIsLoading(true)
      try {
        if (!pdFDocument || pagesBackgroundCanvas.length === 0) return
        let pdfPagesBackgroundCanvas = pagesBackgroundCanvas
        if (scanningGrade !== oldScanningGrade.current) {
          //不是上次的扫描等级，需要重新获取背景图片Canvas
          pdfPagesBackgroundCanvas = await renderFilesToBackgroundCanvas(
            pdFDocument,
          ) //重新获取背景图片Canvas
        }
        const currentPdfUint8Array = await fileToUInt8Array(file)
        const currentPdfDocument = await PDFDocument.load(currentPdfUint8Array) //ocrCanvasToPdfReturnBlob 支持的数据格式，这里每次重新load成PDFDocument，是因为ocrCanvasToPdf会更改当前的PDFDocument的数据，导致后面异常

        const blob = await ocrCanvasToPdfReturnBlob(
          currentPdfDocument,
          pdfPagesBackgroundCanvas,
          scanningLanguage,
          (totalQuantity, currentNum, type) => {
            if (type === 'ocr') {
              setLoadingTitle(`OCR ${currentNum}/${totalQuantity}`)
            } else {
              setLoadingTitle(
                `${t(
                  'functionality__ocr_pdf:components__ocr_pdf__main__loading_title__pdf_embed',
                )} ${currentNum}/${totalQuantity}`,
              )
            }
          },
        ) //开始OCR识别

        setPagesBackgroundCanvas(pdfPagesBackgroundCanvas) //储存最新的背景图片Canvas 列表
        if (blob) {
          const fileName = functionalityCommonFileNameRemoveAndAddExtension(
            file.name,
          )
          downloadUrl(blob, fileName) //下载
        } else {
          throw new Error('ocrCanvasToPdfReturnBlob error')
        }
      } catch (err) {
        console.warn(err)
      }
      setIsLoading(false)
    } catch (e) {
      console.log('simply onOcrPdfAndDownload error', e)
      setIsLoading(false)
      functionalityCommonSnackNotifications(
        t('functionality__ocr_pdf:components__ocr_pdf__main__upload_error'),
      )
    }
  }, [
    scanningGrade,
    scanningLanguage,
    file,
    oldScanningGrade,
    pagesBackgroundCanvas,
    pdFDocument,
    t,
    renderFilesToBackgroundCanvas,
  ])

  //获取PDF主要的语言：该功能是  假如上传的PDF主要语言是中文，那么就会默认选择中文识别，当然只是简单的通过PDF内的文字判断语言，不一定准确
  const getPdfMainLanguage = async (pdfDocument: PDFDocumentProxy) => {
    if (pdfDocument) {
      const centerNumber = Math.max(1, Math.floor(pdfDocument.numPages / 2)) //获取PDF中间页码
      const page = await pdfDocument.getPage(centerNumber) //获取PDF中间页码的文本内容
      let textContent = await page.getTextContent({
        includeMarkedContent: true,
      }) //获取PDF页面文本内容列表
      let allText = textContent.items
        .map((textContentItem) => (textContentItem as { str: string }).str)
        .join('')
      if (allText.length === 0) {
        //没有数据，循环获取到就不拿了，不做过多判断，不让用户等待太久时间
        for (let i = 1; i <= pdfDocument.numPages; i++) {
          if (i === centerNumber) continue //跳过已经处理过的中间页码
          const page = await pdfDocument.getPage(i)
          textContent = await page.getTextContent({
            includeMarkedContent: true,
          }) //获取文本内容列表
          allText = textContent.items
            .map((textContentItem) => (textContentItem as { str: string }).str)
            .join('')
          if (allText.length > 0) {
            break
          }
        }
      }
      const textLanguage = textGetLanguageName(
        allText,
        1000,
        ocrOfficialSupportLanguages.map((v) =>
          v.id === 'chi_sim' ? 'cmn' : v.id,
        ),
      ) //传入文本获取主要的语言
      if (textLanguage === 'cmn') {
        //只有cmn中文和tesseract库语言不匹配
        setScanningLanguage('chi_sim')
      } else if (textLanguage) {
        setScanningLanguage(textLanguage)
      }
    }
  }
  //初始化文件
  const onInitializationFileToData = async (fileData: File) => {
    try {
      setLoadingTitle(
        `${t(
          'functionality__ocr_pdf:components__ocr_pdf__main__ocr_loading',
        )}...`,
      )
      setIsLoading(true)
      const currentPdfUint8Array = await fileToUInt8Array(fileData)
      await PDFDocument.load(currentPdfUint8Array) //放在这里作用是检测PDF是否加密或者异常，会进入try catch
      const currentPdfDocument = await pdfjs.getDocument(currentPdfUint8Array)
        .promise
      await getPdfMainLanguage(currentPdfDocument) //拿主要的语言
      const currentBackgroundCanvas = await renderFilesToBackgroundCanvas(
        currentPdfDocument,
      ) //获取背景图片Canvas
      //一个PDf可以不用二次获取上面的数据，当用户不满意的时候，可以直接选择高精度OCR
      setPdFDocument(currentPdfDocument)
      setPagesBackgroundCanvas(currentBackgroundCanvas)
      setIsLoading(false)
    } catch (e) {
      onRemoveFile()
      setIsLoading(false)
      console.log('simply onUploadFile error', e)
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
      onInitializationFileToData(file)
    }
  }, [file])
  //按钮配置列表
  const buttonConfigs: IButtonConfig[] = useMemo(
    () => [
      {
        type: 'button',
        buttonProps: {
          children: t(
            'functionality__ocr_pdf:components__ocr_pdf__main__ocr_and_download',
          ),
          variant: 'contained',
          disabled: isLoading,
          onClick: onOcrPdfAndDownload,
        },
      },
      {
        type: 'button',
        buttonProps: {
          children: t(
            'functionality__ocr_pdf:components__ocr_pdf__main__choose_another_file',
          ),
          variant: 'outlined',
          disabled: isLoading,
          color: 'error',
          onClick: () => {
            onRemoveFile()
          },
        },
      },
    ],
    [isLoading, t, onOcrPdfAndDownload],
  )

  //图片分辨率等级列表
  const scanningGradeOptions: {
    label: string
    tips: string
    value: 'default' | 'high'
  }[] = [
    {
      label: t(
        'functionality__ocr_pdf:components__ocr_pdf__main__conversion_grade_title_1',
      ),
      tips: t(
        'functionality__ocr_pdf:components__ocr_pdf__main__conversion_grade_tips_1',
      ),
      value: defaultScanningGrade,
    },
    {
      label: t(
        'functionality__ocr_pdf:components__ocr_pdf__main__conversion_grade_title_2',
      ),
      tips: t(
        'functionality__ocr_pdf:components__ocr_pdf__main__conversion_grade_tips_2',
      ),
      value: 'high',
    },
  ]

  const autocompleteSelectValue = useMemo(() => {
    return ocrOfficialSupportLanguages.find(
      (option) => option.id === scanningLanguage,
    )
  }, [scanningLanguage])
  return (
    <React.Fragment>
      {isLoading && (
        <Box
          sx={{
            width: '100%',
            position: 'relative',
            minHeight: 200,
            pt: 10,
          }}
        >
          <Stack
            alignItems='center'
            flexDirection='column'
            justifyContent='center'
            sx={{
              position: 'absolute',
              top: 10,
              left: 0,
              right: 15,
              bottom: 0,
              bgcolor: 'rgba(255,255,255,0.3)',
            }}
          >
            <CircularProgress key={1} />
            <Box>{loadingTitle}</Box>
          </Stack>
        </Box>
      )}
      {!isLoading && (
        <Stack
          sx={{
            width: '100%',
            position: 'relative',
            minHeight: 200,
          }}
          alignItems='center'
          direction='column'
        >
          <Box
            sx={{
              mb: 5,
              width: '100%',
            }}
          >
            <FunctionalityCommonOptionSelector
              disabled={isLoading}
              list={scanningGradeOptions}
              selectKey={scanningGrade}
              onSelect={(item) => setScanningGrade(item.value)}
            />
            <Grid container justifyContent='center' mt={2}>
              <Grid
                item
                xs={12}
                md={6}
                lg={5}
                display='flex'
                alignItems='center'
                gap={1}
              >
                <Typography
                  fontSize={{
                    xs: 14,
                    lg: 16,
                  }}
                  color='text.primary'
                >
                  {t(
                    'functionality__ocr_pdf:components__ocr_pdf__main__document_scanning_language',
                  )}
                  :
                </Typography>
                <Autocomplete
                  id='pdf-ocr-autocomplete'
                  defaultValue={autocompleteSelectValue}
                  options={ocrOfficialSupportLanguages}
                  size='small'
                  sx={{ flex: 1 }}
                  disableClearable
                  getOptionLabel={(option) => option.translation}
                  renderInput={(params) => (
                    <TextField
                      {...(params as TextFieldProps)}
                      inputProps={{
                        ...params.inputProps,
                      }}
                    />
                  )}
                  onChange={(_, newValue) => {
                    if (newValue) {
                      setScanningLanguage((newValue as { id: string }).id)
                    }
                  }}
                />
              </Grid>
            </Grid>
          </Box>
          <FunctionalityCommonButtonListView
            buttonConfigs={buttonConfigs}
            gridBreakpoints={{ xs: 12, md: 6, lg: 4 }}
          />
        </Stack>
      )}
    </React.Fragment>
  )
}
export default FunctionalityOcrPdfDetail
