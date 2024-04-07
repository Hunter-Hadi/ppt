import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC, useEffect, useMemo, useState } from 'react';

import FunctionalityIcon from '@/features/functionality_common/components/FunctionalityIcon';
import { useFunctionalityChangeScale } from '@/features/functionality_common/hooks/useFunctionalityChangeScale';
import useConvertedContentSelector from '@/features/functionality_common/hooks/useFunctionalityConvertedContentSelector';
import usePdfToImageConversion, {
  IPdfPageImageInfo,
} from '@/features/functionality_common/hooks/useFunctionalityPdfToImageConversion';
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

  const [showPdfImagesType, setShowPdfImagesType] = useState<
    'pdfPageImages' | 'padPageHaveImages'
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
  } = usePdfToImageConversion(toType, true);
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
    useConvertedContentSelector<IPdfPageImageInfo>({
      list: currentShowImages,
      setList:
        showPdfImagesType === 'pdfPageImages'
          ? setConvertedPdfImages
          : setPdfPageHaveImages,
    });
  const { changeScale, currentScale, onDefaultChangeScale } =
    useFunctionalityChangeScale();
  useEffect(() => {
    if (fileData) {
      onReadPdfToImages(fileData);
    }
  }, [fileData]);

  useEffect(() => {
    onDefaultChangeScale(pdfTotalPages);
  }, [pdfTotalPages]);
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
      prev === 'pdfPageImages' ? 'padPageHaveImages' : 'pdfPageImages',
    );
  };

  const downloadZip = () => {
    if (showPdfImagesType === 'pdfPageImages') {
      //maxSizeScaleNum * 4  默认尺寸是1.6倍
      onDownloadPdfImagesZip(
        currentShowImages,
        toType,
        fileData,
        selectDownloadSizeIndex === 0 ? undefined : 1.6 * maxSizeScaleNum,
      );
    } else {
      onDownloadPdfImagesZip(currentShowImages, toType);
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

  return (
    <Box sx={{ width: '100%' }}>
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
            disabled={isLoading || currentShowImages.length === 0}
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
            disabled={isLoading}
            variant='outlined'
            onClick={onSwitchPdfImagesType}
          >
            {showPdfImagesType !== 'pdfPageImages'
              ? t(
                  'functionality__pdf_to_image:components__to_image_detail__view_pages',
                )
              : t(
                  'functionality__pdf_to_image:components__to_image_detail__view_images',
                )}
          </Button>
        </Grid>
        {currentShowImages?.length > 0 && (
          <Grid item xs={6} md={2}>
            <Button
              sx={{ width: '100%' }}
              size='small'
              disabled={isLoading}
              variant='contained'
              onClick={() => downloadZip()}
            >
              {t(
                'functionality__pdf_to_image:components__to_image_detail__download_images',
              )}
            </Button>
          </Grid>
        )}

        <Grid item xs={6} md={2}>
          <Button
            sx={{ width: '100%' }}
            size='small'
            disabled={isLoading}
            variant='outlined'
            color='error'
            onClick={() => onRemoveFile && onRemoveFile()}
          >
            {t(
              'functionality__pdf_to_image:components__to_image_detail__remove_pdf',
            )}
          </Button>
        </Grid>
        {!isLoading && (
          <Grid item xs={6} md={2} display='flex'>
            <Box onClick={() => changeScale('enlarge')}>
              <FunctionalityIcon
                name='ControlPointTwoTone'
                sx={{ color: 'primary.main', cursor: 'pointer', fontSize: 30 }}
              />
            </Box>
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
          </Grid>
        )}
        {isLoading && (
          <Grid item xs={12} md={2}>
            <Button
              sx={{ width: '100%' }}
              size='small'
              variant='outlined'
              color='error'
              onClick={() => onCancel()}
            >
              {t(
                'functionality__pdf_to_image:components__to_image_detail__cancel',
              )}
            </Button>
          </Grid>
        )}
      </Grid>
      <Box
        sx={{
          py: 5,
          position: 'relative',
          minHeight: 200,
        }}
      >
        {!pdfIsLoading && currentShowImages?.length > 0 && (
          <FunctionalityImageList
            onClickImage={(image) => onSwitchSelect(image.id)}
            imageList={currentShowImages}
            scale={currentScale}
          />
        )}
        {showPdfImagesType === 'padPageHaveImages' &&
          currentShowImages?.length === 0 && (
            <Box
              sx={{
                bgcolor: 'rgba(255,255,255,0.3)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
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
            </Box>
          )}

        {isLoading && (
          <Box
            sx={{
              position: 'absolute',
              top: 10,
              left: 0,
              right: 15,
              bottom: 0,
              bgcolor: 'rgba(255,255,255,0.3)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress />
            {totalPages > 0 ? `${currentActionNum}/${totalPages}` : ''}
          </Box>
        )}
      </Box>
      {showPdfImagesType === 'pdfPageImages' && !isLoading && (
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
          gap={2}
        >
          {imageSizeList.map((imageSize, index) => (
            <Box
              key={index}
              onClick={() => !isLoading && setSelectDownloadSizeIndex(index)}
              sx={{
                border: `1px solid ${
                  selectDownloadSizeIndex === index ? '#000' : '#e5e7eb'
                }`,
                padding: 1,
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
                    lg: 15,
                  },
                  color: selectDownloadSizeIndex === index ? '#000' : '#6b7280',
                }}
              >
                {imageSize.width} * {imageSize.height}
              </Typography>
            </Box>
          ))}
        </Grid>
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
            <Button
              sx={{ width: '100%' }}
              disabled={isLoading}
              size='small'
              variant='contained'
              onClick={() => downloadZip()}
            >
              {t(
                'functionality__pdf_to_image:components__to_image_detail__download_images',
              )}
            </Button>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default FunctionalityPdfToImageDetail;
