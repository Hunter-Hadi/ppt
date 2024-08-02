import { Box, CircularProgress, Stack } from '@mui/material';
import React, { FC, useEffect, useRef, useState } from 'react';
// import { TextLayer } from 'pdfjs-dist';
// import {
//   pdfjs,
// } from 'react-pdf';


interface IChatPdfViewPageProps {
  index: number;
  style: any;
  data: (any | undefined)[];
  // data: ((IPdfInfoProps & { viewScale: number }) | undefined)[];
}

//pdf的单个页面显示视图
const ChatPdfViewPage: FC<IChatPdfViewPageProps> = ({ index, style, data }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const textBoxRef = useRef<HTMLDivElement>(null);
  const textTopBoxRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const isInitData = useRef(false);
  const [scaleFactor, setScaleFactor] = useState(1);
  const currentPdfInfo = data[index];
  useEffect(() => {
    renderPage();
  }, [currentPdfInfo, textBoxRef, canvasRef]);
  const renderPage = async () => {
    try {
      if (!currentPdfInfo || isInitData.current) return;
      const { page, viewport, textContent } = currentPdfInfo;
      const canvas = canvasRef.current;
      if (!page || !viewport || !canvas || !textContent || !textBoxRef.current)
        return;
      if (!canvas) return;
      isInitData.current = true;
      canvas.height = viewport.height;
      canvas.width = viewport.width;
      canvas.style.width = '100%';
      canvas.style.objectFit = 'contain';
      page
        .render({
          canvasContext: canvas.getContext('2d')!,
          viewport,
        })
        .promise.then(() => {
          // 渲染完成后更新状态
          setIsLoading(false);
        });
      // const textLayer = new pdfjs.TextLayer({
      //   textContentSource: textContent,
      //   viewport: viewport,
      //   container: textBoxRef.current,
      // });
      // await textLayer.render();
    } catch (e) {
      console.log('pdfchat renderPage error:', e);
    }
  };
  useEffect(() => {
    if (textTopBoxRef.current && currentPdfInfo?.width) {
      const viewScale =
        textTopBoxRef.current?.clientWidth /
        (currentPdfInfo.width * currentPdfInfo.viewScale); //计算缩放比例
      setScaleFactor(viewScale * currentPdfInfo.viewScale);
    }
  }, [textTopBoxRef.current?.clientWidth, currentPdfInfo]);
  return (
    <Stack
      style={style}
      className={`pdf-page-number-${currentPdfInfo?.pdfIndex}`}
      alignItems='center'
      justifyContent='center'
    >
      {currentPdfInfo && (
        <Stack
          alignItems={currentPdfInfo.viewScale > 1 ? 'flex-start' : 'center'}
          sx={{
            overflow: currentPdfInfo.viewScale > 1 ? 'visible' : 'hidden',
            visibility: !isLoading ? 'visible' : 'hidden',
          }}
        >
          <Box
            sx={{
              position: 'relative',
              height: '100%',
              width: `${100 * currentPdfInfo.viewScale}%`,
            }}
          >
            <Box
              sx={{
                '&::after': {
                  content: '" "',
                  position: 'absolute',
                  bottom: '1px',
                  left: '1px',
                  right: '1px',
                  top: '1px',
                  boxShadow: '2px 2px 8px 0 rgba(0,0,0,.2)',
                },
              }}
            >
              <canvas
                ref={canvasRef}
                style={{
                  width: '100%',
                  objectFit: 'contain',
                }}
              ></canvas>
            </Box>
            <Box
              ref={textTopBoxRef}
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
              }}
            >
              <Box
                className='textLayer'
                sx={{
                  '--scale-factor': scaleFactor,
                }}
                ref={textBoxRef}
              ></Box>
            </Box>
          </Box>
        </Stack>
      )}
      {isLoading && (
        <Stack
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        >
          <CircularProgress size={20} sx={{ m: 'auto auto' }} />
        </Stack>
      )}
    </Stack>
  );
};
export default ChatPdfViewPage;
