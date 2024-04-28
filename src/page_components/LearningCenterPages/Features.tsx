import { Box, Grid, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React from 'react';

import ResponsiveImage from '@/components/ResponsiveImage';
import YoutubePlayerBox from '@/components/YoutubePlayerBox';
import { PLAN_FEATURES_CATEGORY } from '@/features/pricing/constant/features';
import useVideoPopupController from '@/features/video_popup/hooks/useVideoPopupController';

const Features = () => {
  const { openVideoPopup } = useVideoPopupController();

  const { t } = useTranslation();

  return (
    <Stack spacing={6} alignItems='center' data-testid='features'>
      <Typography
        variant='custom'
        component={'h2'}
        fontWeight={700}
        fontSize={{
          xs: 32,
          md: 40,
        }}
      >
        {t('pages:learning_center__features__title')}
      </Typography>

      {PLAN_FEATURES_CATEGORY.map((category) => (
        <Stack
          spacing={6}
          key={category.name}
          width={'100%'}
          data-testid={t(category.name)}
        >
          <Typography
            variant='custom'
            component={'h2'}
            fontWeight={700}
            fontSize={{
              xs: 24,
              md: 32,
            }}
            textAlign='center'
          >
            {t(category.name)}
          </Typography>
          <Box>
            <Grid container rowSpacing={6} columnSpacing={4}>
              {category.features.map((featureItem) => {
                const image = featureItem.tooltip?.imageLink;
                const videoLink = featureItem.youtube?.link;
                const desc = featureItem.tooltip?.desc;

                return (
                  <Grid key={featureItem.title} item xs={12} sm={6}>
                    <Stack spacing={3}>
                      {videoLink ? (
                        <Box
                          onClick={() => {
                            openVideoPopup(videoLink);
                          }}
                          sx={{
                            cursor: 'pointer',
                            boxShadow: '0px 0px 1px 0px rgba(0, 0, 0, 0.6)',
                            borderRadius: 2,
                            overflow: 'hidden',
                          }}
                        >
                          <YoutubePlayerBox
                            borderRadius={0}
                            youtubeLink={videoLink}
                            sx={{
                              pointerEvents: 'none',
                            }}
                          />
                        </Box>
                      ) : null}
                      {!videoLink && image ? (
                        <Box
                          sx={{
                            boxShadow: '0px 0px 1px 0px rgba(0, 0, 0, 0.6)',
                            borderRadius: 2,
                            overflow: 'hidden',
                          }}
                        >
                          <ResponsiveImage
                            src={image}
                            width={945}
                            height={532}
                            alt={t(featureItem.title)}
                          />
                        </Box>
                      ) : null}

                      <Stack spacing={2}>
                        <Typography
                          variant='custom'
                          fontSize={{
                            xs: 18,
                            md: 24,
                          }}
                          fontWeight={700}
                          lineHeight={1.4}
                        >
                          {t(featureItem.title)}
                        </Typography>

                        {desc ? (
                          <Typography
                            variant='custom'
                            fontSize={{
                              xs: 14,
                              md: 16,
                            }}
                            lineHeight={1.5}
                          >
                            {t(desc)}
                          </Typography>
                        ) : null}
                      </Stack>
                    </Stack>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </Stack>
      ))}
    </Stack>
  );
};

export default Features;
