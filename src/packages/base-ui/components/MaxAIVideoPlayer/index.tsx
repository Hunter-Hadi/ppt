import Box from '@mui/material/Box'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import { SxProps } from '@mui/material/styles'
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'

import MaxAIResponsiveImage from '@/packages/base-ui/components/MaxAIResponsiveImage'

import useVideoLazyLoader from './useVideoLazyLoader'
import useYoutubeEmbedLazyLoader from './useYoutubeEmbedLazyLoader'

interface IYoutubeVideoPlayerProps {
  variant?: 'youtube'
  otherYoutubeParams?: Record<string, string>
}

interface INormalVideoPlayerProps {
  variant?: 'normal'
  otherYoutubeParams?: never // 如果不是 'youtube'，则不允许传入 `otherYoutubeParams`
}

interface ICommonVideoPlayerProps {
  videoSrc: string
  videoPosterUrl?: string
  // autoplay?: boolean
  muted?: boolean
  loop?: boolean
  lazyLoad?: boolean
  boxSx?: SxProps
  videoStyle?: React.CSSProperties
}

type IVideoPlayerProps =
  | (ICommonVideoPlayerProps & IYoutubeVideoPlayerProps)
  | (ICommonVideoPlayerProps & INormalVideoPlayerProps)

const MaxAIVideoPlayer: FC<IVideoPlayerProps> = ({
  videoSrc,
  videoPosterUrl,
  variant = 'normal',
  boxSx,
  videoStyle,

  // autoplay = true,
  muted = true,
  loop = true,
  lazyLoad = false,
  otherYoutubeParams,
}) => {
  // 暂时不支持修改 autoplay
  const autoplay = true
  const [youtubeVideoLoading, setYoutubeVideoLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const youtubeIframeRef = useRef<HTMLIFrameElement | null>(null)

  const fixedVideoSrc = useMemo(() => {
    if (variant === 'youtube') {
      // youtube 时，根据参数修改 url
      try {
        const url = new URL(videoSrc)
        const searchParams = new URLSearchParams(url.search)
        if (autoplay) {
          searchParams.set('autoplay', '1')
        }
        if (loop) {
          // 获取 url 中 embed 后面的 youtube video id
          const videoId = url.pathname.split('/').pop()
          if (videoId) {
            searchParams.set('playlist', videoId)
          }
          searchParams.set('loop', '1')
        }
        if (muted) {
          searchParams.set('mute', '1')
        }

        if (otherYoutubeParams) {
          Object.entries(otherYoutubeParams).forEach(([key, value]) => {
            searchParams.set(key, value)
          })
        }

        url.search = searchParams.toString()
        return url.toString()
      } catch (error) {
        return videoSrc
      }
    }

    return videoSrc
  }, [videoSrc, variant, autoplay, muted, loop, otherYoutubeParams])

  useVideoLazyLoader(fixedVideoSrc, videoRef, lazyLoad && variant === 'normal')

  useYoutubeEmbedLazyLoader(
    fixedVideoSrc,
    youtubeIframeRef,
    lazyLoad && variant === 'youtube',
  )

  useEffect(() => {
    const video = videoRef.current

    if (!video) {
      return
    }

    //兼容旧游览器muted播放还有声音的问题
    //https://github.com/facebook/react/issues/6544
    //https://medium.com/@BoltAssaults/autoplay-muted-html5-video-safari-ios-10-in-react-673ae50ba1f5
    //1.react设置 muted 不显示，先简单的应用到DOM上
    video.muted = true
    video.defaultMuted = true

    const handleEnded = () => {
      if (loop) {
        video.currentTime = 0
        video.play()
      }
    }

    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('ended', handleEnded)
    }
  }, [loop])

  return (
    <Stack
      position='relative'
      justifyContent={'center'}
      alignItems={'center'}
      height='100%'
    >
      {variant === 'normal' && (
        <Box
          sx={{
            overflow: 'visible',
            padding: 0,
            position: 'relative',
            textDecoration: 'none',
            bgcolor: 'rgba(0, 0, 0, 0)',
            width: '100%',
            // height: '100%',
            ...boxSx,
          }}
        >
          {/* <AppLoadingLayout loading={!videoLoaded} /> */}
          <video
            ref={videoRef}
            autoPlay={autoplay}
            loop={loop}
            muted={muted}
            playsInline={true}
            poster={videoPosterUrl}
            style={{
              cursor: 'auto',
              width: '100%',
              height: '100%',
              borderRadius: 12,
              display: 'block',
              objectFit: 'cover',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              objectPosition: '50% 50%',
              ...videoStyle,
              // opacity: videoLoaded ? 1 : 0,
            }}
          >
            <source
              src={lazyLoad ? undefined : fixedVideoSrc} //开启懒加载时，不设置 src
              // data-video-src={fixedVideoSrc}
              type='video/mp4'
            />
            {"Sorry, your browser doesn't support embedded videos"}
          </video>
        </Box>
      )}
      {variant === 'youtube' && (
        <>
          <Box
            sx={{
              position: 'relative',
              paddingBottom: '56.25%' /* 16:9 */,
              height: 0,
              width: '100%',
              ...boxSx,
            }}
          >
            {youtubeVideoLoading && (
              <VideoPlayerPlaceholder videoPosterUrl={videoPosterUrl} />
            )}

            <iframe
              ref={youtubeIframeRef}
              title='YouTube video player'
              src={lazyLoad ? undefined : fixedVideoSrc} //开启懒加载时，不设置 src
              // data-video-src={fixedVideoSrc}
              frameBorder='0'
              allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
              allowFullScreen
              onLoad={() => {
                setYoutubeVideoLoading(false)
              }}
              style={{
                borderRadius: '16px',
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                ...videoStyle,
              }}
            />
          </Box>
        </>
      )}
    </Stack>
  )
}

export default MaxAIVideoPlayer

const VideoPlayerPlaceholder: FC<{ videoPosterUrl?: string }> = ({
  videoPosterUrl,
}) => {
  if (videoPosterUrl) {
    return (
      <MaxAIResponsiveImage
        width={1600}
        height={900}
        alt='video placeholder'
        src={videoPosterUrl}
        style={{
          borderRadius: '16px',
        }}
      />
    )
  } else {
    return (
      <Stack
        sx={{
          position: 'absolute',
          justifyContent: 'center',
          width: '100%',
          height: '100%',
          background: '#f5f5f5',
          borderRadius: 2,
        }}
      >
        <CircularProgress size={30} sx={{ m: '0 auto' }} />
      </Stack>
    )
  }
}
