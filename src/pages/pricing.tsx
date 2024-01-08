import React from 'react';

import AppContainer from '@/app_layout/AppContainer';
import PricingPage from '@/features/pricing/PricingPage';

const Pricing = () => {
  return (
    <AppContainer sx={{ bgcolor: '#fff' }} maxWidth={1312}>
      <PricingPage />
    </AppContainer>
  );
};

export default Pricing;
