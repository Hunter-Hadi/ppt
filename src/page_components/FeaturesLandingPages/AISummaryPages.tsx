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
const AISummaryPages: FC<IProps> = () => {
  const { t } = useTranslation()

  const summaryData = [
    {
      icon: '1-click',
      title: 'features_landing:ai_summary_pages__section1__title',
      description: 'features_landing:ai_summary_pages__section1__description',
      videoPosterUrl: '/assets/features-landing/video-features/summary.png',
      videoUrl: `${RESOURCES_URL}/video/features/summary-assistant.mp4`,
    },
    {
      icon: 'chat',
      title: 'features_landing:ai_summary_pages__section2__title',
      description: 'features_landing:ai_summary_pages__section2__description',
      imageUrl: `/assets/features-landing/youtubesummary/2.png`,
    },
    {
      icon: 'chat-with-pdf',
      title: 'features_landing:ai_summary_pages__section3__title',
      description: 'features_landing:ai_summary_pages__section3__description',
      imageUrl: `/assets/features-landing/chatpdf/2.png`,
    },
    {
      icon: 'chat-with-pdf',
      title: 'features_landing:ai_summary_pages__section4__title',
      description: 'features_landing:ai_summary_pages__section4__description',
      videoPosterUrl: '/assets/features-landing/video-features/chat.png',
      videoUrl: `${RESOURCES_URL}/video/features/reading-assistant.mp4`,
    },
    {
      icon: 'chat',
      title: 'features_landing:ai_summary_pages__section5__title',
      description: 'features_landing:ai_summary_pages__section5__description',
      imageUrl: `/assets/features-landing/youtubesummary/1.png`,
    },
    {
      icon: 'chat',
      title: 'features_landing:ai_summary_pages__section6__title',
      description: 'features_landing:ai_summary_pages__section6__description',
      imageUrl: `/assets/features-landing/ai-summary/2.png`,
    },
    {
      icon: 'chat-with-pdf',
      title: 'features_landing:ai_summary_pages__section7__title',
      description: 'features_landing:ai_summary_pages__section7__description',
      imageUrl: `/assets/features-landing/chatpdf/1.png`,
    },
    {
      icon: 'auto-fix',
      title: 'features_landing:ai_summary_pages__section8__title',
      description: 'features_landing:ai_summary_pages__section8__description',
      imageUrl: `/assets/features-landing/ai-summary/1.png`,
    },
    {
      icon: 'prompt-library',
      title: 'features_landing:ai_summary_pages__section9__title',
      description: 'features_landing:ai_summary_pages__section9__description',
      imageUrl: `/assets/features-landing/ai-summary/3.png`,
    },
  ]

  return (
    <Stack>
      <AppDefaultSeoLayout
        title={t('seo:features_landing__ai_summary__title')}
        description={t('seo:features_landing__ai_summary__description')}
      />

      {/* hero section */}
      <HeroSection
        heroVideoProps={{
          imageCover:
            '/assets/features-landing/ai-summary/ai-summary-video-cover.png',

          videoSrc: `${RESOURCES_URL}/video/features/summary-assistant.mp4`,
          variant: 'autoplay',
          windowAutoPlay: true,
          videoPosterUrl: `/assets/features-landing/video-features/summary.png`,
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
        title={t('features_landing:ai_summary_pages__title')}
        description={t('features_landing:ai_summary_pages__description')}
      />

      {/* trusted by */}
      <TrustedBy />

      {summaryData.map((data, index) => (
        <FeaturesContentSection
          key={data.title}
          icon={data.icon}
          title={t(data.title)}
          description={t(data.description)}
          videoPosterUrl={data.videoPosterUrl}
          videoUrl={data.videoUrl}
          imageUrl={data.imageUrl}
          textWithImageLayout={index % 2 === 0 ? 'textToImage' : 'imageToText'}
        />
      ))}

      <FeaturesExploreMore />

      <FunnelSurveyPopup sceneType='SURVEY_INSTALL_DROPPED' />
    </Stack>
  )
}

export default AISummaryPages
