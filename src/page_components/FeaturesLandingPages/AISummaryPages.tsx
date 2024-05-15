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

const AISummaryPages = () => {
  const { t } = useTranslation();

  const sections1Descriptions = [
    'features_landing:ai_summary_pages__section1__description__item1',
    'features_landing:ai_summary_pages__section1__description__item2',
    'features_landing:ai_summary_pages__section1__description__item3',
    'features_landing:ai_summary_pages__section1__description__item4',
    'features_landing:ai_summary_pages__section1__description__item5',
  ];

  return (
    <Stack>
      <AppDefaultSeoLayout
        title={t('seo:features_landing__ai_summary__title')}
        description={t('seo:features_landing__ai_summary__description')}
      />

      {/* hero section */}
      <HeroSection
        heroVideoProps={{
          disabledVideo: true,
        }}
        trackerLinkProps={{
          pathnameRefEnable: true,
        }}
        propTitle={t('features_landing:ai_summary_pages__title')}
        propDescription={t('features_landing:ai_summary_pages__description')}
      />

      <FeaturesContentSection
        icon='lang'
        title={t('features_landing:ai_summary_pages__section1__title')}
        description={
          <Stack spacing={0.5} mt={2}>
            {sections1Descriptions.map((description) => (
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
        imageUrl='/assets/features-landing/ai-summary/1.png'
        pictureRetouchingDirection='bottom-right'
      />
      <FeaturesContentSection
        icon='chat'
        title={t('features_landing:ai_summary_pages__section2__title')}
        description={t(
          'features_landing:ai_summary_pages__section2__description',
        )}
        imageUrl='/assets/features-landing/ai-summary/2.png'
        textWithImageLayout='imageToText'
        pictureRetouchingDirection='bottom-left'
      />

      <FeaturesContentSection
        icon='account'
        title={t('features_landing:ai_summary_pages__section3__title')}
        description={t(
          'features_landing:ai_summary_pages__section3__description',
        )}
        imageUrl='/assets/features-landing/ai-summary/3.png'
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

export default AISummaryPages;
