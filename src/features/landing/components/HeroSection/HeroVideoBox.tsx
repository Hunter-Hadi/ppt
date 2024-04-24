import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import React from 'react';

import ResponsiveImage from '@/components/ResponsiveImage';
import { PRIMARY_YOUTUBE_VIDEO_EMBED_URL } from '@/features/landing/constants';
import useVideoPopupController from '@/features/video_popup/hooks/useVideoPopupController';
const HeroVideoBox = () => {
  const { openVideoPopup } = useVideoPopupController();

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
          cursor: 'pointer',
          boxShadow: '0px 4px 16px 0px rgba(118, 1, 211, 0.08)',
          borderRadius: 2,
          overflow: 'hidden',
        }}
        onClick={() => {
          openVideoPopup(PRIMARY_YOUTUBE_VIDEO_EMBED_URL);
        }}
      >
        <ResponsiveImage
          width={1280}
          height={720}
          alt='Hero video cover'
          src='/assets/landing/hero-section/video-cover.png'
        />

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
      </Box>
    </Stack>
  );
};

export default HeroVideoBox;
