import Stack from '@mui/material/Stack';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import CallToActionSection from '@/features/landing/components/CallToActionSection';
import HeroSection from '@/features/landing/components/HeroSection';
import MaxAIInNumbers from '@/features/landing/components/MaxAIInNumbers';
import TrustedBy from '@/features/landing/components/TrustedBy';
import UserComment from '@/features/landing/components/UserComment';
import FunnelSurveyPopup from '@/features/survey/components/FunnelSurveyPopup';
import FeaturesContentSection from '@/page_components/FeaturesLandingPages/components/FeaturesContentSection';
interface IProps {
  propRef?: string;
}
const AIArtPages: FC<IProps> = () => {
  const { t } = useTranslation();

  return (
    <Stack>
      <AppDefaultSeoLayout
        title={t('seo:features_landing__ai_art__title')}
        description={t('seo:features_landing__ai_art__description')}
      />

      {/* hero section */}
      <HeroSection
        heroVideoProps={{
          disabledVideo: true,
        }}
        trackerLinkProps={{
          pathnameRefEnable: true,
        }}
        title={t('features_landing:ai_art_pages__title')}
        description={t('features_landing:ai_art_pages__description')}
      />

      <FeaturesContentSection
        icon='art'
        title={t('features_landing:ai_art_pages__section1__title')}
        description={t('features_landing:ai_art_pages__section1__description')}
        imageUrl='/assets/features-landing/ai-art/1.png'
        pictureRetouchingDirection='bottom-right'
      />
      <FeaturesContentSection
        icon='fast'
        title={t('features_landing:ai_art_pages__section2__title')}
        description={t('features_landing:ai_art_pages__section2__description')}
        imageUrl='/assets/features-landing/ai-art/2.png'
        textWithImageLayout='imageToText'
        pictureRetouchingDirection='bottom-left'
      />

      <FeaturesContentSection
        icon='open-ai'
        title={t('features_landing:ai_art_pages__section3__title')}
        description={t('features_landing:ai_art_pages__section3__description')}
        imageUrl='/assets/features-landing/ai-art/3.png'
        pictureRetouchingDirection='top-right'
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
      <FunnelSurveyPopup sceneType='SURVEY_INSTALL_DROPPED' />
    </Stack>
  );
};

export default AIArtPages;
