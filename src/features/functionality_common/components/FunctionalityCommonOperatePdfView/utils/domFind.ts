export const getParentTopByClass = (element, targetClass, maxLevels) => {
  let currentElement = element
  let levelCount = 0 // 设置级别计数器

  // 向上查找，直到找到指定 class 的元素或达到最大级别
  while (currentElement && levelCount < maxLevels) {
    if (currentElement.classList?.contains(targetClass)) {
      return currentElement
    }
    currentElement = currentElement.parentNode // 移动到上一个父元素
    levelCount++ // 计数器 +1
  }

  // 如果没有找到目标类的父元素，返回 0
  return 0
}
