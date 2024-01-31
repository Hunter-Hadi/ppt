import { Box, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import YoutubePlayerBox from '@/components/YoutubePlayerBox';
import useVideoPopupController from '@/features/videoPopup/hooks/useVideoPopupController';

const VIDEOS_LIST = [
  {
    title: 'pages:learning_center__basic_usage__item1__title',
    videoLink: 'https://www.youtube.com/embed/E_ZlK-07pv8',
  },
  {
    title: 'pages:learning_center__basic_usage__item2__title',
    videoLink: 'https://www.youtube.com/embed/ty2LCSGfeKo',
  },
  {
    title: 'pages:learning_center__basic_usage__item3__title',
    videoLink: 'https://www.youtube.com/embed/KyYvXzh8vPE',
  },
];

const BasicUsage = () => {
  const { openVideoPopup } = useVideoPopupController();

  const { t } = useTranslation();

  return (
    <Stack spacing={6} alignItems='center' data-testid='basic-usage'>
      <Typography
        variant='custom'
        component={'h2'}
        fontWeight={700}
        fontSize={{
          xs: 32,
          md: 40,
        }}
      >
        {t('pages:learning_center__basic_usage__title')}
      </Typography>
      <Box>
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
                  {t(videoItem.title)}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Stack>
  );
};

export default BasicUsage;
