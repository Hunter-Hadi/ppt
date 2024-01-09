import { Box, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import ResponsiveImage from '@/components/ResponsiveImage';
import YoutubePlayerBox from '@/components/YoutubePlayerBox';
import { PLAN_FEATURES_CATEGORY } from '@/features/pricing/constant';
import useVideoPopupController from '@/features/videoPopup/hooks/useVideoPopupController';

const Features = () => {
  const { openVideoPopup } = useVideoPopupController();

  const { t } = useTranslation('modules');

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
        Features
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
                const videoLink = featureItem.tooltip?.videoUrl;
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
                            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
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
                            boxShadow: '0px 0px 5px rgba(0, 0, 0, 0.1)',
                            borderRadius: 2,
                            overflow: 'hidden',
                          }}
                        >
                          <ResponsiveImage
                            src={image}
                            width={608}
                            height={280}
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

      {/* <Box>

      </Box>

        <Stack></Stack> */}

      {/* <Grid container rowGap={6} columnSpacing={4}>
        {VIDEOS_LIST.map((videoItem) => (
          <Grid item key={videoItem.title} xs={12} sm={6}>
            <Stack spacing={3}>
              <Box
                onClick={() => {
                  openVideoPopup(videoItem.videoLink);
                }}
                sx={{
                  cursor: 'pointer',
                }}
              >
                <YoutubePlayerBox
                  borderRadius={16}
                  youtubeLink={videoItem.videoLink}
                  sx={{
                    pointerEvents: 'none',
                  }}
                />
              </Box>
              <Typography
                variant='custom'
                fontSize={{
                  xs: 18,
                  md: 24,
                }}
                fontWeight={700}
                lineHeight={1.4}
              >
                {videoItem.title}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid> */}
    </Stack>
  );
};

export default Features;
