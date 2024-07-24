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
import FeaturesTextWithMarker from '@/page_components/FeaturesLandingPages/components/FeaturesTextWithMarker'
interface IProps {
  propRef?: string
}
const AIInstantReplyPages: FC<IProps> = () => {
  const { t } = useTranslation()

  const sections2Descriptions = [
    'features_landing:ai_reply_pages__section2__description__item1',
    'features_landing:ai_reply_pages__section2__description__item2',
    'features_landing:ai_reply_pages__section2__description__item3',
  ]

  const sections4Descriptions = [
    'features_landing:ai_reply_pages__section4__description__item1',
    'features_landing:ai_reply_pages__section4__description__item2',
    'features_landing:ai_reply_pages__section4__description__item3',
    'features_landing:ai_reply_pages__section4__description__item4',
    'features_landing:ai_reply_pages__section4__description__item5',
  ]

  return (
    <Stack>
      <AppDefaultSeoLayout
        title={t('seo:features_landing__ai_reply__title')}
        description={t('seo:features_landing__ai_reply__description')}
      />
      {/* hero section */}
      <HeroSection
        heroVideoProps={{
          imageCover:
            '/assets/features-landing/ai-reply/ai-reply-video-cover.png',

          videoSrc: `${RESOURCES_URL}/video/features/email-assistant.mp4`,
          variant: 'autoplay',
          windowAutoPlay: true,
          videoPosterUrl: `/assets/features-landing/video-features/email.png`,
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
        title={t('features_landing:ai_reply_pages__title')}
        description={t('features_landing:ai_reply_pages__description')}
      />

      {/* trusted by */}
      <TrustedBy />

      <FeaturesContentSection
        icon='reply'
        title={t('features_landing:ai_reply_pages__section1__title')}
        description={t(
          'features_landing:ai_reply_pages__section1__description',
        )}
        imageUrl='/assets/features-landing/ai-reply/1.png'
        pictureRetouchingDirection='bottom-right'
      />
      <FeaturesContentSection
        icon='lang'
        title={t('features_landing:ai_reply_pages__section2__title')}
        description={
          <Stack spacing={0.5} mt={2}>
            {sections2Descriptions.map((description) => (
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
        imageUrl='/assets/features-landing/ai-reply/2.png'
        textWithImageLayout='imageToText'
        pictureRetouchingDirection='bottom-left'
      />
      <FeaturesContentSection
        icon='account'
        title={t('features_landing:ai_reply_pages__section3__title')}
        description={t(
          'features_landing:ai_reply_pages__section3__description',
        )}
        imageUrl='/assets/features-landing/ai-reply/3.png'
        pictureRetouchingDirection='top-right'
      />
      <FeaturesContentSection
        icon='and'
        title={t('features_landing:ai_reply_pages__section4__title')}
        description={
          <Stack spacing={0.5} mt={2}>
            {sections4Descriptions.map((description) => (
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
        imageUrl='/assets/features-landing/ai-reply/4.png'
        textWithImageLayout='imageToText'
        pictureRetouchingDirection='bottom-left'
      />

      <FeaturesExploreMore />

      <FunnelSurveyPopup sceneType='SURVEY_INSTALL_DROPPED' />
    </Stack>
  )
}

export default AIInstantReplyPages
