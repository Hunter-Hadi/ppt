import { Stack } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import CallToActionSection from '@/features/landing/components/CallToActionSection';
import FeaturesWithSceneVariantSection from '@/features/landing/components/FeaturesCarousel/FeaturesWithSceneVariantSection';
import HeroSection from '@/features/landing/components/HeroSection';
import MaxAIInNumbers from '@/features/landing/components/MaxAIInNumbers';
import TrustedBy from '@/features/landing/components/TrustedBy';
import UserComment from '@/features/landing/components/UserComment';
import FunnelSurveyPopup from '@/features/survey/components/FunnelSurveyPopup';
import { RESOURCES_URL } from '@/global_constants';

const ResearchPages = () => {
  const { t } = useTranslation();
  return (
    <>
      <AppDefaultSeoLayout />
      <Stack color='text.primary'>
        {/* heroSection */}
        <HeroSection
          title={t('pages:home_page__hero_section__title__variant2')}
          description={t('pages:home_page__hero_section__desc__variant2')}
          heroVideoProps={{
            videoSrc: `${RESOURCES_URL}/video/landing-page-primary.mp4`,
            variant: 'autoplay',
          }}
          layout={'ttb-layout'}
        />

        {/* trusted by */}
        <TrustedBy />

        {/* feature  */}
        <FeaturesWithSceneVariantSection />

        {/* maxai in numbers */}
        <MaxAIInNumbers />
        {/* user comment */}
        <UserComment />
        {/* call to action section */}
        <CallToActionSection />
      </Stack>
      <FunnelSurveyPopup sceneType='SURVEY_INSTALL_DROPPED' />
    </>
  );
};
export default ResearchPages;
