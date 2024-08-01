// 辅助函数：得到文字的实际边界
export const getCanvasBounds = (imageData) => {
  const data = imageData.data
  const width = imageData.width
  const height = imageData.height
  let minX = width,
    minY = height,
    maxX = 0,
    maxY = 0

  for (let x = 0; x < width; x++) {
    for (let y = 0; y < height; y++) {
      const alpha = data[(width * y + x) * 4 + 3]
      if (alpha > 0) {
        if (x < minX) minX = x
        if (x > maxX) maxX = x
        if (y < minY) minY = y
        if (y > maxY) maxY = y
      }
    }
  }

  return { minX, maxX, minY, maxY }
}
export const getWrapElementCenterRelativeToRollingElement = (
  rollingElement: HTMLElement,
  wrapElement: HTMLElement,
  currentScrollOffset: number, //滚动的位置
) => {
  if (!rollingElement || !wrapElement) {
    return { positionInRollingX: 0, positionInRollingY: 0 }
  }

  // // 获取 rollingElement 的尺寸和滚动相关的信息
  const rollingRect = rollingElement.getBoundingClientRect()
  const rollingHeight = rollingRect.height

  // // 计算 rollingElement 的可视中心点位置
  const centerY = rollingHeight / 2 // 视口中的中心点

  const wrapElementParent = wrapElement.parentNode?.parentNode?.parentElement
  const wrapElementParentTop = parseInt(wrapElementParent?.style.top || '0') //距离滚动视图顶部的距离
  const wrapRect = wrapElement.getBoundingClientRect() //获取wrapElement的位置
  const wrapCenterX = wrapRect.width / 2

  const centerYInRolling = wrapElementParentTop - currentScrollOffset - centerY //PDF视图距离-滚动的位置-视口中心点=PDF视图中心点

  return {
    positionInRollingX: wrapCenterX,
    positionInRollingY: -centerYInRolling,
  }
}
