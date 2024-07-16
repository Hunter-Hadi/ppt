import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { FC, useMemo, useRef, useState } from 'react'
import React from 'react'
import { v4 as uuidV4 } from 'uuid'

import useFunctionalityCommonIsMobile from '@/features/functionality_common/hooks/useFunctionalityCommonIsMobile'

import { IFabricAddObjectType } from '../utils/fabricjsTools'
import { pdfAddSignCanvasViewReturnUint8Array } from '../utils/pdfAddSignCanvasView'
import FunctionalitySignCompleteSignatureInfo from './FunctionalitySignCompleteSignatureInfo'
import FunctionalitySignPdfOperationView from './FunctionalitySignPdfOperationView/FunctionalitySignPdfOperationViewMain'
import FunctionalitySignPdfShowPdfViewPdfViewMain, {
  IFunctionalitySignPdfShowPdfViewHandles,
} from './FunctionalitySignPdfShowPdfView/FunctionalitySignPdfShowPdfViewPdfViewMain'

export interface IActiveDragData {
  dragType: 'start' | 'end'
  id: string
  type: IFabricAddObjectType
  value: string
  x?: number
  y?: number
}
interface IFunctionalitySignPdfDetailProps {
  file: File
  onClearReturn: () => void
}
export type ISignData = {
  pdfIndex: number
  x: number
  y: number
  width: number
  height: number
  id: string
  data: { type: string; value: string }
}

export const FunctionalitySignPdfDetail: FC<
  IFunctionalitySignPdfDetailProps
