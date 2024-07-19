import { Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { FC } from 'react'

import FeaturesContentSection from '@/page_components/FeaturesLandingPages/components/FeaturesContentSection'
import FeaturesTextWithMarker from '@/page_components/FeaturesLandingPages/components/FeaturesTextWithMarker'

import { FEATURES_CONTENT } from '../../constants/featuresContent'
import FeaturesCarouselIcons from './FeaturesCarouselIcons'

interface IFeaturesContentAbTestV4VariantContent2SectionProps {
  abTestTitleDirection?: 'supersede' | 'top' | 'left' | 'rightRegular'
  abTestFeaturesType?: 'image' | 'video'
}
const FeaturesContentAbTestV4VariantContent2Section: FC<
  IFeaturesContentAbTestV4VariantContent2SectionProps
> = ({ abTestFeaturesType = 'image', abTestTitleDirection }) => {
  const { t } = useTranslation()
  return (
    <Stack>
      {FEATURES_CONTENT.map((featureItem, index) => {
        return (
          <FeaturesContentSection
            abTestTitleDirection={abTestTitleDirection}
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
            videoUrl={
              abTestFeaturesType === 'video' ? featureItem.videoUrl : ''
            }
            videoPosterUrl={featureItem.videoPosterUrl}
          />
        )
      })}
    </Stack>
  )
}

export default FeaturesContentAbTestV4VariantContent2Section
