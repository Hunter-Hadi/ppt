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
import FeaturesTextWithMarker from '@/page_components/FeaturesLandingPages/components/FeaturesTextWithMarker';

const AIRewriterPages = () => {
  const { t } = useTranslation();

  const sectionDescriptions = [
    'features_landing:ai_rewriter_pages__section1__description__item1',
    'features_landing:ai_rewriter_pages__section1__description__item2',
    'features_landing:ai_rewriter_pages__section1__description__item3',
    'features_landing:ai_rewriter_pages__section1__description__item4',
    'features_landing:ai_rewriter_pages__section1__description__item5',
    'features_landing:ai_rewriter_pages__section1__description__item6',
    'features_landing:ai_rewriter_pages__section1__description__item7',
  ];

  return (
    <Stack>
      <AppDefaultSeoLayout
        title={t('seo:features_landing__ai_rewriter__title')}
        description={t('seo:features_landing__ai_rewriter__description')}
      />
      {/* hero section */}
      <HeroSection
        heroVideoProps={{
          videoSrc: 'https://www.youtube.com/embed/mAi1D9cbGos',
        }}
        trackerLinkProps={{
          pathnameRefEnable: true,
        }}
        title={t('features_landing:ai_rewriter_pages__title')}
        description={t('features_landing:ai_rewriter_pages__description')}
      />

      <FeaturesContentSection
        icon='auto-fix'
        title={t('features_landing:ai_rewriter_pages__section1__title')}
        description={
          <Stack spacing={0.5} mt={2}>
            {sectionDescriptions.map((description) => (
              <FeaturesTextWithMarker
                key={description}
                marker
                variant='custom'
                fontSize={18}
                color='text.secondary'
                lineHeight={1.5}
              >
                {t(description)}
              </FeaturesTextWithMarker>
            ))}
          </Stack>
        }
        imageUrl='/assets/features-landing/ai-rewriter/1.png'
        pictureRetouchingDirection='bottom-right'
      />
      <FeaturesContentSection
        icon='1-click'
        title={t('features_landing:ai_rewriter_pages__section2__title')}
        description={t(
          'features_landing:ai_rewriter_pages__section2__description',
        )}
        imageUrl='/assets/features-landing/ai-rewriter/2.png'
        textWithImageLayout='imageToText'
        pictureRetouchingDirection='bottom-left'
      />
      <FeaturesContentSection
        icon='open-ai'
        title={t('features_landing:ai_rewriter_pages__section3__title')}
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
        imageUrl='/assets/features-landing/ai-rewriter/3.png'
        pictureRetouchingDirection='top-right'
      />
      <FeaturesContentSection
        icon='account'
        title={t('features_landing:ai_rewriter_pages__section4__title')}
        description={t(
          'features_landing:ai_rewriter_pages__section4__description',
        )}
        imageUrl='/assets/features-landing/ai-rewriter/4.png'
        textWithImageLayout='imageToText'
        pictureRetouchingDirection='bottom-left'
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

export default AIRewriterPages;
