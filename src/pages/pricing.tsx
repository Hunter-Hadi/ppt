import React from 'react';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import PricingPage from '@/features/pricing/PricingPage';

const Pricing = () => {
  return (
    <AppContainer sx={{ bgcolor: '#fff' }} maxWidth={1312}>
      <AppDefaultSeoLayout title={'Pricing | MaxAI.me'} />
      <PricingPage />
    </AppContainer>
  );
};

export default Pricing;
