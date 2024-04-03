import { Box, buttonClasses, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';

import { IUseShareTrackerLinkProps } from '@/hooks/useShareTrackerLink';
import CTAInstallButton from '@/page_components/CTAInstallButton';

interface IProps {
  propRef?: string;
  ctaButtonTrackerLinkProps?: IUseShareTrackerLinkProps;
}

const CallToActionSection: FC<IProps> = ({
  propRef,
  ctaButtonTrackerLinkProps,
}) => {
  const { t } = useTranslation();

  return (
    <Box
      id='homepage-call-to-action'
      py={{
        xs: 7,
        md: 14,
      }}
      px={4}
      color='white'
      bgcolor='#f9f5ff'
      sx={{
        backgroundImage: `url("/assets/landing/hero-section-bg.png")`,

        backgroundSize: 'cover',
        backgroundPositionY: '-20px',
      }}
    >
      <Box maxWidth={1312} mx='auto'>
        <Stack spacing={3}>
          <Typography
            variant='custom'
            fontSize={{
              xs: 36,
              sm: 48,
            }}
            component={'h2'}
            textAlign={'center'}
            fontWeight={700}
            lineHeight={1.2}
            color='text.primary'
          >
            {t('pages:home_page__call_to_action__title')}
          </Typography>
          <Typography
            variant='custom'
            fontSize={{
              xs: 16,
              lg: 18,
            }}
            textAlign={'center'}
            lineHeight={1.5}
            color='text.secondary'
          >
            {t('pages:home_page__call_to_action__sub_title')}
          </Typography>

          <CTAInstallButton
            variant={'contained'}
            trackerLinkProps={{
              defaultRef: propRef ?? 'homepage',
              queryRefEnable: true,
              pathnameRefEnable: false,
              ...ctaButtonTrackerLinkProps,
            }}
            iconSize={80}
            adaptiveLabel
            sx={{
              height: 'max-content',
              width: '100%',
              background: 'primary.main',
              py: {
                xs: 3,
                lg: 6,
              },
              px: {
                xs: 1.5,
                lg: 3,
              },
              fontSize: {
                xs: 32,
                sm: 48,
              },
              [`& .${buttonClasses.startIcon}`]: {
                display: {
                  xs: 'none',
                  sm: 'inherit',
                },
              },
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default CallToActionSection;
