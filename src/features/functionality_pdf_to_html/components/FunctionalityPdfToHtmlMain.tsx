import { Stack } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useState } from 'react';
import { pdfjs } from 'react-pdf';

import FunctionalityCommonUploadButton from '@/features/functionality_common/components/FunctionalityCommonUploadButton';

import { convertPdfToHTMLDivElement, createHtml } from '../utils';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();
const FunctionalityPdfToHtmlMain = () => {
  const { t } = useTranslation();
  const [file, setFile] = useState<File | null>(null); //展示的pdf信息 列表
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onUploadFile = async (fileList: FileList) => {
    setIsLoading(true);
    console.log('fileList', fileList);
    if (fileList[0]) {
      const steVal = await convertPdfToHTMLDivElement(fileList[0]);
      console.log('simply steVal', steVal);
      saveHtmlContent(createHtml(steVal.innerHTML));
    }

    setIsLoading(false);
  };
  // 将HTML内容另存为文件
  const saveHtmlContent = (htmlContent: string) => {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'pdf_content.html';
    link.click();
  };
  return (
    <Stack
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      sx={{
        display: 'flex',
        pb: 5,
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
        />
      )}
      <canvas id='pdf-canvas'></canvas>
    </Stack>
  );
};
export default FunctionalityPdfToHtmlMain;
