import { Box, Button, Grid } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { PDFDocument } from 'pdf-lib';
import { useState } from 'react';
import { pdfjs } from 'react-pdf';
import { v4 as uuidV4 } from 'uuid';

import UploadButton from '@/features/common/components/UploadButton';
import FunctionalityUploadButton from '@/features/functionality_common/components/FunctionalityUploadButton';
import snackNotifications from '@/utils/globalSnackbar';

import FunctionalityImageList from './FunctionalityImageList';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();
interface IFunctionalityPdfInfoProps {
  id: string;
  name: string;
  size: number;
  imageUrlString: string;
  file: File;
}

const FunctionalityPdfMerge = () => {
  const { t } = useTranslation();
  const [pdfInfoList, setPdfInfoList] = useState<IFunctionalityPdfInfoProps[]>(
    [],
  );

  const onChangeFile = (fileList: FileList) => {
    console.log('simply fileList', fileList);
    getPdfFileInfo(fileList);
  };
  const handleUnsupportedFileType = () => {
    snackNotifications.warning(
      t(
        'functionality__pdf_to_image:components__index__unsupported_file_type_tip', //TODO:需更更改。
      ),
      {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      },
    );
  };
  const getPdfFileInfo = async (fileList: FileList) => {
    const fileInfoList: IFunctionalityPdfInfoProps[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const coverPageDataUrl = await getFirstPageAsImage(file);
      if (coverPageDataUrl) {
        const fileInfo = {
          id: uuidV4(),
          name: file.name,
          size: file.size,
          imageUrlString: coverPageDataUrl || '',
          file: file,
        };
        fileInfoList.push(fileInfo);
      }
    }
    setPdfInfoList((list) => [...list, ...fileInfoList]);
    console.log('simply getPdfFileInfo', fileInfoList);
  };
  async function getFirstPageAsImage(file: File): Promise<string | null> {
    const buff = await file.arrayBuffer();
    const loadingTask = pdfjs.getDocument(buff);
    const pdf = await loadingTask.promise;

    const page = await pdf.getPage(1);

    const viewport = page.getViewport({ scale: 1.0 });
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    canvas.height = viewport.height;
    canvas.width = viewport.width;
    if (context) {
      const renderContext = {
        canvasContext: context,
        viewport: viewport,
      };

      renderContext && (await page.render(renderContext).promise);

      const image = canvas.toDataURL('image/png');

      return image;
    } else {
      return null;
    }
  }
  const mergePdfFiles = async (fileList: File[]) => {
    // 创建一个新的 PDF 文档，它将成为最终合并的文档
    const mergedPdfDoc = await PDFDocument.create();

    // 遍历传入的文件列表
    for (let i = 0; i < fileList.length; i++) {
      // 将文件转换为 ArrayBuffer
      const arrayBuffer = await fileList[i].arrayBuffer();
      // 加载该 ArrayBuffer 为 PDF 文档
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      // 将当前 PDF 文档的所有页面复制到合并后的 PDF 文档中
      const copiedPages = await mergedPdfDoc.copyPages(
        pdfDoc,
        pdfDoc.getPageIndices(),
      );
      copiedPages.forEach((page) => {
        mergedPdfDoc.addPage(page);
      });
    }

    // 将合并后的 PDF 文档序列化为 Uint8Array
    const mergedPdfUint8Array = await mergedPdfDoc.save();
    return mergedPdfUint8Array;
  };
  const onDownloadZip = async () => {
    if (pdfInfoList) {
      const files = pdfInfoList.map((pdfInfo) => pdfInfo.file);
      const downloadPdfData = await mergePdfFiles(files);
      downloadPdf(downloadPdfData);
    }
  };
  const downloadPdf = (pdfData: Uint8Array) => {
    const blob = new Blob([pdfData], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'merged.pdf';
    link.click();
    URL.revokeObjectURL(url);
  };
  const onDeletePdf = (id: string) => {
    if (pdfInfoList) {
      const newPdfInfoList = pdfInfoList.filter((pdf) => pdf.id !== id);
      setPdfInfoList(newPdfInfoList);
    }
  };
  const isListEmpty = pdfInfoList.length === 0;
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        pb: 5,
        width: '100%',
      }}
    >
      {isListEmpty && (
        <FunctionalityUploadButton
          inputProps={{
            accept: 'application/pdf',
            multiple: true,
          }}
          onChange={onChangeFile}
          handleUnsupportedFileType={handleUnsupportedFileType}
        />
      )}
      {!isListEmpty && (
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
          sx={{ mt: 5 }}
        >
          <Grid item>
            <UploadButton
              onChange={onChangeFile}
              isDrag={false}
              buttonProps={{
                variant: 'outlined',
              }}
              inputProps={{
                accept: 'application/pdf',
                multiple: true,
              }}
              handleUnsupportedFileType={handleUnsupportedFileType}
            >
              添加PDF
            </UploadButton>
          </Grid>
        </Grid>
      )}
      {!isListEmpty && (
        <FunctionalityImageList
          imageList={pdfInfoList}
          onDelete={onDeletePdf}
          pageCols={6}
          isImageSelect={true}
        />
      )}
      {!isListEmpty && (
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
          sx={{ mt: 5 }}
        >
          <Grid item xs={10} md={2}>
            <Button
              sx={{ width: '100%' }}
              size='small'
              disabled={pdfInfoList.length < 2}
              variant='contained'
              onClick={() => onDownloadZip()}
            >
              Confirm to merge
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
export default FunctionalityPdfMerge;
