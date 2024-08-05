import { DragEndEvent, DragStartEvent } from '@dnd-kit/core'
import { useState } from 'react'
import { v4 as uuidV4 } from 'uuid'

import { eventEmitterAddFabricIndexCanvas } from '../utils/eventEmitter'

const useFunctionalityEditDndContextHandle = (props: {
  onStart?: (event: DragStartEvent) => void
  onEnd?: (event: DragEndEvent) => void
}) => {
  const [activeData, setActiveData] = useState<{
    width: number
    height: number
  } | null>(null)
  const onDragStart = (event: DragStartEvent) => {
    console.log('onDragStart', event)
    setActiveData({ width: 100, height: 50 })
  }

  const findScrollViewPostion = (event) => {
    //找到视图的xy
    const { delta, over, active } = event
    if (!over?.rect) return
    const rollingView = document.querySelector(
      '.functionality-common-pdf-rolling-view',
    )
    const droppableElement = document.getElementById(active.id as string)
    const activeRect = droppableElement?.getBoundingClientRect()
    over.rect.width = 100
    over.rect.height = 50
    const pdfIndex = over.data.current.pdfIndex
    const signaturePositionData = {
      width: over.rect.width,
      height: over.rect.height,
      pdfIndex,
      id: uuidV4(),
      ...(active.data.current as {
        value: string
      }),
    }
    const distanceX =
      over.rect.width +
      over.rect.left -
      (activeRect?.left || 0) -
      (activeRect?.width || 0) / 2 //拖动和放置 div之间的距离
    const newSignaturePosition = {
      x: over.rect.width + delta.x - distanceX - (rollingView?.scrollLeft || 0), //左边的宽度➕鼠标移动的距离-相差的距离-滚动条的距离
      y:
        (activeRect?.top || 0) -
        over.rect.top +
        delta.y -
        (rollingView?.scrollTop || 0), //拖动的元素的顶部距离-目标元素的顶部距离+鼠标移动的距离+滚动的距离
    } //得到scroll中的位置
    eventEmitterAddFabricIndexCanvas(pdfIndex, {
      ...signaturePositionData,
      ...newSignaturePosition,
    })
  }
  const onDragEnd = (event: DragEndEvent) => {
    console.log('onDragEnd', event)
    setActiveData(null)
    props?.onEnd && props.onEnd(event)
    const moveData = event.active.data.current
    findScrollViewPostion(event)
  }
  return {
    activeData,
    onDragStart,
    onDragEnd,
  }
}
export default useFunctionalityEditDndContextHandle
