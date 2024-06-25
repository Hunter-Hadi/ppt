import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React from 'react';

import useLandingABTester from '@/features/ab_tester/hooks/useLandingABTester';
import FeaturesContentSection from '@/page_components/FeaturesLandingPages/components/FeaturesContentSection';
import FeaturesTextWithMarker from '@/page_components/FeaturesLandingPages/components/FeaturesTextWithMarker';

import FeaturesCarouselIcons from './FeaturesCarouselIcons';

const FEATURES_CONTENT = [
  {
    key: 'Summary assistant',
    icon: 'summary',
    label:
      'pages:home_page__features_content__ab_test_v4__content2__summary__label',
    title:
      'pages:home_page__features_content__ab_test_v4__content2__summary__title',
    image: '/assets/landing/feature-carousel/summary.png',
    descriptionList: [
      'pages:home_page__features_content__ab_test_v4__content2__summary__description1',
      'pages:home_page__features_content__ab_test_v4__content2__summary__description2',
      'pages:home_page__features_content__ab_test_v4__content2__summary__description3',
      'pages:home_page__features_content__ab_test_v4__content2__summary__description4',
    ],
  },

  {
    key: 'Reading assistant',
    icon: 'chat',
    label:
      'pages:home_page__features_content__ab_test_v4__content2__reading__label',
    title:
      'pages:home_page__features_content__ab_test_v4__content2__reading__title',
    image: '/assets/features-landing/ai-summary/2.png',
    descriptionList: [
      'pages:home_page__features_content__ab_test_v4__content2__reading__description1',
      'pages:home_page__features_content__ab_test_v4__content2__reading__description2',
      'pages:home_page__features_content__ab_test_v4__content2__reading__description3',
    ],
  },
  {
    key: 'Search assistant',
    icon: 'search',
    label:
      'pages:home_page__features_content__ab_test_v4__content2__search__label',
    title:
      'pages:home_page__features_content__ab_test_v4__content2__search__title',
    image: '/assets/landing/feature-carousel/chat.png',
    descriptionList: [
      'pages:home_page__features_content__ab_test_v4__content2__search__description1',
      'pages:home_page__features_content__ab_test_v4__content2__search__description2',
      'pages:home_page__features_content__ab_test_v4__content2__search__description3',
    ],
  },
  {
    key: 'Writing assistant',
    icon: 'rewriter',
    label:
      'pages:home_page__features_content__ab_test_v4__content2__writing__label',
    title:
      'pages:home_page__features_content__ab_test_v4__content2__writing__title',
    image: '/assets/landing/feature-carousel/rewriter.png',
    descriptionList: [
      'pages:home_page__features_content__ab_test_v4__content2__writing__description1',
      'pages:home_page__features_content__ab_test_v4__content2__writing__description2',
      'pages:home_page__features_content__ab_test_v4__content2__writing__description3',
      'pages:home_page__features_content__ab_test_v4__content2__writing__description4',
    ],
  },
  {
    key: 'Drafting assistant',
    icon: 'prompts',
    label:
      'pages:home_page__features_content__ab_test_v4__content2__drafting__label',
    title:
      'pages:home_page__features_content__ab_test_v4__content2__drafting__title',
    image: '/assets/features-landing/ai-prompts/1.png',
    descriptionList: [
      'pages:home_page__features_content__ab_test_v4__content2__drafting__description1',
      'pages:home_page__features_content__ab_test_v4__content2__drafting__description2',
      'pages:home_page__features_content__ab_test_v4__content2__drafting__description3',
      'pages:home_page__features_content__ab_test_v4__content2__drafting__description4',
    ],
  },
  {
    key: 'Email assistant',
    icon: 'reply',
    label:
      'pages:home_page__features_content__ab_test_v4__content2__email__label',
    title:
      'pages:home_page__features_content__ab_test_v4__content2__email__title',
    image: '/assets/features-landing/ai-reply/1.png',
    descriptionList: [
      'pages:home_page__features_content__ab_test_v4__content2__email__description1',
      'pages:home_page__features_content__ab_test_v4__content2__email__description2',
      'pages:home_page__features_content__ab_test_v4__content2__email__description3',
      'pages:home_page__features_content__ab_test_v4__content2__email__description4',
    ],
  },
  {
    key: 'Translation assistant',
    icon: 'translator',
    label:
      'pages:home_page__features_content__ab_test_v4__content2__translation__label',
    title:
      'pages:home_page__features_content__ab_test_v4__content2__translation__title',
    image: '/assets/landing/feature-carousel/translator.png',
    descriptionList: [
      'pages:home_page__features_content__ab_test_v4__content2__translation__description1',
      'pages:home_page__features_content__ab_test_v4__content2__translation__description2',
      'pages:home_page__features_content__ab_test_v4__content2__translation__description3',
    ],
  },
  {
    key: 'Browser extension',
    icon: 'extension',
    label:
      'pages:home_page__features_content__ab_test_v4__content2__browser__label',
    title:
      'pages:home_page__features_content__ab_test_v4__content2__browser__title',
    image: '/assets/landing/feature-carousel/works-where-you-work.png',
    descriptionList: [
      'pages:home_page__features_content__ab_test_v4__content2__browser__description1',
      'pages:home_page__features_content__ab_test_v4__content2__browser__description2',
      'pages:home_page__features_content__ab_test_v4__content2__browser__description3',
    ],
  },
];

const FeaturesContentAbTestV4VariantContent2Section = () => {
  const { t } = useTranslation();

  const { featuresContentHasCtaBtn } = useLandingABTester();

  return (
    <Stack>
      {FEATURES_CONTENT.map((featureItem, index) => {
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
            showCtaInstallButton={featuresContentHasCtaBtn}
          />
        );
      })}
    </Stack>
  );
};

export default FeaturesContentAbTestV4VariantContent2Section;
