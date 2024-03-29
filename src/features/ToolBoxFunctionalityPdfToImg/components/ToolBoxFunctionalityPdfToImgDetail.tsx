import {
  Box,
  Button,
  CircularProgress,
  Grid,
  ImageList,
  ImageListItem,
} from '@mui/material';
import { FC, useEffect, useMemo } from 'react';
import { pdfjs } from 'react-pdf';

import usePdfToImgsTool from '@/features/ToolBoxFunctionalityPdfToImg/hooks/usePdfToImgsTool';

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
  const {
    pdfImageList,
    pdfIsLoad,
    readPdfToImages,
    downloadPdfImagesZip,
    pdfNumPages,
    currentPdfActionNum,
  } = usePdfToImgsTool();

  useEffect(() => {
    if (fileList.length > 0) {
      readPdfToImages(fileList[0]);
    }
  }, [fileList]);

  const getImageCols = useMemo(() => {
    if (pdfImageList.length <= 5) {
      return pdfImageList.length;
    } else {
      return 5;
    }
  }, [pdfImageList]);
  return (
    <Box>
      <Grid
        container
        direction='row'
        justifyContent='center'
        alignItems='center'
        spacing={2}
      >
        <Grid item xs={3}>
          <Button
            sx={{ width: '100%' }}
            disabled={pdfIsLoad}
            variant='contained'
            onClick={downloadPdfImagesZip}
          >
            下载
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            sx={{ width: '100%' }}
            disabled={pdfIsLoad}
            variant='outlined'
            onClick={() => onRemoveFile && onRemoveFile()}
          >
            删除
          </Button>
        </Grid>
      </Grid>
      <Box
        sx={{
          py: 5,
          position: 'relative',
        }}
      >
        <ImageList
          sx={{
            width: 1000,
            height: 500,
          }}
          cols={getImageCols}
          gap={1}
        >
          {pdfImageList.map((image) => (
            <ImageListItem key={image.id}>
              <img
                style={{
                  objectFit: 'contain',
                }}
                srcSet={image.imgString}
                src={image.imgString}
                loading='lazy'
              />
            </ImageListItem>
          ))}
        </ImageList>
        {pdfIsLoad && (
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
    </Box>
  );
};

export default ToolBoxFunctionalityPdfToImg;
