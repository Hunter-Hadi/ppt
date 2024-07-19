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
                justifyContent={
                  abTestTitleDirection === 'top' ? 'center' : 'flex-start'
                }
                spacing={abTestTitleDirection === 'top' ? 0.5 : 1.5}
              >
                <FeaturesCarouselIcons
                  icon={featureItem.icon}
                  size={abTestTitleDirection === 'top' ? 32 : undefined}
                  sx={{
                    borderRadius: '50%',
                  }}
                />
                <Typography
                  fontSize={abTestTitleDirection === 'top' ? 16 : 20}
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
              <Stack
                spacing={0.5}
                mt={abTestTitleDirection === 'top' ? 1 : 2}
                alignItems={
                  abTestTitleDirection === 'top' ? 'center' : 'flex-start'
                }
              >
                {featureItem.descriptionList.map((description) => (
                  <FeaturesTextWithMarker
                    key={description}
                    marker={abTestTitleDirection !== 'top'}
                    variant='custom'
                    fontSize={abTestTitleDirection === 'top' ? 16 : 18}
                    lineHeight={abTestTitleDirection === 'top' ? 1.2 : 1.5}
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
