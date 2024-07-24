import Stack from '@mui/material/Stack'
import { useTranslation } from 'next-i18next'
import React, { FC } from 'react'

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout'
import HeroSection from '@/features/landing/components/HeroSection'
import TrustedBy from '@/features/landing/components/TrustedBy'
import FunnelSurveyPopup from '@/features/survey/components/FunnelSurveyPopup'
import FeaturesContentSection from '@/page_components/FeaturesLandingPages/components/FeaturesContentSection'
import FeaturesExploreMore from '@/page_components/FeaturesLandingPages/components/FeaturesExploreMore'
interface IProps {
  propRef?: string
}
const AIChatPages: FC<IProps> = () => {
  const { t } = useTranslation()

  return (
    <Stack>
      <AppDefaultSeoLayout
        title={t('seo:features_landing__ai_chat__title')}
        description={t('seo:features_landing__ai_chat__description')}
      />
      {/* hero section */}
      <HeroSection
        heroVideoProps={{
          videoSrc: 'https://www.youtube.com/embed/mAi1D9cbGos',
          variant: 'embed',
        }}
        trackerLinkProps={{
          pathnameRefEnable: true,
        }}
        title={t('features_landing:ai_chat_pages__title')}
        description={t('features_landing:ai_chat_pages__description')}
      />

      {/* trusted by */}
      <TrustedBy />

      <FeaturesContentSection
        icon='open-ai'
        title={t('features_landing:ai_chat_pages__section1__title')}
        description={t('features_landing:ai_chat_pages__section1__description')}
        imageUrl='/assets/features-landing/ai-chat/1.png'
        textWithImageLayout='textToImage'
      />
      <FeaturesContentSection
        icon='search'
        title={t('features_landing:ai_chat_pages__section2__title')}
        description={t('features_landing:ai_chat_pages__section2__description')}
        imageUrl='/assets/features-landing/ai-search/2.png'
        textWithImageLayout='imageToText'
      />
      <FeaturesContentSection
        icon='image-scanner'
        title={t('features_landing:ai_chat_pages__section3__title')}
        description={t('features_landing:ai_chat_pages__section3__description')}
        imageUrl='/assets/features-landing/ai-vision/1.png'
        textWithImageLayout='textToImage'
      />
      <FeaturesContentSection
        icon='art'
        title={t('features_landing:ai_chat_pages__section4__title')}
        description={t('features_landing:ai_chat_pages__section4__description')}
        imageUrl='/assets/features-landing/ai-art/1.png'
        textWithImageLayout='imageToText'
      />
      <FeaturesContentSection
        icon='fast'
        title={t('features_landing:ai_chat_pages__section5__title')}
        description={t('features_landing:ai_chat_pages__section5__description')}
        imageUrl='/assets/features-landing/ai-chat/2.png'
        textWithImageLayout='textToImage'
      />
      <FeaturesContentSection
        icon='shield'
        title={t('features_landing:ai_chat_pages__section6__title')}
        description={t('features_landing:ai_chat_pages__section6__description')}
        imageUrl='/assets/features-landing/ai-chat/3.png'
        textWithImageLayout='imageToText'
      />

      <FeaturesExploreMore />

      <FunnelSurveyPopup sceneType='SURVEY_INSTALL_DROPPED' />
    </Stack>
  )
}

export default AIChatPages
