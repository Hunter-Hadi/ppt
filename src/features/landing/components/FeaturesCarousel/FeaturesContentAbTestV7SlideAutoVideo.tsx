import styled from '@emotion/styled'
import { Box, Stack, Typography, useMediaQuery } from '@mui/material'
import throttle from 'lodash-es/throttle'
import { useTranslation } from 'next-i18next'
import React, { useEffect, useRef, useState } from 'react'

import ResponsiveImage from '@/components/ResponsiveImage'
import FeaturesTextWithMarker from '@/page_components/FeaturesLandingPages/components/FeaturesTextWithMarker'

import { FEATURES_CONTENT } from '../../constants/featuresContent'
import HeroVideoBox from '../HeroSection/HeroVideoBox'
import FeaturesCarouselIcons from './FeaturesCarouselIcons'
import FeaturesContentAbTestV4VariantContent2Section from './FeaturesContentAbTestV4VariantContent2Section'
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
const FeaturesContentAbTestV7SlideAutoVideo = () => {
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
export const FeaturesContentAbTestV7SlideAutoVideoMain = () => {
  const isMobile = useMediaQuery('(max-width:748px)')
  if (isMobile) {
    return (
      <FeaturesContentAbTestV4VariantContent2Section
        abTestTitleDirection={'top'}
        abTestFeaturesType={'video'}
      />
    )
  } else {
    return <FeaturesContentAbTestV7SlideAutoVideo />
  }
}

export default FeaturesContentAbTestV7SlideAutoVideoMain
