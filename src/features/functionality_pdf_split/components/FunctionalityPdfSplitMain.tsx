import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Grid,
  Stack,
} from '@mui/material';
import FileSaver from 'file-saver';
import JSZip from 'jszip';
import { useTranslation } from 'next-i18next';
import { PDFDocument } from 'pdf-lib';
import React, { useMemo, useState } from 'react';

import {
  FunctionalityCommonButtonListView,
  IButtonConfig,
} from '@/features/functionality_common/components/FunctionalityCommonButtonListView';
import FunctionalityCommonImage from '@/features/functionality_common/components/FunctionalityCommonImage';
import FunctionalityCommonTooltip from '@/features/functionality_common/components/FunctionalityCommonTooltip';
import FunctionalityCommonUploadButton from '@/features/functionality_common/components/FunctionalityCommonUploadButton';
import { useFunctionalityCommonChangeScale } from '@/features/functionality_common/hooks/useFunctionalityCommonChangeScale';
import useFunctionalityCommonConvertedContentSelector from '@/features/functionality_common/hooks/useFunctionalityCommonConvertedContentSelector';
import useFunctionalityCommonPdfToImageConversion, {
  IFunctionalityPdfToImageType,
} from '@/features/functionality_common/hooks/useFunctionalityCommonPdfToImageConversion';
import { downloadUrl } from '@/features/functionality_common/utils/functionalityCommonDownload';
import snackNotifications from '@/utils/globalSnackbar';

