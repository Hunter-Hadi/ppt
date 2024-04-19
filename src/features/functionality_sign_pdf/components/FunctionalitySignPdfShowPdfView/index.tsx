import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { useDroppable } from '@dnd-kit/core';
import { Box } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import { ISignData } from '../FunctionalitySignPdfDetail';
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
  const [numPages, setNumPages] = useState<number>();
  // 用来存储宽度的state
  useEffect(() => {
    console.log('simply signaturePositions', signaturePositions);
  }, [signaturePositions]);
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Box
        sx={{
          m: 4,
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
    </Box>
  );
};
export default FunctionalitySignPdfShowPdfView;
