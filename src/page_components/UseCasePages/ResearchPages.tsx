import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'
import React, { useMemo } from 'react'

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout'
import AppLoadingLayout from '@/app_layout/AppLoadingLayout'
import CallToActionSection from '@/features/landing/components/CallToActionSection'
import FeaturesCarouselIcons from '@/features/landing/components/FeaturesCarousel/FeaturesCarouselIcons'
import HeroSection from '@/features/landing/components/HeroSection'
import HowItWork from '@/features/landing/components/HowItWork'
import MaxAIInNumbers from '@/features/landing/components/MaxAIInNumbers'
import TrustedBy from '@/features/landing/components/TrustedBy'
import UserComment from '@/features/landing/components/UserComment'
import { LANDING_PRIMARY_VIDEO_ASSETS_URL } from '@/features/landing/constants'
import FeaturesContentSection from '@/page_components/FeaturesLandingPages/components/FeaturesContentSection'
import FeaturesTextWithMarker from '@/page_components/FeaturesLandingPages/components/FeaturesTextWithMarker'

const RESEARCH_FEATURES_LIST = [
  {
    key: 'Summary assistant',
    icon: 'summary',
    label: 'use_cases_pages:research__features_summary__label',
    title: 'use_cases_pages:research__features_summary__title',
    descriptionList: [
      'use_cases_pages:research__features_summary__description__part1',
      'use_cases_pages:research__features_summary__description__part2',
      'use_cases_pages:research__features_summary__description__part3',
      'use_cases_pages:research__features_summary__description__part4',
    ],
    image: '/assets/landing/feature-carousel/summary.png',
  },
  {
    key: 'Reading assistant',
    icon: 'rewriter',
    label: 'use_cases_pages:research__features_reading__label',
    title: 'use_cases_pages:research__features_reading__title',
    descriptionList: [
      'use_cases_pages:research__features_reading__description__part1',
      'use_cases_pages:research__features_reading__description__part2',
      'use_cases_pages:research__features_reading__description__part3',
    ],
    image: '/assets/features-landing/ai-summary/2.png',
  },
  {
    key: 'Research assistant',
    icon: 'search',
    label: 'use_cases_pages:research__features_research__label',
    title: 'use_cases_pages:research__features_research__title',
    descriptionList: [
      'use_cases_pages:research__features_research__description__part1',
      'use_cases_pages:research__features_research__description__part2',
      'use_cases_pages:research__features_research__description__part3',
    ],
    image: '/assets/landing/feature-carousel/chat.png',
  },
  {
    key: 'Translation assistant',
    icon: 'translator',
    label: 'use_cases_pages:research__features_translation__label',
    title: 'use_cases_pages:research__features_translation__title',
    descriptionList: [
      'use_cases_pages:research__features_translation__description__part1',
      'use_cases_pages:research__features_translation__description__part2',
      'use_cases_pages:research__features_translation__description__part3',
    ],
    image: '/assets/landing/feature-carousel/translator.png',
  },
  {
    key: 'Browser extension',
    icon: 'extension',
    label: 'use_cases_pages:research__features_browser__label',
    title: 'use_cases_pages:research__features_browser__title',
    descriptionList: [
      'use_cases_pages:research__features_browser__description__part1',
      'use_cases_pages:research__features_browser__description__part2',
      'use_cases_pages:research__features_browser__description__part3',
    ],
    image: '/assets/landing/feature-carousel/works-where-you-work.png',
  },
]

const ResearchPages = () => {
  const { t } = useTranslation()

  const heroSectionTitle = useMemo(() => {
    const title = t('use_cases_pages:research__title')
      .replace('.', '')
      .replace('。', '')
    if (title.includes(',')) {
      const titleArray = title.split(',')
      return (
        <>
          {titleArray[0]}
          <br />
          {titleArray[1]}
        </>
      )
    } else if (title.includes('，')) {
      const titleArray = title.split('，')
      return (
        <>
          {titleArray[0]}
          <br />
          {titleArray[1]}
        </>
      )
    } else {
      return title
    }
  }, [t])

  return (
    <AppLoadingLayout loading={false} sx={{ minHeight: '90vh' }}>
      <AppDefaultSeoLayout
        title={t('seo:use_cases__research__title')}
        description={t('seo:use_cases__research__desc')}
      />
      <Stack color='text.primary'>
        {/* heroSection */}
        <HeroSection
          title={heroSectionTitle}
          // title={() => {
          //   // 在逗号的地方插入 换行符
          //   const title = t('use_cases_pages:research__title');
          //   const titleArray = title.split(',');
          //   return (
          //     <h1>
          //       {titleArray[0]}
          //       <br />
          //       {titleArray[1]}
          //     </h1>
          //   );
          // }}
          description={t('use_cases_pages:research__description')}
          heroVideoProps={{
            videoSrc: LANDING_PRIMARY_VIDEO_ASSETS_URL,
            variant: 'autoplay',
          }}
          sx={{
            '& .content-wrapper': {
              maxWidth: 'unset',
            },
            '& .description': {
              maxWidth: '835px',
            },
          }}
        />

        {/* trusted by */}
        <TrustedBy />
        <HowItWork />
        {/* feature  */}
        <Stack>
          {RESEARCH_FEATURES_LIST.map((featureItem, index) => {
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
              />
            )
          })}
        </Stack>
        {/* {!loaded && <FeaturesCarouselSkeleton />} */}
        {/* maxai in numbers */}
        <MaxAIInNumbers />
        {/* user comment */}
        <UserComment />
        {/* call to action section */}
        <CallToActionSection />
      </Stack>
    </AppLoadingLayout>
  )
}

export default ResearchPages
