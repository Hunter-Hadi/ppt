/**
 * 查找指定元素的父级，并获取其 top 值
 * @param {HTMLElement} element - 查找的起始元素
 * @param {string} targetClass - 要查找的目标 class 名称
 * @param {number} maxLevels - 最多向上查找的层级
 * @returns {number} - 返回找到的父元素的 top 值，如果没有找到则返回 0
 */
function getParentTopByClass(element, targetClass, maxLevels) {
  let currentElement = element
  let levelCount = 0 // 设置级别计数器

  // 向上查找，直到找到指定 class 的元素或达到最大级别
  while (currentElement && levelCount < maxLevels) {
    if (currentElement.classList?.contains(targetClass)) {
      return parseInt(currentElement.style.top || '0') // 返回找到元素的 top 值
    }
    currentElement = currentElement.parentNode // 移动到上一个父元素
    levelCount++ // 计数器 +1
  }

  // 如果没有找到目标类的父元素，返回 0
  return 0
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
  //functionality-sign-pdf-scroll-pagination-page-item
  // 使用示例
  const paginationPageItemTop = getParentTopByClass(
    wrapElement,
    'functionality-sign-pdf-scroll-pagination-page-item',
    10,
  )
  const wrapRect = wrapElement.getBoundingClientRect() //获取wrapElement的位置
  const wrapCenterX = wrapRect.width / 2

  const centerYInRolling = paginationPageItemTop - currentScrollOffset - centerY //PDF视图距离-滚动的位置-视口中心点=PDF视图中心点

  return {
    positionInRollingX: wrapCenterX,
    positionInRollingY: -centerYInRolling,
  }
}
