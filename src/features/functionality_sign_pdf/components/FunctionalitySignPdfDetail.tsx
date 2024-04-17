import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Box, Button, Stack } from '@mui/material';
import { cloneDeep } from 'lodash-es';
import { FC, useRef, useState } from 'react';
import { pdfjs } from 'react-pdf';

import { pdfAddView } from '../utils/pdfAddView';
import FunctionalitySignPdfOperationView from './FunctionalitySignPdfOperationView';
import FunctionalitySignPdfShowPdfView from './FunctionalitySignPdfShowPdfView';
pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();
interface IFunctionalitySignPdfDetailProps {
  file: File;
}
export type ISignData = {
  pdfIndex: number;
  x: number;
  y: number;
  width: number;
  height: number;
  id: string;
};
export const FunctionalitySignPdfDetail: FC<
  IFunctionalitySignPdfDetailProps
> = ({ file }) => {
  const [, setIsDropped] = useState(false);
  const dndDragRef = useRef<HTMLElement | null>(null);
  const [signaturePositions, setSignaturePositions] = useState<ISignData[]>([]);
  function handleDragEnd(event: DragEndEvent) {
    if (event.over && event.over.id) {
      setIsDropped(true);
      const { delta, over, active } = event;
      const parentRect = dndDragRef.current?.getBoundingClientRect();
      var childRect = document
        .getElementById((over.id as string) || '')
        ?.getBoundingClientRect();
      let distanceParentTop = 0;
      if (childRect && parentRect) {
        distanceParentTop = childRect?.top - parentRect?.top;
      }

      if (active.data.current?.isPdfDrag) {
        const index = signaturePositions.findIndex(
          (item: ISignData) => item.id === active.id,
        );
        const newSignaturePosition = {
          x: signaturePositions[index].x + delta.x,
          y: signaturePositions[index].y + delta.y,
          width: over.rect.width,
          height: over.rect.height,
          ...(over.data.current as { pdfIndex: number }),
          id: new Date().valueOf().toString(),
        };
        if (index !== -1) {
          signaturePositions[index] = newSignaturePosition;
        }
      } else {
        const newSignaturePosition = {
          x: over.rect.width + delta.x,
          y: delta.y - distanceParentTop,
          width: over.rect.width,
          height: over.rect.height,
          ...(over.data.current as { pdfIndex: number }),
          id: new Date().valueOf().toString(),
        };
        signaturePositions.push(newSignaturePosition);
      }

      setSignaturePositions(cloneDeep(signaturePositions));
    }
  }
  const onPdfAddView = () => {
    pdfAddView(file, signaturePositions);
  };
  return (
    <Stack
      direction='row'
      sx={{
        width: '100%',
      }}
    >
      <DndContext onDragEnd={handleDragEnd}>
        <Box
          ref={dndDragRef}
          sx={{
            flex: 1,
            backgroundColor: '#fafafa',
          }}
        >
          <FunctionalitySignPdfShowPdfView
            file={file}
            signaturePositions={signaturePositions}
          />
        </Box>
        <Box
          sx={{
            minWidth: 200,
          }}
        >
          <FunctionalitySignPdfOperationView
            id={'draggable-one'}
            isPdfDrag={false}
          />
          <Button
            variant='contained'
            onClick={onPdfAddView}
            sx={{ marginTop: 2 }}
            size='large'
          >
            保存
          </Button>
        </Box>
      </DndContext>
    </Stack>
  );
};
export default FunctionalitySignPdfDetail;
