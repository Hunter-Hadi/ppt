import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import React, { FC, useEffect, useMemo, useRef } from 'react';

import AppLoadingLayout from '@/app_layout/AppLoadingLayout';
import ResponsiveImage from '@/components/ResponsiveImage';
import { PRIMARY_YOUTUBE_VIDEO_EMBED_URL } from '@/features/landing/constants';
import useVideoPopupController from '@/features/video_popup/hooks/useVideoPopupController';

export interface IHeroVideoProps {
  disabledVideo?: boolean;
  videoSrc?: string | null;
  imageCover?: string;

  // for landing ab test v2
  variant?: 'autoplay' | 'embed';
}

const HeroVideoBox: FC<IHeroVideoProps> = ({
  disabledVideo: propDisabledVideo = false,
  videoSrc = PRIMARY_YOUTUBE_VIDEO_EMBED_URL,
  imageCover = '/assets/landing/hero-section/video-cover.png',
  variant,
}) => {
  const { openVideoPopup } = useVideoPopupController();
  const [videoLoaded, setVideoLoaded] = React.useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const disabledVideo = useMemo(() => {
    if (propDisabledVideo) {
      return true;
    } else {
      return !videoSrc;
    }
  }, [propDisabledVideo, videoSrc]);

  useEffect(() => {
    const videoElement = videoRef.current;
    const videoDataListener = () => {
      if (videoElement?.readyState && videoElement?.readyState >= 3) {
        setVideoLoaded(true);
      }
    };
    if (videoElement) {
      videoElement.addEventListener('loadeddata', videoDataListener);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener('loadeddata', videoDataListener);
      }
    };
  }, []);

  if (variant === 'autoplay') {
    return (
      <Stack
        position='relative'
        justifyContent={'center'}
        alignItems={'center'}
        height='100%'
      >
        <Box>
          <AppLoadingLayout
            loading={!videoLoaded}
            sx={{
              minHeight: 738,
            }}
          />
          <video
            ref={videoRef}
            loop
            muted
            autoPlay
            playsInline
            style={{
              cursor: 'auto',
              width: '100%',
              height: '100%',
              borderRadius: 12,
              display: 'block',
              objectFit: 'cover',
              backgroundColor: 'rgba(0, 0, 0, 0)',
              objectPosition: '50% 50%',
            }}
            onLoad={() => {
              setVideoLoaded(true);
            }}
          >
            <source src='/assets/test.mov' type='video/mp4' />
            {"Sorry, your browser doesn't support embedded videos"}
          </video>
        </Box>
      </Stack>
    );
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
        }}
        onClick={() => {
          if (!disabledVideo && videoSrc) {
            openVideoPopup(videoSrc, true);
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
  );
};

export default HeroVideoBox;
