import Stack from '@mui/material/Stack';
import { useTranslation } from 'next-i18next';
import React from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import CallToActionSection from '@/features/landing/components/CallToActionSection';
import HeroSection from '@/features/landing/components/HeroSection';
import MaxAIInNumbers from '@/features/landing/components/MaxAIInNumbers';
import TrustedBy from '@/features/landing/components/TrustedBy';
import UserComment from '@/features/landing/components/UserComment';
import FeaturesContentSection from '@/page_components/FeaturesLandingPages/components/FeaturesContentSection';
import FeaturesTextWithMarker from '@/page_components/FeaturesLandingPages/components/FeaturesTextWithMarker';

const AIChatPages = () => {
  const { t } = useTranslation();

  return (
    <Stack>
      <AppDefaultSeoLayout
        title={t('seo:features_landing__ai_chat__title')}
        description={t('seo:features_landing__ai_chat__description')}
      />

      {/* hero section */}
      <HeroSection
        heroVideoProps={{
          disabledVideo: true,
        }}
        trackerLinkProps={{
          pathnameRefEnable: true,
        }}
        propTitle={t('features_landing:ai_chat_pages__title')}
        propDescription={t('features_landing:ai_chat_pages__description')}
      />

      <FeaturesContentSection
        icon='open-ai'
        title={t('features_landing:ai_chat_pages__section1__title')}
        description={
          <Stack spacing={0.5} mt={2}>
            <FeaturesTextWithMarker
              marker
              variant='custom'
              fontSize={18}
              color='text.secondary'
              lineHeight={1.5}
            >
              GPT-4o, GPT-3.5
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
        imageUrl='/assets/features-landing/ai-chat/1.png'
        pictureRetouchingDirection='bottom-right'
      />
      <FeaturesContentSection
        icon='lang'
        title={t('features_landing:ai_chat_pages__section2__title')}
        description={t('features_landing:ai_chat_pages__section2__description')}
        imageUrl='/assets/features-landing/ai-chat/2.png'
        textWithImageLayout='imageToText'
        pictureRetouchingDirection='bottom-left'
      />

      <FeaturesContentSection
        icon='shield'
        title={t('features_landing:ai_chat_pages__section3__title')}
        description={t('features_landing:ai_chat_pages__section3__description')}
        imageUrl='/assets/features-landing/ai-chat/3.png'
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
    </Stack>
  );
};

export default AIChatPages;
