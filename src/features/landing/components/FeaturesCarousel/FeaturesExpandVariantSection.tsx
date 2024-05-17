import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React from 'react';

import FeaturesContentSection from '@/page_components/FeaturesLandingPages/components/FeaturesContentSection';
import FeaturesTextWithMarker from '@/page_components/FeaturesLandingPages/components/FeaturesTextWithMarker';

import { FEATURES_CAROUSEL_LIST, FEATURES_CONTENT_DATA_MAP } from '.';
import FeaturesCarouselIcons from './FeaturesCarouselIcons';

const FeaturesExpandSection = () => {
  const { t } = useTranslation();
  return (
    <Stack>
      {FEATURES_CAROUSEL_LIST.map((featureItem, index) => {
        const featuresContentData =
          FEATURES_CONTENT_DATA_MAP[featureItem.value];

        return (
          <FeaturesContentSection
            key={featureItem.value}
            icon={
              <FeaturesCarouselIcons
                icon={featureItem.icon}
                sx={{
                  borderRadius: '50%',
                }}
              />
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
                    color='text.secondary'
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
                    color='text.secondary'
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

export default FeaturesExpandSection;
