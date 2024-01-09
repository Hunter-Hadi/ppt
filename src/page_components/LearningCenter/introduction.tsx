import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

import YoutubePlayerBox from '@/components/YoutubePlayerBox';
import useVideoPopupController from '@/features/videoPopup/hooks/useVideoPopupController';
import { PRIMARY_YOUTUBE_VIDEO_EMBED_URL } from '@/global_constants';

import CTAInstallButton from '../CTAInstallButton';

const Introduction = () => {
  const { openVideoPopup } = useVideoPopupController();

  return (
    <Stack spacing={6} alignItems='center' id='introduction'>
      <Typography
        variant='custom'
        component={'h1'}
        fontWeight={700}
        fontSize={{
          xs: 40,
          md: 48,
        }}
      >
        Learning center
      </Typography>
      <Typography
        variant='custom'
        component={'h2'}
        fontWeight={700}
        fontSize={{
          xs: 32,
          md: 40,
        }}
      >
        MaxAI 101: Introduction
      </Typography>
      <Box
        width={640}
        onClick={() => {
          openVideoPopup(PRIMARY_YOUTUBE_VIDEO_EMBED_URL);
        }}
        sx={{
          cursor: 'pointer',
        }}
      >
        <YoutubePlayerBox
          borderRadius={16}
          youtubeLink={PRIMARY_YOUTUBE_VIDEO_EMBED_URL}
          sx={{
            pointerEvents: 'none',
          }}
        />
      </Box>
      <CTAInstallButton
        showAgent='Chrome'
        variant={'contained'}
        trackerLinkProps={{
          defaultRef: 'learning-center',
          queryRefEnable: true,
          pathnameRefEnable: false,
        }}
        iconSize={40}
        sx={{
          minWidth: 320,
          fontSize: 18,
        }}
        text={'Install Now'}
      />
    </Stack>
  );
};

export default Introduction;
