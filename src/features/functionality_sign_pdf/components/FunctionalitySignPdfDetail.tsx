/* eslint-disable no-debugger */
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { Box, Button, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import { PDFDocument } from 'pdf-lib'
import { FC, useEffect, useMemo, useRef, useState } from 'react'
import React from 'react'
import { useRecoilState } from 'recoil'
import { v4 as uuidV4 } from 'uuid'

import FunctionalityCommonOperateFabricToolsPopup from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/components/FunctionalityCommonOperateCanvas/FunctionalityCommonOperateFabricCanvas/FunctionalityCommonOperateFabricToolsPopup'
import FunctionalityCommonOperatePdfToolViewMain from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/components/FunctionalityCommonOperatePdfToolViewMain'
import useFunctionalityEditDndContextHandle from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/hooks/useFunctionalityEditDndContextHandle'
import {
  fabricCanvasJsonStringListRecoil,
  fabricCanvasSignObjectListRecoil,
  IFunctionalitySignPdfShowPdfViewObjectToolsPopupProps,
  TopDetailSignPdfSelectInfoContext,
} from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/store/setOperateFabricCanvas'
import {
  eventEmitterAddFabricCanvas,
  eventEmitterAddFabricIndexCanvas,
} from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/utils/FabricCanvas/eventEmitter'
import { pdfLibFabricCanvasEmbedSave } from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/utils/FabricCanvas/pdfLibFabricCanvasEmbedSave'
import useFunctionalityCommonIsMobile from '@/features/functionality_common/hooks/useFunctionalityCommonIsMobile'

import { IFabricAddObjectType } from '../utils/fabricjsTools'
import FunctionalitySignCompleteSignatureInfo from './FunctionalitySignCompleteSignatureInfo'
import FunctionalitySignPdfOperationView from './FunctionalitySignPdfOperationView/FunctionalitySignPdfOperationViewMain'

export interface IActiveDragData {
  dragType: 'start' | 'end'
  id: string
  type: IFabricAddObjectType
  value: string
  x?: number
  y?: number
  dragValue?: any
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
  const [fabricCanvasSignObjectList, setFabricCanvasSignObjectList] =
    useRecoilState(fabricCanvasSignObjectListRecoil)
  const { t } = useTranslation()
  const [fabricCanvasJsonStringList, setFabricCanvasJsonStringList] =
    useRecoilState(fabricCanvasJsonStringListRecoil)
  const [saveButtonLoading, setSaveButtonLoading] = useState(false)
  const [viewObjectToolsData, setViewObjectToolsData] =
    useState<IFunctionalitySignPdfShowPdfViewObjectToolsPopupProps | null>(null)
  const [overallViewHeight, setOverallViewHeight] = useState<number>(0)

  const dndDragRef = useRef<HTMLElement | null>(null)

  const autoSetOverallViewHeight = () => {
    const distanceFromTop = dndDragRef.current?.getBoundingClientRect().top
    const overallViewHeight =
      window.innerHeight - (distanceFromTop || 280) - 10 - (isMobile ? 50 : 0)
    setOverallViewHeight(overallViewHeight)
  }
  useEffect(() => {
    if (isMobile) {
      setTimeout(() => {
        autoSetOverallViewHeight()
      }, 100)
    } else {
      autoSetOverallViewHeight()
    }
  }, [isMobile])
  const [activeDragData, setActiveDragData] = useState<
    IActiveDragData | undefined
  >(undefined)
  const signNumber = useMemo(
    () => fabricCanvasSignObjectList.length,
    [fabricCanvasSignObjectList],
  )
  const [downloadUint8Array, setDownloadUint8Array] =
    useState<null | Uint8Array>(null) //签名数据

  const onPdfAddViewSave = async () => {
    setSaveButtonLoading(true)
    let pdfDoc: PDFDocument | null = null
    try {
      const fileBuffer = await file.arrayBuffer()
      pdfDoc = await PDFDocument.load(fileBuffer)
    } catch (error) {
      console.error('Error loading PDF Document:', error)
      return
    }
    await pdfLibFabricCanvasEmbedSave(pdfDoc, fabricCanvasJsonStringList)
    pdfDoc
      .save()
      .then((blob) => {
        setDownloadUint8Array(blob)
      })
      .finally(() => {
        setSaveButtonLoading(false)
      })
  }
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 2,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 500,
        tolerance: 1,
      },
    }),
    useSensor(KeyboardSensor),
  )
  // 右边的点击添加事件
  const onClickAdd = (type: IFabricAddObjectType, value: string) => {
    if (activeData) {
      activeData.dragValue.data.type = type
      activeData.dragValue.data.value = value
      eventEmitterAddFabricIndexCanvas(
        activeData.dragValue.index,
        activeData.dragValue.data,
      )
    } else {
      eventEmitterAddFabricCanvas({
        id: uuidV4(),
        type,
        value,
      })
    }

    setActiveDragData(undefined)
  }
  const onClearFile = async () => {
    setTimeout(() => {
      setFabricCanvasJsonStringList([])
      setFabricCanvasSignObjectList([])
    }, 500) //清空画布,暂时这样处理，不然清理不掉
    onClearReturn()
  }
  const {
    activeData,
    onDragStart: onStart,
    onDragEnd: onEnd,
  } = useFunctionalityEditDndContextHandle({
    onStart: () => {},
    onEnd: () => {},
  })
  return (
    <TopDetailSignPdfSelectInfoContext.Provider
      value={{
        viewObjectToolsData,
        setViewObjectToolsData,
      }}
    >
      <DndContext
        sensors={sensors}
        onDragStart={onStart}
        onDragEnd={onEnd}
        onDragCancel={() => setActiveDragData(undefined)}
      >
        <Stack
          className='DndContext-wrap'
          direction={
            isMobile
              ? downloadUint8Array
                ? 'column'
                : 'column-reverse'
              : 'row'
          }
          sx={{
            width: '100%',
            height: isMobile ? '100%' : overallViewHeight,
            img: {
              userSelect: 'none',
            },
          }}
        >
          {!downloadUint8Array && isMobile && (
            <Box
              className='functionality-sign-pdf-save-view'
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
              position: 'relative',
              ...(downloadUint8Array
                ? {
                    '>div': {
                      overflow: 'hidden!important',
                    },
                  }
                : {}),
            }}
          >
            <FunctionalityCommonOperatePdfToolViewMain
              file={file}
              isShowBottomOperation={true}
              currentEditType={'insert'}
            />
            {downloadUint8Array && (
              <Box
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 10,
                  bottom: 0,
                  zIndex: 99999,
                }}
              ></Box>
            )}
          </Box>
          {/* 签名/下载操作视图 */}
          <Stack
            direction='column'
            justifyContent='space-between'
            sx={{
              width: isMobile ? '100%' : 260,
              border: isMobile ? 'none' : '1px solid #e8e8e8',
              borderLeft: 'none',
            }}
          >
            {!downloadUint8Array && !viewObjectToolsData && (
              <React.Fragment>
                <Box
                  sx={{
                    py: 1,
                    px: isMobile ? 0 : 1,
                  }}
                >
                  <FunctionalitySignPdfOperationView
                    activeDragData={activeData}
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
                onClearReturn={onClearFile}
                downloadUint8Array={downloadUint8Array}
              />
            )}
            {viewObjectToolsData && viewObjectToolsData.controlDiv && (
              <FunctionalityCommonOperateFabricToolsPopup
                controlDiv={viewObjectToolsData.controlDiv}
                scaleFactor={viewObjectToolsData.scaleFactor}
                editor={viewObjectToolsData.editor}
              />
            )}
          </Stack>
        </Stack>
        {/* 下面是拖动替身 */}
        {activeData && activeData.dragType === 'start' && (
          <DragOverlay
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'grabbing',
              justifyContent: 'center',
            }}
          >
            {activeData && activeData.type === 'image' && activeData.value && (
              <img
                style={{
                  maxWidth: isMobile ? '80px' : '200px',
                  touchAction: 'none',
                }}
                onTouchStart={(e) => e.preventDefault()}
                draggable='false'
                src={activeData.value}
                alt=''
              />
            )}
            {activeData && activeData.type === 'image' && !activeData.value && (
              <Box
                sx={{
                  padding: 1,
                  backgroundColor: '#9065b0a3',
                  borderRadius: 2,
                  width: isMobile ? 80 : 'auto',
                }}
              >
                <Typography
                  sx={{
                    fontSize: {
                      xs: isMobile ? 15 : 20,
                      lg: isMobile ? 15 : 20,
                    },
                  }}
                >
                  {t(
                    'functionality__sign_pdf:components__sign_pdf__detail__empty_sign',
                  )}
                </Typography>
              </Box>
            )}
            {activeData &&
              (activeData.type === 'text' ||
                activeData.type === 'i-text' ||
                activeData.type === 'text-box') && (
                <Typography
                  sx={{
                    fontSize: {
                      xs: isMobile ? 10 : 20,
                      lg: isMobile ? 10 : 30,
                    },
                  }}
                >
                  {activeData.value ||
                    t(
                      'functionality__sign_pdf:components__sign_pdf__detail__empty_text',
                    )}
                </Typography>
              )}
          </DragOverlay>
        )}
      </DndContext>
    </TopDetailSignPdfSelectInfoContext.Provider>
  )
}
export default FunctionalitySignPdfDetail
