import { Stack } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { FC } from 'react'

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout'
import HeroSection from '@/features/landing/components/HeroSection'
import TrustedBy from '@/features/landing/components/TrustedBy'
import FunnelSurveyPopup from '@/features/survey/components/FunnelSurveyPopup'
import { RESOURCES_URL } from '@/global_constants'
import FeaturesContentSection from '@/page_components/FeaturesLandingPages/components/FeaturesContentSection'
import FeaturesExploreMore from '@/page_components/FeaturesLandingPages/components/FeaturesExploreMore'
interface IProps {
  propRef?: string
}
const AITranslatorPages: FC<IProps> = () => {
  const { t } = useTranslation()

  return (
    <Stack>
      <AppDefaultSeoLayout
        title={t('seo:features_landing__ai_translator__title')}
        description={t('seo:features_landing__ai_translator__description')}
      />

      {/* hero section */}
      <HeroSection
        heroVideoProps={{
          videoSrc: `${RESOURCES_URL}/video/features/translation-assistant.mp4`,
          variant: 'autoplay',
          windowAutoPlay: true,
          videoPosterUrl: `/assets/features-landing/video-features/translator.png`,
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
        title={t('features_landing:ai_translator_pages__title')}
        description={t('features_landing:ai_translator_pages__description')}
      />

      {/* trusted by */}
      <TrustedBy />

      <FeaturesContentSection
        icon='translate'
        title={t('features_landing:ai_translator_pages__section1__title')}
        description={t(
          'features_landing:ai_translator_pages__section1__description',
        )}
        imageUrl='/assets/features-landing/ai-translator/1.png'
      />
      <FeaturesContentSection
        icon='earth'
        title={t('features_landing:ai_translator_pages__section2__title')}
        description={t(
          'features_landing:ai_translator_pages__section2__description',
        )}
        imageUrl='/assets/features-landing/ai-translator/2.png'
        textWithImageLayout='imageToText'
      />

      <FeaturesContentSection
        icon='lang'
        title={t('features_landing:ai_translator_pages__section3__title')}
        description={t(
          'features_landing:ai_translator_pages__section3__description',
        )}
        imageUrl='/assets/features-landing/ai-translator/3.png'
      />
      <FeaturesContentSection
        icon='open-ai'
        title={t('features_landing:ai_translator_pages__section4__title')}
        description={t(
          'features_landing:ai_translator_pages__section4__description',
        )}
        imageUrl='/assets/features-landing/ai-translator/4.png'
        textWithImageLayout='imageToText'
      />
      <FeaturesContentSection
        icon='translate'
        title={t('features_landing:ai_translator_pages__section5__title')}
        description={t(
          'features_landing:ai_translator_pages__section5__description',
        )}
        imageUrl='/assets/features-landing/ai-translator/5.png'
      />

      <FeaturesExploreMore />

      <FunnelSurveyPopup sceneType='SURVEY_INSTALL_DROPPED' />
    </Stack>
  )
}

export default AITranslatorPages
