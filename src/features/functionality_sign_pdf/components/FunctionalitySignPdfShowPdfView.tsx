import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { useDroppable } from '@dnd-kit/core';
import { Box } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import { ISignData } from './FunctionalitySignPdfDetail';
import FunctionalitySignPdfOperationView from './FunctionalitySignPdfOperationView';
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
  const [numPages, setNumPages] = useState<number>();

  useEffect(() => {
    console.log('simply signaturePositions', signaturePositions);
  }, [signaturePositions]);
  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }
  // const handleDragEnd = (event: DragEndEvent) => {
  //   console.log('simply handleDragEnd222');
  //   console.log('simply handleDragEnd', event);
  //   if (event.over && event.over.id) {
  //     const { delta, over, active } = event;
  //   }
  // };
  return (
    <Box>
      <Document
        file={file}
        externalLinkTarget='_blank'
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <FunctionalitySignPdfDroppable key={index} index={index}>
            {signaturePositions
              .filter(
                (signaturePosition) => signaturePosition.pdfIndex === index,
              )
              .map((signaturePosition) => (
                <Box
                  key={signaturePosition.id}
                  className='signature-box'
                  sx={{
                    position: 'absolute',
                    left: signaturePosition.x,
                    top: signaturePosition.y,
                    zIndex: 6,
                  }}
                >
                  <FunctionalitySignPdfOperationView
                    id={signaturePosition.id}
                    isPdfDrag={true}
                  />
                </Box>
              ))}

            <Page
              key={`page_${index + 1}`}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              renderForms={true}
              pageNumber={index + 1}
              width={930}
            />
          </FunctionalitySignPdfDroppable>
        ))}
      </Document>
    </Box>
  );
};
export default FunctionalitySignPdfShowPdfView;
