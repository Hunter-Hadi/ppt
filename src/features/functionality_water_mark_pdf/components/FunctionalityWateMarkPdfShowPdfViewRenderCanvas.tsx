/* eslint-disable no-debugger */
import { Box } from '@mui/material'
import * as fabric from 'fabric'
import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { v4 as uuidV4 } from 'uuid'

import useFunctionalityCommonIsMobile from '@/features/functionality_common/hooks/useFunctionalityCommonIsMobile'
import {
  IFabricAddObjectType,
} from '@/features/functionality_sign_pdf/utils/fabricjsTools'

export interface IControlDiv {
  left: number
  top: number
  windowLeft: number
  windowTop: number
}
export type ICanvasObjectData = {
  x?: number
  y?: number
  id: string
  type: IFabricAddObjectType
  value: string
}

/**
 * canvas渲染组件用的fabric_js
 */
const FunctionalityWateMarkPdfShowPdfViewRenderCanvas = (
  {
    canvasIndex,
    sizeInfo,
    waterMarkInfo,
  },
  handleRef,
) => {
  const isMobile = useFunctionalityCommonIsMobile()
  const canvasEl = useRef<HTMLCanvasElement>(null)
  const editor = useRef<fabric.Canvas | null>(null)
  const topWrapRef = useRef<HTMLElement | null>(null)
  const [scaleFactor, setScaleFactor] = useState(1) // Current scale factor
  const setZoom = (zoom) => {
    // 设置新的缩放比例
    if (editor.current) {
      editor.current.setZoom(zoom)
      editor.current.renderAll()
    }
  }

  const getCanvasBase64 = () => {
    // 获取当前画布
    const currentCanvas = editor.current
    if (currentCanvas) {
      // 获取 base64 编码图像
      currentCanvas.setZoom(1)
      const base64Image = currentCanvas.toDataURL({
        format: 'png', // 你可以选择其他格式，如 'jpeg'
        quality: 1.0, // 质量为1（最高）
        multiplier: 1, // 乘数为2（即2倍缩放）
      })
      currentCanvas.setZoom(scaleFactor)

      return base64Image
    }
  }

  // 添加签名对象
  const onAddObject = async (
    newObject?: any,
  ) => {
    try {
      if (!editor) return
      if (newObject) {
        topWrapRef.current?.focus()
        if (topWrapRef.current) {
          //直接添加object，会以object的top left添加上去
          newObject.id = uuidV4()
          newObject.setControlsVisibility({ mtr: false })
          await editor.current?.add(newObject)
          await editor.current?.requestRenderAll() // 刷新画布以显示更改
        }
        return
      }
    } catch (e) {
      console.error('simply error', e)
    }
  }

  const getAngleForDiagonal = (width, height) => {
    // 计算反正切值，得到的结果是弧度
    const radian = Math.atan(height / width)

    // 将弧度转换为度
    const degree = radian * (180 / Math.PI)
    console.log(`degree:`, degree)

    // 因为问题要求的是从左下到右上的倾斜角度，所以使用负值
    return -degree
  }

  const renderWaterMark = async () => {
    if (!editor.current || !topWrapRef.current) return
    editor.current?.clear()
    // console.log(`editor.current:`, editor.current)
    // console.log(`waterMarkInfo:`, waterMarkInfo)
    // console.log(`topWrapRef.current:`, topWrapRef.current)
    const rotate = getAngleForDiagonal(
      topWrapRef.current.clientWidth,
      topWrapRef.current.clientHeight,
    )

    // const {textValue, color, }
    const text = new fabric.Text(waterMarkInfo.textValue, {
      left: (editor.current.width - 300) / 2,
      top: editor.current.height / 2,
      fontFamily: waterMarkInfo.fontFamily,
      fontSize: waterMarkInfo.fontSize * 6,
      fill: waterMarkInfo.color,
      opacity: waterMarkInfo.opciaty,
      originX: 'center',
      originY: 'center',
      angle: rotate,
      selectable: false,
      hoverCursor: 'default',
    })
    try {
      await onAddObject(text)
      // 计算画布中心
      const canvasCenterX = editor.current.width / 2
      const canvasCenterY = editor.current.height / 2

      // 设置文本对象位置到画布中心
      text.set({
        left: canvasCenterX,
        top: canvasCenterY,
      })

      const pngString = text.toDataURL()
      console.log(`pngString:`, pngString)
      editor.current?.requestRenderAll() // 确保画布更新显示调整后的位置
      return;
    } catch (error) {
      console.error('添加对象发生错误', error)
      return;
      // 处理错误或者退出循环
    }
  }

  useEffect(() => {
    if (canvasEl.current && !editor.current) {
      const canvas = new fabric.Canvas(canvasEl.current, {
        selection: !isMobile,
        allowTouchScrolling: isMobile,
      })
      editor.current = canvas
      editor.current.setZoom(0.2)
      // if (!isMobile) return //移动端需要的滚动逻辑
      // fabricMobileMove(editor.current)
    }
  }, [])

  useEffect(() => {
    // 假定您已经有一个引用 `topWrapRef`
    const topWrapRef = document.querySelector(
      `.sample-canvas-wrap-${canvasIndex + 1}`,
    )
    console.log(`topWrapRef:`, topWrapRef)

    // 回调函数：尺寸变化时执行
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width, height } = entry.contentRect
        // 根据新的宽度和高度重新计算 rotate 值
        console.log(`New size: ${width}x${height}`)
        // 重新计算并更新 rotate 值
        renderWaterMark()
      }
    })

    // 开始监听
    if (topWrapRef) {
      resizeObserver.observe(topWrapRef)
    }

    // 清理函数
    return () => {
      if (topWrapRef) {
        resizeObserver.unobserve(topWrapRef)
      }
    }
  }, [topWrapRef])

  useEffect(() => {
    try {
      //初始化画布高度宽度
      if (!editor.current || !topWrapRef.current || !sizeInfo) return
      editor.current.setDimensions({
        width: sizeInfo.width,
        height: sizeInfo.height,
      })
      // 禁用canvas的默认鼠标交互
      let scaleFactor = 1 // Current scale factor
      const resizeCanvas = () => {
        //自适应缩放
        const newWidth = topWrapRef.current?.clientWidth
        if (newWidth) {
          scaleFactor = newWidth / sizeInfo.width // Calculate new scale factor
          const zoom = parseFloat(scaleFactor.toFixed(3))
          setZoom(zoom)
          setScaleFactor(zoom)
        }
      }
      const resizeObserver = new ResizeObserver(resizeCanvas)
      resizeObserver.observe(topWrapRef.current)
      resizeCanvas()
      return () => {
        resizeObserver.disconnect()
      }
    } catch (e) {
      console.error('simply error', e)
    }
  }, [topWrapRef, editor, sizeInfo])

  useEffect(() => {
    renderWaterMark()
  }, [waterMarkInfo])

  // 通过useImperativeHandle暴露给父组件的方法
  useImperativeHandle(
    handleRef,
    () => ({
      editorCurrent: editor.current,
      getCanvasBase64,
      onAddObject: onAddObject,
      topWrapRef,
      renderWaterMark
    }),
    [editor.current, scaleFactor, scaleFactor],
  )

  return (
    <Box
      sx={{
        width: '100%',
        height: '100%',
        position: 'absolute',
        top: 0,
      }}
      className={`sample-canvas-wrap-${canvasIndex + 1}`}
      ref={topWrapRef}
    >
      <Box
        className={`sample-canvas-${canvasIndex + 1}`}
        sx={{
          width: sizeInfo?.width || '100%',
          height: sizeInfo?.height || '100%',
          // transform: `scale(${scaleFactor})`,
          transformOrigin: 'top left' /* 变形基点在右上角 */,
          border: '1px solid #e8e8e8',
        }}
      >
        <canvas width='500' height='500' ref={canvasEl} />
      </Box>
    </Box>
  )
}
export default forwardRef(FunctionalityWateMarkPdfShowPdfViewRenderCanvas)
