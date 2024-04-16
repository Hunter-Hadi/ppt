import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { Box, Button, Stack } from '@mui/material';
import { cloneDeep } from 'lodash-es';
import { FC, useState } from 'react';
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
  const [signaturePositions, setSignaturePositions] = useState<ISignData[]>([]);
  function handleDragEnd(event: DragEndEvent) {
    console.log('simply handleDragEnd', event);
    if (event.over && event.over.id) {
      setIsDropped(true);
      const { delta, over, active } = event;
      setSignaturePositions((newList) => {
        const index = newList.findIndex(
          (item: ISignData) => item.id === active.id,
        );
        const newSignaturePosition = {
          x: over.rect.width + delta.x,
          y: delta.y,
          width: over.rect.width,
          height: over.rect.height,
          pdfIndex: over.data.current as any,
          ...(active.data.current as any),
          ...(over.data.current as any),
        };
        if (index !== -1) {
          newList[index] = newSignaturePosition;
        } else {
          newList.push(newSignaturePosition);
        }
        return cloneDeep(newList);
      });
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
          <FunctionalitySignPdfOperationView />
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
