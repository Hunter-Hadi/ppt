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
  justify-content: space-between;
`

const TextWrapper = styled.div`
  width: 45%;
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

  const textRefs = useRef<(HTMLDivElement | null)[]>([])
  const videoRefs = useRef<HTMLDivElement>(null)

  const updateActiveIndex = throttle((index) => {
    setActiveIndex(index)
  }, 500)

  useEffect(() => {
    const interval = setInterval(() => {
      if (videoRefs.current) {
        const videoRect = videoRefs.current.getBoundingClientRect()
        let closestIndex = -1
        let closestDistance = Infinity

        textRefs.current.forEach((ref, index) => {
          if (ref) {
            const textRect = ref.getBoundingClientRect()
            const distance = Math.abs(textRect.top - videoRect.top)

            if (distance < closestDistance) {
              closestDistance = distance
              closestIndex = index
            }
          }
        })

        if (closestIndex !== activeIndex) {
          updateActiveIndex(closestIndex)
        }
      }
    }, 100) // 每100毫秒检测一次

    return () => {
      clearInterval(interval)
    }
  }, [activeIndex])
  return (
    <Box
      sx={{
        px: 2,
      }}
    >
      <Container>
        <TextWrapper>
          {FEATURES_CONTENT.map((featureItem, index) => (
            <TextItemWrapper
              key={index}
              ref={(ref) => (textRefs.current[index] = ref)}
            >
              <Stack justifyContent='start'>
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
                      marker
                      variant='custom'
                      fontSize={{
                        xs: 16,
                        md: 18,
                      }}
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
        <VideoWrapper ref={videoRefs}>
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
                  videoPosterUrl={featureItem.videoPosterUrl}
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
