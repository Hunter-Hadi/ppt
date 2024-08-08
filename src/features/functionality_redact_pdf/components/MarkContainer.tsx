/* eslint-disable no-debugger */
import { Box } from '@mui/material'
import * as fabric from 'fabric'
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'

export interface IMarkContainerProps {
  sizeInfo: {
    width: number
    height: number
  }
}

export interface IMarkContainerHandles {
  getCanvasBase64: () => string | undefined
}

/**
 * canvas渲染组件用的fabric_js
 */
const MarkContainer: ForwardRefRenderFunction<
  IMarkContainerHandles,
  IMarkContainerProps
> = ({ sizeInfo }, handleRef) => {
  // const { ref: topWrapRef } = useFunctionalitySignElementWidth()

  const topWrapRef = useRef<HTMLElement | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const editor = useRef<fabric.Canvas | null>(null)
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

  const listenDelete = (event) => {
    console.log(`触发删除`)
    if (event.key === 'Delete' || event.key === 'Backspace') {
      const activeObject = editor.current?.getActiveObject()
      console.log(
        `editor.current?.getActiveObject():`,
        editor.current?.getActiveObject(),
      )

      if (activeObject) {
        editor.current?.remove(activeObject)
      }
    }
  }

  useEffect(() => {
    console.log(`触发了【】`);
    if (canvasRef.current) {
      // if (canvasRef.current && !editor.current) {
      const canvas = new fabric.Canvas(canvasRef.current!, {
        selection: true,
        defaultCursor: 'crosshair',
      })

      editor.current = canvas

      let isDrawing = false
      let rect: fabric.Rect | null = null

      const handleMouseDown = (event: fabric.TPointerEvent | any) => {
        // 检查点击位置是否已有对象
        if (canvas.getActiveObject()) {
          return
        }

        const pointer = canvas.getPointer(event.e)
        const origX = pointer.x
        const origY = pointer.y
        isDrawing = true

        // 禁用选择功能
        canvas.selection = false
        canvas.forEachObject((obj) => {
          obj.selectable = false
        })

        const handleMouseMove = (moveEvent: MouseEvent) => {
          if (!isDrawing) return
          const movePointer = canvas.getPointer(moveEvent)
          if (!rect) {
            // 创建新的矩形
            rect = new fabric.Rect({
              left: origX,
              top: origY,
              fill: 'black',
              opacity: 1,
              width: 0,
              height: 0,
              selectable: true,
            })
            canvas.add(rect)
            canvas.setActiveObject(rect) // 设置为活动对象
          }

          const width = movePointer.x - origX
          const height = movePointer.y - origY

          if (width < 0) {
            rect.set({ left: movePointer.x })
          }
          if (height < 0) {
            rect.set({ top: movePointer.y })
          }

          rect.set({
            width: Math.abs(width),
            height: Math.abs(height),
          })

          canvas.renderAll()
        }

        const handleMouseUp = () => {
          if (isDrawing) {
            isDrawing = false
            if (rect) {
              rect.setCoords() // 更新对象坐标
            }
            rect = null
            // 重新启用选择功能
            canvas.selection = true

            canvas.forEachObject((obj) => {
              obj.selectable = true
            })

            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('mouseup', handleMouseUp)
          }
        }

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('mouseup', handleMouseUp)
      }

      canvas.on('mouse:down', handleMouseDown)

      canvas.on('selection:created', (event) => {
        console.log('selection:created')

        const activeObject = event.selected?.[0]
        if (activeObject && activeObject instanceof fabric.Object) {
          activeObject.setControlsVisibility({
            mt: true,
            mb: true,
            ml: true,
            mr: true,
            tl: true,
            tr: true,
            bl: true,
            br: true,
          })
          activeObject.on('moving', () => canvas.renderAll())
          activeObject.on('scaling', () => canvas.renderAll())
          activeObject.setCoords()
        }
      })

      canvas.on('selection:updated', (event) => {
        console.log('selection:updated')
        const activeObject = event.selected?.[0]
        if (activeObject && activeObject instanceof fabric.Object) {
          activeObject.setCoords()
        }
      })

      canvas.on('mouse:over', (event) => {
        console.log('mouse:over')
        const activeObject = event.target
        if (activeObject && activeObject instanceof fabric.Object) {
          activeObject.set('opacity', 0.3)
          canvas.renderAll()
        }
      })

      canvas.on('mouse:out', (event) => {
        console.log('mouse:out')
        const activeObject = event.target
        if (activeObject && activeObject instanceof fabric.Object) {
          activeObject.set('opacity', 1)
          canvas.renderAll()
        }
      })
      // if (!window.listenDeleteAdded) {
      window.addEventListener('keydown', listenDelete)
      // window.listenDeleteAdded = true;
      // }
      return () => {
        console.log(`卸载了`);
        
        window.removeEventListener('keydown', listenDelete)
        canvas.dispose()
      }
    }
  }, [])

  useEffect(() => {
    try {
      //初始化画布高度宽度
      if (!editor.current || !topWrapRef.current || !sizeInfo) return
      editor.current.setDimensions({
        width: sizeInfo.width,
        height: sizeInfo.height,
      })
      const resizeCanvas = () => {
        let scaleFactor = 1 // Current scale factor
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
  }, [topWrapRef, editor])

  // 通过useImperativeHandle暴露给父组件的方法
  useImperativeHandle(
    handleRef,
    () => ({
      editorCurrent: editor.current,
      getCanvasBase64,
    }),
    [editor.current, scaleFactor],
  )

  return (
    <Box
      ref={topWrapRef}
      sx={{
        position: 'absolute',
        top: '0',
        left: '0',
        bottom: '0',
        right: '0',
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        id='mark-canvas'
        sx={{
          width: sizeInfo?.width || '100%',
          height: sizeInfo?.height || '100%',
          transformOrigin: 'top left' /* 变形基点在右上角 */,
          border: '1px solid #e8e8e8',
        }}
      >
        <canvas ref={canvasRef} width={1000} height={1000} />
      </Box>
    </Box>
  )
}
export default forwardRef(MarkContainer)