export const FunctionalityPdfSplitMain = () => {
  const { t } = useTranslation();

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [activeFile, setActiveFile] = useState<File | null>(null); //保存在这里是为了方便对源数据后续操作
  const [isMergeSinglePDf, setIsMergeSinglePDf] = useState<boolean>(false); //是否是合并单个pdf

  const {
    convertedPdfImages,
    setConvertedPdfImages,
    pdfIsLoading,
    onReadPdfToImages,
    onCancelPdfActive,
    pdfTotalPages,
    currentPdfActionNum,
    setPdfTotalPages,
  } = useFunctionalityCommonPdfToImageConversion();
  const { changeScale, currentScale } = useFunctionalityCommonChangeScale();
  const { isSelectAll, onSwitchSelect, onSwitchAllSelect } =
    useFunctionalityCommonConvertedContentSelector<IFunctionalityPdfToImageType>(
      {
        list: convertedPdfImages,
        setList: setConvertedPdfImages,
      },
    );
  const onUploadFile = async (fileList: FileList) => {
    if (fileList && fileList.length > 0) {
      setIsLoading(true);
      setActiveFile(fileList[0]);
      const isReadSuccess = await onReadPdfToImages(fileList[0], 'png', false);
      if (!isReadSuccess) {
        setActiveFile(null);
      }
      setIsLoading(false);
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
  const selectPdfPageList = useMemo(
    () => convertedPdfImages.filter((item) => item.isSelect),
    [convertedPdfImages],
  );
  const confirmToSplit = async () => {
    setIsLoading(true);
    setPdfTotalPages(0);
    if (selectPdfPageList.length > 0) {
      if (isMergeSinglePDf) {
        const downloadPdfData = await getMergePdfFiles(selectPdfPageList);
        if (downloadPdfData) {
          downloadUrl(downloadPdfData, 'split(MaxAI.me).pdf');
        }
      } else {
        const pdfUint8ArrayList = await getSplitPdfFiles(selectPdfPageList);
        onDownloadPdfImagesZip(pdfUint8ArrayList);
      }
    }
    setIsLoading(false);
  };
  const onDownloadPdfImagesZip = async (list: Uint8Array[]) => {
    const zip = new JSZip();
    const zipTool = zip.folder('pdfs(MaxAI.me)');
    for (let i = 0; i < list.length; i++) {
      zipTool?.file(`split-${i + 1}(MaxAI.me).pdf`, list[i]);
    }
    zip.generateAsync({ type: 'blob' }).then((content) => {
      FileSaver.saveAs(content, 'pdfs(MaxAI.me).zip');
    });
  };
  const getSplitPdfFiles = async (fileList: IFunctionalityPdfToImageType[]) => {
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
  const getMergePdfFiles = async (fileList: IFunctionalityPdfToImageType[]) => {
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
  const currentIsLoading = pdfIsLoading || isLoading;
  //按钮配置列表
  const buttonConfigs: IButtonConfig[] = [
    {
      type: 'button',
      buttonProps: {
        children: isSelectAll
          ? t('functionality__pdf_split:components__pdf_split__deselect_all')
          : t('functionality__pdf_split:components__pdf_split__select_all'),
        variant: 'outlined',
        disabled: currentIsLoading || convertedPdfImages.length === 0,
        onClick: () => onSwitchAllSelect(),
      },
    },
    {
      type: 'button',
      buttonProps: {
        tooltip: t(
          'functionality__pdf_split:components__pdf_split__button__remove__tooltip',
        ),
        children: t(
          'functionality__pdf_split:components__pdf_split__remove_pdf',
        ),
        variant: 'outlined',
        color: 'error',
        disabled: currentIsLoading,
        onClick: () => onRemoveFile(),
      },
    },
    {
      isShow: currentIsLoading,
      type: 'button',
      buttonProps: {
        tooltip: t(
          'functionality__pdf_split:components__pdf_split__button__cancel__tooltip',
        ),
        children: t('functionality__pdf_split:components__pdf_split__cancel'),
        variant: 'outlined',
        color: 'error',
        onClick: () => onCancelPdfActive(),
      },
    },
    {
      isShow: !currentIsLoading,
      type: 'iconButton',
      iconButtonProps: [
        {
          name: 'ControlPointTwoTone',
          onClick: () => changeScale('enlarge'),
          tooltip: t(
            'functionality__pdf_to_image:components__to_image_detail__button__zoom_in__tooltip',
          ),
        },
        {
          name: 'RemoveCircleTwoTone',
          onClick: () => changeScale('narrow'),
          tooltip: t(
            'functionality__pdf_to_image:components__to_image_detail__button__zoom_out__tooltip',
          ),
          sx: {
            marginLeft: 1,
          },
        },
      ],
    },
  ];
  return (
    <Stack
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      sx={{
        pb: 5,
        width: '100%',
      }}
    >
      {!currentIsLoading && convertedPdfImages.length === 0 && (
        <FunctionalityCommonUploadButton
          inputProps={{
            accept: 'application/pdf',
          }}
          onChange={onUploadFile}
          handleUnsupportedFileType={handleUnsupportedFileTypeTip}
        />
      )}
      {convertedPdfImages.length > 0 && (
        <FunctionalityCommonButtonListView buttonConfigs={buttonConfigs} />
      )}

      {(convertedPdfImages.length > 0 || currentIsLoading) && (
        <Stack
          direction='row'
          flexWrap='wrap'
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
              <FunctionalityCommonImage
                key={imageInfo.id}
                name={String(index + 1)}
                imageInfo={imageInfo}
                onClick={() => onSwitchSelect(imageInfo.id)}
                wrapSx={{
                  width: currentScale * 50,
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                  }}
                >
                  <Checkbox checked={imageInfo.isSelect} />
                </Box>
              </FunctionalityCommonImage>
            ))}
          {currentIsLoading && (
            <Stack
              flexDirection='column'
              alignItems='center'
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 15,
                bottom: 0,
                bgcolor: 'rgba(255,255,255,0.3)',
                paddingTop: 10,
              }}
            >
              <CircularProgress />
              {pdfTotalPages > 0
                ? `${currentPdfActionNum}/${pdfTotalPages}`
                : ''}
            </Stack>
          )}
        </Stack>
      )}
      {convertedPdfImages?.length > 0 && (
        <Stack
          direction='row'
          alignItems='center'
          sx={{ mt: 2, cursor: 'pointer' }}
          onClick={() =>
            !currentIsLoading ? setIsMergeSinglePDf(!isMergeSinglePDf) : null
          }
        >
          <Checkbox disabled={currentIsLoading} checked={isMergeSinglePDf} />
          {t('functionality__pdf_split:components__pdf_split__is_single_pdf')}
        </Stack>
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
            <FunctionalityCommonTooltip
              title={t(
                'functionality__pdf_split:components__pdf_split__button__download__tooltip',
              )}
            >
              <Button
                sx={{ width: '100%', height: 48 }}
                disabled={currentIsLoading || selectPdfPageList.length === 0}
                size='large'
                variant='contained'
                onClick={() => confirmToSplit()}
              >
                {t(
                  'functionality__pdf_split:components__pdf_split__confirm_split',
                )}
              </Button>
            </FunctionalityCommonTooltip>
          </Grid>
        </Grid>
      )}
    </Stack>
  );
};
export default FunctionalityPdfSplitMain;
