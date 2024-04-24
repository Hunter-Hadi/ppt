import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { useDroppable } from '@dnd-kit/core';
import { Box, Stack } from '@mui/material';
import { FC, useEffect, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import { useFunctionalitySignElementWidth } from '../../hooks/use';
import { ISignData } from '../FunctionalitySignPdfDetail';
import FunctionalitySignPdfRenderCanvas from './components/FunctionalitySignPdfRenderCanvas';
import FunctionalitySignPdfRenderTools from './components/FunctionalitySignPdfRenderTools';
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
  const [numPages, setNumPages] = useState<number>();
  const defaultWidth = useRef(700);
  const [fixedWidthSize, setFixedWidthSize] = useState<number>(
    defaultWidth.current,
  );

  const [isSelfAdaption, setIsSelfAdaption] = useState<boolean>(false);
  const { ref, width } = useFunctionalitySignElementWidth();
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
      console.log('simply viewport', viewport);
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
    console.log('simply type', type);
    if (isSelfAdaption) {
      setFixedWidthSize(width);
      setIsSelfAdaption(false);
    }
    if (type === 'reduce') {
      setFixedWidthSize((width) => width - 50);
    } else {
      setFixedWidthSize((width) => width + 50);
    }
  };
  return (
    <Stack
      ref={ref}
      sx={{
        width: '100%',
        position: 'relative',
        height: '100%',
      }}
      alignItems='center'
    >
      <Box
        sx={{
          p: isSelfAdaption ? '0' : 4,
          width: isSelfAdaption ? width : fixedWidthSize,
        }}
      >
        <Document
          file={file}
          externalLinkTarget='_blank'
          onLoadSuccess={onDocumentLoadSuccess}
        >
          {Array.from(new Array(numPages), (el, index) => (
            <FunctionalitySignPdfDroppable key={index} index={index}>
              <Box
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
          ))}
        </Document>
      </Box>
      <Stack
        direction='row'
        justifyContent='center'
        sx={{
          position: 'absolute',
          margin: '0 auto',
          padding: 1,
          bottom: 0,
          left: 0,
          right: 0,
          p: 1,
          zIndex: 99,
        }}
      >
        <FunctionalitySignPdfRenderTools
          isSelfAdaption={isSelfAdaption}
          onSelfAdaption={onSelfAdaption}
          onReduceSize={() => onChangeSize('reduce')}
          onAddSize={() => onChangeSize('add')}
        />
      </Stack>
    </Stack>
  );
};
export default FunctionalitySignPdfShowPdfView;