> = ({ file, onClearReturn }) => {
  const isMobile = useFunctionalityCommonIsMobile()

  const { t } = useTranslation()
  const [saveButtonLoading, setSaveButtonLoading] = useState(false)
  const dndDragRef = useRef<HTMLElement | null>(null)
  const showPdfHandlesRef =
    useRef<IFunctionalitySignPdfShowPdfViewHandles | null>(null) //当前在居中pdf的ref
  const overallViewHeight = useMemo(() => {
    const distanceFromTop = dndDragRef.current?.getBoundingClientRect().top
    return (
      window.innerHeight - (distanceFromTop || 280) - 10 - (isMobile ? 50 : 0)
    )
  }, [isMobile, dndDragRef])
  const [activeDragData, setActiveDragData] = useState<
    IActiveDragData | undefined
  >(undefined)
  const [signNumber, setSignNumber] = useState<number>(0) //当前签名数量
  const [downloadUint8Array, setDownloadUint8Array] =
    useState<null | Uint8Array>(null) //签名数据

  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over && event.over.id) {
      const { delta, over, active } = event
      const rollingView = document.getElementById(
        'functionality-sign-pdf-rolling-view',
      )
      const droppableElement = document.getElementById(active.id as string)
      const activeRect = droppableElement?.getBoundingClientRect()

      const signaturePositionData = {
        width: over.rect.width,
        height: over.rect.height,
        ...(over.data.current as {
          pdfIndex: number
        }),
        id: uuidV4(),
        ...(active.data.current as {
          type: IFabricAddObjectType
          value: string
        }),
      }
      const distanceX =
        over.rect.width +
        over.rect.left -
        (activeRect?.left || 0) -
        (activeRect?.width || 0) / 2 //拖动和放置 div之间的距离
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
      }
      if (
        showPdfHandlesRef.current?.onAddObject &&
        event.active.data.current?.value
      ) {
        showPdfHandlesRef.current.onAddObject({
          ...signaturePositionData,
          ...newSignaturePosition,
        })
      }
      if (activeDragData?.dragType === 'start' && !activeDragData.value) {
        setActiveDragData({
          dragType: 'end',
          ...newSignaturePosition,
          id: uuidV4(),
          ...(active.data.current as {
            type: IFabricAddObjectType
            value: string
          }),
        })
      } else {
        setActiveDragData(undefined)
      }
    }
  }

  const onDragStart = (event) => {
    setActiveDragData({ dragType: 'start', ...event.active.data.current })
  }
  const onPdfAddViewSave = async () => {
    setSaveButtonLoading(true)
    showPdfHandlesRef.current?.discardAllActiveObject()
    const pdfPageNumber = showPdfHandlesRef.current?.getNumPages()
    if (pdfPageNumber) {
      const uint8Array = await pdfAddSignCanvasViewReturnUint8Array(
        file,
        pdfPageNumber,
      )
      if (uint8Array) {
        setDownloadUint8Array(uint8Array)
      }
    }
    setSaveButtonLoading(false)
  }
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 2,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 300,
        tolerance: 2,
      },
    }),
    useSensor(KeyboardSensor),
  )
  // 右边的点击添加事件
  const onClickAdd = (type: IFabricAddObjectType, value: string) => {
    if (showPdfHandlesRef.current?.onAddObject) {
      showPdfHandlesRef.current.onAddObject({
        id: uuidV4(),
        type,
        value,
      })
    }
    setActiveDragData(undefined)
  }
  const onChangePdfHaveSignObjectNumber = (signNumber: number) => {
    setSignNumber(signNumber)
  }
  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={handleDragEnd}
    >
      <Stack
        direction={isMobile ? 'column-reverse' : 'row'}
        sx={{
          width: '100%',
          height: isMobile ? '100%' : overallViewHeight,
        }}
      >
        {!downloadUint8Array && isMobile && (
          <Box
            sx={{
              borderTop: '1px solid #e8e8e8',
              padding: 1,
            }}
          >
            <Button
              variant='contained'
              onClick={onPdfAddViewSave}
              sx={{ width: '100%' }}
              size='large'
              disabled={saveButtonLoading || signNumber === 0}
            >
              {t(
                'functionality__sign_pdf:components__sign_pdf__detail__finish',
              )}
            </Button>
          </Box>
        )}
        {/* pdf显示视图 */}
        <Box
          ref={dndDragRef}
          sx={{
            flex: isMobile ? 'none' : 1,
            backgroundColor: '#fafafa',
            border: '1px solid #e8e8e8',
            overflow: 'hidden',
            height: !isMobile ? '100%' : overallViewHeight,
          }}
        >
          <FunctionalitySignPdfShowPdfViewPdfViewMain
            file={file}
            ref={showPdfHandlesRef}
            onChangePdfHaveSignObjectNumber={onChangePdfHaveSignObjectNumber}
          />
        </Box>
        {/* 签名/下载操作视图 */}
        <Stack
          direction='column'
          justifyContent='space-between'
          sx={{
            width: isMobile ? '100%' : 260,
            border: '1px solid #e8e8e8',
            borderLeft: 'none',
          }}
        >
          {!downloadUint8Array && (
            <React.Fragment>
              <Box
                sx={{
                  padding: 1,
                }}
              >
                <FunctionalitySignPdfOperationView
                  activeDragData={activeDragData}
                  onClickAdd={onClickAdd}
                />
              </Box>
              {!isMobile && (
                <Box
                  sx={{
                    borderTop: '1px solid #e8e8e8',
                    padding: 1,
                  }}
                >
                  <Button
                    variant='contained'
                    onClick={onPdfAddViewSave}
                    sx={{ width: '100%' }}
                    size='large'
                    disabled={saveButtonLoading || signNumber === 0}
                  >
                    {t(
                      'functionality__sign_pdf:components__sign_pdf__detail__finish',
                    )}
                  </Button>
                </Box>
              )}
            </React.Fragment>
          )}
          {downloadUint8Array && (
            <FunctionalitySignCompleteSignatureInfo
              fileName={file.name}
              onClearReturn={onClearReturn}
              downloadUint8Array={downloadUint8Array}
            />
          )}
        </Stack>
      </Stack>
      {/* 下面是拖动替身 */}
      {activeDragData && activeDragData.dragType === 'start' && (
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
                  {t(
                    'functionality__sign_pdf:components__sign_pdf__detail__empty_sign',
                  )}
                </Typography>
              </Box>
            )}
          {activeDragData &&
            (activeDragData.type === 'text' ||
              activeDragData.type === 'i-text' ||
              activeDragData.type === 'text-box') && (
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
  )
}
export default FunctionalitySignPdfDetail
