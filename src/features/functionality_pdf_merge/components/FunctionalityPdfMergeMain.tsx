import { Box, Button, Grid } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { PDFDocument } from 'pdf-lib';
import React, { useState } from 'react';
import { pdfjs } from 'react-pdf';
import { v4 as uuidV4 } from 'uuid';

import AppLoadingLayout from '@/app_layout/AppLoadingLayout';
import UploadButton from '@/features/common/components/UploadButton';
import { FunctionalityTooltip } from '@/features/functionality_common/components/FunctionalityTooltip';
import FunctionalityUploadButton from '@/features/functionality_common/components/FunctionalityUploadButton';
import { downloadUrl } from '@/features/functionality_common/utils/functionalityDownload';
import FunctionalityDragSortableImageList from '@/features/functionality_pdf_merge/components/FunctionalityDragSortableImageList';
import snackNotifications from '@/utils/globalSnackbar';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();
export interface IFunctionalityPdfInfoProps {
  id: string;
  name: string;
  size: number;
  pages: number;
  imageUrlString: string;
  file: File;
}

const FunctionalityPdfMergeMain = () => {
  const { t } = useTranslation();
  const [idLoading, setIsLoading] = useState<boolean>(false);
  const [pdfInfoList, setPdfInfoList] = useState<IFunctionalityPdfInfoProps[]>(
    [],
  ); //展示的pdf信息 列表

  const onUploadFile = async (fileList: FileList) => {
    setIsLoading(true);
    const newFileList = await getPdfFileInfoList(fileList);
    setPdfInfoList((list) => [...list, ...newFileList]);
    setIsLoading(false);
  };
  const handleUnsupportedFileTypeTip = () => {
    snackNotifications.warning(
      t(
        'functionality__pdf_merge:components__pdf_merge__unsupported_file_type_tip', //TODO:需更更改。
      ),
      {
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'center',
        },
      },
    );
  };
  const getPdfFileInfoList = async (fileList: FileList) => {
    const fileInfoList: IFunctionalityPdfInfoProps[] = [];
    for (let i = 0; i < fileList.length; i++) {
      const file = fileList[i];
      const pageInfo = await getFirstPageAsImage(file);
      if (pageInfo) {
        const fileInfo = {
          id: uuidV4(),
          name: file.name,
          size: file.size,
          imageUrlString: pageInfo.image || '',
          pages: pageInfo.pages,
          file: file,
        };
        fileInfoList.push(fileInfo);
      }
    }
    return fileInfoList;
  };
  /**
   * 获取pdf的第一页作为图片
   */
  async function getFirstPageAsImage(
    file: File,
  ): Promise<{ image: string; pages: number } | null> {
    try {
      const buff = await file.arrayBuffer();
      await PDFDocument.load(buff); //load来判断pdf是否加密或者无法提取，异常则进入catch
      //TODO PDFDocument.load(buff)感觉会浪费性能，但是目前没有找到更好的方法

      const loadingTask = pdfjs.getDocument(buff);
      const pdfDocument = await loadingTask.promise;
      const pages = pdfDocument._pdfInfo.numPages;
      const page = await pdfDocument.getPage(1);

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

        return { image, pages };
      } else {
        return null;
      }
    } catch (e) {
      console.log('simply mergePdfFiles', e);
      if (file.name) {
        snackNotifications.warning(
          `${file.name} ${t(
            'functionality__pdf_merge:components__pdf_merge__pdf_encryption_tip',
          )}`,
          {
            anchorOrigin: {
              vertical: 'top',
              horizontal: 'center',
            },
          },
        );
      }
      return null;
    }
  }
  const mergePdfFiles = async (fileList: File[]) => {
    // 创建一个新的 PDF 文档，它将成为最终合并的文档
    const mergedPdfDoc = await PDFDocument.create();
    for (const file of fileList) {
      // 将文件转换为 ArrayBuffer
      try {
        const arrayBuffer = await file.arrayBuffer();
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
      } catch (e) {
        console.log('simply mergePdfFiles', e);
      }
    }

    // 将合并后的 PDF 文档序列化为 Uint8Array
    const mergedPdfUint8Array = await mergedPdfDoc.save();
    return mergedPdfUint8Array;
  };
  const onDownloadZip = async () => {
    if (pdfInfoList) {
      setIsLoading(true);
      const files = pdfInfoList.map((pdfInfo) => pdfInfo.file);
      const downloadPdfData = await mergePdfFiles(files);
      if (downloadPdfData) {
        downloadUrl(downloadPdfData, 'merge(MaxAi.me).pdf');
      }
      setIsLoading(false);
    }
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
      {isListEmpty && !idLoading && (
        <FunctionalityUploadButton
          inputProps={{
            accept: 'application/pdf',
            multiple: true,
          }}
          onChange={onUploadFile}
          handleUnsupportedFileType={handleUnsupportedFileTypeTip}
        />
      )}
      {!isListEmpty && (
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
          sx={{ my: 1 }}
          gap={1}
        >
          <Grid item>
            <FunctionalityTooltip
              title={t(
                'functionality__pdf_merge:components__pdf_merge__button__add_pdfs__tooltip',
              )}
            >
              <Box>
                <UploadButton
                  onChange={onUploadFile}
                  isDrag={false}
                  buttonProps={{
                    variant: 'outlined',
                    disabled: idLoading,
                    size: 'large',
                  }}
                  inputProps={{
                    accept: 'application/pdf',
                    multiple: true,
                  }}
                  handleUnsupportedFileType={handleUnsupportedFileTypeTip}
                >
                  {t('functionality__pdf_merge:components__pdf_merge__add_pdf')}
                </UploadButton>
              </Box>
            </FunctionalityTooltip>
          </Grid>
          <Grid item>
            <FunctionalityTooltip
              title={t(
                'functionality__pdf_merge:components__pdf_merge__button__clear_pdfs__tooltip',
              )}
            >
              <Button
                variant='outlined'
                disabled={idLoading}
                color='error'
                size='large'
                onClick={() => setPdfInfoList([])}
              >
                {t('functionality__pdf_merge:components__pdf_merge__empty_pdf')}
              </Button>
            </FunctionalityTooltip>
          </Grid>
        </Grid>
      )}
      {(!isListEmpty || idLoading) && (
        <Box
          sx={{
            width: '100%',
            position: 'relative',
            minHeight: 200,
          }}
        >
          {!isListEmpty && (
            <FunctionalityDragSortableImageList
              imageList={pdfInfoList}
              onDelete={onDeletePdf}
              isShowOperate={!idLoading}
              isImageSelect={true}
              updateImageList={(list) => setPdfInfoList(list)}
            />
          )}
          {idLoading && (
            <AppLoadingLayout sx={{ position: 'absolute', top: 10 }} loading />
          )}
        </Box>
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
            <FunctionalityTooltip
              title={t(
                'functionality__pdf_merge:components__pdf_merge__button__download__tooltip',
              )}
            >
              <Button
                sx={{ width: '100%' }}
                size='large'
                disabled={pdfInfoList.length < 2 || idLoading}
                variant='contained'
                onClick={() => onDownloadZip()}
              >
                {t(
                  'functionality__pdf_merge:components__pdf_merge__confirm_merge',
                )}
              </Button>
            </FunctionalityTooltip>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
export default FunctionalityPdfMergeMain;
