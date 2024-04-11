import { Stack } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React from 'react';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import PricingPage from '@/features/pricing/PricingPage';
import PromotionBannerForElite from '@/features/promotion/components/promotion_banners/PromotionBannerForElite';

const PricingPages = () => {
  const { t } = useTranslation();
  return (
    <AppContainer
      sx={{
        bgcolor: '#fff',
        maxWidth: '100vw',
        '& > div': {
          maxWidth: '100vw',
          p: 0,
        },
      }}
    >
      <AppDefaultSeoLayout title={t('seo:pricing__title')} />
      <PromotionBannerForElite />
      <Stack maxWidth={1312} mx={'auto'} p={2} mt={-8}>
        <PricingPage />
      </Stack>
    </AppContainer>
  );
};

export default PricingPages;
