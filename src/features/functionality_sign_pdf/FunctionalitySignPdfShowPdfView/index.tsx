import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

import { useDroppable } from '@dnd-kit/core';
import { Box } from '@mui/material';
import { fabric } from 'fabric';
import { FC, useEffect, useMemo, useRef, useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

import { ISignData } from '../components/FunctionalitySignPdfDetail';
import { FunctionalitySignPdfShowPdfCanvas } from './components/FunctionalitySignPdfShowPdfCanvas';
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
  const canvasRef = useRef<any>(null);
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
  const canvas = useMemo(() => {
    if (canvasRef.current) {
      console.log('simply canvas');

      return new fabric.Canvas(canvasRef.current, {
        backgroundColor: 'transparent',
        width: 768,
        height: 576,
        fireRightClick: true, //右键点击事件生效
        stopContextMenu: true, //右键点击禁用默认自带的目录
        fireMiddleClick: true, //中间建点击事件生效
        skipTargetFind: true, // 画板元素不能被选中, 一旦填了true，canvas on mouse:down  的参数里的target 将为nul
      });
    }
  }, [canvasRef.current]);

  return (
    <Box>
      <Document
        file={file}
        externalLinkTarget='_blank'
        onLoadSuccess={onDocumentLoadSuccess}
      >
        {Array.from(new Array(numPages), (el, index) => (
          <FunctionalitySignPdfDroppable key={index} index={index}>
            {/* {signaturePositions
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
                  {signaturePosition.data.type === 'base64' && (
                    <img src={signaturePosition.data.value}></img>
                  )}
                </Box>
              ))} */}

            <Box sx={{ position: 'relative' }}>
              <Page
                key={`page_${index + 1}`}
                renderTextLayer={true}
                renderAnnotationLayer={true}
                renderForms={true}
                pageNumber={index + 1}
                width={930}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  bottom: 0,
                  right: 0,
                  zIndex: 9,
                  // '.sample-canvas,.canvas-container,.lower-canvas,.upper-canvas ':
                  //   {
                  //     width: '100%!important',
                  //     height: '100%!important',
                  //   },
                }}
              >
                <FunctionalitySignPdfShowPdfCanvas
                  signaturePositions={signaturePositions}
                />
              </Box>
            </Box>
          </FunctionalitySignPdfDroppable>
        ))}
      </Document>
    </Box>
  );
};
export default FunctionalitySignPdfShowPdfView;
