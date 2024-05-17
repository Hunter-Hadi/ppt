import { Stack } from '@mui/material';
import React from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import CallToActionSection from '@/features/landing/components/CallToActionSection';
import FeaturesExpandSection from '@/features/landing/components/FeaturesCarousel/FeaturesExpandVaraintSection';
import HeroSection from '@/features/landing/components/HeroSection';
import MaxAIInNumbers from '@/features/landing/components/MaxAIInNumbers';
import TrustedBy from '@/features/landing/components/TrustedBy';
import UserComment from '@/features/landing/components/UserComment';

const Title1Desc1FeaturesExpand = () => {
  return (
    <>
      <AppDefaultSeoLayout />
      <Stack color='text.primary'>
        {/* heroSection */}
        <HeroSection />

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

export default Title1Desc1FeaturesExpand;
