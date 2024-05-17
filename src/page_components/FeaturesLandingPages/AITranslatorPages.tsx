import { Stack } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import CallToActionSection from '@/features/landing/components/CallToActionSection';
import HeroSection from '@/features/landing/components/HeroSection';
import MaxAIInNumbers from '@/features/landing/components/MaxAIInNumbers';
import TrustedBy from '@/features/landing/components/TrustedBy';
import UserComment from '@/features/landing/components/UserComment';
import FeaturesContentSection from '@/page_components/FeaturesLandingPages/components/FeaturesContentSection';

const AITranslatorPages = () => {
  const { t } = useTranslation();

  return (
    <Stack>
      <AppDefaultSeoLayout
        title={t('seo:features_landing__ai_translator__title')}
        description={t('seo:features_landing__ai_translator__description')}
      />

      {/* hero section */}
      <HeroSection
        heroVideoProps={{
          disabledVideo: true,
        }}
        trackerLinkProps={{
          pathnameRefEnable: true,
        }}
        title={t('features_landing:ai_translator_pages__title')}
        description={t('features_landing:ai_translator_pages__description')}
      />

      <FeaturesContentSection
        icon='translate'
        title={t('features_landing:ai_translator_pages__section1__title')}
        description={t(
          'features_landing:ai_translator_pages__section1__description',
        )}
        imageUrl='/assets/features-landing/ai-translator/1.png'
        pictureRetouchingDirection='bottom-right'
      />
      <FeaturesContentSection
        icon='earth'
        title={t('features_landing:ai_translator_pages__section2__title')}
        description={t(
          'features_landing:ai_translator_pages__section2__description',
        )}
        imageUrl='/assets/features-landing/ai-translator/2.png'
        textWithImageLayout='imageToText'
        pictureRetouchingDirection='bottom-left'
      />

      <FeaturesContentSection
        icon='lang'
        title={t('features_landing:ai_translator_pages__section3__title')}
        description={t(
          'features_landing:ai_translator_pages__section3__description',
        )}
        imageUrl='/assets/features-landing/ai-translator/3.png'
        pictureRetouchingDirection='top-right'
      />
      <FeaturesContentSection
        icon='open-ai'
        title={t('features_landing:ai_translator_pages__section4__title')}
        description={t(
          'features_landing:ai_translator_pages__section4__description',
        )}
        imageUrl='/assets/features-landing/ai-translator/4.png'
        pictureRetouchingDirection='bottom-left'
        textWithImageLayout='imageToText'
      />
      <FeaturesContentSection
        icon='translate'
        title={t('features_landing:ai_translator_pages__section5__title')}
        description={t(
          'features_landing:ai_translator_pages__section5__description',
        )}
        imageUrl='/assets/features-landing/ai-translator/5.png'
      />

      {/* trusted by */}
      <TrustedBy />

      {/* maxai in numbers */}
      <MaxAIInNumbers />

      {/* user comment */}
      <UserComment />

      {/* call to action section */}
      <CallToActionSection
        ctaButtonTrackerLinkProps={{ pathnameRefEnable: true }}
      />
    </Stack>
  );
};

export default AITranslatorPages;
