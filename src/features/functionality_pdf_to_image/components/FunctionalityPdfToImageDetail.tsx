import {
  Box,
  Button,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC, useEffect, useMemo, useRef, useState } from 'react';

import {
  FunctionalityCommonButtonListView,
  IButtonConfig,
} from '@/features/functionality_common/components/FunctionalityCommonButtonListView';
import FunctionalityCommonTooltip from '@/features/functionality_common/components/FunctionalityCommonTooltip';
import { useFunctionalityCommonChangeScale } from '@/features/functionality_common/hooks/useFunctionalityCommonChangeScale';
import useFunctionalityCommonConvertedContentSelector from '@/features/functionality_common/hooks/useFunctionalityCommonConvertedContentSelector';
import useFunctionalityCommonPdfToImageConversion, {
  defaultPdfToImageScale,
  IFunctionalityPdfToImageType,
} from '@/features/functionality_common/hooks/useFunctionalityCommonPdfToImageConversion';
import FunctionalityImageList from '@/features/functionality_pdf_to_image/components/FunctionalityImageList';
import usePdfImagesDownloader from '@/features/functionality_pdf_to_image/hooks/usePdfImagesDownloader';

interface IFunctionalityPdfToImageDetailProps {
  fileData: File;
  toType: 'jpeg' | 'png';
  onRemoveFile?: () => void;
}
const FunctionalityPdfToImageDetail: FC<
  IFunctionalityPdfToImageDetailProps
