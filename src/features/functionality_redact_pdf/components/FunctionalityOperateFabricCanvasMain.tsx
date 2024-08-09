/* eslint-disable no-debugger */
import { Box } from '@mui/material'
import * as fabric from 'fabric'
import { cloneDeep, debounce } from 'lodash-es'
import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react'
import { useRecoilState } from 'recoil'
import { v4 as uuidV4 } from 'uuid'

import FunctionalityCommonOperateFabricToolsPopup from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/components/FunctionalityCommonOperateCanvas/FunctionalityCommonOperateFabricCanvas/FunctionalityCommonOperateFabricToolsPopup'
import { useFunctionalityCommonFabricCanvasEvent } from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/hooks/useFunctionalityCommonFabricCanvasEvent'
import {
  fabricCanvasJsonStringListRecoil,
  fabricCanvasZoomRecoil,
} from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/store/setOperateFabricCanvas'
import { ICanvasObjectData } from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/types/index'
import eventEmitter, {
  eventEmitterAddFabricIndexCanvasKey,
} from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/utils/FabricCanvas/eventEmitter'
import {
  fabricInitStyleSet,
  onFabricAddObject,
} from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/utils/FabricCanvas/fabricCanvasNewAdd'
import { fabricMobileMove } from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/utils/FabricCanvas/fabricMobileMove'
import { handleNewObjectContinuousMouse } from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/utils/FabricCanvas/handleNewObjectContinuousMouse'
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
}
const FunctionalityOperateFabricCanvas: FC<
  IFunctionalityOperateFabricCanvasProps
> = ({
  canvasScale,
  defaultWidth = 2000,
  index,
  canvasNumber,
  fabricCanvasJsonStringList,
}) => {
  const isMobile = useFunctionalityCommonIsMobile()

  const [, setFabricCanvasJsonStringList] = useRecoilState(
    fabricCanvasJsonStringListRecoil,
  )
  const [, setFabricCanvasZoomRecoil] = useRecoilState(fabricCanvasZoomRecoil)
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
    const width = defaultWidth
    // 计算新的缩放比例
    const scale = currentCanvasSize.width / width
    return scale
  }, [currentCanvasSize.width, defaultWidth])

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

        let isDrawing = false
        const handleMouseDown = (event: fabric.TPointerEvent | any) => {
          console.log(`canvas.getActiveObject():`, canvas.getActiveObject())
          console.log(`event.e.buttons:`, event.e.buttons)
          const isTouchEvent = event.e.type.includes('touch')
          console.log(`event.e.type:`, event.e.type)

          // 拖拽不触发
          if (event.e.buttons !== 1) {
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

          const handleMouseMove = (moveEvent: MouseEvent | TouchEvent | any) => {
            console.log(`handleMouseMoveevent.e.type:`, moveEvent);
            
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
              // window.removeEventListener('touchmove', handleMouseMove)
              // window.removeEventListener('touchend', handleMouseUp)
            }
          }

          window.addEventListener('mousemove', handleMouseMove)
          window.addEventListener('mouseup', handleMouseUp)
          // window.addEventListener('touchmove', handleMouseMove)
          // window.addEventListener('touchend', handleMouseUp)
          // canvas.on('mouse:move', handleMouseMove);
        }

        canvas.on('mouse:down', handleMouseDown)
        canvas.on('mouse:over', (event) => {
          console.log('mouse:over')
          const activeObject = event.target
          if (activeObject && activeObject instanceof fabric.Object) {
            activeObject.set('opacity', 0.4)
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

        const savedData = fabricCanvasJsonStringList[index] //获取保存的数据
        if (savedData) {
          canvas.loadFromJSON(savedData, canvas.renderAll.bind(canvas)) //加载数据
        }
        fabricCanvas.current = canvas
        canvas.renderAll()
        initEvent(fabricCanvas)
        if (!isMobile) return //移动端需要的滚动逻辑
        fabricMobileMove(fabricCanvas.current)
        return () => {
          saveCurrentCanvasData()
        }
      }
    } catch (e) {
      console.error('simply Init error', e)
    }
  }, [canvasScale, fabricCanvasJsonStringList, index, initEvent, isMobile])

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
  // const handlePopupClick = (event) => {
  //   //因为写了点击其它区域关闭，所以这里做了阻止冒泡
  //   event.stopPropagation()
  // }
  //关闭弹窗
  // const onCloseAddToolsPopup = () => {
  //   setControlAddNewDiv(null)
  // }
  return (
    <Box
      className='FunctionalityOperateFabricCanvas'
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
      {!isMobile && controlDiv && activeObject && selectLength === 1 && (
        <Box onMouseDown={handlePopupClick}>
          <FunctionalityCommonOperateFabricToolsPopup
            key={(activeObject as any).id}
            controlDiv={controlDiv}
            scaleFactor={canvasChangeScale}
            editor={fabricCanvas}
          />
        </Box>
      )}
      {/* {!isMobile &&
        selectLength === 0 &&
        controlAddNewDiv &&
        fabricCanvas.current && (
          <Box onMouseDown={handlePopupClick}>
            <FunctionalitySignPdfShowPdfViewAddToolsPopup
              controlDivPosition={controlAddNewDiv}
              scaleFactor={1}
              editor={fabricCanvas}
              onClose={onCloseAddToolsPopup}
            />
          </Box>
        )} */}
    </Box>
  )
}
export default FunctionalityOperateFabricCanvas
