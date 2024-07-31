import { useEffect, useMemo, useState } from 'react'

const useVideoLazyLoader = (
  videoRef: React.MutableRefObject<HTMLVideoElement | HTMLIFrameElement | null>,
  enable: boolean,
) => {
  // 元素是否在 可视窗口中
  const [elementVisible, setElementVisible] = useState(false)

  const videoOriginalSrc = useMemo(() => {
    const videoElement = videoRef.current
    if (!videoElement) {
      return null
    }

    return videoElement.getAttribute('data-video-src') ?? ''
  }, [videoRef])

  // useEffect(() => {
  //   if (enable) {
  //     const videoElement = videoRef.current

  //     if (videoElement) {
  //       debugger
  //     }
  //   }
  // }, [enable, videoRef, videoOriginalSrc])

  useEffect(() => {
    const videoElement = videoRef.current as HTMLVideoElement
    let observer: IntersectionObserver | null = null

    if (!videoElement || !enable) {
      return () => {
        observer && observer.disconnect()
      }
    }

    try {
      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.intersectionRatio >= 0.8) {
              // 当视频可见度达到80% 可见度阈值 时 重新播放
              setElementVisible(true)
            } else {
              setElementVisible(false)
            }
            if (entry.intersectionRatio < 0.4 && videoElement) {
              videoElement.currentTime = 0
            }
          })
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: [0, 0.2, 0.4, 0.6, 0.8, 1], // 设置不同的可见度阈值
        },
      )

      observer.observe(videoElement)
    } catch (e) {
      console.log('IntersectionObserver is not supported Error:', e)
    }

    return () => {
      observer && observer.disconnect()
    }
  }, [videoRef, enable])

  return null
}

export default useVideoLazyLoader
