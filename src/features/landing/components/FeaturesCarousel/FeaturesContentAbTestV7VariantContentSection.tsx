import styled from '@emotion/styled'
import { Box, Stack, Typography } from '@mui/material'
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
const FeaturesContentAbTestV7VariantContentSection = () => {
  const { t } = useTranslation()

  return (
    <Box
      sx={{
        px: {
          xs: 0,
          md: 2,
        },
      }}
    >
      <Container>
        {FEATURES_CONTENT.map((featureItem, index) => {
          return (
            <FeaturesContentSection
              abTestTitleDirection={'top'}
              key={featureItem.key}
              icon={
                <Stack
                  direction={'row'}
                  alignItems='center'
                  justifyContent='center'
                  spacing={1}
                  sx={{
                    bgcolor: featureItem.tagBgColor,
                    width: 'max-content',
                    margin: {
                      xs: 0,
                      md: '0 auto',
                    },
                    borderRadius: '99px',
                    padding: '0 12px',
                    height: '32px',
                  }}
                >
                  <FeaturesCarouselIcons
                    icon={featureItem.icon}
                    size={18}
                    sx={{
                      borderRadius: '50%',
                      color: featureItem.tagColor,
                      bgcolor: 'transparent',
                      fontSize: '18px',
                    }}
                  />
                  <Typography
                    fontSize='16px'
                    variant='custom'
                    color={featureItem.tagColor}
                  >
                    {t(featureItem.label)}
                  </Typography>
                </Stack>
              }
              title={t(featureItem.title)}
              description={
                <Stack
                  spacing={0.5}
                  mt='12px'
                  alignItems={{
                    xs: 'start',
                    md: 'center',
                  }}
                >
                  {featureItem.descriptionList.map((description) => (
                    <FeaturesTextWithMarker
                      key={description}
                      marker={false}
                      variant='custom'
                      fontSize={16}
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
export default FeaturesContentAbTestV7VariantContentSection
