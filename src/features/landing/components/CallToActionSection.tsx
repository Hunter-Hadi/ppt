import { Box, buttonClasses, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import CTAInstallButton from '@/page_components/CTAInstallButton';

const CallToActionSection = () => {
  const { t } = useTranslation('pages');

  return (
    <Box
      id='homepage-call-to-action'
      py={{
        xs: 7,
        md: 14,
      }}
      px={4}
      bgcolor='#202124'
      color='white'
    >
      <Box maxWidth={1312} mx='auto'>
        <Stack spacing={3}>
          <Typography
            variant='custom'
            fontSize={{
              xs: 24,
              md: 32,
              lg: 48,
            }}
            component={'h2'}
            textAlign={'center'}
            fontWeight={700}
            lineHeight={1.2}
          >
            {t('home_page__call_to_action__title')}
          </Typography>
          <Typography
            variant='custom'
            fontSize={{
              xs: 16,
              lg: 18,
            }}
            textAlign={'center'}
            lineHeight={1.5}
          >
            {t('home_page__call_to_action__sub_title')}
          </Typography>

          <CTAInstallButton
            variant={'contained'}
            trackerLinkProps={{
              defaultRef: 'homepage',
              queryRefEnable: true,
              pathnameRefEnable: false,
            }}
            iconSize={80}
            adaptiveLabel
            sx={{
              height: 'max-content',
              width: '100%',
              background:
                'linear-gradient(90deg, #AB57FF 0.03%, #7601D3 99.98%)',
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
