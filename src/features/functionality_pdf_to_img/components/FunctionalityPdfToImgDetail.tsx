import { Box, Button, CircularProgress, Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';

import FunctionalityIcon from '@/features/functionality_pdf_to_img/components/FunctionalityIcon';
import FunctionalityImageList from '@/features/functionality_pdf_to_img/components/FunctionalityImageList';
import usePdfImagesDownloader from '@/features/functionality_pdf_to_img/hooks/usePdfImagesDownloader';
import usePdfToImageConversion, {
  IPdfPageImageInfo,
} from '@/features/functionality_pdf_to_img/hooks/usePdfToImageConversion';
import useSwitchIdSelect from '@/features/functionality_pdf_to_img/hooks/useSwitchSelect';

interface IFunctionalityPdfToImgProps {
  fileData: File;
  toType: 'jpeg' | 'png';
  onRemoveFile?: () => void;
}
const FunctionalityPdfToImgDetail: FC<IFunctionalityPdfToImgProps> = ({
  fileData,
  onRemoveFile,
  toType,
}) => {
  const { t } = useTranslation();

  const [currentShowPageCors, setCurrentShowPageCors] = useState<number>(5); //当前一行多少个展示
  const [showPdfImagesType, setShowPdfImagesType] = useState<
    'pdfPageImgs' | 'padPageHaveImgs'
  >('pdfPageImgs'); //显示pdf页面还是页面的图片
  const [selectDownloadSizeIndex, setSelectDownloadSizeIndex] =
    useState<number>(0); //用户选择的下载尺寸大小

  const {
    convertedPdfImages,
    setConvertedPdfImages,
    pdfPageHaveImgs,
    setPdfPageHaveImgs,
    pdfIsLoad,
    onReadPdfToImages,
    pdfTotalPages,
    currentPdfActionNum,
    onCancelPdfActive,
    pdfViewDefaultSize,
  } = usePdfToImageConversion(toType);
  const {
    downloaderIsLoad,
    downloaderTotalPages,
    currentDownloaderActionNum,
    onCancelDownloader,
    onDownloadPdfImagesZip,
  } = usePdfImagesDownloader();
  const { pdfIsSelectAll, onSwitchSelect, onSwitchAllSelect } =
    useSwitchIdSelect<IPdfPageImageInfo>({
      setList:
        showPdfImagesType === 'pdfPageImgs'
          ? setConvertedPdfImages
          : setPdfPageHaveImgs,
    });
  useEffect(() => {
    if (fileData) {
      onReadPdfToImages(fileData);
    }
  }, [fileData]);

  useEffect(() => {
    // 初始化期间，将一行中显示的最大页数限制为6，最小为2，为1会太大
    const maxPagesPerRow = 6;
    if (pdfTotalPages < maxPagesPerRow) {
      setCurrentShowPageCors(Math.max(pdfTotalPages, 2));
    } else {
      setCurrentShowPageCors(maxPagesPerRow);
    }
  }, [pdfTotalPages]);
  const changeCurrentShowPageCors = useCallback(
    (type: 'enlarge' | 'narrow') => {
      setCurrentShowPageCors((prev) => {
        if (type === 'narrow') {
          return Math.min(prev + 1, 10);
        } else {
          return Math.max(prev - 1, 1);
        }
      });
    },
    [],
  );
  const maxSizeScaleNum = 4;
  const imgSizeList = useMemo(() => {
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
      prev === 'pdfPageImgs' ? 'padPageHaveImgs' : 'pdfPageImgs',
    );
  };
  const showImages =
    showPdfImagesType === 'pdfPageImgs' ? convertedPdfImages : pdfPageHaveImgs;
  const downloadZip = () => {
    if (showPdfImagesType === 'pdfPageImgs') {
      //maxSizeScaleNum * 4  默认尺寸是1.6倍
      onDownloadPdfImagesZip(
        showImages,
        toType,
        fileData,
        selectDownloadSizeIndex === 0 ? undefined : 1.6 * maxSizeScaleNum,
      );
    } else {
      onDownloadPdfImagesZip(showImages, toType);
    }
  };
  const onCancel = () => {
    onCancelPdfActive && onCancelPdfActive();
    onCancelDownloader();
  };
  const isLoad = pdfIsLoad || downloaderIsLoad;
  const totalPages = !downloaderIsLoad ? pdfTotalPages : downloaderTotalPages;

  const currentActionNum = !downloaderIsLoad
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
            disabled={pdfIsLoad}
            variant='outlined'
            onClick={onSwitchAllSelect}
          >
            {pdfIsSelectAll
              ? t(
                  'tool_box_functionality_pdf_to_img:components_to_img_detail_deselect_all',
                )
              : t(
                  'tool_box_functionality_pdf_to_img:components_to_img_detail_select_all',
                )}
          </Button>
        </Grid>
        <Grid item xs={6} md={2}>
          <Button
            sx={{ width: '100%' }}
            size='small'
            disabled={isLoad}
            variant='outlined'
            onClick={onSwitchPdfImagesType}
          >
            {showPdfImagesType !== 'pdfPageImgs'
              ? t(
                  'tool_box_functionality_pdf_to_img:components_to_img_detail_view_pages',
                )
              : t(
                  'tool_box_functionality_pdf_to_img:components_to_img_detail_view_images',
                )}
          </Button>
        </Grid>
        <Grid item xs={6} md={2}>
          <Button
            sx={{ width: '100%' }}
            size='small'
            disabled={isLoad}
            variant='contained'
            onClick={() => downloadZip()}
          >
            {t(
              'tool_box_functionality_pdf_to_img:components_to_img_detail_download_images',
            )}
          </Button>
        </Grid>
        <Grid item xs={6} md={2}>
          <Button
            sx={{ width: '100%' }}
            size='small'
            disabled={isLoad}
            variant='outlined'
            color='error'
            onClick={() => onRemoveFile && onRemoveFile()}
          >
            {t(
              'tool_box_functionality_pdf_to_img:components_to_img_detail_remove_pdf',
            )}
          </Button>
        </Grid>
        {!isLoad && (
          <Grid item xs={6} md={2} display='flex'>
            <Box onClick={() => changeCurrentShowPageCors('enlarge')}>
              <FunctionalityIcon
                name='ControlPointTwoTone'
                sx={{ color: 'primary.main', cursor: 'pointer', fontSize: 30 }}
              />
            </Box>
            <Box onClick={() => changeCurrentShowPageCors('narrow')}>
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
        {isLoad && (
          <Grid item xs={12} md={2}>
            <Button
              sx={{ width: '100%' }}
              size='small'
              variant='outlined'
              color='error'
              onClick={() => onCancel()}
            >
              {t(
                'tool_box_functionality_pdf_to_img:components_to_img_detail_cancel',
              )}
            </Button>
          </Grid>
        )}
      </Grid>
      <Box
        sx={{
          py: 5,
          position: 'relative',
          widows: '100%',
        }}
      >
        <FunctionalityImageList
          onClickImg={(image) => onSwitchSelect(image.id)}
          imageList={showImages}
          isImgSelect={true}
          pageCols={currentShowPageCors}
        />
        {isLoad && totalPages > 0 && (
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
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress />
            {`${currentActionNum}/${totalPages}`}
          </Box>
        )}
      </Box>
      {showPdfImagesType === 'pdfPageImgs' && (
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
          gap={2}
        >
          {imgSizeList.map((imgSize, index) => (
            <Box
              key={index}
              onClick={() => !isLoad && setSelectDownloadSizeIndex(index)}
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
                      'tool_box_functionality_pdf_to_img:components_to_img_detail_normal_quality',
                    )
                  : t(
                      'tool_box_functionality_pdf_to_img:components_to_img_detail_high_quality',
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
                {imgSize.width} * {imgSize.height}
              </Typography>
            </Box>
          ))}
        </Grid>
      )}
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
            disabled={isLoad}
            size='small'
            variant='contained'
            onClick={() => downloadZip()}
          >
            {t(
              'tool_box_functionality_pdf_to_img:components_to_img_detail_download_images',
            )}
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FunctionalityPdfToImgDetail;
