import styled from '@emotion/styled'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'
import React from 'react'

import FeaturesContentSection from '@/page_components/FeaturesLandingPages/components/FeaturesContentSection'
import FeaturesTextWithMarker from '@/page_components/FeaturesLandingPages/components/FeaturesTextWithMarker'

import { FEATURES_CONTENT } from '../../constants/featuresContent'
import FeaturesCarouselIcons from './FeaturesCarouselIcons'
const Container = styled.div`
  max-width: 1312px;
  width: 100%;
  position: relative;
  margin: 0 auto;
`
const FeaturesContentAbTestV7CardAutoVideo = () => {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        px: 2,
      }}
    >
      <Container>
        {FEATURES_CONTENT.map((featureItem, index) => {
          return (
            <FeaturesContentSection
              abTestTitleDirection='left'
              key={featureItem.key}
              icon={
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
              }
              title={t(featureItem.title)}
              description={
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
              }
              textWithImageLayout={
                index % 2 === 0 ? 'textToImage' : 'imageToText'
              }
              imageUrl={featureItem.image}
              videoUrl={featureItem.videoUrl}
              videoPosterUrl={featureItem.videoPosterUrl}
            />
          )
        })}
      </Container>
    </Box>
  )
}
export default FeaturesContentAbTestV7CardAutoVideo
