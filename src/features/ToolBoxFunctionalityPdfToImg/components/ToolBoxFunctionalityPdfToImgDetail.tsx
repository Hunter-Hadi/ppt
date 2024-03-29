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
import { FC, useCallback, useEffect, useState } from 'react';
import { pdfjs } from 'react-pdf';

import usePdfToImgsTool from '@/features/ToolBoxFunctionalityPdfToImg/hooks/usePdfToImgsTool';

import ToolBoxFunctionalityIcon from './ToolBoxFunctionalityIcon';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();
interface IToolBoxFunctionalityPdfToImgProps {
  fileList: FileList;
  onRemoveFile?: () => void;
}
const ToolBoxFunctionalityPdfToImg: FC<IToolBoxFunctionalityPdfToImgProps> = ({
  fileList,
  onRemoveFile,
}) => {
  const [currentShowPageCors, setCurrentShowPageCors] = useState<number>(5);
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
  } = usePdfToImgsTool();

  useEffect(() => {
    if (fileList.length > 0) {
      onReadPdfToImages(fileList[0]);
    }
  }, [fileList]);

  useEffect(() => {
    // 限制初始化一行最大展示 6 页
    if (pdfNumPages < 6) {
      setCurrentShowPageCors(pdfNumPages);
    } else {
      setCurrentShowPageCors(6);
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
            onClick={onDownloadPdfImagesZip}
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
      >
        <Grid xs={10} md={3}>
          <Button
            sx={{ width: '100%' }}
            disabled={pdfIsLoad}
            variant='contained'
            onClick={onDownloadPdfImagesZip}
          >
            下载
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ToolBoxFunctionalityPdfToImg;
