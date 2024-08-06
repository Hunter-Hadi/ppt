import * as fabric from 'fabric' // 确保导入你使用的 fabric.js

// 删除对象的 ID 列表
const deleteObjectKey = {
  current: [] as string[],
}

// 画布信息
interface FabricCanvas {
  height: number
}

// 对象移动方法类型定义
type AddPositionType = 'top' | 'bottom'

// 添加克隆对象到指定索引的方法（假设实现）
const addIndexObject = (clone: fabric.Object, index: number): void => {
  // 实际的实现逻辑需要根据你的需求来定义
  console.log(`Adding object to canvas at index: ${index}`, clone)
}

// 移动对象到另一个画布的主方法
const moveToAnotherCanvas = (
  fabricCanvas: React.RefObject<FabricCanvas | null>,
  targetObject: fabric.Object,
  addPositionType: AddPositionType,
  canvasIndex: number,
): void => {
  const id = (targetObject as unknown as { id: string }).id
  if (deleteObjectKey.current.includes(id)) return // 已经删除的对象不再处理
  deleteObjectKey.current.push(id) // 防止重复删除

  targetObject.canvas?.remove(targetObject) // 从当前画布中移除对象

  if (addPositionType === 'bottom') {
    moveObjectToBottom(targetObject, canvasIndex)
  } else if (addPositionType === 'top') {
    moveObjectToTop(fabricCanvas, targetObject, canvasIndex)
  }
}

// 将对象移动到底部的方法
const moveObjectToBottom = (
  targetObject: fabric.Object,
  canvasIndex: number,
): void => {
  targetObject.set('top', 0)
  targetObject.top = 0

  targetObject.clone().then((clone: fabric.Object) => {
    clone.set({ top: 0 })
    addIndexObject(clone, canvasIndex + 1) // 将克隆对象添加到下一个画布
  })
}

// 将对象移动到顶部的方法
const moveObjectToTop = (
  fabricCanvas: React.RefObject<FabricCanvas | null>,
  targetObject: fabric.Object,
  canvasIndex: number,
): void => {
  targetObject.clone().then((clone: fabric.Object) => {
    if (fabricCanvas.current?.height) {
      clone.set({
        top:
          fabricCanvas.current.height -
          targetObject.height * targetObject.scaleY,
      })
    }
    addIndexObject(clone, canvasIndex - 1) // 将克隆对象添加到上一个画布
  })
}

// 检查并移动对象到另一个画布的方法
const checkAndMoveToAnotherCanvas = (
  event: {
    target: fabric.Object
    pointer: { y: number }
  },
  fabricCanvas: React.RefObject<FabricCanvas | null>, // 画布信息
  canvasIndex: number, // 当前画布索引
  canvasNumber: number, // 总画布数量
): void => {
  const targetObject = event.target
  const pointerY = event.pointer.y
  const id = (targetObject as unknown as { id: string }).id

  if (deleteObjectKey.current.includes(id)) return

  const canvasBounds = {
    height: fabricCanvas.current?.height || 0,
  }
  const objBounds = targetObject.getBoundingRect()
  let addPositionType: AddPositionType | null = null
  const intervalTriggerDistance = 100 // 触发间隔距离

  // 检查是否移动到了上面的边缘
  if (objBounds.top < -intervalTriggerDistance && canvasIndex !== 0) {
    addPositionType = 'top'
  }
  // 检查是否移动到了下面的边缘
  else if (
    canvasBounds.height &&
    pointerY > canvasBounds.height + intervalTriggerDistance &&
    objBounds.top + objBounds.height >
      canvasBounds.height + intervalTriggerDistance &&
    canvasIndex !== canvasNumber - 1
  ) {
    addPositionType = 'bottom'
  }

  // 如果确定要移动到另一个画布
  if (addPositionType !== null) {
    moveToAnotherCanvas(
      fabricCanvas,
      targetObject,
      addPositionType,
      canvasIndex,
    )
  }
}

export { checkAndMoveToAnotherCanvas, moveToAnotherCanvas }
