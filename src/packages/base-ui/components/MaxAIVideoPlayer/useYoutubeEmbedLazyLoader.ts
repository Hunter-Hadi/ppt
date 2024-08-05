import { useEffect, useRef, useState } from 'react'

const useYoutubeEmbedLazyLoader = (
  youtubeSrc: string,
  videoRef: React.MutableRefObject<HTMLIFrameElement | null>,
  enable: boolean,
) => {
  // 元素是否在 可视窗口中
  const [elementVisible, setElementVisible] = useState(false)
  // 是否已经加载了 youtubeSrc
  const isLoadedVideoSrcRef = useRef(false)

  useEffect(() => {
    if (enable) {
      const embedElement = videoRef.current

      if (embedElement && youtubeSrc) {
        if (elementVisible && isLoadedVideoSrcRef.current === false) {
          embedElement.src = youtubeSrc
          isLoadedVideoSrcRef.current = true
        }
        // 暂时不支持 play/pause，想支持的话需要引入（youtube Player API）
        // if (elementVisible && isLoadedVideoSrcRef.current === true) {
        //   embedElement.play()
        // }
        // if (!elementVisible && isLoadedVideoSrcRef.current === true) {
        //   embedElement.pause()
        // }
      }
    }
  }, [enable, videoRef, youtubeSrc, elementVisible])

  useEffect(() => {
    const embedElement = videoRef.current
    let observer: IntersectionObserver | null = null

    if (!embedElement || !enable) {
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

      observer.observe(embedElement)
    } catch (e) {
      console.log('IntersectionObserver is not supported Error:', e)
    }

    return () => {
      observer && observer.disconnect()
    }
  }, [videoRef, enable])

  return null
}

export default useYoutubeEmbedLazyLoader
