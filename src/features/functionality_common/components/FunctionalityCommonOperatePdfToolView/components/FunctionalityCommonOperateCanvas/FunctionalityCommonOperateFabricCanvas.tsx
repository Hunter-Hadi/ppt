import { Box } from '@mui/material'
import * as fabric from 'fabric'
import React, { FC, useEffect, useRef } from 'react'

import { useFunctionalityCommonElementSize } from '@/features/functionality_common/hooks/useFunctionalityCommonElementSize'

interface FunctionalityCommonOperateFabricCanvasProps {
  canvasScale: number //width/height 比例 100%填充并且不变形
  maxEnlarge?: number //最大放大，防止之前的放大，会大过canvas的宽高
  isMobile?: boolean //是否是移动端
  defaultWidth: number
}
const FunctionalityCommonOperateFabricCanvas: FC<
  FunctionalityCommonOperateFabricCanvasProps
> = ({ canvasScale, maxEnlarge = 1.5, isMobile, defaultWidth = 2000 }) => {
  const topWrapRef = useRef<HTMLElement | null>(null)
  const fabricCanvasRef = useRef<HTMLCanvasElement>(null)
  const fabricCanvas = useRef<fabric.Canvas | null>(null)
  const { width: topViewWidth } = useFunctionalityCommonElementSize(topWrapRef)
  useEffect(() => {
    try {
      if (
        fabricCanvasRef.current &&
        !fabricCanvas.current &&
        topWrapRef.current
      ) {
        //初始化canvas
        const canvas = new fabric.Canvas(fabricCanvasRef.current, {
          selection: !isMobile, //是否开启多选择
          statefull: true, //是否开启状态存储
          allowTouchScrolling: isMobile, //是否允许触摸滚动
        })
        fabricCanvas.current = canvas
      }
    } catch (e) {
      console.error('simply Init error', e)
    }
  }, [canvasScale, isMobile])
  useEffect(() => {
    if (fabricCanvas.current) {
      fabricCanvas.current.setDimensions({
        width: topViewWidth,
        height: topViewWidth * canvasScale,
      })
    }
  }, [topViewWidth, canvasScale])
  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
      }}
      ref={topWrapRef}
    >
      <Box
        sx={{
          width: topViewWidth,
          height: topViewWidth * canvasScale, //PDF 原来的高度
          transformOrigin: 'top left' /* 变形基点在右上角 */,
          border: '1px solid #e8e8e8',
        }}
      >
        <canvas width='500' height='500' ref={fabricCanvasRef} />
      </Box>
    </Box>
  )
}
export default FunctionalityCommonOperateFabricCanvas