> = ({ fileData, onRemoveFile, toType }) => {
  const { t } = useTranslation();
  const isReadFile = useRef(false);
  const [showPdfImagesType, setShowPdfImagesType] = useState<
    'pdfPageImages' | 'pdfPageHaveImages'
  >('pdfPageImages'); //显示pdf页面还是页面的图片
  const [selectDownloadSizeIndex, setSelectDownloadSizeIndex] =
    useState<number>(0); //用户选择的下载尺寸大小

  const {
    convertedPdfImages,
    setConvertedPdfImages,
    pdfPageHaveImages,
    setPdfPageHaveImages,
    pdfIsLoading,
    onReadPdfToImages,
    pdfTotalPages,
    currentPdfActionNum,
    onCancelPdfActive,
    pdfViewDefaultSize,
  } = useFunctionalityCommonPdfToImageConversion();
  const {
    downloaderIsLoading,
    downloaderTotalPages,
    currentDownloaderActionNum,
    onCancelDownloader,
    onDownloadPdfImagesZip,
  } = usePdfImagesDownloader();
  const currentShowImages =
    showPdfImagesType === 'pdfPageImages'
      ? convertedPdfImages
      : pdfPageHaveImages;
  const { isSelectAll, onSwitchSelect, onSwitchAllSelect } =
    useFunctionalityCommonConvertedContentSelector<IFunctionalityPdfToImageType>(
      {
        list: currentShowImages,
        setList:
          showPdfImagesType === 'pdfPageImages'
            ? setConvertedPdfImages
            : setPdfPageHaveImages,
      },
    );
  const { changeScale, currentScale } = useFunctionalityCommonChangeScale();
  const readPdfToImages = async (file) => {
    if (isReadFile.current) {
      return;
    }
    isReadFile.current = true;
    if (file) {
      console.log('simply readPdfToImages');
      const isReadSuccess = await onReadPdfToImages(file, toType, true);
      if (!isReadSuccess) {
        onRemoveFile && onRemoveFile();
      }
    }
  };
  useEffect(() => {
    readPdfToImages(fileData);
  }, [fileData]);
  const maxSizeScaleNum = 4;
  const imageSizeList = useMemo(() => {
    // 图片储存列表设置
    return [
      pdfViewDefaultSize,
      {
        width: pdfViewDefaultSize.width * maxSizeScaleNum,
        height: pdfViewDefaultSize.height * maxSizeScaleNum,
      },
    ];
  }, [pdfViewDefaultSize]);

  const onSwitchPdfImagesType = () => {
    setShowPdfImagesType((prev) =>
      prev === 'pdfPageImages' ? 'pdfPageHaveImages' : 'pdfPageImages',
    );
  };

  const downloadZip = () => {
    if (showPdfImagesType === 'pdfPageImages') {
      //maxSizeScaleNum * 4  默认尺寸是1.6倍
      onDownloadPdfImagesZip(
        currentShowImages,
        toType,
        fileData,
        selectDownloadSizeIndex === 0
          ? undefined
          : defaultPdfToImageScale * maxSizeScaleNum,
      );
    } else {
      onDownloadPdfImagesZip(currentShowImages, toType, fileData);
    }
  };
  const onCancel = () => {
    onCancelPdfActive && onCancelPdfActive();
    onCancelDownloader();
  };
  const isLoading = pdfIsLoading || downloaderIsLoading;
  const totalPages = !downloaderIsLoading
    ? pdfTotalPages
    : downloaderTotalPages;

  const currentActionNum = !downloaderIsLoading
    ? currentPdfActionNum
    : currentDownloaderActionNum;

  //按钮配置列表
  const buttonConfigs: IButtonConfig[] = useMemo(
    () => [
      {
        type: 'button',
        buttonProps: {
          disabled: isLoading || currentShowImages.length === 0,
          variant: 'outlined',
          onClick: onSwitchAllSelect,
          children: isSelectAll
            ? t(
                'functionality__pdf_to_image:components__to_image_detail__deselect_all',
              )
            : t(
                'functionality__pdf_to_image:components__to_image_detail__select_all',
              ),
        },
      },
      {
        type: 'button',
        buttonProps: {
          tooltip:
            showPdfImagesType === 'pdfPageImages'
              ? t(
                  'functionality__pdf_to_image:components__to_image_detail__button__view_images__tooltip',
                )
              : t(
                  'functionality__pdf_to_image:components__to_image_detail__button__view_pages__tooltip',
                ),
          tooltipKey: showPdfImagesType, //防止切换窗口高度变化过大，导致的tooltip位置不对
          disabled: isLoading,
          variant: 'outlined',
          onClick: onSwitchPdfImagesType,
          children:
            showPdfImagesType === 'pdfPageImages'
              ? t(
                  'functionality__pdf_to_image:components__to_image_detail__view_images',
                )
              : t(
                  'functionality__pdf_to_image:components__to_image_detail__view_pages',
                ),
        },
      },
      {
        type: 'button',
        buttonProps: {
          tooltip: t(
            'functionality__pdf_to_image:components__to_image_detail__button__remove__tooltip',
          ),
          disabled: isLoading,
          variant: 'outlined',
          color: 'error',
          onClick: () => onRemoveFile && onRemoveFile(),
          children: t(
            'functionality__pdf_to_image:components__to_image_detail__remove_pdf',
          ),
        },
      },
      {
        isShow: !isLoading,
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
      {
        isShow: isLoading,
        type: 'button',
        buttonProps: {
          tooltip: t(
            'functionality__pdf_to_image:components__to_image_detail__button__cancel__tooltip',
          ),
          variant: 'outlined',
          color: 'error',
          onClick: onCancel,
          children: t(
            t(
              'functionality__pdf_to_image:components__to_image_detail__cancel',
            ),
          ),
        },
      },
    ],
    [isLoading, showPdfImagesType, isSelectAll],
  );
  const selectImageList = useMemo(
    () => currentShowImages.filter((item) => item.isSelect),
    [currentShowImages],
  );
  return (
    <Box sx={{ width: '100%' }}>
      <FunctionalityCommonButtonListView buttonConfigs={buttonConfigs} />
      <Box
        sx={{
          py: 5,
          position: 'relative',
          minHeight: 200,
        }}
      >
        {!isLoading && currentShowImages?.length > 0 && (
          <FunctionalityImageList
            onClickImage={(image) => onSwitchSelect(image.id)}
            imageList={currentShowImages}
            scale={currentScale}
          />
        )}
        {showPdfImagesType === 'pdfPageHaveImages' &&
          currentShowImages?.length === 0 && (
            <Stack
              flexDirection='column'
              alignItems='center'
              justifyContent='center'
              sx={{
                bgcolor: 'rgba(255,255,255,0.3)',
                display: 'flex',
                mt: 10,
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: 12,
                    lg: 18,
                  },
                  color: '#4b5563',
                }}
              >
                {t(
                  'functionality__pdf_to_image:components__to_image_detail__not_found_images',
                )}
              </Typography>
            </Stack>
          )}

        {isLoading && (
          <Stack
            flexDirection='column'
            alignItems='center'
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
            {totalPages > 0 ? `${currentActionNum}/${totalPages}` : ''}
          </Stack>
        )}
      </Box>
      {showPdfImagesType === 'pdfPageImages' && !isLoading && (
        <Stack direction='row' justifyContent='center' gap={2}>
          {imageSizeList.map((imageSize, index) => (
            <Box
              key={index}
              onClick={() => !isLoading && setSelectDownloadSizeIndex(index)}
              sx={{
                border: `1px solid ${
                  selectDownloadSizeIndex === index ? '#000' : '#e5e7eb'
                }`,
                padding: 1.5,
                borderRadius: 1,
                cursor: 'pointer',
                '&:hover': {
                  bgcolor: '#f3f4f6',
                },
              }}
            >
              <Typography
                sx={{
                  fontSize: {
                    xs: 12,
                    lg: 18,
                  },
                  color: selectDownloadSizeIndex === index ? '#000' : '#4b5563',
                }}
              >
                {index === 0
                  ? t(
                      'functionality__pdf_to_image:components__to_image_detail__normal_quality',
                    )
                  : t(
                      'functionality__pdf_to_image:components__to_image_detail__high_quality',
                    )}
              </Typography>
              <Typography
                sx={{
                  fontSize: {
                    xs: 12,
                    lg: 16,
                  },
                  color: selectDownloadSizeIndex === index ? '#000' : '#6b7280',
                }}
              >
                {imageSize.width} * {imageSize.height}
              </Typography>
            </Box>
          ))}
        </Stack>
      )}
      {currentShowImages?.length > 0 && (
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
          sx={{ mt: 2 }}
        >
          <Grid item xs={10} md={2}>
            <FunctionalityCommonTooltip
              title={t(
                'functionality__pdf_to_image:components__to_image_detail__button__download__tooltip',
              )}
            >
              <Button
                sx={{ width: '100%', height: 48 }}
                disabled={isLoading || selectImageList.length === 0}
                size='large'
                variant='contained'
                onClick={() => downloadZip()}
              >
                {t(
                  'functionality__pdf_to_image:components__to_image_detail__download_images',
                )}
              </Button>
            </FunctionalityCommonTooltip>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default FunctionalityPdfToImageDetail;
