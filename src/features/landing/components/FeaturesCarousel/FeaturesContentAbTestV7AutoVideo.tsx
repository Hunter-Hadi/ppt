import styled from '@emotion/styled'
import { Box, Stack, Typography, useMediaQuery } from '@mui/material'
import throttle from 'lodash-es/throttle'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useRef, useState } from 'react'

import ResponsiveImage from '@/components/ResponsiveImage'
import { abTestVideoUrlObject } from '@/features/ab_tester/constant/landingVariant'
import FeaturesTextWithMarker from '@/page_components/FeaturesLandingPages/components/FeaturesTextWithMarker'

import HeroVideoBox from '../HeroSection/HeroVideoBox'
import FeaturesCarouselIcons from './FeaturesCarouselIcons'
import FeaturesContentAbTestV4VariantContent2Section from './FeaturesContentAbTestV4VariantContent2Section'
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
const Container = styled.div`
  display: flex;
  max-width: 1312px;
  width: 100%;
  position: relative;
  margin: 0 auto;
`

const TextWrapper = styled.div`
  width: 50%;
`
const TextItemWrapper = styled.div`
  height: 100vh;
  padding-top: 6.25rem;
  max-height: 40rem;
`
const VideoWrapper = styled.div`
  display: flex;
  width: 50%;
  height: 100vh;
  max-height: 40rem;
  position: -webkit-sticky;
  position: sticky;
  top: calc(50% - 250px);
`

const VideoItemWrap = styled.div`
  position: absolute;
  transition: all 0.8s;
  width: 100%;
`
const FeaturesContentAbTestV7AutoVideo = () => {
  const { t } = useTranslation()

  const [activeIndex, setActiveIndex] = useState(0)

  const textRefs = useRef<any>([])
  // 使用节流函数优化状态更新频率
  const updateActiveIndex = throttle((index) => {
    setActiveIndex(index)
  }, 500)
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.75,
    }

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = textRefs.current.indexOf(entry.target)
          updateActiveIndex(index)
        }
      })
    }

    const observer = new IntersectionObserver(observerCallback, observerOptions)

    textRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref)
      }
    })

    return () => {
      textRefs.current.forEach((ref) => {
        if (ref) observer.unobserve(ref)
      })
    }
  }, [])
  return (
    <Box
      sx={{
        px: 2,
      }}
    >
      <Container>
        <TextWrapper>
          {FEATURES_CONTENT.map((featureItem, index) => (
            <TextItemWrapper key={index}>
              <Stack
                ref={(ref) => (textRefs.current[index] = ref)}
                height={'100%'}
                justifyContent='start'
              >
                <Stack
                  direction={'row'}
                  alignItems='center'
                  justifyContent={'flex-start'}
                  spacing={1.5}
                >
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
                <Typography
                  component='h2'
                  variant='custom'
                  fontSize={32}
                  textAlign={'start'}
                  fontWeight={700}
                  mt={2}
                >
                  {t(featureItem.title)}
                </Typography>
                <Stack spacing={0.5} mt={2} alignItems={'flex-start'}>
                  {featureItem.descriptionList.map((description) => (
                    <FeaturesTextWithMarker
                      key={description}
                      variant='custom'
                      fontSize={18}
                      lineHeight={1.5}
                    >
                      {t(description)}
                    </FeaturesTextWithMarker>
                  ))}
                </Stack>
              </Stack>
            </TextItemWrapper>
          ))}
        </TextWrapper>
        <VideoWrapper>
          {FEATURES_CONTENT.map((featureItem, index) => (
            <VideoItemWrap
              key={featureItem.key}
              style={{
                opacity: activeIndex === index ? 1 : 0,
              }}
            >
              {featureItem.image && !featureItem.videoUrl && (
                <ResponsiveImage
                  src={featureItem.image}
                  alt={featureItem.title}
                  width={1168}
                  height={864}
                />
              )}
              {featureItem.videoUrl && (
                <HeroVideoBox
                  imageCover={featureItem.videoUrl}
                  videoSrc={featureItem.videoUrl}
                  windowAutoPlay={true}
                  videoStyle={{
                    boxShadow: 'none',
                    maxHeight: 560,
                  }}
                />
              )}
            </VideoItemWrap>
          ))}
        </VideoWrapper>
      </Container>
    </Box>
  )
}
export const FeaturesContentAbTestV7AutoVideoMain = () => {
  const isMobile = useMediaQuery('(max-width:748px)')
  if (isMobile) {
    return (
      <FeaturesContentAbTestV4VariantContent2Section
        abTestTitleDirection={'top'}
        abTestFeaturesType={'video'}
      />
    )
  } else {
    return <FeaturesContentAbTestV7AutoVideo />
  }
}

export default FeaturesContentAbTestV7AutoVideoMain
