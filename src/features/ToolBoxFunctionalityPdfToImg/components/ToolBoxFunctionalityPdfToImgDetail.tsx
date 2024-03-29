import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Grid,
  ImageList,
  ImageListItem,
  Typography,
} from '@mui/material';
import { FC, useCallback, useEffect, useMemo, useState } from 'react';
import { pdfjs } from 'react-pdf';

import usePdfToImgsTool from '@/features/ToolBoxFunctionalityPdfToImg/hooks/usePdfToImgsTool';

import ToolBoxFunctionalityIcon from './ToolBoxFunctionalityIcon';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();
interface IToolBoxFunctionalityPdfToImgProps {
  fileList: FileList;
  toType: 'jpg' | 'png';
  onRemoveFile?: () => void;
}
const ToolBoxFunctionalityPdfToImg: FC<IToolBoxFunctionalityPdfToImgProps> = ({
  fileList,
  onRemoveFile,
  toType,
}) => {
  const [currentShowPageCors, setCurrentShowPageCors] = useState<number>(5);
  const [selectSizeIndex, setSelectSizeIndex] = useState<number>(0);

  const {
    pdfImageList,
    pdfIsLoad,
    onReadPdfToImages,
    onDownloadPdfImagesZip,
    pdfNumPages,
    currentPdfActionNum,
    onCancelPdfToImgs,
    onSwitchSelect,
    pdfIsSelectAll,
    onSwitchAllSelect,
    defaultSize,
  } = usePdfToImgsTool(toType);

  useEffect(() => {
    if (fileList.length > 0) {
      onReadPdfToImages(fileList[0]);
    }
  }, [fileList]);

  useEffect(() => {
    // 初始化期间，将一行中显示的最大页数限制为6，最小为2，为1会太大
    const maxPagesPerRow = 6;
    if (pdfNumPages < maxPagesPerRow) {
      setCurrentShowPageCors(Math.max(pdfNumPages, 2));
    } else {
      setCurrentShowPageCors(maxPagesPerRow);
    }
  }, [pdfNumPages]);
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

  const imgSizeList = useMemo(() => {
    return [
      defaultSize,
      {
        width: defaultSize.width * 4,
        height: defaultSize.height * 4,
      },
    ];
  }, [defaultSize]);
  const downloadPdfImagesZip = () => {
    //1 * 1.6 * 4,是因为onReadPdfToImages默认的图片就是1.6倍
    onDownloadPdfImagesZip(
      selectSizeIndex === 0 ? undefined : 1 * 1.6 * 4,
      fileList[0],
    );
  };
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
            disabled={pdfIsLoad}
            variant='contained'
            onClick={onSwitchAllSelect}
          >
            {pdfIsSelectAll ? '取消选择全部' : '选择全部'}
          </Button>
        </Grid>
        <Grid item xs={6} md={2}>
          <Button
            sx={{ width: '100%' }}
            disabled={pdfIsLoad}
            variant='contained'
            onClick={() => downloadPdfImagesZip()}
          >
            下载
          </Button>
        </Grid>
        <Grid item xs={6} md={2}>
          <Button
            sx={{ width: '100%' }}
            disabled={pdfIsLoad}
            variant='outlined'
            color='error'
            onClick={() => onRemoveFile && onRemoveFile()}
          >
            删除 PDF
          </Button>
        </Grid>
        {!pdfIsLoad && (
          <Grid item xs={6} md={2} display='flex'>
            <Box onClick={() => changeCurrentShowPageCors('enlarge')}>
              <ToolBoxFunctionalityIcon
                name='ControlPointTwoTone'
                sx={{ color: 'primary.main', cursor: 'pointer', fontSize: 30 }}
              />
            </Box>
            <Box onClick={() => changeCurrentShowPageCors('narrow')}>
              <ToolBoxFunctionalityIcon
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
        {pdfIsLoad && (
          <Grid item xs={12} md={2}>
            <Button
              sx={{ width: '100%' }}
              variant='outlined'
              color='error'
              onClick={() => onCancelPdfToImgs && onCancelPdfToImgs()}
            >
              取消
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
        <ImageList
          sx={{
            width: '100%',
            maxHeight: 700,
            minHeight: 300,
            bgcolor: '#fafafa',
          }}
          cols={currentShowPageCors}
          gap={1}
        >
          {pdfImageList.map((image, index) => (
            <ImageListItem
              key={image.id}
              onClick={() => onSwitchSelect(image.id)}
              sx={{
                padding: 1,
                cursor: 'pointer',
                backgroundColor: 'rgba(255,255,255,0.3)',
                '&:hover': {
                  backgroundColor: '#f0eded',
                },
                position: 'relative',
                display: 'flex',
                direction: 'column',
                alignItems: 'center',
              }}
            >
              <img
                style={{
                  objectFit: 'contain',
                }}
                srcSet={image.imgString}
                src={image.imgString}
                loading='lazy'
                alt={`image-${index + 1}`}
              />
              <Typography
                variant='custom'
                sx={{
                  fontSize: 14,
                  marginTop: 1,
                }}
              >
                {index + 1}
              </Typography>
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  right: 0,
                }}
              >
                <Checkbox checked={image.isSelect} />
              </Box>
            </ImageListItem>
          ))}
        </ImageList>
        {pdfIsLoad && pdfNumPages > 0 && (
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
            {`${currentPdfActionNum}/${pdfNumPages}`}
          </Box>
        )}
      </Box>
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
            onClick={() => setSelectSizeIndex(index)}
            sx={{
              border: `1px solid ${
                selectSizeIndex === index ? '#000' : '#e5e7eb'
              }`,
              padding: 2,
              borderRadius: 2,
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
                color: selectSizeIndex === index ? '#000' : '#4b5563',
              }}
            >
              {index === 0 ? 'Normal Quality' : 'High Quality'}
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  xs: 12,
                  lg: 15,
                },
                color: selectSizeIndex === index ? '#000' : '#6b7280',
              }}
            >
              {imgSize.width} * {imgSize.height}
            </Typography>
          </Box>
        ))}
      </Grid>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
        sx={{ mt: 2 }}
      >
        <Grid xs={10} md={3}>
          <Button
            sx={{ width: '100%' }}
            disabled={pdfIsLoad}
            variant='contained'
            onClick={() => downloadPdfImagesZip()}
          >
            下载
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ToolBoxFunctionalityPdfToImg;
