import { Stack } from '@mui/material';
import React from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import CallToActionSection from '@/features/landing/components/CallToActionSection';
import FeaturesCarousel from '@/features/landing/components/FeaturesCarousel';
import HeroSection from '@/features/landing/components/HeroSection';
import MaxAIInNumbers from '@/features/landing/components/MaxAIInNumbers';
import TrustedBy from '@/features/landing/components/TrustedBy';
import UserComment from '@/features/landing/components/UserComment';

const Title1Desc1FeaturesCarousel = () => {
  return (
    <>
      <AppDefaultSeoLayout />
      <Stack color='text.primary'>
        {/* heroSection */}
        <HeroSection />

        {/* feature carousel */}
        <FeaturesCarousel />

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

export default Title1Desc1FeaturesCarousel;
