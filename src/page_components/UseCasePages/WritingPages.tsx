import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import React from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import AppLoadingLayout from '@/app_layout/AppLoadingLayout';
import CallToActionSection from '@/features/landing/components/CallToActionSection';
import FeaturesCarouselIcons from '@/features/landing/components/FeaturesCarousel/FeaturesCarouselIcons';
import HeroSection from '@/features/landing/components/HeroSection';
import HowItWork from '@/features/landing/components/HowItWork';
import MaxAIInNumbers from '@/features/landing/components/MaxAIInNumbers';
import TrustedBy from '@/features/landing/components/TrustedBy';
import UserComment from '@/features/landing/components/UserComment';
import { RESOURCES_URL } from '@/global_constants';
import FeaturesContentSection from '@/page_components/FeaturesLandingPages/components/FeaturesContentSection';
import FeaturesTextWithMarker from '@/page_components/FeaturesLandingPages/components/FeaturesTextWithMarker';

const RESEARCH_FEATURES_LIST = [
  {
    key: 'Writing assistant',
    icon: 'rewriter',
    label: 'use_cases_pages:writing__features_writing__label',
    title: 'use_cases_pages:writing__features_writing__title',
    descriptionList: [
      'use_cases_pages:writing__features_writing__description__part1',
      'use_cases_pages:writing__features_writing__description__part2',
      'use_cases_pages:writing__features_writing__description__part3',
      'use_cases_pages:writing__features_writing__description__part4',
    ],
    image: '/assets/landing/feature-carousel/rewriter.png',
  },
  {
    key: 'Translation assistant',
    icon: 'translator',
    label: 'use_cases_pages:writing__features_translation__label',
    title: 'use_cases_pages:writing__features_translation__title',
    descriptionList: [
      'use_cases_pages:writing__features_translation__description__part1',
      'use_cases_pages:writing__features_translation__description__part2',
      'use_cases_pages:writing__features_translation__description__part3',
    ],
    image: '/assets/landing/feature-carousel/translator.png',
  },
  {
    key: 'Email and communication',
    icon: 'reply',
    label: 'use_cases_pages:writing__features_email_and_communication__label',
    title: 'use_cases_pages:writing__features_email_and_communication__title',
    descriptionList: [
      'use_cases_pages:writing__features_email_and_communication__description__part1',
      'use_cases_pages:writing__features_email_and_communication__description__part2',
      'use_cases_pages:writing__features_email_and_communication__description__part3',
      'use_cases_pages:writing__features_email_and_communication__description__part4',
    ],
    image: '/assets/features-landing/ai-reply/1.png',
  },
  {
    key: 'Browser extension',
    icon: 'extension',
    label: 'use_cases_pages:writing__features_browser__label',
    title: 'use_cases_pages:writing__features_browser__title',
    descriptionList: [
      'use_cases_pages:writing__features_browser__description__part1',
      'use_cases_pages:writing__features_browser__description__part2',
      'use_cases_pages:writing__features_browser__description__part3',
    ],
    image: '/assets/landing/feature-carousel/works-where-you-work.png',
  },
];

const WritingPages = () => {
  const { t } = useTranslation();
  return (
    <AppLoadingLayout loading={false} sx={{ minHeight: '90vh' }}>
      <AppDefaultSeoLayout
        title={t('seo:use_cases__writing__title')}
        description={t('seo:use_cases__writing__desc')}
      />
      <Stack color='text.primary'>
        {/* heroSection */}
        <HeroSection
          title={t('use_cases_pages:writing__title')}
          description={t('use_cases_pages:writing__description')}
          heroVideoProps={{
            videoSrc: `${RESOURCES_URL}/video/landing-page-primary.mp4`,
            variant: 'autoplay',
          }}
          sx={{
            '& .content-wrapper': {
              maxWidth: 'unset',
            },
            '& .description': {
              maxWidth: '835px',
            },
          }}
          indicatorOnBottom
        />

        {/* trusted by */}
        <TrustedBy />
        <HowItWork />
        {/* feature  */}
        <Stack>
          {RESEARCH_FEATURES_LIST.map((featureItem, index) => {
            return (
              <FeaturesContentSection
                key={featureItem.key}
                icon={
                  <Stack direction={'row'} alignItems='center' spacing={1.5}>
                    <FeaturesCarouselIcons
                      icon={featureItem.icon}
                      sx={{
                        borderRadius: '50%',
                      }}
                    />
                    <Typography
                      fontSize={20}
                      variant='custom'
                      color='text.primary'
                      fontWeight={600}
                    >
                      {t(featureItem.label)}
                    </Typography>
                  </Stack>
                }
                title={t(featureItem.title)}
                description={
                  <Stack spacing={0.5} mt={2}>
                    {featureItem.descriptionList.map((description) => (
                      <FeaturesTextWithMarker
                        key={description}
                        marker
                        variant='custom'
                        fontSize={18}
                        lineHeight={1.5}
                      >
                        {t(description)}
                      </FeaturesTextWithMarker>
                    ))}
                  </Stack>
                }
                textWithImageLayout={
                  index % 2 === 0 ? 'textToImage' : 'imageToText'
                }
                imageUrl={featureItem.image}
              />
            );
          })}
        </Stack>
        {/* {!loaded && <FeaturesCarouselSkeleton />} */}
        {/* maxai in numbers */}
        <MaxAIInNumbers />
        {/* user comment */}
        <UserComment />
        {/* call to action section */}
        <CallToActionSection />
      </Stack>
    </AppLoadingLayout>
  );
};

export default WritingPages;
