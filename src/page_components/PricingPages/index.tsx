import { useTranslation } from 'next-i18next';
import React from 'react';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import PricingPage from '@/features/pricing/PricingPage';

const PricingPages = () => {
  const { t } = useTranslation();
  return (
    <AppContainer sx={{ bgcolor: '#fff' }} maxWidth={1312}>
      <AppDefaultSeoLayout title={t('seo:pricing__title')} />
      <PricingPage />
    </AppContainer>
  );
};

export default PricingPages;
