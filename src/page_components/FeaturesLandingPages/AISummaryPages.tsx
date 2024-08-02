import Stack from '@mui/material/Stack'
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

interface IProps {
  propRef?: string
}
const AISummaryPages: FC<IProps> = () => {
  const { t } = useTranslation()

  const summaryData = [
    {
      // Summarize any webpage
      icon: '1-click',
      title: 'features_landing:ai_summary_pages__section1__title',
      description: 'features_landing:ai_summary_pages__section1__description',
      videoPosterUrl: '/assets/features-landing/video-features/summary.png',
      videoUrl: `${CLOUD_FLARE_ASSETS_URL}/videos/summary-assistant.mp4`,
    },
    {
      // Chat with any webpage
      icon: 'chat',
      title: 'features_landing:ai_summary_pages__section2__title',
      description: 'features_landing:ai_summary_pages__section2__description',
      videoPosterUrl: `/assets/features-landing/youtubesummary/2.png`,
      videoUrl: `${CLOUD_FLARE_ASSETS_URL}/videos/features/ai-summary/chat-with-any-webpage.mp4`,
    },
    {
      // Summarize any PDF
      icon: 'chat-with-pdf',
      title: 'features_landing:ai_summary_pages__section3__title',
      description: 'features_landing:ai_summary_pages__section3__description',
      videoPosterUrl: `/assets/features-landing/chatpdf/2.png`,
      videoUrl: `${CLOUD_FLARE_ASSETS_URL}/videos/features/ai-summary/summarize-any-pdf.mp4`,
    },
    {
      // Chat with any PDF
      icon: 'chat-with-pdf',
      title: 'features_landing:ai_summary_pages__section4__title',
      description: 'features_landing:ai_summary_pages__section4__description',
      videoPosterUrl: '/assets/features-landing/video-features/chat.png',
      videoUrl: `${CLOUD_FLARE_ASSETS_URL}/videos/features/ai-summary/chat-with-any-pdf.mp4`,
    },
    {
      // Summarize any YouTube video
      icon: 'chat',
      title: 'features_landing:ai_summary_pages__section5__title',
      description: 'features_landing:ai_summary_pages__section5__description',
      videoPosterUrl: `/assets/features-landing/youtubesummary/1.png`,
      videoUrl: `${CLOUD_FLARE_ASSETS_URL}/videos/features/ai-summary/summarize-any-youtube-video.mp4`,
    },
    {
      // Chat with any YouTube video
      icon: 'chat',
      title: 'features_landing:ai_summary_pages__section6__title',
      description: 'features_landing:ai_summary_pages__section6__description',
      videoPosterUrl: `/assets/features-landing/ai-summary/2.png`,
      videoUrl: `${CLOUD_FLARE_ASSETS_URL}/videos/features/ai-summary/chat-with-youtube-video.mp4`,
    },
    {
      // Chat with any document
      icon: 'chat-with-pdf',
      title: 'features_landing:ai_summary_pages__section7__title',
      description: 'features_landing:ai_summary_pages__section7__description',
      videoPosterUrl: `/assets/features-landing/chatpdf/1.png`,
      videoUrl: `${CLOUD_FLARE_ASSETS_URL}/videos/features/ai-summary/chat-with-any-document.mp4`,
    },
    {
      // Works where you work
      icon: 'auto-fix',
      title: 'features_landing:ai_summary_pages__section8__title',
      description: 'features_landing:ai_summary_pages__section8__description',
      imageUrl: `/assets/features-landing/ai-summary/1.png`,
    },
    {
      // Create your own 1-click summarizer
      icon: 'prompt-library',
      title: 'features_landing:ai_summary_pages__section9__title',
      description: 'features_landing:ai_summary_pages__section9__description',
      videoPosterUrl: `/assets/features-landing/ai-summary/3.png`,
      videoUrl: `${CLOUD_FLARE_ASSETS_URL}/videos/features/ai-summary/create-your-own-1-click-summarizer.mp4`,
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

          videoSrc: `${CLOUD_FLARE_ASSETS_URL}/videos/summary-assistant.mp4`,
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
      <HowItWork />

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
