import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React from 'react';

import FeaturesContentSection from '@/page_components/FeaturesLandingPages/components/FeaturesContentSection';

import FeaturesCarouselIcons from './FeaturesCarouselIcons';

const FEATURES_WITH_SCENE_LIST = [
  {
    key: 'Summarization',
    icon: 'summary',
    label: 'pages:home_page__features_with_scene__feature_summarization__label',
    title: 'pages:home_page__features_with_scene__feature_summarization__title',
    description:
      'pages:home_page__features_with_scene__feature_summarization__description',
    image: '/assets/landing/feature-carousel/summary.png',
  },
  {
    key: 'Writing assistance',
    icon: 'rewriter',
    label:
      'pages:home_page__features_with_scene__feature_writing_assistance__label',
    title:
      'pages:home_page__features_with_scene__feature_writing_assistance__title',
    description:
      'pages:home_page__features_with_scene__feature_writing_assistance__description',
    image: '/assets/landing/feature-carousel/rewriter.png',
  },
  {
    key: 'Research',
    icon: 'search',
    label: 'pages:home_page__features_with_scene__feature_research__label',
    title: 'pages:home_page__features_with_scene__feature_research__title',
    description:
      'pages:home_page__features_with_scene__feature_research__description',
    image: '/assets/landing/feature-carousel/chat.png',
  },
  {
    key: 'Translation',
    icon: 'translator',
    label: 'pages:home_page__features_with_scene__feature_translation__label',
    title: 'pages:home_page__features_with_scene__feature_translation__title',
    description:
      'pages:home_page__features_with_scene__feature_translation__description',
    image: '/assets/landing/feature-carousel/translator.png',
  },
  {
    key: 'Email and communication',
    icon: 'reply',
    label:
      'pages:home_page__features_with_scene__feature_email_and_communication__label',
    title:
      'pages:home_page__features_with_scene__feature_email_and_communication__title',
    description:
      'pages:home_page__features_with_scene__feature_email_and_communication__description',
    image: '/assets/features-landing/ai-reply/1.png',
  },
  {
    key: 'Code assistance',
    icon: 'code',
    label:
      'pages:home_page__features_with_scene__feature_code_assistance__label',
    title:
      'pages:home_page__features_with_scene__feature_code_assistance__title',
    description:
      'pages:home_page__features_with_scene__feature_code_assistance__description',
    image: '/assets/landing/feature-carousel/code-assistance.png',
  },
  {
    key: 'Browser extension',
    icon: 'extension',
    label:
      'pages:home_page__features_with_scene__feature_browser_extension__label',
    title:
      'pages:home_page__features_with_scene__feature_browser_extension__title',
    description:
      'pages:home_page__features_with_scene__feature_browser_extension__description',
    image: '/assets/landing/feature-carousel/works-where-you-work.png',
  },
];

const FeaturesWithSceneVariantSection = () => {
  const { t } = useTranslation();

  return (
    <Stack>
      {FEATURES_WITH_SCENE_LIST.map((featureItem, index) => {
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
                <Typography
                  fontSize={{
                    xs: 16,
                    sm: 18,
                  }}
                  variant='custom'
                  lineHeight={1.5}
                >
                  {t(featureItem.description)}
                </Typography>
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
  );
};

export default FeaturesWithSceneVariantSection;
