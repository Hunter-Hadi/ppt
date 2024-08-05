/* eslint-disable no-debugger */
import { Box } from '@mui/material'
import React, { forwardRef, useEffect, useRef, useState } from 'react'

import useFunctionalityCommonIsMobile from '@/features/functionality_common/hooks/useFunctionalityCommonIsMobile'

/**
 * canvas渲染组件用的fabric_js
 */
const FunctionalityWateMarkPdfShowPdfWaterMarkRender = (
  { pdfIndx, sizeInfo, waterMarkInfo },
  handleRef,
) => {
  const isMobile = useFunctionalityCommonIsMobile()
  const topWrapRef = useRef<HTMLElement | null>(null)
  const [scaleFactor, setScaleFactor] = useState(1) // Current scale factor

  const getAngleForDiagonal = (width, height) => {
    // 计算反正切值，得到的结果是弧度
    const radian = Math.atan(height / width)

    // 将弧度转换为度
    const degree = radian * (180 / Math.PI)

    // 因为问题要求的是从左下到右上的倾斜角度，所以使用负值
    return -degree
  }

  useEffect(() => {}, [])

  useEffect(() => {
    // try {
    //   //初始化画布高度宽度
    //   if (!editor.current || !topWrapRef.current || !sizeInfo) return
    //   editor.current.setDimensions({
    //     width: sizeInfo.width,
    //     height: sizeInfo.height,
    //   })
    //   // 禁用canvas的默认鼠标交互
    //   let scaleFactor = 1 // Current scale factor
    //   const resizeCanvas = () => {
    //     //自适应缩放
    //     const newWidth = topWrapRef.current?.clientWidth
    //     if (newWidth) {
    //       scaleFactor = newWidth / sizeInfo.width // Calculate new scale factor
    //       const zoom = parseFloat(scaleFactor.toFixed(3))
    //       setZoom(zoom)
    //       setScaleFactor(zoom)
    //     }
    //   }
    //   const resizeObserver = new ResizeObserver(resizeCanvas)
    //   resizeObserver.observe(topWrapRef.current)
    //   resizeCanvas()
    //   return () => {
    //     resizeObserver.disconnect()
    //   }
    // } catch (e) {
    //   console.error('simply error', e)
    // }
  }, [topWrapRef, sizeInfo])

  useEffect(() => {
    // renderWaterMark()
  }, [waterMarkInfo])

  // 通过useImperativeHandle暴露给父组件的方法
  // useImperativeHandle(
  //   handleRef,
  //   () => ({
  //     editorCurrent: editor.current,
  //     getCanvasBase64,
  //     onAddObject: onAddObject,
  //     topWrapRef,
  //     renderWaterMark
  //   }),
  //   [editor.current, scaleFactor],
  // )

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
      }}
      className={`sample-wrap-${pdfIndx + 1}`}
      ref={topWrapRef}
    >
      {/* <Box
        className={`sample-${pdfIndx + 1}`}
        sx={{
          width: topWrapRef.current
            ? `${(topWrapRef.current.offsetWidth / sizeInfo.width) * 100}%`
            : '100%',
          height: topWrapRef.current
            ? `${(topWrapRef.current.offsetHeight / sizeInfo.height) * 100}%`
            : '100%',
          // width: sizeInfo?.width || '100%',
          // height: sizeInfo?.height || '100%',
          // transform: `scale(${scaleFactor})`,
          transformOrigin: 'top left',
          border: '1px solid #e8e8e8',
        }}
      > */}
      <Box
        className={`water-mark-container-${pdfIndx + 1}`}
        sx={{
          position: 'relative',
          top: '50%',
          left: '50%',
          // transform:'translate(-50%, -50%)',
          display: 'inline-block',
          transform:'translate(-50%, -50%) rotate(-45deg)',
          fontSize: '100px'
        }}
      >
        {waterMarkInfo?.textValue}
      </Box>
      {/* <canvas width='500' height='500' ref={canvasEl} /> */}
      {/* </Box> */}
    </Box>
  )
}
export default forwardRef(FunctionalityWateMarkPdfShowPdfWaterMarkRender)
