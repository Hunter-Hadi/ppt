/* eslint-disable no-debugger */
import { Box } from '@mui/material'
import * as fabric from 'fabric'
import { cloneDeep, debounce } from 'lodash-es'
import React, { FC, useCallback, useEffect, useMemo, useRef } from 'react'
import { useRecoilState } from 'recoil'

import { useFunctionalityCommonElementSize } from '@/features/functionality_common/hooks/useFunctionalityCommonElementSize'
import useFunctionalityCommonIsMobile from '@/features/functionality_common/hooks/useFunctionalityCommonIsMobile'

import { useFunctionalityCommonFabricCanvasEvent } from '../../../hooks/useFunctionalityCommonFabricCanvasEvent'
import {
  fabricCanvasJsonStringListRecoil,
  fabricCanvasZoomRecoil,
} from '../../../store/setOperateFabricCanvas'
import { ICanvasObjectData } from '../../../types'
import eventEmitter, {
  eventEmitterAddFabricIndexCanvasKey,
} from '../../../utils/FabricCanvas/eventEmitter'
import {
  fabricInitStyleSet,
  onFabricAddObject,
} from '../../../utils/FabricCanvas/fabricCanvasNewAdd'
import { fabricMobileMove } from '../../../utils/FabricCanvas/fabricMobileMove'
import { handleNewObjectContinuousMouse } from '../../../utils/FabricCanvas/handleNewObjectContinuousMouse'
import FunctionalitySignPdfShowPdfViewAddToolsPopup from './FunctionalityCommonOperateAddToolsPopup'
import FunctionalityCommonOperateFabricToolsPopup from './FunctionalityCommonOperateFabricToolsPopup'
export interface IControlDiv {
  left: number
  top: number
  windowLeft: number
  windowTop: number
}

interface IFunctionalityCommonOperateFabricCanvasProps {
  canvasScale: number //width/height 比例 100%填充并且不变形
  maxEnlarge?: number //最大放大，防止之前的放大，会大过canvas的宽高
  defaultWidth: number
  index: number
  canvasNumber: number
  fabricCanvasJsonStringList: string[]
}
const FunctionalityCommonOperateFabricCanvas: FC<
  IFunctionalityCommonOperateFabricCanvasProps
> = ({
  canvasScale,
  maxEnlarge = 1.5,
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

  const saveCurrentCanvasData = useCallback(
    debounce(() => {
      try {
        console.log('saveCurrentCanvasData')
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
    }, 50), // 1秒内只执行第一次
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
        const savedData = fabricCanvasJsonStringList[index] //获取保存的数据
        if (savedData) {
          canvas.loadFromJSON(savedData, canvas.renderAll.bind(canvas)) //加载数据
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
  const handlePopupClick = (event) => {
    //因为写了点击其它区域关闭，所以这里做了阻止冒泡
    event.stopPropagation()
  }
  //关闭弹窗
  const onCloseAddToolsPopup = () => {
    setControlAddNewDiv(null)
  }
  return (
    <Box
      className='FunctionalityCommonOperateFabricCanvas'
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
      {!isMobile &&
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
        )}
    </Box>
  )
}
export default FunctionalityCommonOperateFabricCanvas
