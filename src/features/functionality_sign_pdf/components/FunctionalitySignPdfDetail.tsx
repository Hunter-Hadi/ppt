import {
  DndContext,
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { Box, Button, Stack } from '@mui/material';
import { cloneDeep } from 'lodash-es';
import { FC, useRef, useState } from 'react';
import { pdfjs } from 'react-pdf';

import FunctionalitySignPdfShowPdfView from '../FunctionalitySignPdfShowPdfView';
import { pdfAddView } from '../utils/pdfAddView';
import FunctionalitySignPdfOperationView from './FunctionalitySignPdfOperationView';
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
  data: { type: string; value: string };
};
export const FunctionalitySignPdfDetail: FC<
  IFunctionalitySignPdfDetailProps
> = ({ file }) => {
  const [, setIsDropped] = useState(false);
  const dndDragRef = useRef<HTMLElement | null>(null);
  const [signaturePositions, setSignaturePositions] = useState<ISignData[]>([]);
  function handleDragEnd(event: DragEndEvent) {
    console.log('event', event);
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
      const signaturePositionData = {
        width: over.rect.width,
        height: over.rect.height,
        ...(over.data.current as {
          type: string;
          value: string;
          pdfIndex: number;
        }),
        id: new Date().valueOf().toString(),
        data: active.data.current as {
          type: string;
          value: string;
        },
      };
      if (active.data.current?.isPdfDrag) {
        const index = signaturePositions.findIndex(
          (item: ISignData) => item.id === active.id,
        );
        const newSignaturePosition = {
          x: signaturePositions[index].x + delta.x,
          y: signaturePositions[index].y + delta.y,
          ...signaturePositionData,
        };
        if (index !== -1) {
          signaturePositions[index] = newSignaturePosition;
        }
      } else {
        const newSignaturePosition = {
          x: over.rect.width + delta.x,
          y: delta.y - distanceParentTop,
          ...signaturePositionData,
        };
        signaturePositions.push(newSignaturePosition);
      }

      setSignaturePositions(cloneDeep(signaturePositions));
    }
  }
  const onPdfAddView = () => {
    pdfAddView(file, signaturePositions);
  };
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2, // 按住不动移动2px 时 才进行拖拽, 这样就可以触发点击事件
      },
    }),
  );
  return (
    <Stack
      direction='row'
      sx={{
        width: '100%',
      }}
    >
      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
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
