import { useCallback, useEffect, useRef } from 'react'
//根据可见度自动播放暂停视频
const useABTestVisibilityAutoPlayVideo = (
  videoRef: React.MutableRefObject<HTMLVideoElement | null>,
  isAuto: boolean,
) => {
  const intersectionRatioRef = useRef(false)
  const handleIntersect = useCallback(
    (entries) => {
      try {
        entries.forEach((entry) => {
          if (entry.intersectionRatio >= 0.8) {
            // 当视频可见度达到80% 可见度阈值 时 重新播放
            intersectionRatioRef.current = true
          } else {
            intersectionRatioRef.current = false
          }
          if (entry.intersectionRatio < 0.4 && videoRef.current) {
            videoRef.current.currentTime = 0
          }
        })
      } catch (e) {
        console.error('handleIntersect error:', e)
      }
    },
    [videoRef],
  )

  useEffect(() => {
    // IntersectionObserver 元素可见度
    if (!videoRef.current || !isAuto) return

    try {
      const observer = new IntersectionObserver(handleIntersect, {
        root: null,
        rootMargin: '0px',
        threshold: [0, 0.2, 0.4, 0.6, 0.8, 1], // 设置不同的可见度阈值
      })

      observer.observe(videoRef.current)

      return () => {
        if (videoRef.current) {
          try {
            observer.unobserve(videoRef.current)
          } catch (e) {
            console.error('IntersectionObserver unobserve error:', e)
          }
        }
      }
    } catch (e) {
      console.log('IntersectionObserver is not supported Error:', e)
    }
  }, [videoRef, handleIntersect, isAuto])
  const isElementVisible = useCallback((element) => {
    if (!element) return false

    // 获取元素的计算样式
    const style = getComputedStyle(element)

    // 检查当前元素
    const isVisible =
      style.display !== 'none' &&
      style.opacity !== '0' &&
      element.getBoundingClientRect().width > 0 &&
      element.getBoundingClientRect().height > 0

    // 如果当前元素不可见，直接返回 false
    if (!isVisible) return false

    // 递归检查父元素
    return element.parentElement
      ? isElementVisible(element.parentElement)
      : true
  }, [])

  useEffect(() => {
    try {
      if (!videoRef.current || !isAuto) return
      //检测元素是否可见
      const checkVisibility = () => {
        if (videoRef.current) {
          const visible = isElementVisible(videoRef.current)
          if (visible && intersectionRatioRef.current) {
            if (videoRef.current && videoRef.current.paused) {
              videoRef.current.currentTime = 0
              videoRef.current.play()
            }
          } else {
            if (videoRef.current) {
              videoRef.current.pause()
            }
          }
        }
      }

      const id = setInterval(checkVisibility, 500) // 每 500 毫秒检查一次

      return () => {
        clearInterval(id)
      }
    } catch (e) {
      console.error('useAutoPlayVideo error:', e)
    }
  }, [isAuto, handleIntersect, videoRef, isElementVisible])
  return
}
export default useABTestVisibilityAutoPlayVideo
