import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import React, { FC, useEffect, useMemo, useRef } from 'react';

import ResponsiveImage from '@/components/ResponsiveImage';
import { PRIMARY_YOUTUBE_VIDEO_EMBED_URL } from '@/features/landing/constants';
import useVideoPopupController from '@/features/video_popup/hooks/useVideoPopupController';
import { RESOURCES_URL } from '@/global_constants';

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
  imageCover = `${RESOURCES_URL}/video/landing-page-primary.mp4`,
  variant = 'autoplay',
}) => {
  const { openVideoPopup } = useVideoPopupController();
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const disabledVideo = useMemo(() => {
    if (propDisabledVideo) {
      return true;
    } else {
      return !videoSrc;
    }
  }, [propDisabledVideo, videoSrc]);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const handleEnded = () => {
      video.currentTime = 0;
      video.play();
    };

    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

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
          }}
        >
          {/* <AppLoadingLayout loading={!videoLoaded} /> */}
          <video
            ref={videoRef}
            autoPlay={true}
            loop={true}
            muted={true}
            playsInline={true}
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
              // opacity: videoLoaded ? 1 : 0,
            }}
          >
            <source src={videoSrc} type='video/mp4' />
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
