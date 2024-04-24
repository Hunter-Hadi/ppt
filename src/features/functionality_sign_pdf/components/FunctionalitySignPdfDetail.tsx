import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { LoadingButton } from '@mui/lab';
import { Box, Stack, Typography } from '@mui/material';
import { cloneDeep } from 'lodash-es';
import { useTranslation } from 'next-i18next';
import { FC, useMemo, useRef, useState } from 'react';
import { pdfjs } from 'react-pdf';
import { v4 as uuidV4 } from 'uuid';

import { pdfAddViewSave } from '../utils/pdfAddViewSave';
import FunctionalitySignPdfOperationView from './FunctionalitySignPdfOperationView/FunctionalitySignPdfMain';
import FunctionalitySignPdfShowPdfView from './FunctionalitySignPdfShowPdfView/FunctionalitySignMain';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString();
export interface IActiveDragData {
  id: string;
  type: string;
  value: string;
}
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
  const { t } = useTranslation();
  const [saveButtonLoading, setSaveButtonLoading] = useState(false);
  const dndDragRef = useRef<HTMLElement | null>(null);
  const [signaturePositions, setSignaturePositions] = useState<ISignData[]>([]);
  const pdfViewHeight = useMemo(() => {
    const distanceFromTop = dndDragRef.current?.getBoundingClientRect().top;
    return window.innerHeight - (distanceFromTop || 280) - 10;
  }, []);
  const [activeDragData, setActiveDragData] = useState<
    IActiveDragData | undefined
  >(undefined);
  const handleDragEnd = (event: DragEndEvent) => {
    setActiveDragData(undefined);
    if (event.over && event.over.id && event.active.data.current?.value) {
      const { delta, over, active } = event;
      const rollingView = document.getElementById(
        'functionality-sign-pdf-rolling-view',
      );
      const droppableElement = document.getElementById(active.id as string);
      const activeRect = droppableElement?.getBoundingClientRect();

      const signaturePositionData = {
        width: over.rect.width,
        height: over.rect.height,
        ...(over.data.current as {
          type: string;
          value: string;
          pdfIndex: number;
        }),
        id: uuidV4(),
        data: active.data.current as {
          type: string;
          value: string;
        },
      };
      const distanceX =
        over.rect.width +
        over.rect.left -
        (activeRect?.left || 0) -
        (activeRect?.width || 0) / 2; //拖动和放置 div之间的距离
      const newSignaturePosition = {
        x:
          over.rect.width +
          delta.x -
          distanceX -
          (rollingView?.scrollLeft || 0), //左边的宽度➕鼠标移动的距离-相差的距离-滚动条的距离
        y:
          (activeRect?.top || 0) -
          over.rect.top +
          delta.y -
          (rollingView?.scrollTop || 0), //拖动的元素的顶部距离-目标元素的顶部距离+鼠标移动的距离+滚动的距离
        ...signaturePositionData,
      };
      signaturePositions.push(newSignaturePosition);

      setSignaturePositions(cloneDeep(signaturePositions));
    }
  };

  const onDragStart = (event) => {
    setActiveDragData(event.active.data.current);
  };
  const onPdfAddViewSave = async () => {
    setSaveButtonLoading(true);
    await pdfAddViewSave(file, signaturePositions);
    setSaveButtonLoading(false);
  };
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2, // 按住不动移动2px 时 才进行拖拽, 这样就可以触发点击事件
      },
    }),
  );

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={handleDragEnd}
    >
      <Stack
        direction='row'
        sx={{
          width: '100%',
        }}
      >
        {/* pdf显示视图 */}
        <Box
          ref={dndDragRef}
          sx={{
            flex: 1,
            backgroundColor: '#fafafa',
            height: pdfViewHeight,
            border: '1px solid #e8e8e8',
            overflow: 'hidden',
          }}
        >
          <FunctionalitySignPdfShowPdfView
            file={file}
            signaturePositions={signaturePositions}
          />
        </Box>
        {/* 签名操作视图 */}
        <Box
          sx={{
            width: 260,
            border: '1px solid #e8e8e8',
            borderLeft: 'none',
            padding: 1,
          }}
        >
          <Box>
            <FunctionalitySignPdfOperationView
              activeDragData={activeDragData}
            />
            <LoadingButton
              variant={saveButtonLoading ? 'outlined' : 'contained'}
              onClick={onPdfAddViewSave}
              sx={{ marginTop: 2, width: '100%' }}
              size='large'
              loadingPosition='start'
              disabled={saveButtonLoading}
              loading={saveButtonLoading}
            >
              {t(
                'functionality__sign_pdf:components__sign_pdf__detail__Finish',
              )}
            </LoadingButton>
          </Box>
        </Box>
      </Stack>
      {/* 下面是拖动替身 */}
      {activeDragData && (
        <DragOverlay
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            cursor: 'grabbing',
            justifyContent: 'center',
          }}
        >
          {activeDragData &&
            activeDragData.type === 'image' &&
            activeDragData.value && (
              <img
                style={{
                  maxWidth: '200px',
                }}
                src={activeDragData.value}
                alt=''
              />
            )}
          {activeDragData &&
            activeDragData.type === 'image' &&
            !activeDragData.value && (
              <Box
                sx={{
                  padding: 1,
                  backgroundColor: '#9065b0a3',
                  borderRadius: 2,
                }}
              >
                <Typography>
                  {' '}
                  {t(
                    'functionality__sign_pdf:components__sign_pdf__detail__empty_sign',
                  )}
                </Typography>
              </Box>
            )}
          {activeDragData &&
            (activeDragData.type === 'text' ||
              activeDragData.type === 'i-text' ||
              activeDragData.type === 'textbox') && (
              <Typography
                sx={{
                  fontSize: {
                    xs: 20,
                    lg: 30,
                  },
                }}
              >
                {activeDragData.value ||
                  t(
                    'functionality__sign_pdf:components__sign_pdf__detail__empty_text',
                  )}
              </Typography>
            )}
        </DragOverlay>
      )}
    </DndContext>
  );
};
export default FunctionalitySignPdfDetail;
