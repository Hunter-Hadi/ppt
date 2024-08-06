import * as fabric from 'fabric'
import { cloneDeep, without } from 'lodash-es'
import { useRef, useState } from 'react'
import { useSetRecoilState } from 'recoil'

import { fabricCanvasSignObjectListRecoil } from '../components/FunctionalityCommonOperatePdfView/store/setOperateFabricCanvas'
import { constrainWithinCanvas } from '../components/FunctionalityCommonOperatePdfView/utils/FabricCanvas/constrainWithinCanvas'
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
  const { fabricCanvas, topWrapRef, canvasIndex, canvasNumber } = props
  const viewScale = 1 / props.canvasChangeScale
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
  const changObjectToList = (object: fabric.Object, type: 'add' | 'del') => {
    if (object.type !== 'image') return //只有图片才算正式签名对象
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
        console.log('handleObjectSelected 1')
        handleObjectSelected(event.selected[0])
      }
    })

    fabricCanvas.current.on('object:moving', function (e) {
      e.e.preventDefault()
      // 对象移动监听 - 保证操作div跟随移动
      const targetObject = e.target
      targetObject.setCoords()
      constrainWithinCanvas(targetObject)
      console.log('handleObjectSelected 2')
      if (e.target) {
        handleObjectSelected(e.target)
      }
      // checkAndMoveToAnotherCanvas(e, fabricCanvas, canvasIndex, canvasNumber)
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
      console.log('handleObjectSelected 4')

      handleObjectSelected()
    })
  }

  return {
    initEvent,
    controlAddNewDiv,
    selectLength,
    setControlAddNewDiv,
  }
}
