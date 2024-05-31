import { Stack } from '@mui/material';
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
import FeaturesTextWithMarker from '@/page_components/FeaturesLandingPages/components/FeaturesTextWithMarker';
interface IProps {
  propRef?: string;
}
const AIVisionPages: FC<IProps> = () => {
  const { t } = useTranslation();

  return (
    <Stack>
      <AppDefaultSeoLayout
        title={t('seo:features_landing__ai_vision__title')}
        description={t('seo:features_landing__ai_vision__description')}
      />

      {/* hero section */}
      <HeroSection
        heroVideoProps={{
          disabledVideo: true,
        }}
        trackerLinkProps={{
          pathnameRefEnable: true,
        }}
        title={t('features_landing:ai_vision_pages__title')}
        description={t('features_landing:ai_vision_pages__description')}
      />

      <FeaturesContentSection
        icon='chat'
        title={t('features_landing:ai_vision_pages__section1__title')}
        description={t(
          'features_landing:ai_vision_pages__section1__description',
        )}
        imageUrl='/assets/features-landing/ai-vision/1.png'
        pictureRetouchingDirection='bottom-right'
      />
      <FeaturesContentSection
        icon='screenshot'
        title={t('features_landing:ai_vision_pages__section2__title')}
        description={t(
          'features_landing:ai_vision_pages__section2__description',
        )}
        imageUrl='/assets/features-landing/ai-vision/2.png'
        textWithImageLayout='imageToText'
        pictureRetouchingDirection='bottom-left'
      />

      <FeaturesContentSection
        icon='earth'
        title={t('features_landing:ai_vision_pages__section3__title')}
        description={t(
          'features_landing:ai_vision_pages__section3__description',
        )}
        imageUrl='/assets/features-landing/ai-vision/3.png'
        pictureRetouchingDirection='top-right'
      />
      <FeaturesContentSection
        icon='open-ai'
        title={t('features_landing:ai_vision_pages__section4__title')}
        description={
          <Stack spacing={0.5} mt={2}>
            <FeaturesTextWithMarker
              marker
              variant='custom'
              fontSize={18}
              color='text.secondary'
              lineHeight={1.5}
            >
              GPT-4o
            </FeaturesTextWithMarker>
            <FeaturesTextWithMarker
              marker
              variant='custom'
              fontSize={18}
              color='text.secondary'
              lineHeight={1.5}
            >
              Claude-3-opus/sonnet/haiku
            </FeaturesTextWithMarker>
            <FeaturesTextWithMarker
              marker
              variant='custom'
              fontSize={18}
              color='text.secondary'
              lineHeight={1.5}
            >
              Gemini-1.5-pro, Gemini-pro
            </FeaturesTextWithMarker>
          </Stack>
        }
        imageUrl='/assets/features-landing/ai-vision/4.png'
        pictureRetouchingDirection='bottom-left'
        textWithImageLayout='imageToText'
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

export default AIVisionPages;
