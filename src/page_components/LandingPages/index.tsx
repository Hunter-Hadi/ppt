import React from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import HomePageContent from '@/features/landing/components/HomePageContent';
import FunnelSurveyPopup from '@/features/survey/components/FunnelSurveyPopup';

const LandingPages = () => {
  return (
    <>
      <AppDefaultSeoLayout />
      <HomePageContent />
      <FunnelSurveyPopup sceneType='SURVEY_INSTALL_DROPPED' />
    </>
  );
};
export default LandingPages;
