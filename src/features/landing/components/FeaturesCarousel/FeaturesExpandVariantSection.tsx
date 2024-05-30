import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React from 'react';

import FeaturesContentSection from '@/page_components/FeaturesLandingPages/components/FeaturesContentSection';
import FeaturesTextWithMarker from '@/page_components/FeaturesLandingPages/components/FeaturesTextWithMarker';

import { FEATURES_CAROUSEL_LIST, FEATURES_CONTENT_DATA_MAP } from '.';
import FeaturesCarouselIcons from './FeaturesCarouselIcons';

const FeaturesExpandVariantSection = () => {
  const { t } = useTranslation();
  return (
    <Stack>
      {FEATURES_CAROUSEL_LIST.map((featureItemValue, index) => {
        const featuresContentData = FEATURES_CONTENT_DATA_MAP[featureItemValue];

        return (
          <FeaturesContentSection
            key={featureItemValue}
            icon={
              <Stack direction={'row'} alignItems='center' spacing={1.5}>
                <FeaturesCarouselIcons
                  icon={featuresContentData.icon}
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
                  {t(featuresContentData.fullName)}
                </Typography>
              </Stack>
            }
            title={t(featuresContentData.title)}
            description={
              <Stack spacing={0.5} mt={2}>
                {featuresContentData.descriptionLabel && (
                  <Typography
                    fontSize={{
                      xs: 16,
                      sm: 18,
                    }}
                    variant='custom'
                  >
                    {t(featuresContentData.descriptionLabel)}
                  </Typography>
                )}
                {featuresContentData.descriptionList.map((description) => (
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
            imageUrl={featuresContentData.imageUrl}
          />
        );
      })}
    </Stack>
  );
};

export default FeaturesExpandVariantSection;
