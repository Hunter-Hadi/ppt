import * as fabric from 'fabric'

export const KeyboardOperationEvents = (
  fabricCanvas: React.MutableRefObject<fabric.Canvas | null>,
) => {
  if (fabricCanvas.current) {
    const handleKeyDown = (event) => {
      try {
        // 检查当前焦点元素
        const activeElement = document.activeElement
        const isInputFocused =
          activeElement &&
          (activeElement.tagName === 'INPUT' ||
            activeElement.tagName === 'TEXTAREA')

        // 如果当前焦点在输入框内，退出函数，不执行后续的删除逻辑
        if (isInputFocused) {
          return
        }
        if (event.key === 'Delete' || event.key === 'Backspace') {
          const activeObjects = fabricCanvas.current?.getActiveObjects()
          if (activeObjects && activeObjects.length !== 0) {
            // 循环并逐个移除
            activeObjects.forEach(function (object) {
              fabricCanvas.current?.remove(object)
            })
            fabricCanvas.current?.discardActiveObject() // 取消选中状态
            fabricCanvas.current?.requestRenderAll() // 刷新画布以显示更改
          }
        }
      } catch (e) {
        console.log('simply error', e)
      }
    }
    // 添加事件监听
    window.addEventListener('keydown', handleKeyDown)
    // 清理函数
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }
}
