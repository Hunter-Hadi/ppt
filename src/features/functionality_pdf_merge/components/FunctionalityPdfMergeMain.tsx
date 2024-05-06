import { Box, Button, Grid, IconButton, Stack } from '@mui/material';
import ceil from 'lodash-es/ceil';
import divide from 'lodash-es/divide';
import { useTranslation } from 'next-i18next';
import { PDFDocument } from 'pdf-lib';
import React, { useMemo, useState } from 'react';
import { pdfjs } from 'react-pdf';
import { v4 as uuidV4 } from 'uuid';

import AppLoadingLayout from '@/app_layout/AppLoadingLayout';
import {
  FunctionalityCommonButtonListView,
  IButtonConfig,
} from '@/features/functionality_common/components/FunctionalityCommonButtonListView';
import FunctionalityCommonDragSortableList from '@/features/functionality_common/components/FunctionalityCommonDragSortableList';
import FunctionalityCommonIcon from '@/features/functionality_common/components/FunctionalityCommonIcon';
import FunctionalityCommonImage from '@/features/functionality_common/components/FunctionalityCommonImage';
import FunctionalityCommonTooltip from '@/features/functionality_common/components/FunctionalityCommonTooltip';
import FunctionalityCommonUploadButton from '@/features/functionality_common/components/FunctionalityCommonUploadButton';
import { IFunctionalityCommonImageInfo } from '@/features/functionality_common/types/functionalityCommonImageType';
import { downloadUrl } from '@/features/functionality_common/utils/functionalityCommonDownload';
import { functionalityCommonSnackNotifications } from '@/features/functionality_common/utils/functionalityCommonNotificationTool';
export type IFunctionalityPdfFileInfoType = IFunctionalityCommonImageInfo & {
  name: string;
  file: File;
  size: number;
  pages: number;
};
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();
const FunctionalityPdfMergeMain = () => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [pdfInfoList, setPdfInfoList] = useState<
    IFunctionalityPdfFileInfoType[]
  >([]); //展示的pdf信息 列表

  const onUploadFile = async (fileList: FileList) => {
    setIsLoading(true);
    const newFileList = await getPdfFileInfoList(fileList);
    setPdfInfoList((list) => [...list, ...newFileList]);
    setIsLoading(false);
  };
  const handleUnsupportedFileTypeTip = () => {
    functionalityCommonSnackNotifications(
      t(
        'functionality__pdf_merge:components__pdf_merge__unsupported_file_type_tip',
      ),
    );
  };
  /**
   * 获取pdf的第一页作为图片
   */
  const getFirstPageAsImage = async (file: File) => {
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
      if (file.name) {
        functionalityCommonSnackNotifications(
          `${file.name} ${t(
            'functionality__common:components__common__pdf_encryption_tip',
          )}`,
        );
      }
      return null;
    }
  };
  const getPdfFileInfoList = async (fileList: FileList) => {
    const fileInfoList: IFunctionalityPdfFileInfoType[] = [];
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
      if (files) {
        const downloadPdfData = await mergePdfFiles(files);
        if (downloadPdfData) {
          downloadUrl(downloadPdfData, 'merge(Powered by MaxAI).pdf');
        }
        setIsLoading(false);
      }
    }
  };

  const onDeletePdf = (id: string) => {
    if (pdfInfoList) {
      const newPdfInfoList = pdfInfoList.filter((pdf) => pdf.id !== id);
      setPdfInfoList(newPdfInfoList);
    }
  };
  const isListEmpty = pdfInfoList.length === 0;

  //按钮配置列表
  const buttonConfigs: IButtonConfig[] = useMemo(
    () => [
      {
        type: 'upload',
        uploadProps: {
          tooltip: t(
            'functionality__pdf_merge:components__pdf_merge__button__add_pdfs__tooltip',
          ),
          onChange: onUploadFile,
          isDrag: false,
          buttonProps: {
            variant: 'outlined',
            disabled: isLoading,
            sx: {
              height: 48,
              width: '100%',
            },
          },
          inputProps: {
            accept: 'application/pdf',
            multiple: true,
          },
          handleUnsupportedFileType: handleUnsupportedFileTypeTip,
          children: t(
            'functionality__pdf_merge:components__pdf_merge__add_pdf',
          ),
        },
      },
      {
        type: 'button',
        buttonProps: {
          tooltip: t(
            'functionality__pdf_merge:components__pdf_merge__button__clear_pdf__tooltip',
          ),
          children: t(
            'functionality__pdf_merge:components__pdf_merge__empty_pdf',
          ),
          variant: 'outlined',
          disabled: isLoading,
          color: 'error',
          onClick: () => setPdfInfoList([]),
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
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      {isListEmpty && !isLoading && (
        <FunctionalityCommonUploadButton
          inputProps={{
            accept: 'application/pdf',
            multiple: true,
          }}
          onChange={onUploadFile}
          handleUnsupportedFileType={handleUnsupportedFileTypeTip}
        />
      )}
      {!isListEmpty && (
        <FunctionalityCommonButtonListView buttonConfigs={buttonConfigs} />
      )}
      {!isListEmpty && !isLoading && (
        <BoxViewWrap>
          <FunctionalityCommonDragSortableList
            list={pdfInfoList}
            onUpdateList={setPdfInfoList}
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
              <FunctionalityCommonTooltip
                key={imageInfo.id}
                title={`${ceil(divide(imageInfo.size, 1000))}kb - ${
                  imageInfo.pages
                } pages`}
              >
                <FunctionalityCommonImage
                  key={imageInfo.id}
                  name={String(index + 1)}
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
                            bgcolor: '#d1d5db',
                            borderRadius: 3,
                          }}
                        />
                      </IconButton>
                    </Box>
                  ) : null}
                </FunctionalityCommonImage>
              </FunctionalityCommonTooltip>
            )}
          </FunctionalityCommonDragSortableList>
        </BoxViewWrap>
      )}
      {isLoading && (
        <BoxViewWrap>
          <AppLoadingLayout sx={{ position: 'absolute', top: 10 }} loading />
        </BoxViewWrap>
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
            <FunctionalityCommonTooltip
              title={t(
                'functionality__pdf_merge:components__pdf_merge__button__download__tooltip',
              )}
            >
              <Button
                sx={{ width: '100%', height: 48 }}
                size='large'
                disabled={pdfInfoList.length < 2 || isLoading}
                variant='contained'
                onClick={() => onDownloadZip()}
              >
                {t(
                  'functionality__pdf_merge:components__pdf_merge__confirm_merge',
                )}
              </Button>
            </FunctionalityCommonTooltip>
          </Grid>
        </Grid>
      )}
    </Stack>
  );
};
export default FunctionalityPdfMergeMain;
