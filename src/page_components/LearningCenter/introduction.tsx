import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import YoutubePlayerBox from '@/components/YoutubePlayerBox';
import useVideoPopupController from '@/features/videoPopup/hooks/useVideoPopupController';
import { PRIMARY_YOUTUBE_VIDEO_EMBED_URL } from '@/global_constants';

import CTAInstallButton from '../CTAInstallButton';

const Introduction = () => {
  const { openVideoPopup } = useVideoPopupController();

  const { t } = useTranslation();

  return (
    <Stack spacing={6} alignItems='center' data-testid='introduction'>
      <Typography
        variant='custom'
        component={'h1'}
        fontWeight={700}
        fontSize={{
          xs: 40,
          md: 48,
        }}
      >
        {t('pages:learning_center__title')}
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
        {t('pages:learning_center__introduction__title')}
      </Typography>
      <Box
        width={{
          xs: '100%',
          sm: 640,
        }}
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
        text={t('button:install_now')}
      />
    </Stack>
  );
};

export default Introduction;
