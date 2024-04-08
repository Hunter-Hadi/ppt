import { Box, Button, Checkbox, CircularProgress, Grid } from '@mui/material';
import FileSaver from 'file-saver';
import JSZip from 'jszip';
import { useTranslation } from 'next-i18next';
import { PDFDocument } from 'pdf-lib';
import React, { useEffect, useState } from 'react';

import FunctionalityIcon from '@/features/functionality_common/components/FunctionalityIcon';
import FunctionalityImage from '@/features/functionality_common/components/FunctionalityImage';
import { FunctionalityTooltip } from '@/features/functionality_common/components/FunctionalityTooltip';
import FunctionalityUploadButton from '@/features/functionality_common/components/FunctionalityUploadButton';
import { useFunctionalityChangeScale } from '@/features/functionality_common/hooks/useFunctionalityChangeScale';
import useConvertedContentSelector from '@/features/functionality_common/hooks/useFunctionalityConvertedContentSelector';
import usePdfToImageConversion, {
  IPdfPageImageInfo,
} from '@/features/functionality_common/hooks/useFunctionalityPdfToImageConversion';
import { downloadUrl } from '@/features/functionality_common/utils/functionalityDownload';
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
  const [isMergeSinglePDf, setIsMergeSinglePDf] = useState<boolean>(false);

  const {
    convertedPdfImages,
    setConvertedPdfImages,
    pdfIsLoading,
    onReadPdfToImages,
    onCancelPdfActive,
    pdfTotalPages,
    currentPdfActionNum,
  } = usePdfToImageConversion('png', false);
  const { changeScale, currentScale, onDefaultChangeScale } =
    useFunctionalityChangeScale();
  const { isSelectAll, onSwitchSelect, onSwitchAllSelect } =
    useConvertedContentSelector<IPdfPageImageInfo>({
      list: convertedPdfImages,
      setList: setConvertedPdfImages,
    });
  useEffect(() => {
    onDefaultChangeScale(pdfTotalPages);
  }, [pdfTotalPages]);
  const onUploadFile = async (fileList: FileList) => {
    if (fileList && fileList.length > 0) {
      setActiveFile(fileList[0]);
      const isReadSuccess = await onReadPdfToImages(fileList[0]);
      if (!isReadSuccess) {
        setActiveFile(null);
      }
    }
  };
  const handleUnsupportedFileTypeTip = () => {
    snackNotifications.warning(
      t(
        'functionality__pdf_split:components__pdf_split__unsupported_file_type_tip',
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
      console.log('simply confirmToSplit', isMergeSinglePDf);
      if (isMergeSinglePDf) {
        const downloadPdfData = await getMergePdfFiles(splitPdfList);
        if (downloadPdfData) {
          downloadUrl(downloadPdfData, 'split(MaxAi.me).pdf');
        }
      } else {
        const pdfUint8ArrayList = await getSplitPdfFiles(splitPdfList);
        onDownloadPdfImagesZip(pdfUint8ArrayList);
      }
    }
    setIsLoading(false);
  };
  const onDownloadPdfImagesZip = async (list: Uint8Array[]) => {
    const zip = new JSZip();
    const zipTool = zip.folder('pdfs(MaxAi.me)');
    for (let i = 0; i < list.length; i++) {
      zipTool?.file(`split-${i + 1}(MaxAI.me).pdf`, list[i]);
    }
    zip.generateAsync({ type: 'blob' }).then((content) => {
      FileSaver.saveAs(content, 'pdfs(MaxAI.me).zip');
    });
  };
  const getSplitPdfFiles = async (fileList: IPdfPageImageInfo[]) => {
    if (activeFile) {
      let pdfUint8ArrayList: Uint8Array[] = [];
      const arrayBuffer = await activeFile.arrayBuffer();
      const pdfDoc = await PDFDocument.load(arrayBuffer);
      for (let index = 0; index < fileList.length; index++) {
        const mergedPdfDoc = await PDFDocument.create();
        const pages = await mergedPdfDoc.copyPages(pdfDoc, [
          fileList[index].definedIndex - 1,
        ]);
        pages.forEach((page) => {
          mergedPdfDoc.addPage(page);
        });
        const mergedPdfUint8Array = await mergedPdfDoc.save();
        pdfUint8ArrayList.push(mergedPdfUint8Array);
      }
      return pdfUint8ArrayList;
    } else {
      return [];
    }
  };
  const getMergePdfFiles = async (fileList: IPdfPageImageInfo[]) => {
    try {
      // 创建一个新的 PDF 文档，它将成为最终合并的文档
      const mergedPdfDoc = await PDFDocument.create();
      if (activeFile) {
        const arrayBuffer = await activeFile.arrayBuffer();
        const pdfDoc = await PDFDocument.load(arrayBuffer);
        // 遍历文件列表，将每个文件的页面添加到合并的文档中
        for (let index = 0; index < fileList.length; index++) {
          const pages = await mergedPdfDoc.copyPages(pdfDoc, [
            fileList[index].definedIndex - 1,
          ]);
          pages.forEach((page) => {
            mergedPdfDoc.addPage(page);
          });
        }
        // 将合并的文档保存为 Uint8Array
        const mergedPdfUint8Array = await mergedPdfDoc.save();
        return mergedPdfUint8Array;
      }
    } catch (e) {
      setIsLoading(false);
      console.error('simply mergePdfFiles error', e);
      snackNotifications.warning(
        t('functionality__pdf_split:components__pdf_split__error_maximum'),
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
              size='large'
              disabled={currentIsLoading || convertedPdfImages.length === 0}
              variant='outlined'
              onClick={onSwitchAllSelect}
            >
              {isSelectAll
                ? t(
                    'functionality__pdf_split:components__pdf_split__deselect_all',
                  )
                : t(
                    'functionality__pdf_split:components__pdf_split__select_all',
                  )}
            </Button>
          </Grid>
          <Grid item xs={6} md={2}>
            <FunctionalityTooltip
              title={t(
                'functionality__pdf_split:components__pdf_split__button__remove__tooltip',
              )}
            >
              <Button
                sx={{ width: '100%' }}
                size='large'
                disabled={currentIsLoading}
                variant='outlined'
                color='error'
                onClick={() => onRemoveFile()}
              >
                {t('functionality__pdf_split:components__pdf_spli__remove_pdf')}
              </Button>
            </FunctionalityTooltip>
          </Grid>
          {!currentIsLoading && (
            <Grid item xs={6} md={2} display='flex'>
              <FunctionalityTooltip
                title={t(
                  'functionality__pdf_split:components__pdf_split__button__zoom_in__tooltip',
                )}
              >
                <Box onClick={() => changeScale('enlarge')}>
                  <FunctionalityIcon
                    name='ControlPointTwoTone'
                    sx={{
                      color: 'primary.main',
                      cursor: 'pointer',
                      fontSize: 30,
                    }}
                  />
                </Box>
              </FunctionalityTooltip>
              <FunctionalityTooltip
                title={t(
                  'functionality__pdf_split:components__pdf_split__button__zoom_out__tooltip',
                )}
              >
                <Box onClick={() => changeScale('narrow')}>
                  <FunctionalityIcon
                    name='RemoveCircleTwoTone'
                    sx={{
                      color: 'primary.main',
                      cursor: 'pointer',
                      marginLeft: 1,
                      fontSize: 30,
                    }}
                  />
                </Box>
              </FunctionalityTooltip>
            </Grid>
          )}
          {pdfIsLoading && (
            <Grid item xs={12} md={2}>
              <FunctionalityTooltip
                title={t(
                  'functionality__pdf_split:components__pdf_split__button__cancel__tooltip',
                )}
              >
                <Button
                  sx={{ width: '100%' }}
                  size='large'
                  variant='outlined'
                  color='error'
                  onClick={() => onCancelPdfActive()}
                >
                  {t('functionality__pdf_split:components__pdf_split__cancel')}
                </Button>
              </FunctionalityTooltip>
            </Grid>
          )}
        </Grid>
      )}

      {convertedPdfImages.length > 0 && (
        <Grid
          container
          item
          justifyContent='center'
          my={3}
          gap={2}
          sx={{
            position: 'relative',
            minHeight: 200,
          }}
        >
          {!currentIsLoading &&
            convertedPdfImages.map((imageInfo, index) => (
              <FunctionalityImage
                key={imageInfo.id}
                name={String(index + 1)}
                imageInfo={imageInfo}
                imageSize={currentScale * 50}
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
              {pdfTotalPages > 0
                ? `${currentPdfActionNum}/${pdfTotalPages}`
                : ''}
            </Box>
          )}
        </Grid>
      )}
      {convertedPdfImages?.length > 0 && (
        <Box
          display='flex'
          justifyContent='center'
          alignItems='center'
          justifyItems='center'
          sx={{ mt: 2, cursor: 'pointer' }}
          onClick={() => setIsMergeSinglePDf(!isMergeSinglePDf)}
        >
          <Checkbox checked={isMergeSinglePDf} />
          {t('functionality__pdf_split:components__pdf_split__is_single_pdf')}
        </Box>
      )}
      {convertedPdfImages?.length > 0 && (
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
          sx={{ mt: 1 }}
        >
          <Grid item xs={10} md={2}>
            <FunctionalityTooltip
              title={t(
                'functionality__pdf_split:components__pdf_split__button__download__tooltip',
              )}
            >
              <Button
                sx={{ width: '100%' }}
                disabled={currentIsLoading}
                size='large'
                variant='contained'
                onClick={() => confirmToSplit()}
              >
                {t(
                  'functionality__pdf_split:components__pdf_split__confirm_split',
                )}
              </Button>
            </FunctionalityTooltip>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
export default FunctionalityPdfSplit;
