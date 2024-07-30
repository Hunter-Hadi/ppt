import Stack from '@mui/material/Stack'
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
          videoSrc: `${RESOURCES_URL}/video/features/ai-chat.mp4`,
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
        videoPosterUrl='/assets/features-landing/ai-chat/1.png'
        videoUrl={`${RESOURCES_URL}/video/features/ai-chat/chat-with-top-ai-all-in-one-place.mp4`}
      />
      <FeaturesContentSection
        icon='search'
        title={t('features_landing:ai_chat_pages__section2__title')}
        description={t('features_landing:ai_chat_pages__section2__description')}
        imageUrl='/assets/features-landing/ai-search/2.png'
        textWithImageLayout='imageToText'
        videoPosterUrl='/assets/features-landing/ai-search/2.png'
        videoUrl={`${RESOURCES_URL}/video/features/search-assistant.mp4`}
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
        imageUrl='/assets/features-landing/ai-chat/4.png'
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
        icon='prompt-library'
        title={t('features_landing:ai_chat_pages__section7__title')}
        description={t('features_landing:ai_chat_pages__section7__description')}
        imageUrl='/assets/features-landing/ai-chat/3.png'
        textWithImageLayout='imageToText'
        videoUrl={`${RESOURCES_URL}/video/features/drafting-assistant.mp4`}
        videoPosterUrl={`/assets/features-landing/video-features/prompt.png`}
      />
      <FeaturesContentSection
        icon='shield'
        title={t('features_landing:ai_chat_pages__section6__title')}
        description={t('features_landing:ai_chat_pages__section6__description')}
        imageUrl='/assets/features-landing/ai-chat/3.png'
        textWithImageLayout='textToImage'
      />
      <FeaturesExploreMore />
      <FunnelSurveyPopup sceneType='SURVEY_INSTALL_DROPPED' />
    </Stack>
  )
}

export default AIChatPages
