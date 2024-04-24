import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { useDroppable } from '@dnd-kit/core';
import { Box, IconButton, Stack, TextField } from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import { useFunctionalitySignElementWidth } from '../../hooks/useFunctionalitySignElementWidth';
import { useFunctionalitySignScrollPagination } from '../../hooks/useFunctionalitySignScrollPagination';
import { ISignData } from '../FunctionalitySignPdfDetail';
import FunctionalitySignPdfIcon from '../FunctionalitySignPdfIcon';
import FunctionalitySignPdfRenderCanvas from './components/FunctionalitySignPdfRenderCanvas';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const FunctionalitySignPdfDroppable: FC<{
  children: React.ReactNode;
  index: number;
}> = ({ children, index }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `droppable-${index}`,
    data: { pdfIndex: index },
  });

  return (
    <Box
      id={`droppable-${index}`}
      ref={setNodeRef}
      sx={{
        color: isOver ? 'green' : undefined,
        position: 'relative',
      }}
    >
      {children}
    </Box>
  );
};

interface IFunctionalitySignPdfShowPdfViewProps {
  file: File;
  signaturePositions: ISignData[];
}
export const FunctionalitySignPdfShowPdfView: FC<
  IFunctionalitySignPdfShowPdfViewProps
> = ({ file, signaturePositions }) => {
  //PDF的页数
  const [numPages, setNumPages] = useState<number>(0);
  const defaultWidth = useRef(700);
  const [fixedWidthSize, setFixedWidthSize] = useState<number>(
    defaultWidth.current,
  );

  const [isSelfAdaption, setIsSelfAdaption] = useState<boolean>(false);
  const { ref, width } = useFunctionalitySignElementWidth();
  const {
    setPageRef,
    currentPage,
    scrollToPage,
    goToNextPage,
    goToPreviousPage,
  } = useFunctionalitySignScrollPagination(numPages || 0, ref);
  const [pagesInfoList, setPagesInfoList] = useState<
    {
      width: number;
      height: number;
    }[]
  >([]);

  // 用来存储宽度的state
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }
  useEffect(() => {
    if (file) {
      getFilePdfInfoList();
    }
  }, [file]);
  const getFilePdfInfoList = async () => {
    const buff = await file.arrayBuffer(); // Uint8Array
    const pdfDocument = await pdfjs.getDocument(buff).promise;
    for (let pageNum = 1; pageNum <= pdfDocument._pdfInfo.numPages; pageNum++) {
      const page = await pdfDocument.getPage(pageNum);
      const viewport = page.getViewport({ scale: 2 });
      setPagesInfoList((list) => [
        ...list,
        { width: viewport.width, height: viewport.height },
      ]);
    }
  };
  const onSelfAdaption = () => {
    if (!isSelfAdaption) {
      setFixedWidthSize(defaultWidth.current);
    }
    setIsSelfAdaption(!isSelfAdaption);
  };
  const onChangeSize = (type: 'reduce' | 'add') => {
    if (isSelfAdaption) {
      setFixedWidthSize(width);
      setIsSelfAdaption(false);
    }
    if (type === 'reduce') {
      setFixedWidthSize((width) => Math.max(width - 50, 200));
    } else {
      setFixedWidthSize((width) => width + 50);
    }
  };
  const onTextInputKeyDown = (event) => {
    console.log('simply event', event);
    if (event.key === 'Enter' || event.code === 'Enter') {
      const value = event.target.value;
      if (value) {
        const num = Number(value);
        if (num > 0 && num <= (numPages || 0)) {
          scrollToPage(num - 1);
        }
      }
    }
  };
  return (
    <Stack
      sx={{
        width: '100%',
        position: 'relative',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      <Stack
        ref={ref}
        id='functionality-sign-pdf-rolling-view'
        sx={{
          overflow: 'auto',
          width: '100%',
        }}
      >
        <Box
          sx={{
            px: isSelfAdaption ? '0' : 4,
            py: isSelfAdaption ? '0' : 6,

            width: isSelfAdaption ? width : fixedWidthSize,
            margin: '0 auto',
          }}
        >
          <Document
            file={file}
            externalLinkTarget='_blank'
            onLoadSuccess={onDocumentLoadSuccess}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <div key={index} ref={(el) => setPageRef(el, index)}>
                <FunctionalitySignPdfDroppable index={index}>
                  <Box
                    ref={(el) => setPageRef(el, index)}
                    sx={{
                      position: 'relative',
                      overflow: 'hidden',
                      marginBottom: 3,
                      '.react-pdf__Page__canvas': {
                        width: `100%!important`,
                        height: 'auto!important',
                      },
                    }}
                  >
                    <Page
                      key={`page_${index + 1}`}
                      renderTextLayer={true}
                      pageNumber={index + 1}
                      width={1080}
                    />
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                        zIndex: 9,
                      }}
                    >
                      <FunctionalitySignPdfRenderCanvas
                        canvasIndex={index + 1}
                        sizeInfo={pagesInfoList[index]}
                        renderList={signaturePositions.filter(
                          (signaturePosition) =>
                            signaturePosition.pdfIndex === index,
                        )}
                      />
                    </Box>
                  </Box>
                </FunctionalitySignPdfDroppable>
              </div>
            ))}
          </Document>
        </Box>
      </Stack>

      <Stack
        direction='row'
        justifyContent='center'
        sx={{
          position: 'absolute',
          margin: '0 auto',
          padding: 1,
          bottom: 10,
          left: 0,
          right: 0,
          p: 1,
          zIndex: 99,
        }}
      >
        <Stack
          direction='row'
          alignItems='center'
          gap={1}
          sx={{
            bgcolor: '#ffffff',
            p: 1,
            borderRadius: 2,
          }}
        >
          <IconButton
            size='small'
            onClick={goToPreviousPage}
            disabled={currentPage === 0}
          >
            <FunctionalitySignPdfIcon name='ArrowBackIos' />
          </IconButton>
          <TextField
            onKeyDown={onTextInputKeyDown}
            sx={{ width: 50, textAlign: 'center' }}
            hiddenLabel
            key={currentPage}
            defaultValue={currentPage + 1}
            variant='filled'
            size='small'
          />
          <IconButton
            disabled={currentPage === (numPages || 0) - 1}
            size='small'
            onClick={goToNextPage}
          >
            <FunctionalitySignPdfIcon name='ArrowForwardIos' />
          </IconButton>
          <Stack
            sx={{
              borderRight: '1px solid #e8e8e8',
              height: '100%',
              pr: 2,
            }}
            direction='row'
            alignItems='center'
          >
            of {numPages}
          </Stack>

          <IconButton size='small' onClick={onSelfAdaption}>
            <FunctionalitySignPdfIcon
              name={isSelfAdaption ? 'ZoomInMapOutlined' : 'ZoomOutMapOutlined'}
            />
          </IconButton>

          <IconButton
            size='small'
            disabled={fixedWidthSize === 200}
            onClick={() => onChangeSize('reduce')}
          >
            <FunctionalitySignPdfIcon name='RemoveCircleOutlineOutlined' />
          </IconButton>
          <IconButton size='small' onClick={() => onChangeSize('add')}>
            <FunctionalitySignPdfIcon name='AddCircleOutlineOutlined' />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
};
export default FunctionalitySignPdfShowPdfView;
