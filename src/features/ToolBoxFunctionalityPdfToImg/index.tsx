import {
  Box,
  Button,
  CircularProgress,
  Grid,
  ImageList,
  ImageListItem,
} from '@mui/material';
import FileSaver from 'file-saver';
import JSZip from 'jszip';
import { debounce } from 'lodash-es';
import { FC, useEffect, useMemo, useState } from 'react';
import { pdfjs } from 'react-pdf';
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
  const [imageStrList, setImageStrList] = useState<string[]>([]);
  const [isLoad, setIsLoad] = useState<boolean>(false);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentActionNum, setCurrentActionNum] = useState<number>(0);

  const readPdfToImage = debounce(async (file: File) => {
    if (!file) {
      return;
    }
    setIsLoad(true);
    const buff = await file.arrayBuffer(); // Uint8Array
    const pdfDoc = await pdfjs.getDocument(buff).promise;
    console.log('simply pdfDoc', pdfDoc);
    setNumPages(pdfDoc._pdfInfo.numPages);
    for (let pageNum = 1; pageNum <= pdfDoc._pdfInfo.numPages; pageNum++) {
      console.log('simply pageNum', pageNum, pdfDoc._pdfInfo.numPages);
      setCurrentActionNum(pageNum);
      const scale = 1.0;
      const page = await pdfDoc.getPage(pageNum);
      const viewport = page.getViewport({ scale });
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      const renderContext = {
        canvasContext: context!,
        viewport: viewport,
      };
      await page.render(renderContext).promise;
      const imageDataUrl = canvas.toDataURL('image/png');
      console.log('simply imageDataUrl', imageDataUrl);
      setImageStrList((prev) => [...prev, imageDataUrl]);
      if (pageNum === pdfDoc._pdfInfo.numPages - 1) {
        setIsLoad(false);
      }
      //balabala
    }
  }, 200);
  useEffect(() => {
    if (fileList.length > 0) {
      readPdfToImage(fileList[0]);
    }
    return () => {
      // 在这里可以执行清理操作，比如取消订阅、清除定时器等
    };
  }, [fileList]);
  const dataURLtoBlob = async (base64Str: string) => {
    let arr = base64Str.split(','),
      mime = arr?.[0].match(/:(.*?);/)?.[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {
      type: mime,
    });
  };
  const downLoadImageZip = async () => {
    const zip = new JSZip();
    var images = zip.folder('images');
    console.log('simply imageStrList', imageStrList);
    for (let i = 0; i < imageStrList.length; i++) {
      images?.file('image-' + i + '.jpg', dataURLtoBlob(imageStrList[i]), {
        base64: true,
      });
    }
    zip.generateAsync({ type: 'blob' }).then((content) => {
      FileSaver.saveAs(content, 'image.zip');
    });
  };

  const getImageCols = useMemo(() => {
    if (imageStrList.length <= 5) {
      return imageStrList.length;
    } else {
      return 5;
    }
  }, [imageStrList]);
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
            disabled={isLoad}
            variant='contained'
            onClick={downLoadImageZip}
          >
            下载
          </Button>
        </Grid>
        <Grid item xs={3}>
          <Button
            sx={{ width: '100%' }}
            disabled={isLoad}
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
          {imageStrList.map((item, index) => (
            <ImageListItem key={index}>
              <img srcSet={item} src={item} loading='lazy' />
            </ImageListItem>
          ))}
        </ImageList>
        {isLoad && (
          <Box
            sx={{
              position: 'absolute',
              top: 15,
              left: 15,
              right: 15,
              bottom: 15,
              bgcolor: 'rgba(255,255,255,0.3)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <CircularProgress />
            {`${currentActionNum}/${numPages}`}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ToolBoxFunctionalityPdfToImg;
