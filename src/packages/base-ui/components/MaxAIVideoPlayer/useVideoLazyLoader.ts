import { useEffect, useRef, useState } from 'react'

const useVideoLazyLoader = (
  videoSrc: string,
  videoRef: React.MutableRefObject<HTMLVideoElement | null>,
  enable: boolean,
) => {
  // 元素是否在 可视窗口中
  const [elementVisible, setElementVisible] = useState(false)
  // 是否已经加载了 videoSrc
  const isLoadedVideoSrcRef = useRef(false)

  useEffect(() => {
    if (enable) {
      const videoElement = videoRef.current

      if (videoElement && videoSrc) {
        if (elementVisible && isLoadedVideoSrcRef.current === false) {
          videoElement.src = videoSrc
          videoElement.currentTime = 0
          videoElement.play()
          isLoadedVideoSrcRef.current = true
        }

        if (elementVisible && isLoadedVideoSrcRef.current === true) {
          videoElement.play()
        }
        if (!elementVisible && isLoadedVideoSrcRef.current === true) {
          videoElement.pause()
        }
      }
    }
  }, [enable, videoRef, videoSrc, elementVisible])

  useEffect(() => {
    const videoElement = videoRef.current
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
            if (entry.intersectionRatio >= 0.4) {
              // 当视频 element 可见度达到50% 可见度阈值 时 重新播放
              setElementVisible(true)
            } else {
              setElementVisible(false)
            }
          })
        },
        {
          root: null,
          rootMargin: '0px',
          threshold: [0, 0.4, 1], // 设置不同的可见度阈值
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
