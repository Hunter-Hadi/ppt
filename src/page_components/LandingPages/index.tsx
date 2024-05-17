import React from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import HomePageContent from '@/features/landing/components/HomePageContent';

const LandingPages = (props) => {
  return (
    <>
      <AppDefaultSeoLayout />
      <HomePageContent />
    </>
  );
};
export default LandingPages;
