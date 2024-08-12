/* eslint-disable no-debugger */
import { Box } from '@mui/material'
import * as fabric from 'fabric'
import { cloneDeep, debounce } from 'lodash-es'
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { pdfjs } from 'react-pdf'
import { useRecoilState } from 'recoil'
import { v4 as uuidV4 } from 'uuid'

import FunctionalityCommonOperateFabricToolsPopup from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/components/FunctionalityCommonOperateCanvas/FunctionalityCommonOperateFabricCanvas/FunctionalityCommonOperateFabricToolsPopup'
import { useFunctionalityCommonFabricCanvasEvent } from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/hooks/useFunctionalityCommonFabricCanvasEvent'
import {
  fabricCanvasJsonStringListRecoil,
  fabricCanvasZoomRecoil,
} from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/store/setOperateFabricCanvas'
import { ICanvasObjectData } from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/types/index'
import { ITextContentHighlighterPageRectangle } from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/types/TextContentHighlighter'
import eventEmitter, {
  eventEmitterAddFabricIndexCanvasKey,
} from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/utils/FabricCanvas/eventEmitter'
import {
  fabricInitStyleSet,
  onFabricAddObject,
} from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/utils/FabricCanvas/fabricCanvasNewAdd'
import { handleNewObjectContinuousMouse } from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/utils/FabricCanvas/handleNewObjectContinuousMouse'
import getClientRects from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/utils/TextContentHighlighter/getClientRects'
import { IFunctionalityCommonVirtualScrollingPdfInfo } from '@/features/functionality_common/components/FunctionalityCommonPdfViewVirtualScroll/components/FunctionalityCommonPdfViewVirtualScrollMain'
import { useFunctionalityCommonElementSize } from '@/features/functionality_common/hooks/useFunctionalityCommonElementSize'
import useFunctionalityCommonIsMobile from '@/features/functionality_common/hooks/useFunctionalityCommonIsMobile'
export interface IControlDiv {
  left: number
  top: number
  windowLeft: number
  windowTop: number
}

interface IFunctionalityOperateFabricCanvasProps {
  canvasScale: number //width/height 比例 100%填充并且不变形
  defaultWidth: number
  index: number
  canvasNumber: number
  fabricCanvasJsonStringList: string[]
  pdfInfo: IFunctionalityCommonVirtualScrollingPdfInfo
}
const FunctionalityOperateFabricCanvas: FC<
  IFunctionalityOperateFabricCanvasProps
