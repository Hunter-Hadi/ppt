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

const AIPromptsPages = () => {
  const { t } = useTranslation();

  const sections4Descriptions = [
    'features_landing:ai_prompts_pages__section4__description__item1',
    'features_landing:ai_prompts_pages__section4__description__item2',
    'features_landing:ai_prompts_pages__section4__description__item3',
    'features_landing:ai_prompts_pages__section4__description__item4',
    'features_landing:ai_prompts_pages__section4__description__item5',
    'features_landing:ai_prompts_pages__section4__description__item6',
    'features_landing:ai_prompts_pages__section4__description__item7',
    'features_landing:ai_prompts_pages__section4__description__item8',
    'features_landing:ai_prompts_pages__section4__description__item9',
    'features_landing:ai_prompts_pages__section4__description__item10',
    'features_landing:ai_prompts_pages__section4__description__item11',
    'features_landing:ai_prompts_pages__section4__description__item12',
  ];

  return (
    <Stack>
      <AppDefaultSeoLayout
        title={t('seo:features_landing__ai_prompts__title')}
        description={t('seo:features_landing__ai_prompts__description')}
      />
      {/* hero section */}
      <HeroSection
        heroVideoProps={{
          videoSrc: 'https://www.youtube.com/embed/CkFKtcZw5xY',
        }}
        trackerLinkProps={{
          pathnameRefEnable: true,
        }}
        title={t('features_landing:ai_prompts_pages__title')}
        description={t('features_landing:ai_prompts_pages__description')}
      />

      <FeaturesContentSection
        icon='prompt-library'
        title={t('features_landing:ai_prompts_pages__section1__title')}
        description={t(
          'features_landing:ai_prompts_pages__section1__description',
        )}
        imageUrl='/assets/features-landing/ai-prompts/1.png'
        pictureRetouchingDirection='bottom-right'
      />
      <FeaturesContentSection
        icon='account'
        title={t('features_landing:ai_prompts_pages__section2__title')}
        description={t(
          'features_landing:ai_prompts_pages__section2__description',
        )}
        imageUrl='/assets/features-landing/ai-prompts/2.png'
        textWithImageLayout='imageToText'
        pictureRetouchingDirection='bottom-left'
      />
      <FeaturesContentSection
        icon='auto-fix'
        title={t('features_landing:ai_prompts_pages__section3__title')}
        description={t(
          'features_landing:ai_prompts_pages__section3__description',
        )}
        imageUrl='/assets/features-landing/ai-prompts/3.png'
        pictureRetouchingDirection='top-right'
      />
      <FeaturesContentSection
        icon='and'
        title={t('features_landing:ai_prompts_pages__section4__title')}
        description={
          <Stack spacing={0.5} mt={2}>
            {sections4Descriptions.map((description) => (
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
        imageUrl='/assets/features-landing/ai-prompts/4.png'
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

export default AIPromptsPages;
