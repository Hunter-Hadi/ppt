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
const getElementGlobalOffset = (el: HTMLElement) => {
  return { offsetX: el.offsetLeft, offsetY: el.offsetTop }
}
export const getWrapElementCenterRelativeToRollingElement = (
  rollingElement: HTMLElement,
  wrapElement: HTMLElement,
  currentScrollOffset: number, //滚动的位置
) => {
  if (!rollingElement || !wrapElement) {
    return { positionInRollingX: 0, positionInRollingY: 0 }
  }

  // 获取 rollingElement 的尺寸和滚动相关的信息
  const rollingRect = rollingElement.getBoundingClientRect()
  const rollingWidth = rollingRect.width
  const rollingHeight = rollingRect.height

  // 计算 rollingElement 的可视中心点位置
  const centerX = rollingRect.left + rollingWidth / 2
  const centerY = rollingRect.top + rollingHeight / 2 // 视口中的中心点

  // 获取当前滚动位置
  const currentScrollTop = rollingElement.scrollTop + currentScrollOffset

  // 获取 wrapElement 的位置
  const wrapRect = wrapElement.getBoundingClientRect()

  // 计算 wrapElement 的中心点
  const wrapCenterX = wrapRect.left + wrapRect.width / 2
  const wrapCenterY = wrapRect.top + wrapRect.height / 2

  // 计算 wrapElement 的相对位置
  const positionInRollingX = wrapCenterX - (rollingRect.left + rollingWidth / 2) // wrapElement X 相对滚动区域中心
  const positionInRollingY =
    wrapCenterY - (currentScrollTop + (rollingRect.top + rollingHeight / 2)) // wrapElement Y 相对滚动区域中心

  // 返回 wrapElement 相对于 rollingElement 可视中心的坐标
  return {
    positionInRollingX: positionInRollingX,
    positionInRollingY: positionInRollingY,
  }
}
