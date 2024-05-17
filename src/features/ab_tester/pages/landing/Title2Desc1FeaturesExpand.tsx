import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import CallToActionSection from '@/features/landing/components/CallToActionSection';
import FeaturesExpandSection from '@/features/landing/components/FeaturesCarousel/FeaturesExpandVariantSection';
import HeroSection from '@/features/landing/components/HeroSection';
import MaxAIInNumbers from '@/features/landing/components/MaxAIInNumbers';
import TrustedBy from '@/features/landing/components/TrustedBy';
import UserComment from '@/features/landing/components/UserComment';

const Title2Desc1FeaturesExpand = () => {
  const { t } = useTranslation();

  const { isReady } = useRouter();

  return (
    <>
      <AppDefaultSeoLayout />
      <Stack color='text.primary'>
        {/* heroSection */}
        <HeroSection
          loading={!isReady}
          title={
            <>
              {t('pages:home_page__hero_section__title__variant2__part1')}
              <br />
              {t('pages:home_page__hero_section__title__variant2__part2')}
            </>
          }
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

export default Title2Desc1FeaturesExpand;
