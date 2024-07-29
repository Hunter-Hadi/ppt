import { Box, CircularProgress, Stack, SxProps } from '@mui/material'
import React, { FC, useMemo, useState } from 'react'

interface IProps {
  youtubeLink: string
  borderRadius?: number
  sx?: SxProps
  loop?: boolean
  autoplay?: boolean
  muted?: boolean
  otherYoutubeParams?: Record<string, string>
}

const YoutubePlayerBox: FC<IProps> = ({
  youtubeLink,
  borderRadius = 16,
  sx,
  autoplay,
  muted = true,
  loop,
  otherYoutubeParams = {},
}) => {
  const [loading, setLoading] = useState(true)

  const fixYoutubeLink = useMemo(() => {
    const url = new URL(youtubeLink)
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

    Object.entries(otherYoutubeParams).forEach(([key, value]) => {
      searchParams.set(key, value)
    })

    url.search = searchParams.toString()
    return url.toString()
  }, [youtubeLink, autoplay, loop, muted, otherYoutubeParams])

  return (
    <Box
      className='video-container'
      sx={{
        '&.video-container': {
          position: 'relative',
          paddingBottom: '56.25%' /* 16:9 */,
          height: 0,
          width: '100%',
        },
        '&.video-container iframe': {
          borderRadius: borderRadius + 'px',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        },
        ...sx,
      }}
    >
      {loading && (
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
      )}

      <iframe
        title='YouTube video player'
        src={fixYoutubeLink}
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
        allowFullScreen
        onLoad={() => {
          setLoading(false)
        }}
      />
    </Box>
  )
}
export default YoutubePlayerBox
