import React, { useEffect } from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import HomePageContent from '@/page_components/LandingPage/HomePageContentV2';

const LandingPageV2 = () => {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView();
      }
    }
  }, []);
  return (
    <>
      <AppDefaultSeoLayout />
      <HomePageContent />
    </>
  );
};
export default LandingPageV2;
