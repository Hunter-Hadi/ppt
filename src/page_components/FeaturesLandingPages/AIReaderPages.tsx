import { Stack } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { FC } from 'react'

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout'
import HeroSection from '@/features/landing/components/HeroSection'
import HowItWork from '@/features/landing/components/HowItWork'
import TrustedBy from '@/features/landing/components/TrustedBy'
import FunnelSurveyPopup from '@/features/survey/components/FunnelSurveyPopup'
import { CLOUD_FLARE_ASSETS_URL } from '@/global_constants'
import FeaturesContentSection from '@/page_components/FeaturesLandingPages/components/FeaturesContentSection'
import FeaturesExploreMore from '@/page_components/FeaturesLandingPages/components/FeaturesExploreMore'
import FeaturesTextWithMarker from '@/page_components/FeaturesLandingPages/components/FeaturesTextWithMarker'
interface IProps {
  propRef?: string
}
const AIReaderPages: FC<IProps> = () => {
  const { t } = useTranslation()

  const sections1Descriptions = [
    'features_landing:ai_reader_pages__section1__description__item1',
    'features_landing:ai_reader_pages__section1__description__item2',
    'features_landing:ai_reader_pages__section1__description__item3',
    'features_landing:ai_reader_pages__section1__description__item4',
  ]

  return (
    <Stack>
      <AppDefaultSeoLayout
        title={t('seo:features_landing__ai_reader__title')}
        description={t('seo:features_landing__ai_reader__description')}
      />
      {/* hero section */}
      <HeroSection
        heroVideoProps={{
          videoSrc: `${CLOUD_FLARE_ASSETS_URL}/videos/reading-assistant.mp4`,
          variant: 'autoplay',
          windowAutoPlay: true,
          videoPosterUrl: `/assets/features-landing/video-features/chat.png`,
          videoStyle: {
            backgroundColor: 'transparent',
            boxShadow: 'none',
            borderRadius: '16px',
          },
          boxSx: {
            borderRadius: '16px',
            border: '8px solid #fff',
          },
        }}
        trackerLinkProps={{
          pathnameRefEnable: true,
        }}
        title={t('features_landing:ai_reader_pages__title')}
        description={t('features_landing:ai_reader_pages__description')}
      />

      {/* trusted by */}
      <TrustedBy />
      <HowItWork />

      <FeaturesContentSection
        icon='1-click'
        title={t('features_landing:ai_reader_pages__section1__title')}
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
        imageUrl='/assets/features-landing/ai-reader/1.png'
      />
      <FeaturesContentSection
        icon='lang'
        title={t('features_landing:ai_reader_pages__section2__title')}
        description={t(
          'features_landing:ai_reader_pages__section2__description',
        )}
        imageUrl='/assets/features-landing/ai-reader/2.png'
        textWithImageLayout='imageToText'
      />
      <FeaturesContentSection
        icon='open-ai'
        title={t('features_landing:ai_reader_pages__section3__title')}
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
        imageUrl='/assets/features-landing/ai-reader/3.png'
      />
      <FeaturesContentSection
        icon='account'
        title={t('features_landing:ai_reader_pages__section4__title')}
        description={t(
          'features_landing:ai_reader_pages__section4__description',
        )}
        imageUrl='/assets/features-landing/ai-reader/4.png'
        textWithImageLayout='imageToText'
      />

      <FeaturesExploreMore />

      <FunnelSurveyPopup sceneType='SURVEY_INSTALL_DROPPED' />
    </Stack>
  )
}

export default AIReaderPages
