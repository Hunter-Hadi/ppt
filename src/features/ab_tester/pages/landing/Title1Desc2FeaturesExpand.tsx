import { Stack } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import CallToActionSection from '@/features/landing/components/CallToActionSection';
import FeaturesExpandSection from '@/features/landing/components/FeaturesCarousel/FeaturesExpandVaraintSection';
import HeroSection from '@/features/landing/components/HeroSection';
import MaxAIInNumbers from '@/features/landing/components/MaxAIInNumbers';
import TrustedBy from '@/features/landing/components/TrustedBy';
import UserComment from '@/features/landing/components/UserComment';

const Title1Desc2FeaturesExpand = () => {
  const { t } = useTranslation();

  return (
    <>
      <AppDefaultSeoLayout />
      <Stack color='text.primary'>
        {/* heroSection */}
        <HeroSection
          description={t('pages:home_page__hero_section__desc__variant2')}
        />

        {/* feature carousel */}
        <FeaturesExpandSection />

        {/* trusted by */}
        <TrustedBy />

        {/* maxai in numbers */}
        <MaxAIInNumbers />

        {/* user comment */}
        <UserComment />

        {/* call to action section */}
        <CallToActionSection />
      </Stack>
    </>
  );
};

export default Title1Desc2FeaturesExpand;
