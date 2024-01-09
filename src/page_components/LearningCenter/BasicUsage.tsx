import { Box, Grid, Stack, Typography } from '@mui/material';
import React from 'react';

import YoutubePlayerBox from '@/components/YoutubePlayerBox';
import useVideoPopupController from '@/features/videoPopup/hooks/useVideoPopupController';

const VIDEOS_LIST = [
  {
    title: 'Basic Usage: Text Highlight & MiniMenu',
    videoLink: 'https://www.youtube.com/embed/E_ZlK-07pv8',
  },
  {
    title: 'Basic Usage: Activating the Sidebar',
    videoLink: 'https://www.youtube.com/embed/ty2LCSGfeKo',
  },
  {
    title: 'Basic Usage: Adjust Setting',
    videoLink: 'https://www.youtube.com/embed/5TeKcFgfgmQ',
  },
];

const BasicUsage = () => {
  const { openVideoPopup } = useVideoPopupController();

  return (
    <Stack spacing={6} alignItems='center' id='basic-usage'>
      <Typography
        variant='custom'
        component={'h2'}
        fontWeight={700}
        fontSize={{
          xs: 32,
          md: 40,
        }}
      >
        Basic Usage
      </Typography>
      <Grid container rowGap={6} columnSpacing={4}>
        {VIDEOS_LIST.map((videoItem) => (
          <Grid item key={videoItem.title} xs={12} sm={6}>
            <Stack spacing={3}>
              <Box
                onClick={() => {
                  openVideoPopup(videoItem.videoLink);
                }}
                sx={{
                  cursor: 'pointer',
                }}
              >
                <YoutubePlayerBox
                  borderRadius={16}
                  youtubeLink={videoItem.videoLink}
                  sx={{
                    pointerEvents: 'none',
                  }}
                />
              </Box>
              <Typography
                variant='custom'
                fontSize={{
                  xs: 18,
                  md: 24,
                }}
                fontWeight={700}
                lineHeight={1.4}
              >
                {videoItem.title}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

export default BasicUsage;
