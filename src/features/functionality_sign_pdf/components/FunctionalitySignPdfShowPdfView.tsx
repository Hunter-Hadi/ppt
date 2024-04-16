import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { useDroppable } from '@dnd-kit/core';
import { Box } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import { ISignData } from './FunctionalitySignPdfDetail';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();

const FunctionalitySignPdfDroppable: FC<{
  children: React.ReactNode;
  index: number;
}> = ({ children, index }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable-' + index,
    data: { pdfIndex: index },
  });
  return (
    <Box
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
  return (
    <Box>
      <Document
        file={file}
        externalLinkTarget='_blank'
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <FunctionalitySignPdfDroppable key={index} index={index}>
            <Page
              key={`page_${index + 1}`}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              renderForms={true}
              pageNumber={index + 1}
              width={930}
            />
            {signaturePositions.map((signaturePosition) => (
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
                新签名
              </Box>
            ))}
          </FunctionalitySignPdfDroppable>
        ))}
      </Document>
    </Box>
  );
};
export default FunctionalitySignPdfShowPdfView;