> = ({
  canvasScale,
  defaultWidth = 2000,
  index,
  canvasNumber,
  fabricCanvasJsonStringList,
  pdfInfo,
}) => {
  const [highlighterPosition, setHighlighterPosition] = useState<
    ITextContentHighlighterPageRectangle | undefined
  >(undefined)

  const isInitEventEmitter = useRef<boolean>(false)
  const topWrapRef = useRef<HTMLElement | null>(null)
  const fabricCanvasRef = useRef<HTMLCanvasElement>(null)
  const fabricCanvas = useRef<fabric.Canvas | null>(null)
  const textLayerRef = useRef<HTMLDivElement>(null)
  const initRenderTextLayer = useRef(false)
  const [isClick, setIsClick] = useState(false)
  // const isClickRef = useRef(false) //是否点击

  const [, setFabricCanvasJsonStringList] = useRecoilState(
    fabricCanvasJsonStringListRecoil,
  )
  const [, setFabricCanvasZoomRecoil] = useRecoilState(fabricCanvasZoomRecoil)

  const isMobile = useFunctionalityCommonIsMobile()
  const { width: topViewWidth } = useFunctionalityCommonElementSize(topWrapRef)

  const widthScale = useMemo(
    () => (topViewWidth || 100) / pdfInfo.width,
    [pdfInfo.width, topViewWidth],
  )

  const currentCanvasSize = useMemo(() => {
    return {
      width: topViewWidth,
      height: topViewWidth * canvasScale,
    }
  }, [canvasScale, topViewWidth])
  const canvasChangeScale = useMemo(() => {
    const width = defaultWidth
    // 计算新的缩放比例
    const scale = currentCanvasSize.width / width
    return scale
  }, [currentCanvasSize.width, defaultWidth])

  // console.log(`topWrapRef.clientHeight:`, topWrapRef.current?.clientHeight)
  // console.log(`topWrapRef.clientWidth:`, topWrapRef.current?.clientWidth)

  // console.log(`widthScale:`, widthScale)
  // console.log(`canvasScale:`, canvasScale)
  // console.log(`canvasChangeScale:`, canvasChangeScale)

  const handlePopupClick = (event) => {
    //因为写了点击其它区域关闭，所以这里做了阻止冒泡
    event.stopPropagation()
  }

  const saveCurrentCanvasData = useCallback(
    debounce(() => {
      try {
        const json = fabricCanvas.current?.toJSON() // your fabricCanvas reference

        if (json) {
          setFabricCanvasJsonStringList((list) => {
            const copyList = cloneDeep(list)
            copyList[index] = JSON.stringify(json)
            return copyList
          })
        }
      } catch (e) {
        console.log('simply saveCurrentCanvasData error', e)
      }
    }, 500), // 1秒内只执行第一次
    [index, setFabricCanvasJsonStringList],
  )

  const {
    initEvent,
    controlAddNewDiv,
    selectLength,
    setControlAddNewDiv,
    controlDiv,
    activeObject,
  } = useFunctionalityCommonFabricCanvasEvent({
    fabricCanvas,
    saveCurrentCanvasData,
    topWrapRef,
    canvasIndex: index,
    canvasNumber: canvasNumber,
    canvasChangeScale: canvasChangeScale,
  })

  const clickFalse = () => {
    setIsClick(false)
  }
  const clickTrue = () => {
    setIsClick(true)
  }

  // 补充遮罩在文字上面的逻辑 (对鼠标从文字到遮罩后的逻辑补充，不然这种情况选中不了遮罩) //TODO
  const handleCanvasMouseMove = useCallback(
    (event) => {
      // if (!fabricCanvas.current || !fabricCanvasRef.current) return
      // // console.log(`handleCanvasMouseMove`)
      // // console.log(`fabricCanvas.current`, fabricCanvas.current)
      // // console.log(`event`, event)
      // // console.log(`event111:`, event)
      // console.log(`widthScale:`, widthScale)
      // console.log(`canvasScale:`, canvasScale)
      // console.log(`canvasChangeScale:`, canvasChangeScale)
      // const canvasBoundingRect = fabricCanvasRef.current.getBoundingClientRect()

      // const mouseX = (event.clientX - canvasBoundingRect.left) / canvasScale
      // const mouseY = (event.clientY - canvasBoundingRect.top) / canvasScale
      // console.log(
      //   `mouseX:`,
      //   event.clientX - canvasBoundingRect.left,
      //   `mouseY:`,
      //   event.clientY - canvasBoundingRect.top,
      // )

      // const locate = { x: mouseX, y: mouseY }
      // const pointer = new fabric.Point(locate.x, locate.y)
      // console.log(`pointer123:`, pointer)
      // const objects = fabricCanvas.current.getObjects()
      // let isOverObject = false

      // objects.forEach((obj) => {
      //   if (obj.containsPoint(pointer)) {
      //     isOverObject = true
      //   }
      // })
      // console.log(`isOverObjectMousemove:`, isOverObject)

      // if (isOverObject && textLayerRef.current) {
      //   // 鼠标所在位置有对象，设置span的zIndex小
      //   textLayerRef.current.style.zIndex = '1'
      // } else if (!isOverObject && textLayerRef.current) {
      //   // 鼠标所在位置无对象，设置span的zIndex大
      //   // 移动端适配有问题，不做选中
      //   if (isMobile) {
      //     textLayerRef.current.style.zIndex = '1'
      //   } else textLayerRef.current.style.zIndex = '3'
      // }
    },
    [canvasScale, isMobile],
  )

  /**
   * 创建遮罩
   */
  const onAddObject = useCallback(
    async (
      canvasObject?: ICanvasObjectData,
      newObject?: any,
      isAutoObjectPosition?: boolean, //是否自动优化对象位置
      isAutoObjectDragPosition: boolean = true, //是否自动拖动对象位置
    ) => {
      try {
        if (!fabricCanvas.current) return

        handleNewObjectContinuousMouse(
          newObject,
          fabricCanvas,
          isAutoObjectDragPosition,
          topWrapRef,
          isMobile,
        ) //这里是新增对象并且鼠标可以连续点击的逻辑
        if (canvasObject && fabricCanvas.current) {
          setControlAddNewDiv(null)
          await onFabricAddObject(
            fabricCanvas,
            canvasObject,
            isAutoObjectPosition,
            isMobile,
          )

          return
        }
      } catch (e) {
        console.error('simply error', e)
      }
    },
    [isMobile, setControlAddNewDiv],
  )

  /**
   * 获取选中文本的区域，用来生成遮罩
   */
  const onSelectionChange = useCallback(
    debounce(() => {
      const selection = window.getSelection()
      if (selection) {
        const selectedText = selection.toString() // 获取选中的文本
        // console.log(`selectedText:`, selectedText)

        if (selectedText) {
          const range = selection.getRangeAt(0) // 获取选区的范围
          // console.log(`range:`, range)
          const rect = range.getBoundingClientRect()
          // console.log(`Selected range rect:`, rect)
          // 多个事件监听，只选中一个，其他的return
          const wrapContainer = document.querySelector(
            '.text-layer-' + index,
          ) as HTMLDivElement
          if (!wrapContainer) {
            setHighlighterPosition(undefined)
            return
          }
          const page = [
            {
              node: wrapContainer,
              number: 1,
            },
          ]
          const rects = getClientRects(range, page) // 调用 getClientRects 方法获取矩形区域
          // console.log(`rects:`, rects)
          if (!rects.length) {
            setHighlighterPosition(undefined)
            return
          }

          // 获取canvas和textLayer的位置信息
          const canvasRect = fabricCanvasRef.current?.getBoundingClientRect()

          // console.log(`topWrapRef.current:`, topWrapRef.current)

          if (canvasRect) {
            // 计算选中区域相对于canvas的位置
            const relativeX = rect.left - canvasRect?.left
            const relativeY = rect.top - canvasRect?.top
            setHighlighterPosition({
              height: rect.height / canvasChangeScale,
              width: rect.width / canvasChangeScale,
              left: relativeX / canvasChangeScale,
              top: relativeY / canvasChangeScale,
              pageNumber: index,
            })
          }
        } else {
          setHighlighterPosition(undefined)
        }
      } else {
        setHighlighterPosition(undefined)
      }
    }, 200),
    [topWrapRef, fabricCanvasRef, textLayerRef, canvasChangeScale],
  )

  /**
   * 监听文本选择事件
   * 监听鼠标点击取消事件，用来控制选择文本时松开才创建遮罩
   */
  useEffect(() => {
    document.addEventListener('selectionchange', onSelectionChange)
    if (isMobile) {
      document.addEventListener('touchstart', clickTrue)
      document.addEventListener('touchend', clickFalse)
    } else {
      document.addEventListener('mousedown', clickTrue)
      document.addEventListener('mouseup', clickFalse)
    }
    return () => {
      document.removeEventListener('selectionchange', onSelectionChange)
      if (isMobile) {
        document.removeEventListener('touchstart', clickTrue)
        document.removeEventListener('touchend', clickFalse)
      } else {
        document.removeEventListener('mousedown', clickTrue)
        document.removeEventListener('mouseup', clickFalse)
      }
    }
  }, [onSelectionChange, isMobile])

  // canvas跨页面添加，移动遮罩
  useEffect(() => {
    if (isInitEventEmitter.current) return
    isInitEventEmitter.current = true
    const handleNotify = (...args) => {
      onAddObject(...args)
    }
    eventEmitter.off(eventEmitterAddFabricIndexCanvasKey + index, handleNotify)
    // 订阅事件
    eventEmitter.on(eventEmitterAddFabricIndexCanvasKey + index, handleNotify)
  }, [index, onAddObject])

  /**
   * canvas层的控制以及事件
   */
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
          selection: true, //是否开启多选择
          statefull: true, //是否开启状态存储
          allowTouchScrolling: false, //是否允许触摸滚动
        })

        let isDrawing = false
        const handleMouseDown = (event: fabric.TPointerEvent | any) => {
          // 拖拽不触发
          if (!isMobile && event.e.buttons !== 1) {
            // 1 表示鼠标左键
            return // 如果不是鼠标左键刚刚按下，不执行任何操作
          }
          // 检查点击位置是否已有对象
          if (canvas.getActiveObject()) {
            return
          }

          const pointer = canvas.getPointer(event.e)
          const origX = pointer.x
          const origY = pointer.y
          isDrawing = true

          let left = origX
          let top = origY
          let width = 0
          let height = 0

          const handleMouseMove = (
            moveEvent: MouseEvent | TouchEvent | any,
          ) => {
            if (!isDrawing) return
            const movePointer = canvas.getPointer(moveEvent)
            const tempWidth = movePointer.x - origX
            const tempHeight = movePointer.y - origY
            if (tempWidth < 0) left = movePointer.x
            if (tempHeight < 0) top = movePointer.y
            height = Math.abs(tempHeight)
            width = Math.abs(tempWidth)
          }

          const handleMouseUp = () => {
            if (isDrawing) {
              isDrawing = false
              if (!(width === 0 || height === 0)) {
                console.log(`onAddObject`, {
                  x: left,
                  y: top,
                  width: width,
                  height: height,
                  fill: 'black',
                  id: uuidV4(),
                  type: 'redact',
                  value: '',
                })

                onAddObject({
                  x: left,
                  y: top,
                  width: width,
                  height: height,
                  fill: 'black',
                  id: uuidV4(),
                  type: 'redact',
                  value: '',
                })
              }

              window.removeEventListener('mousemove', handleMouseMove)
              window.removeEventListener('mouseup', handleMouseUp)
              window.removeEventListener('touchmove', handleMouseMove)
              window.removeEventListener('touchend', handleMouseUp)
            }
          }

          window.addEventListener('mousemove', handleMouseMove)
          window.addEventListener('mouseup', handleMouseUp)
          window.addEventListener('touchmove', handleMouseMove)
          window.addEventListener('touchend', handleMouseUp)
        }

        // 设置遮罩在文字上面的逻辑
        const handleCanvasMouseMove = (event) => {
          const pointer = canvas.getPointer(event.e)
          const objects = canvas.getObjects()
          let isOverObject = false
          // console.log(`pointerMouseOver:`, pointer)

          objects.forEach((obj) => {
            if (obj.containsPoint(pointer)) {
              isOverObject = true
            }
          })
          // console.log(`isOverObject:`, isOverObject)

          if (isOverObject && textLayerRef.current) {
            // 鼠标所在位置有对象，设置span的zIndex小
            textLayerRef.current.style.zIndex = '1'
          } else if (!isOverObject && textLayerRef.current) {
            // 鼠标所在位置无对象，设置span的zIndex大
            // 移动端适配有问题，不做选中
            if (isMobile) {
              textLayerRef.current.style.zIndex = '1'
            } else textLayerRef.current.style.zIndex = '3'
          }
        }

        canvas.on('mouse:down', handleMouseDown)
        canvas.on('mouse:move', handleCanvasMouseMove)
        canvas.on('mouse:over', (event) => {
          // console.log('mouse:over')
          const activeObject = event.target
          if (activeObject && activeObject instanceof fabric.Object) {
            activeObject.set('opacity', 0.4)
            canvas.renderAll()
          }
        })
        canvas.on('mouse:out', (event) => {
          // console.log('mouse:out')
          const activeObject = event.target
          if (activeObject && activeObject instanceof fabric.Object) {
            activeObject.set('opacity', 1)
            canvas.renderAll()
          }
        })
        const savedData = fabricCanvasJsonStringList[index] //获取保存的数据
        if (savedData) {
          canvas.loadFromJSON(savedData, canvas.renderAll.bind(canvas)) //加载数据
        }
        fabricCanvas.current = canvas
        canvas.renderAll()
        initEvent(fabricCanvas)
        if (!isMobile) return //移动端需要的滚动逻辑
        // fabricMobileMove(fabricCanvas.current)
        return () => {
          saveCurrentCanvasData()
        }
      }
    } catch (e) {
      console.error('simply Init error', e)
    }
  }, [canvasScale, fabricCanvasJsonStringList, index, initEvent, isMobile])

  // 设置canvas缩放比例
  useEffect(() => {
    if (fabricCanvas.current) {
      fabricCanvas.current.setDimensions({
        width: currentCanvasSize.width,
        height: currentCanvasSize.height,
      })

      fabricCanvas.current.setZoom(canvasChangeScale) // 设置缩放比例
      setFabricCanvasZoomRecoil(canvasChangeScale)
      fabricCanvas.current.renderAll() // 重新渲染画布
      saveCurrentCanvasData()
    }
  }, [
    topViewWidth,
    canvasScale,
    currentCanvasSize.width,
    currentCanvasSize.height,
    defaultWidth,
    canvasChangeScale,
    setFabricCanvasZoomRecoil,
    saveCurrentCanvasData,
  ])

  // 加载pdf文字信息
  useEffect(() => {
    if (textLayerRef.current && pdfInfo?.page && !initRenderTextLayer.current) {
      initRenderTextLayer.current = true
      const pageViewport = pdfInfo.page.getViewport({
        scale: 1,
      }) //获取页面视图信息
      pdfjs.renderTextLayer({
        textContentSource: pdfInfo.textContent,
        container: textLayerRef.current,
        viewport: pageViewport,
      })
    }
  }, [pdfInfo, topWrapRef.current?.clientWidth])

  // 创建文本选择遮罩
  useEffect(() => {
    if (highlighterPosition && highlighterPosition && isClick === false) {
      const { left, top, width, height } = highlighterPosition
      onAddObject({
        x: left,
        y: top,
        width: width,
        height: height,
        fill: 'black',
        id: uuidV4(),
        type: 'redact',
        value: '',
      })
      if (window) {
        const selection = window.getSelection()
        // 清除用户的选择
        if (selection) {
          selection.removeAllRanges()
        }
      }
    }
  }, [highlighterPosition, isClick])

  useEffect(() => {
    document.addEventListener('mousemove', handleCanvasMouseMove)
    return () => {
      document.removeEventListener('mousemove', handleCanvasMouseMove)
    }
  }, [handleCanvasMouseMove])

  return (
    <Box
      className={`FunctionalityOperateFabricCanvas-${index}`}
      sx={{
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        position: 'relative',
        touchAction: 'none',
      }}
      ref={topWrapRef}
    >
      {/* canvas层 */}
      <Box
        sx={{
          width: currentCanvasSize.width,
          height: currentCanvasSize.height, //PDF 原来的高度
          transformOrigin: 'top left', // 变形基点在右上角
          border: '1px solid #e8e8e8',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <canvas width='500' height='500' ref={fabricCanvasRef} />
      </Box>

      {/* 文字层 */}
      <Box
        ref={textLayerRef}
        className={`textLayer text-layer-${index}`}
        sx={{
          // width: currentCanvasSize.width,
          // height: currentCanvasSize.height, //PDF 原来的高度
          transformOrigin: 'top left',
          border: '1px solid #e8e8e8',
          position: 'relative',
          '--scale-factor': widthScale,
          pointerEvents: 'none',
          span: {
            pointerEvents: 'auto',
          },
        }}
      ></Box>

      {/* 删除弹窗 */}
      {controlDiv && activeObject && selectLength === 1 && (
        <Box onMouseDown={handlePopupClick}>
          <FunctionalityCommonOperateFabricToolsPopup
            key={(activeObject as any).id}
            controlDiv={controlDiv}
            scaleFactor={canvasChangeScale}
            editor={fabricCanvas}
            isMobileFollow={true}
          />
        </Box>
      )}
    </Box>
  )
}
export default FunctionalityOperateFabricCanvas
