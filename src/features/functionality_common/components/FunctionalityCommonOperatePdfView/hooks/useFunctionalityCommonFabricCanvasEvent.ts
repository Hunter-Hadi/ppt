/* eslint-disable no-debugger */
import * as fabric from 'fabric'
import { cloneDeep, without } from 'lodash-es'
import { useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import useFunctionalityCommonIsMobile from '@/features/functionality_common/hooks/useFunctionalityCommonIsMobile'

import { currentScrollOffsetRecoil } from '../store'
import {
  fabricCanvasSignObjectListRecoil,
  TopDetailSignPdfSelectInfoContext,
} from '../store/setOperateFabricCanvas'
import { checkAndMoveToAnotherCanvas } from '../utils/FabricCanvas/checkAndMoveToAnotherCanvas'
import { constrainWithinCanvas } from '../utils/FabricCanvas/constrainWithinCanvas'
import { KeyboardOperationEvents } from '../utils/FabricCanvas/KeyboardOperationEvents'
import { monitorGlobalClickEvents } from '../utils/FabricCanvas/monitorGlobalClickEvents'
// import { checkAndMoveToAnotherCanvas } from '../components/FunctionalityCommonOperatePdfView/utils/FabricCanvas/checkAndMoveToAnotherCanvas'
// import { constrainWithinCanvas } from '../components/FunctionalityCommonOperatePdfView/utils/FabricCanvas/constrainWithinCanvas'
export interface IControlDiv {
  left: number
  top: number
  windowLeft: number
  windowTop: number
}
export const useFunctionalityCommonFabricCanvasEvent = (props: {
  fabricCanvas: React.MutableRefObject<fabric.Canvas | null>
  saveCurrentCanvasData: () => void
  topWrapRef: React.MutableRefObject<HTMLElement | null>
  canvasIndex: number
  canvasNumber: number
  canvasChangeScale: number
}) => {
  const {
    fabricCanvas,
    topWrapRef,
    canvasIndex,
    canvasNumber,
    canvasChangeScale,
  } = props
  const isMobile = useFunctionalityCommonIsMobile()
  const TopDetailInfoContext = useContext(TopDetailSignPdfSelectInfoContext)
  const scrollPositionNumber = useRecoilValue(currentScrollOffsetRecoil)

  const previousIsSelectionObject = useRef<boolean>(false) //上一次点击是否是选中对象状态
  const [controlAddNewDiv, setControlAddNewDiv] = useState<IControlDiv | null>(
    null,
  ) // 当前选中对象的位置
  const [selectLength, setSelectLength] = useState<number>(0) //选中对象的数量
  const [activeObject, setActiveObject] = useState<fabric.Object | undefined>(
    undefined,
  ) // 当前选中对象信息
  const [controlDiv, setControlDiv] = useState<IControlDiv | null>(null) // 当前选中对象的位置

  const setFabricCanvasSignObjectListRecoil = useSetRecoilState(
    fabricCanvasSignObjectListRecoil,
  )

  useEffect(() => {
    if (isMobile && controlDiv) {
      TopDetailInfoContext.setViewObjectToolsData({
        controlDiv: controlDiv,
        scaleFactor: canvasChangeScale,
        editor: fabricCanvas,
      })
    } else {
      TopDetailInfoContext.setViewObjectToolsData(null)
    }
  }, [controlDiv, isMobile, fabricCanvas])
  const closeOpenAllPopup = useCallback(() => {
    //滚动后取消一些事件
    setControlDiv(null)
    setSelectLength(0)
    fabricCanvas.current?.discardActiveObject() // 取消选中状态
    fabricCanvas.current?.requestRenderAll() // 刷新画布以显示更改
    const activeObjects = fabricCanvas.current?.getActiveObjects()
    if (activeObjects) {
      previousIsSelectionObject.current = false
    }
    setControlAddNewDiv(null)
  }, [fabricCanvas])
  useEffect(() => {
    console.log('simply handleObjectSelected 3')
    closeOpenAllPopup() //滚动后取消一些事件
  }, [scrollPositionNumber])
  useEffect(() => {
    KeyboardOperationEvents(fabricCanvas) //键盘事件
  }, [fabricCanvas])
  useEffect(() => {
    console.log('simply handleObjectSelected 4')

    monitorGlobalClickEvents(topWrapRef, closeOpenAllPopup) //全局点击事件
  }, [topWrapRef])
  const changObjectToList = (object: fabric.Object, type: 'add' | 'del') => {
    if (object.type !== 'image') return //只有图片才算正式签名对象
    console.log('simply object13', object)
    setFabricCanvasSignObjectListRecoil((prevObjectIdList) => {
      const copyPrevObjectIdList = cloneDeep(prevObjectIdList)
      if (type === 'add') {
        return [...copyPrevObjectIdList, (object as any).id]
      } else {
        return without(copyPrevObjectIdList, (object as any).id)
      }
    })
  }
  const handleObjectSelected = (object?: fabric.Object) => {
    //选中对象时调用，更新操作div位置
    try {
      previousIsSelectionObject.current = true

      setActiveObject(object)
      if (object) {
        const topWrapRefRect = topWrapRef.current?.getBoundingClientRect()
        setControlDiv({
          left: object.left,
          top: object.top,
          windowLeft: topWrapRefRect?.x || 0,
          windowTop: topWrapRefRect?.y || 0,
        })
      } else {
        console.log('simply handleObjectSelected 1')
        setControlDiv(null)
      }
    } catch (e) {
      console.log('simply error', e)
    }
  }

  const initEvent = (
    fabricCanvas: React.MutableRefObject<fabric.Canvas | null>,
  ) => {
    if (!fabricCanvas.current) return
    // 保存原始的 renderAll 方法
    const originalRenderAll = fabricCanvas.current.renderAll.bind(
      fabricCanvas.current,
    )

    // 重写 renderAll 方法
    fabricCanvas.current.renderAll = function () {
      // 在这里添加你想要执行的逻辑
      console.log('RenderAll 被调用')
      props.saveCurrentCanvasData()
      // 调用原始的 renderAll 方法
      originalRenderAll()
    }
    // 对象添加
    fabricCanvas.current.on('object:modified', function (options) {
      console.log('一个对象被object:modified')
      props.saveCurrentCanvasData()
    })
    // 对象添加
    fabricCanvas.current.on('object:added', function (options) {
      changObjectToList(options.target, 'add')
      props.saveCurrentCanvasData()
    })
    // 对象删除
    fabricCanvas.current.on('object:removed', function (options) {
      console.log('一个对象被移除', options.target)
      changObjectToList(options.target, 'del')
      props.saveCurrentCanvasData()
    })
    //鼠标抬起事件
    fabricCanvas.current.on('mouse:up', function (event) {
      if (event.target) {
        //当前选中了对象，不打开ControlAddNewDiv
        previousIsSelectionObject.current = true
        setControlAddNewDiv(null)
        return
      }
      if (previousIsSelectionObject.current) {
        //上一个是选中对象，不打开ControlAddNewDiv
        previousIsSelectionObject.current = false
        setControlAddNewDiv(null)
        return
      }
      previousIsSelectionObject.current = true
      const topWrapRefRect = topWrapRef.current?.getBoundingClientRect()
      setControlAddNewDiv(() => {
        return {
          left: event.pointer.x,
          top: event.pointer.y,
          windowLeft: topWrapRefRect?.x || 0,
          windowTop: topWrapRefRect?.y || 0,
        }
      })
    })
    // 对象选中监听
    fabricCanvas.current.on('selection:created', function (event) {
      setSelectLength(event.selected.length)
      if (event.selected.length > 0) {
        previousIsSelectionObject.current = true
      }
      if (event.selected.length === 1) {
        handleObjectSelected(event.selected[0])
      }
    })

    fabricCanvas.current.on('object:moving', function (e) {
      e.e.preventDefault()
      // 对象移动监听 - 保证操作div跟随移动
      const targetObject = e.target
      targetObject.setCoords()
      constrainWithinCanvas(targetObject)
      if (e.target) {
        handleObjectSelected(e.target)
      }
      checkAndMoveToAnotherCanvas(e, fabricCanvas, canvasIndex, canvasNumber)
    })
    // 对象移动监听 - 保证操作div跟随移动
    fabricCanvas.current.on('object:scaling', function (e) {
      e.e.preventDefault()
      console.log('handleObjectSelected 3')

      handleObjectSelected(e.target)
    })

    // 确保再次选择时移动操作div
    fabricCanvas.current.on('selection:updated', function (event) {
      console.log('simply selection:updated', event)
      if (event.selected.length > 0) {
        previousIsSelectionObject.current = true
      }
      if (event.selected.length === 1) {
        console.log('handleObjectSelected 4')

        handleObjectSelected(event.selected[0])
      }
    })
    // 确保再次选择时移动操作div
    fabricCanvas.current.on('selection:cleared', function (event) {
      console.log('simply selection:cleared', event)
      if (event.deselected) {
        setSelectLength(0)
      }

      handleObjectSelected()
    })
  }

  return {
    initEvent,
    controlAddNewDiv,
    selectLength,
    setControlAddNewDiv,
    controlDiv,
    activeObject,
  }
}
