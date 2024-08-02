import { MutableRefObject, useEffect, useState } from 'react'

// 一个ref div，的最新高度宽度
export const useFunctionalityCommonElementSize = (
  ref: MutableRefObject<HTMLElement | null>,
) => {
  // 创建一个ref来引用想要测量的元素
  // 创建一个state来存储宽度值
  const [width, setWidth] = useState(700)
  const [height, setHeight] = useState(700)

  useEffect(() => {
    // 判断元素是否存在
    if (ref?.current) {
      // 定义一个更新宽度的函数
      const updateWidth = () => {
        window.scrollTo(0, 0)
        if (ref.current?.offsetWidth) {
          setWidth(ref.current?.offsetWidth)
          setHeight(ref.current?.offsetHeight)
        }
      }

      // 立即更新一次宽度，以获取初始值
      updateWidth()

      // 创建一个ResizeObserver实例来监听尺寸变化，并更新宽度
      const resizeObserver = new ResizeObserver(() => {
        updateWidth()
      })

      // 观察当前ref所指向的元素
      resizeObserver.observe(ref.current)

      // 清理函数：组件卸载时停止观察
      return () => {
        resizeObserver.disconnect()
      }
    }
  }, []) // 依赖数组为空，表示这个effect只在组件挂载时运行

  // 返回ref和当前的宽度，供组件使用
  return { width, height }
}
