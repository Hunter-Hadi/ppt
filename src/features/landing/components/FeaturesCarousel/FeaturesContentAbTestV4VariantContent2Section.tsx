import { Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { FC } from 'react'

import { abTestVideoUrlObject } from '@/features/ab_tester/constant/landingVariant'
import FeaturesContentSection from '@/page_components/FeaturesLandingPages/components/FeaturesContentSection'
import FeaturesTextWithMarker from '@/page_components/FeaturesLandingPages/components/FeaturesTextWithMarker'

import FeaturesCarouselIcons from './FeaturesCarouselIcons'

const FEATURES_CONTENT = [
  {
    key: 'Summary assistant',
    icon: 'summary',
    label:
      'pages:home_page__features_content__ab_test_v4__content2__summary__label',
    title:
      'pages:home_page__features_content__ab_test_v4__content2__summary__title',
    image: '/assets/landing/feature-carousel/summary.png',
    videoUrl: abTestVideoUrlObject.summaryAssistant,
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
    videoUrl: abTestVideoUrlObject.readingAssistant,
    descriptionList: [
      'pages:home_page__features_content__ab_test_v4__content2__reading__description1',
      'pages:home_page__features_content__ab_test_v4__content2__reading__description2',
      'pages:home_page__features_content__ab_test_v4__content2__reading__description3',
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
    videoUrl: abTestVideoUrlObject.writingAssistant,
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
    videoUrl: abTestVideoUrlObject.draftingAssistant,
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
    videoUrl: abTestVideoUrlObject.emailAssistant,
    descriptionList: [
      'pages:home_page__features_content__ab_test_v4__content2__email__description1',
      'pages:home_page__features_content__ab_test_v4__content2__email__description2',
      'pages:home_page__features_content__ab_test_v4__content2__email__description3',
      'pages:home_page__features_content__ab_test_v4__content2__email__description4',
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
    videoUrl: abTestVideoUrlObject.searchAssistant,
    descriptionList: [
      'pages:home_page__features_content__ab_test_v4__content2__search__description1',
      'pages:home_page__features_content__ab_test_v4__content2__search__description2',
      'pages:home_page__features_content__ab_test_v4__content2__search__description3',
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
    videoUrl: abTestVideoUrlObject.translationAssistant,
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
]
interface IFeaturesContentAbTestV4VariantContent2SectionProps {
  abTestTitleDirection?: 'supersede' | 'top' | 'left' | 'rightRegular'
  abTestFeaturesType?: 'image' | 'video'
}
const FeaturesContentAbTestV4VariantContent2Section: FC<
  IFeaturesContentAbTestV4VariantContent2SectionProps
> = ({ abTestFeaturesType = 'image', abTestTitleDirection }) => {
  const { t } = useTranslation()
  return (
    <Stack>
      {FEATURES_CONTENT.map((featureItem, index) => {
        return (
          <FeaturesContentSection
            abTestTitleDirection={abTestTitleDirection}
            key={featureItem.key}
            icon={
              <Stack
                direction={'row'}
                alignItems='center'
                justifyContent={
                  abTestTitleDirection === 'top' ? 'center' : 'flex-start'
                }
                spacing={1.5}
              >
                <FeaturesCarouselIcons
                  icon={featureItem.icon}
                  size={abTestTitleDirection === 'top' ? 30 : undefined}
                  sx={{
                    borderRadius: '50%',
                  }}
                />
                <Typography
                  fontSize={abTestTitleDirection === 'top' ? 15 : 20}
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
              <Stack
                spacing={0.5}
                mt={abTestTitleDirection === 'top' ? 1 : 2}
                alignItems={
                  abTestTitleDirection === 'top' ? 'center' : 'flex-start'
                }
              >
                {featureItem.descriptionList.map((description) => (
                  <FeaturesTextWithMarker
                    key={description}
                    marker={abTestTitleDirection !== 'top'}
                    variant='custom'
                    fontSize={abTestTitleDirection === 'top' ? 12 : 18}
                    lineHeight={abTestTitleDirection === 'top' ? 1.2 : 1.5}
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
            videoUrl={
              abTestFeaturesType === 'video' ? featureItem.videoUrl : ''
            }
          />
        )
      })}
    </Stack>
  )
}

export default FeaturesContentAbTestV4VariantContent2Section
