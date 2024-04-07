import { Box, Button, Checkbox, CircularProgress, Grid } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { PDFDocument } from 'pdf-lib';
import React, { useState } from 'react';

import FunctionalityImage from '@/features/functionality_common/components/FunctionalityImage';
import FunctionalityUploadButton from '@/features/functionality_common/components/FunctionalityUploadButton';
import usePdfToImageConversion, {
  IPdfPageImageInfo,
} from '@/features/functionality_common/hooks/usePdfToImageConversion';
import { downloadUrl } from '@/features/functionality_common/utils/download';
import useConvertedContentSelector from '@/features/functionality_pdf_to_image/hooks/useConvertedContentSelector';
import snackNotifications from '@/utils/globalSnackbar';

export interface IFunctionalityPdfInfoProps {
  id: string;
  name: string;
  size: number;
  pages: number;
  imageUrlString: string;
  file: File;
  isSelect: boolean;
}
export const FunctionalityPdfSplit = () => {
  const { t } = useTranslation();

  const [idLoading, setIsLoading] = useState<boolean>(false);
  const [activeFile, setActiveFile] = useState<File | null>(null);
  const {
    convertedPdfImages,
    setConvertedPdfImages,
    pdfIsLoading,
    onReadPdfToImages,
    onCancelPdfActive,
    pdfTotalPages,
    currentPdfActionNum,
  } = usePdfToImageConversion('png', false);
  const { isSelectAll, onSwitchSelect, onSwitchAllSelect } =
    useConvertedContentSelector<IPdfPageImageInfo>({
      list: convertedPdfImages,
      setList: setConvertedPdfImages,
    });
  const onUploadFile = async (fileList: FileList) => {
    if (fileList && fileList.length > 0) {
      setActiveFile(fileList[0]);
      onReadPdfToImages(fileList[0]);
    }
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
  const confirmToSplit = async () => {
    setIsLoading(true);
    const splitPdfList = convertedPdfImages.filter((item) => item.isSelect);
    if (splitPdfList.length > 0) {
      console.log('simply confirmToSplit', splitPdfList);
      const downloadPdfData = await mergePdfFiles(splitPdfList);
      console.log('simply downloadPdfData', downloadPdfData);

      if (downloadPdfData) {
        downloadUrl(downloadPdfData, 'split(MaxAi.me).pdf');
      }
    }
    setIsLoading(false);
  };
  const mergePdfFiles = async (fileList: IPdfPageImageInfo[]) => {
    try {
      // 创建一个新的 PDF 文档，它将成为最终合并的文档
      const mergedPdfDoc = await PDFDocument.create();
      if (activeFile) {
        const arrayBuffer = await activeFile.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);

        // 遍历文件列表，将每个文件的页面添加到合并的文档中
        for (let index = 0; index < fileList.length; index++) {
          console.log('simply index 1', index);

          const pages = await mergedPdfDoc.copyPages(pdfDoc, [
            fileList[index].definedIndex - 1,
          ]);

          pages.forEach((page) => {
            mergedPdfDoc.addPage(page);
          });
          console.log('simply index 2', index);
        }

        // 将合并的文档保存为 Uint8Array
        const mergedPdfUint8Array = await mergedPdfDoc.save();
        return mergedPdfUint8Array;
      }
    } catch (e) {
      setIsLoading(false);
      console.error('simply mergePdfFiles error', e);
      snackNotifications.warning(
        'Failed to split PDF files, Exceeded maximum quantity',
        {
          anchorOrigin: {
            vertical: 'top',
            horizontal: 'center',
          },
        },
      );
    }
  };
  const onRemoveFile = () => {
    setConvertedPdfImages([]);
  };
  const currentIsLoading = pdfIsLoading || idLoading;
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
      {!currentIsLoading && convertedPdfImages.length === 0 && (
        <FunctionalityUploadButton
          inputProps={{
            accept: 'application/pdf',
          }}
          onChange={onUploadFile}
          handleUnsupportedFileType={handleUnsupportedFileTypeTip}
        />
      )}
      {convertedPdfImages.length > 0 && (
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
          flexWrap='wrap'
          spacing={2}
        >
          <Grid item xs={6} md={2}>
            <Button
              sx={{ width: '100%' }}
              size='small'
              disabled={currentIsLoading || convertedPdfImages.length === 0}
              variant='outlined'
              onClick={onSwitchAllSelect}
            >
              {isSelectAll
                ? t(
                    'functionality__pdf_to_image:components__to_image_detail__deselect_all',
                  )
                : t(
                    'functionality__pdf_to_image:components__to_image_detail__select_all',
                  )}
            </Button>
          </Grid>
          <Grid item xs={6} md={2}>
            <Button
              sx={{ width: '100%' }}
              size='small'
              disabled={currentIsLoading}
              variant='outlined'
              color='error'
              onClick={() => onRemoveFile()}
            >
              {t(
                'functionality__pdf_to_image:components__to_image_detail__remove_pdf',
              )}
            </Button>
          </Grid>
          {pdfIsLoading && (
            <Grid item xs={12} md={2}>
              <Button
                sx={{ width: '100%' }}
                size='small'
                variant='outlined'
                color='error'
                onClick={() => onCancelPdfActive()}
              >
                {t(
                  'functionality__pdf_to_image:components__to_image_detail__cancel',
                )}
              </Button>
            </Grid>
          )}
        </Grid>
      )}

      <Grid
        container
        item
        justifyContent='center'
        my={3}
        gap={2}
        sx={{
          position: 'relative',
          overflowY: 'auto',
          maxHeight: 700,
        }}
      >
        {convertedPdfImages.map((imageInfo, index) => (
          <FunctionalityImage
            key={imageInfo.id}
            name={String(index + 1)}
            imageInfo={imageInfo}
            onClick={() => onSwitchSelect(imageInfo.id)}
            rightTopChildren={
              !currentIsLoading && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Checkbox checked={imageInfo.isSelect} />
                </Box>
              )
            }
          />
        ))}
        {currentIsLoading && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 15,
              bottom: 0,
              bgcolor: 'rgba(255,255,255,0.3)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingTop: 10,
            }}
          >
            <CircularProgress />
            {pdfTotalPages > 0 ? `${currentPdfActionNum}/${pdfTotalPages}` : ''}
          </Box>
        )}
      </Grid>
      {convertedPdfImages?.length > 0 && (
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
          sx={{ mt: 2 }}
        >
          <Grid item xs={10} md={2}>
            <Button
              sx={{ width: '100%' }}
              disabled={currentIsLoading}
              size='small'
              variant='contained'
              onClick={() => confirmToSplit()}
            >
              Confirm to split
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
export default FunctionalityPdfSplit;
