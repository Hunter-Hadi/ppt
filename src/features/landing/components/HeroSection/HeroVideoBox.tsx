import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import React, { FC, useMemo } from 'react';

import ResponsiveImage from '@/components/ResponsiveImage';
import { PRIMARY_YOUTUBE_VIDEO_EMBED_URL } from '@/features/landing/constants';
import useVideoPopupController from '@/features/video_popup/hooks/useVideoPopupController';

export interface IHeroVideoProps {
  disabledVideo?: boolean;
  videoSrc?: string | null;
  imageCover?: string;
}

const HeroVideoBox: FC<IHeroVideoProps> = ({
  disabledVideo: propDisabledVideo = false,
  videoSrc = PRIMARY_YOUTUBE_VIDEO_EMBED_URL,
  imageCover = '/assets/landing/hero-section/video-cover.png',
}) => {
  const { openVideoPopup } = useVideoPopupController();

  const disabledVideo = useMemo(() => {
    if (propDisabledVideo) {
      return true;
    } else {
      return !videoSrc;
    }
  }, [propDisabledVideo, videoSrc]);

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
            openVideoPopup(videoSrc);
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
