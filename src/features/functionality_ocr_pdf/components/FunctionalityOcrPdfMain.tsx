import {
  Box,
  CircularProgress,
  Grid,
  MenuItem,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import { PDFDocument } from 'pdf-lib';
import { useEffect, useMemo, useRef, useState } from 'react';
import { pdfjs } from 'react-pdf';

import {
  FunctionalityCommonButtonListView,
  IButtonConfig,
} from '@/features/functionality_common/components/FunctionalityCommonButtonListView';
import FunctionalityCommonUploadButton from '@/features/functionality_common/components/FunctionalityCommonUploadButton';
import { downloadUrl } from '@/features/functionality_common/utils/functionalityCommonDownload';
import { fileToUInt8Array } from '@/features/functionality_common/utils/functionalityCommonFileToUInt8Array';
import { functionalityCommonSnackNotifications } from '@/features/functionality_common/utils/functionalityCommonNotificationTool';
import { pdfPageBackgroundToCanvas } from '@/features/functionality_common/utils/functionalityCommonPdfPageBackgroundToCanvas';

import { ocrLanguages } from '../constant/languages';
import { ocrCanvasToPdf } from '../utils/ocrCanvasToPdf';
import { textGetLanguageName } from '../utils/textGetLanguageName';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();
const FunctionalityOcrPdfMain = () => {
  const { t } = useTranslation();
  const defaultConversionGrade = 'default';
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [loadingTitle, setLoadingTitle] = useState<string>('');
  const oldConversionLanguage = useRef('eng');
  const [conversionLanguage, setConversionLanguage] = useState<string>('eng');
  const [conversionGrade, setConversionGrade] = useState<'default' | 'high'>(
    defaultConversionGrade,
  );

  const [pagesBackgroundCanvas, setPagesBackgroundCanvas] = useState<
    any | undefined
  >(undefined); //pdf背景图片数据列表，会在识别的时候用到
  const [pdFDocumentProxy, setPdFDocumentProxy] = useState<any | undefined>(
    undefined,
  );

  //开始OCR PDF并下载
  useEffect(() => {
    setLoadingTitle('');
  }, [isLoading]);
  const onOcrPdfAndDownload = async () => {
    try {
      if (file) {
        //开始识别
        setIsLoading(true);
        try {
          if (!pdFDocumentProxy || !pagesBackgroundCanvas) return;
          let pdfPagesBackgroundCanvas = pagesBackgroundCanvas;
          if (conversionGrade !== oldConversionLanguage.current) {
            pdfPagesBackgroundCanvas = await renderFilesToBackgroundCanvas(
              pdFDocumentProxy,
            );
          }
          const currentPdfUint8Array = await fileToUInt8Array(file);
          const currentPdfDocument = await PDFDocument.load(
            currentPdfUint8Array,
          ); //ocrCanvasToPdf 支持的数据格式，这里每次重新load成PDFDocument，是因为ocrCanvasToPdf会更改PDFDocument的数据，导致后面异常
          const blob = await ocrCanvasToPdf(
            currentPdfDocument,
            pdfPagesBackgroundCanvas,
            conversionLanguage,
            (allPage, currentNum, type) => {
              if (type === 'ocr') {
                setLoadingTitle(`OCR ${currentNum}/${allPage}`);
              } else {
                setLoadingTitle(`PDF Embed ${currentNum}/${allPage}`);
              }
            },
          ); //识别
          setLoadingTitle('');
          setPagesBackgroundCanvas(pdfPagesBackgroundCanvas); //储存最新的背景图片Canvas 列表
          if (blob) {
            downloadUrl(blob, `MAX_AI.pdf`); //下载
          } else {
            throw new Error('ocrCanvasToPdf error');
          }
        } catch (err) {
          console.warn(err);
        }
        setIsLoading(false);
      }
    } catch (e) {
      setIsLoading(false);
      functionalityCommonSnackNotifications(
        t(
          'functionality__compress_pdf:components__compress_pdf__main__compress_error',
        ),
      );
    }
  };

  //获取PDF的图片Canvas
  const renderFilesToBackgroundCanvas = async (pdFDocumentProxy: any) => {
    const insertPages: any[] = [];
    for (let index = 1; index < pdFDocumentProxy.numPages + 1; index++) {
      setLoadingTitle(`PDF Loading ${index}/${pdFDocumentProxy.numPages}`);
      const page = await pdFDocumentProxy.getPage(index); //获取PDF页面数据
      const canvas = await pdfPageBackgroundToCanvas(page, {
        viewportScale: conversionGrade === defaultConversionGrade ? 1 : 2,
      }); //获取背景图片Canvas
      console.log(
        'viewportScale',
        conversionGrade === defaultConversionGrade ? 2 : 4,
      );
      insertPages.push(canvas);
    }
    oldConversionLanguage.current = conversionGrade;
    return insertPages;
  };
  //获取PDF主要的语言
  const getPdfMainLanguage = async (nowFile: File) => {
    if (nowFile) {
      const buff = await fileToUInt8Array(nowFile);
      const pdf = await pdfjs.getDocument(buff).promise;
      const centerNumber = Math.max(1, Math.floor(pdf.numPages / 2));
      const page = await pdf.getPage(centerNumber);
      let textContent = await page.getTextContent({
        includeMarkedContent: true,
      }); //获取文本内容列表
      let allText = textContent.items.map((v) => (v as any).str).join('');
      if (allText.length === 0) {
        //没有数据，循环获取到就不拿了，不做过多判断，不让用户等待太久时间
        for (let i = 1; i <= pdf.numPages; i++) {
          if (i === centerNumber) continue;
          const page = await pdf.getPage(i);
          textContent = await page.getTextContent({
            includeMarkedContent: true,
          }); //获取文本内容列表
          allText = textContent.items.map((v) => (v as any).str).join('');
          if (allText.length > 0) {
            break;
          }
        }
      }
      const textLanguage = textGetLanguageName(allText);
      if (textLanguage === 'cmn') {
        //只有cmn中文和tesseract库语言不匹配
        setConversionLanguage('chi_sim');
      } else if (textLanguage) {
        setConversionLanguage(textLanguage);
      }
    }
  };
  //上传文件
  const onUploadFile = async (fileList: FileList) => {
    if (fileList[0]) {
      try {
        setFile(fileList[0]);
        setLoadingTitle('PDF 加载中...');
        setIsLoading(true);
        const nowFile = fileList[0];
        getPdfMainLanguage(nowFile); //拿主要的语言
        const currentPdfUint8Array = await fileToUInt8Array(nowFile);
        await PDFDocument.load(currentPdfUint8Array); //用于检测PDF是否加密或者异常
        const currentPdFDocumentProxy = await pdfjs.getDocument(
          currentPdfUint8Array,
        ).promise;
        const currentBackgroundCanvas = await renderFilesToBackgroundCanvas(
          currentPdFDocumentProxy,
        ); //获取背景图片Canvas
        //一个PDf可以不用二次获取上面的数据，当用户不满意的时候，可以直接选择高精度OCR
        setPdFDocumentProxy(currentPdFDocumentProxy);
        setPagesBackgroundCanvas(currentBackgroundCanvas);
        setIsLoading(false);
      } catch (e) {
        setFile(null);
        setIsLoading(false);
        console.log('simply onUploadFile error', e);
        functionalityCommonSnackNotifications(
          t(
            'functionality__compress_pdf:components__compress_pdf__main__compress_error',
          ),
        );
      }
    }
  };
  //不支持的文件类型提示
  const handleUnsupportedFileType = () => {
    functionalityCommonSnackNotifications(
      t(
        'functionality__compress_pdf:components__compress_pdf__main__unsupported_file_type_tip',
      ),
    );
  };
  //按钮配置列表
  const buttonConfigs: IButtonConfig[] = useMemo(
    () => [
      {
        type: 'button',
        buttonProps: {
          children: (
            <Stack gap={2} direction='row' alignItems='center'>
              {isLoading && <CircularProgress size={20} />}
              <Box>Download</Box>
            </Stack>
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
            'functionality__compress_pdf:components__compress_pdf__main__choose_another_file',
          ),
          variant: 'outlined',
          disabled: isLoading,
          color: 'error',
          onClick: () => {
            setFile(null);
          },
        },
      },
    ],
    [isLoading, file, conversionGrade, t],
  );

  //压缩等级列表
  const conversionGradeList = [
    {
      title: 'Faster conversion time',
      tips: t('Faster conversion time'),
      key: defaultConversionGrade,
    },
    {
      title: t('High Accuracy'),
      tips: t('Increases accuracy and conversion time'),
      key: 'high',
    },
  ];
  return (
    <Stack
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      sx={{
        display: 'flex',
        width: '100%',
      }}
    >
      {!file && (
        <FunctionalityCommonUploadButton
          inputProps={{
            accept: 'application/pdf',
            multiple: true,
          }}
          onChange={onUploadFile}
          handleUnsupportedFileType={handleUnsupportedFileType}
        />
      )}
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
      {file && !isLoading && (
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
            {conversionGradeList.map((item, index) => (
              <Grid container key={index} justifyContent='center'>
                <Grid item xs={12} lg={8}>
                  <Stack
                    direction='row'
                    alignItems='center'
                    onClick={() => {
                      if (!isLoading) {
                        setConversionGrade(item.key as 'default' | 'high');
                      }
                    }}
                    gap={2}
                    sx={{
                      padding: 1.5,
                      cursor: isLoading ? '' : 'pointer',
                      border: `1px solid ${
                        item.key === conversionGrade ? '#9065B0' : '#e8e8e8'
                      }`,
                      borderRadius: 1,
                      mt: 1,
                      '&:hover': {
                        bgcolor: isLoading ? 'transcript' : '#f4f4f4',
                      },
                    }}
                  >
                    <Stack
                      direction='row'
                      alignItems='center'
                      justifyContent='center'
                      sx={{
                        border: `1px solid ${
                          item.key === conversionGrade ? '#9065B0' : '#e8e8e8'
                        }`,
                        width: 20,
                        height: 20,
                        borderRadius: 10,
                      }}
                    >
                      <Box
                        sx={{
                          bgcolor:
                            item.key === conversionGrade
                              ? '#9065B0'
                              : 'transcript',
                          width: 17,
                          height: 17,
                          borderRadius: 10,
                        }}
                      ></Box>
                    </Stack>
                    <Box>
                      <Box>
                        <Typography
                          fontSize={{
                            xs: 14,
                            lg: 16,
                          }}
                          color='text.primary'
                        >
                          {item.title}
                        </Typography>{' '}
                      </Box>
                      <Box>
                        <Typography
                          fontSize={{
                            xs: 12,
                            lg: 14,
                          }}
                          color='text.secondary'
                        >
                          {item.tips}
                        </Typography>
                      </Box>
                    </Box>
                  </Stack>
                </Grid>
              </Grid>
            ))}
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
                  Document conversionLanguage:
                </Typography>
                <Select
                  value={conversionLanguage}
                  onChange={(event) =>
                    setConversionLanguage(event.target.value)
                  }
                  displayEmpty
                  size='small'
                  sx={{
                    flex: 1,
                  }}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        height: 366,
                      },
                    },
                  }}
                >
                  {ocrLanguages.map((conversionLanguage) => (
                    <MenuItem
                      key={conversionLanguage.code}
                      value={conversionLanguage.code}
                    >
                      {conversionLanguage.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
            </Grid>
          </Box>
          <FunctionalityCommonButtonListView
            buttonConfigs={buttonConfigs}
            gridBreakpoints={{ xs: 12, md: 6, lg: 4 }}
          />
        </Stack>
      )}
    </Stack>
  );
};
export default FunctionalityOcrPdfMain;
