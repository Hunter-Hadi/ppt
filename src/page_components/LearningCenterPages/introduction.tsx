import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'
import React from 'react'

import YoutubePlayerBox from '@/components/YoutubePlayerBox'
import { PRIMARY_YOUTUBE_VIDEO_EMBED_URL } from '@/features/landing/constants'
import useVideoPopupController from '@/features/video_popup/hooks/useVideoPopupController'

import CTAInstallButton from '../CTAInstallButton'

const Introduction = () => {
  const { openVideoPopup } = useVideoPopupController()

  const { t } = useTranslation()

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
          openVideoPopup(PRIMARY_YOUTUBE_VIDEO_EMBED_URL)
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
  )
}

export default Introduction
