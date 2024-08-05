/* eslint-disable no-debugger */
import { Box } from '@mui/material'
import * as fabric from 'fabric'
import React, {
  forwardRef,
  ForwardRefRenderFunction,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from 'react'
import { v4 as uuidV4 } from 'uuid'

import { useFunctionalityCommonElementSize } from '@/features/functionality_common/hooks/useFunctionalityCommonElementSize'

import { ICanvasObjectData } from '../../types'
import eventEmitter, {
  eventEmitterAddFabricIndexCanvasKey,
} from '../../utils/eventEmitter'
import { fabricInitStyleSet, onFabricAddObject } from '../../utils/fabricCanvas'
export interface IControlDiv {
  left: number
  top: number
  windowLeft: number
  windowTop: number
}
export interface IFunctionalityCommonOperateFabricCanvasHandles {
  onAddObject?: (
    canvasObject?: ICanvasObjectData,
    object?: fabric.Object,
    isAutoObjectSizePosition?: boolean,
  ) => void
}
interface IFunctionalityCommonOperateFabricCanvasProps {
  canvasScale: number //width/height 比例 100%填充并且不变形
  maxEnlarge?: number //最大放大，防止之前的放大，会大过canvas的宽高
  isMobile?: boolean //是否是移动端
  defaultWidth: number
  index: number
  pdfViewScale: number
}
const FunctionalityCommonOperateFabricCanvas: ForwardRefRenderFunction<
  IFunctionalityCommonOperateFabricCanvasHandles,
  IFunctionalityCommonOperateFabricCanvasProps
> = (
  {
    canvasScale,
    maxEnlarge = 1.5,
    isMobile,
    defaultWidth = 2000,
    index,
    pdfViewScale,
  },
  handleRef,
) => {
  const isInitEventEmitter = useRef<boolean>(false)
  const topWrapRef = useRef<HTMLElement | null>(null)
  const fabricCanvasRef = useRef<HTMLCanvasElement>(null)
  const fabricCanvas = useRef<fabric.Canvas | null>(null)
  const { width: topViewWidth } = useFunctionalityCommonElementSize(topWrapRef)

  const currentCanvasSize = useMemo(() => {
    return {
      width: topViewWidth,
      height: topViewWidth * canvasScale,
    }
  }, [canvasScale, topViewWidth])
  const canvasChangeScale = useMemo(() => {
    const width = defaultWidth //写死一个宽度，按比例
    // 计算新的缩放比例
    const scale = currentCanvasSize.width / width
    return scale
  }, [currentCanvasSize.width, defaultWidth])
  const [controlAddNewDiv, setControlAddNewDiv] = useState<IControlDiv | null>(
    null,
  ) // 当前选中对象的位置
  // 添加签名对象
  const onAddObject = useCallback(
    async (
      canvasObject?: ICanvasObjectData,
      newObject?: any,
      isAutoObjectPosition?: boolean, //是否自动优化对象位置
      isAutoObjectDragPosition: boolean = true, //是否自动拖动对象位置
    ) => {
      try {
        if (!fabricCanvas) return
        if (newObject) {
          topWrapRef.current?.focus()
          if (topWrapRef.current) {
            //直接添加object，会以object的top left添加上去
            newObject.id = uuidV4()
            newObject.setControlsVisibility({ mtr: false })
            await fabricCanvas.current?.add(newObject)
            await fabricCanvas.current?.requestRenderAll() // 刷新画布以显示更改
            if (isAutoObjectDragPosition) {
              const canvasElement = fabricCanvas.current?.upperCanvasEl
              if (canvasElement && fabricCanvas.current) {
                //这是拖动过来，代表需要自动js触发鼠标事件
                const topWrapRefRect =
                  topWrapRef.current?.getBoundingClientRect()

                const position = {
                  clientX:
                    topWrapRefRect.x +
                    newObject.left +
                    (newObject.width * newObject.scaleX) / 2,
                  clientY:
                    topWrapRefRect.y +
                    newObject.top +
                    (newObject.height * newObject.scaleY) / 2,
                  bubbles: true,
                }
                fabricCanvas.current?.setActiveObject(newObject) // 刷新画布以显示更改
                if (isMobile) {
                  //手机端不知道怎么处理，先留着
                } else {
                  canvasElement?.dispatchEvent(
                    new MouseEvent('mouseup', position),
                  )
                  canvasElement?.dispatchEvent(
                    new MouseEvent('mousedown', position),
                  )
                }
              }
            }
          }
          return
        }
        debugger
        if (canvasObject && fabricCanvas.current) {
          setControlAddNewDiv(null)
          const centerX = fabricCanvas.current.width / 2
          const centerY = fabricCanvas.current.height / 2
          // 计算当前缩放的比例
          const zoom = fabricCanvas.current.getZoom()
          const positionData = {
            left: canvasObject.x ? canvasObject.x / zoom : centerX,
            top: canvasObject.y ? canvasObject.y / zoom : centerY,
          }
          await onFabricAddObject(
            fabricCanvas,
            positionData,
            canvasObject.type,
            canvasObject.value,
            isAutoObjectPosition,
            isMobile,
          )

          return
        }
      } catch (e) {
        console.error('simply error', e)
      }
    },
    [canvasChangeScale, isMobile],
  )
  useImperativeHandle(
    handleRef,
    () => ({
      onAddObject: onAddObject,
    }),
    [onAddObject],
  )
  useEffect(() => {
    if (isInitEventEmitter.current) return
    isInitEventEmitter.current = true
    const handleNotify = (data) => {
      console.log('fabricCanvasAddIndexObject handleNotify', index, data)
      onAddObject(data)
    }
    // 订阅事件
    eventEmitter.on(eventEmitterAddFabricIndexCanvasKey + index, handleNotify)

    // 清理订阅
    return () => {
      eventEmitter.off(eventEmitterAddFabricIndexCanvasKey, handleNotify)
    }
  }, [])
  useEffect(() => {
    try {
      if (
        fabricCanvasRef.current &&
        !fabricCanvas.current &&
        topWrapRef.current
      ) {
        //初始化canvas
        fabricInitStyleSet(fabric)
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
        width: currentCanvasSize.width,
        height: currentCanvasSize.height,
      })

      fabricCanvas.current.setZoom(canvasChangeScale) // 设置缩放比例
      fabricCanvas.current.renderAll() // 重新渲染画布
    }
  }, [
    topViewWidth,
    canvasScale,
    currentCanvasSize.width,
    currentCanvasSize.height,
    defaultWidth,
    pdfViewScale,
    canvasChangeScale,
  ])
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
          width: currentCanvasSize.width,
          height: currentCanvasSize.height, //PDF 原来的高度
          transformOrigin: 'top left' /* 变形基点在右上角 */,
          border: '1px solid #e8e8e8',
        }}
      >
        <canvas width='500' height='500' ref={fabricCanvasRef} />
      </Box>
    </Box>
  )
}
export default forwardRef(FunctionalityCommonOperateFabricCanvas)
