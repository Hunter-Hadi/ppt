import { useEffect } from 'react'

export const useAutoPlayVideo = (videoRef, isAuto) => {
  const handleIntersect = (entries) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio >= 0.8) {
        // 当视频可见度达到80% 可见度阈值 时 重新播放
        if (videoRef.current && videoRef.current.paused) {
          videoRef.current.currentTime = 0
          videoRef.current.play()
        }
      } else {
        if (videoRef.current) {
          videoRef.current.pause()
        }
      }
    })
  }

  useEffect(() => {
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
  }, [videoRef])

  return
}
