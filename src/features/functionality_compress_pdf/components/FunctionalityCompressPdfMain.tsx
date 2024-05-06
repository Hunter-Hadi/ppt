import { Box, CircularProgress, Stack } from '@mui/material';
import { useTranslation } from 'next-i18next';
// import pica from 'pica';
import { useMemo, useState } from 'react';
import { pdfjs } from 'react-pdf';

import {
  FunctionalityCommonButtonListView,
  IButtonConfig,
} from '@/features/functionality_common/components/FunctionalityCommonButtonListView';
import FunctionalityCommonUploadButton from '@/features/functionality_common/components/FunctionalityCommonUploadButton';
import { functionalityCommonSnackNotifications } from '@/features/functionality_common/utils/functionalityCommonNotificationTool';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();
const FunctionalityCompressPdfMain = () => {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pdfTotalPages, setPdfTotalPages] = useState<number>(0); //总页数
  const [currentPdfActionNum, setCurrentPdfActionNum] = useState<number>(0); //当前加载页数
  const onCompressPdf = async () => {
    try {
      if (file) {
        const buff = await file.arrayBuffer();
        const pdf = await pdfjs.getDocument(buff).promise;
        const numPages = pdf.numPages;
        for (let i = 1; i <= numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent({
            includeMarkedContent: true,
          }); //获取文本内容列表
          const ops = await page.getOperatorList();
          const imageNames = ops.fnArray.reduce((acc, curr, i) => {
            if (
              [pdfjs.OPS.paintImageXObject, pdfjs.OPS.paintXObject].includes(
                curr,
              )
            ) {
              (acc as any[]).push(ops.argsArray[i][0]);
            }
            return acc;
          }, []);
          for (let i = 0; i < imageNames.length; i++) {
            page.objs.get(imageNames[i], (image) => {
              (async () => {
                try {
                  console.log('simply image', image);
                } catch (e) {
                  console.error('simply image error', e);
                }
              })();
            });
          }
          console.log('simply textContent', textContent, imageNames);
        }
      }
    } catch (e) {
      setIsLoading(false);
      console.error('simply mergePdfFiles error', e);
      functionalityCommonSnackNotifications(
        t('functionality__pdf_split:components__pdf_split__error_maximum'),
      );
    }
  };
  async function createPdfWithImages(images) {}
  const onUploadFile = async (fileList: FileList) => {
    if (fileList[0]) {
      setFile(fileList[0]);
    }
  };
  const downloadHtml = () => {};
  const handleUnsupportedFileType = () => {
    functionalityCommonSnackNotifications(
      t(
        'functionality__pdf_to_html:components__pdf_to_html__unsupported_file_type_tip',
      ),
    );
  };
  //按钮配置列表
  const compressBeforeButtonConfigs: IButtonConfig[] = useMemo(
    () => [
      {
        type: 'button',
        buttonProps: {
          children: '压缩',
          variant: 'contained',
          disabled: isLoading,
          onClick: onCompressPdf,
        },
      },
      {
        type: 'button',
        buttonProps: {
          children: t(
            'functionality__pdf_to_html:components__pdf_to_html__button__convert',
          ),
          variant: 'outlined',
          disabled: isLoading,
          color: 'error',
          onClick: () => {},
        },
      },
    ],
    [isLoading, file],
  );
  //按钮配置列表
  const buttonConfigs: IButtonConfig[] = useMemo(
    () => [
      {
        type: 'button',
        buttonProps: {
          children: t(
            'functionality__pdf_to_html:components__pdf_to_html__button__download',
          ),
          variant: 'contained',
          disabled: isLoading,
          onClick: downloadHtml,
        },
      },
      {
        type: 'button',
        buttonProps: {
          children: t(
            'functionality__pdf_to_html:components__pdf_to_html__button__convert',
          ),
          variant: 'outlined',
          disabled: isLoading,
          color: 'error',
          onClick: () => {},
        },
      },
    ],
    [isLoading],
  );
  const BoxViewWrap = (props) => (
    <Box
      sx={{
        width: '100%',
        position: 'relative',
        minHeight: 200,
        pt: 10,
      }}
    >
      {props.children}
    </Box>
  );
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
      {!file && !isLoading && (
        <FunctionalityCommonUploadButton
          inputProps={{
            accept: 'application/pdf',
            multiple: true,
          }}
          onChange={onUploadFile}
          handleUnsupportedFileType={handleUnsupportedFileType}
        />
      )}
      {file && (
        <BoxViewWrap>
          <Box>基本的</Box>
          <Box>强的</Box>
          <FunctionalityCommonButtonListView
            buttonConfigs={compressBeforeButtonConfigs}
          />
          <FunctionalityCommonButtonListView buttonConfigs={buttonConfigs} />
        </BoxViewWrap>
      )}
      {isLoading && (
        <BoxViewWrap>
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
            <CircularProgress />
            {pdfTotalPages > 0 ? `${currentPdfActionNum}/${pdfTotalPages}` : ''}
          </Stack>
        </BoxViewWrap>
      )}
    </Stack>
  );
};
export default FunctionalityCompressPdfMain;
