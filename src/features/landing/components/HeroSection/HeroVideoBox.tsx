import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { SxProps } from '@mui/material/styles'
import React, { FC, useEffect, useMemo, useRef } from 'react'

import ResponsiveImage from '@/components/ResponsiveImage'
import YoutubePlayerBox from '@/components/YoutubePlayerBox'
import useABTestVisibilityAutoPlayVideo from '@/features/ab_tester/hooks/useABTestVisibilityAutoPlayVideo'
import { LANDING_PRIMARY_VIDEO_ASSETS_URL } from '@/features/landing/constants'
import useVideoPopupController from '@/features/video_popup/hooks/useVideoPopupController'

export interface IHeroVideoProps {
  disabledVideo?: boolean
  videoSrc?: string | null
  imageCover?: string

  // for landing ab test v2
  variant?: 'autoplay' | 'embed' | 'youtube-autoplay'
  windowAutoPlay?: boolean
  videoStyle?: React.CSSProperties
  videoPosterUrl?: string

  boxSx?: SxProps
}

const HeroVideoBox: FC<IHeroVideoProps> = ({
  disabledVideo: propDisabledVideo = false,
  videoSrc = LANDING_PRIMARY_VIDEO_ASSETS_URL,
  imageCover = '/assets/landing/hero-section/video-cover.png',
  variant = 'autoplay',
  windowAutoPlay = false,
  videoStyle,
  videoPosterUrl,
  boxSx,
}) => {
  const { openVideoPopup } = useVideoPopupController()
  const videoRef = useRef<HTMLVideoElement | null>(null)
  useABTestVisibilityAutoPlayVideo(videoRef, videoSrc, windowAutoPlay)
  const disabledVideo = useMemo(() => {
    if (propDisabledVideo) {
      return true
    } else {
      return !videoSrc
    }
  }, [propDisabledVideo, videoSrc])

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
      video.currentTime = 0

      video.play()
    }

    video.addEventListener('ended', handleEnded)

    return () => {
      video.removeEventListener('ended', handleEnded)
    }
  }, [])

  if (disabledVideo) {
    return null
  }

  if (variant === 'autoplay' && videoSrc) {
    return (
      <Stack
        position='relative'
        justifyContent={'center'}
        alignItems={'center'}
        height='100%'
      >
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
            autoPlay={true}
            loop={true}
            muted={true}
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
              boxShadow: 'rgba(10, 0, 31, 0.1) 0px 1px 24px 4px',
              ...videoStyle,
              // opacity: videoLoaded ? 1 : 0,
            }}
          >
            <source
              src={windowAutoPlay ? undefined : videoSrc} // 开启了windowAutoPlay默认懒加载
              type='video/mp4'
            />
            {"Sorry, your browser doesn't support embedded videos"}
          </video>
        </Box>
      </Stack>
    )
  }

  if (variant === 'youtube-autoplay' && videoSrc) {
    return (
      <Stack
        position='relative'
        justifyContent={'center'}
        alignItems={'center'}
        height='100%'
      >
        <YoutubePlayerBox
          youtubeLink={videoSrc}
          videoPosterUrl={videoPosterUrl}
          autoplay
          loop
          borderRadius={12}
          sx={{
            '&.video-container > iframe': {
              boxShadow: 'rgba(10, 0, 31, 0.1) 0px 1px 24px 4px',
            },
          }}
        />
      </Stack>
    )
  }

  return (
    <Stack
      position='relative'
      justifyContent={'center'}
      alignItems={'center'}
      height='100%'
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
          cursor: disabledVideo ? 'auto' : 'pointer',
          boxShadow: '0px 4px 16px 0px rgba(118, 1, 211, 0.08)',
          borderRadius: 2,
          overflow: 'hidden',
          ...boxSx,
        }}
        onClick={() => {
          if (!disabledVideo && videoSrc) {
            openVideoPopup(videoSrc, true)
          }
        }}
      >
        <ResponsiveImage
          width={1280}
          height={720}
          alt='Hero video cover'
          src={imageCover}
        />

        {disabledVideo ? null : (
          <Stack
            className='play-button'
            justifyContent={'center'}
            alignItems={'center'}
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'rgba(0, 0, 0, 0.75)',
              color: 'white',
              borderRadius: 100,
              width: 80,
              height: 80,
            }}
          >
            <PlayArrowRoundedIcon sx={{ fontSize: 56 }} />
          </Stack>
        )}
      </Box>
    </Stack>
  )
}

export default HeroVideoBox
