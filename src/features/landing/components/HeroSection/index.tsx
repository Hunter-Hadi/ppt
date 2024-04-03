import { Box, Grid, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';

import YoutubePlayerBox from '@/components/YoutubePlayerBox';
import A16zTop50AppsBadge from '@/features/landing/components/HeroSection/A16zTop50AppsBadge';
import IndicatorDecorator from '@/features/landing/components/IndicatorDecorator';
import {
  LOVED_BY_NUM,
  PRIMARY_YOUTUBE_VIDEO_EMBED_URL,
  STAR_RATINGS_NUM,
} from '@/features/landing/constants';
import useVideoPopupController from '@/features/video_popup/hooks/useVideoPopupController';
import useBrowserAgent from '@/hooks/useBrowserAgent';
import CTAInstallButton from '@/page_components/CTAInstallButton';

interface IProps {
  propRef?: string;
}

const HeroSection: FC<IProps> = ({ propRef }) => {
  const { browserAgent: agent } = useBrowserAgent();

  const { t } = useTranslation();

  const { openVideoPopup } = useVideoPopupController();

  return (
    <Box
      id='homepage-hero-section'
      bgcolor='#f9f5ff'
      pt={{
        xs: 4,
        md: 7,
      }}
      pb={9}
      px={2}
      overflow='hidden'
      sx={{
        backgroundImage: `url("/assets/landing/hero-section-bg.png")`,
        backgroundSize: 'cover',
        backgroundPositionY: '-40px',
      }}
    >
      <Box maxWidth={1312} mx='auto'>
        <Grid container rowSpacing={3} spacing={4}>
          <Grid item xs={12} sm={12} md={6}>
            <Stack
              p={{
                xs: 0,
                sm: 2,
              }}
            >
              <Typography
                variant='custom'
                fontSize={{
                  xs: 40,
                  sm: 48,
                  lg: 56,
                }}
                component='h1'
                fontWeight={700}
                mb={3}
              >
                {t('pages:home_page__hero_section__title__part1')}
                <br />
                {t('pages:home_page__hero_section__title__part2')}
                <br />
                {t('pages:home_page__hero_section__title__part3')}
              </Typography>
              <Typography
                variant='body2'
                mb={4}
                fontSize={{
                  xs: 14,
                  sm: 16,
                  lg: 18,
                }}
                color='text.secondary'
              >
                {t('pages:home_page__hero_section__desc')}
              </Typography>
              <Stack
                direction='row'
                alignItems={'center'}
                gap={{
                  xs: 1,
                  sm: 3,
                }}
                mb={{
                  xs: 3,
                  sm: 6,
                }}
                flexWrap={'wrap'}
              >
                <A16zTop50AppsBadge />
                <IndicatorDecorator>
                  <Stack justifyContent={'center'} alignItems='center'>
                    <Typography
                      variant='custom'
                      fontSize={{
                        xs: 20,
                        sm: 24,
                      }}
                      fontWeight={700}
                      color='primary.main'
                    >
                      {LOVED_BY_NUM}
                    </Typography>
                    <Typography
                      variant='custom'
                      fontSize={{
                        xs: 14,
                        sm: 16,
                      }}
                    >
                      {t('pages:home_page__hero_section__indicator2_label')}
                    </Typography>
                  </Stack>
                </IndicatorDecorator>
                <IndicatorDecorator>
                  <Stack justifyContent={'center'} alignItems='center'>
                    <Typography
                      variant='custom'
                      fontSize={{
                        xs: 20,
                        sm: 24,
                      }}
                      fontWeight={700}
                      color='primary.main'
                    >
                      {STAR_RATINGS_NUM}
                    </Typography>
                    <Typography
                      variant='custom'
                      fontSize={{
                        xs: 14,
                        sm: 16,
                      }}
                    >
                      {t('pages:home_page__hero_section__indicator3_label')}
                    </Typography>
                  </Stack>
                </IndicatorDecorator>
              </Stack>
              <Stack
                direction={'row'}
                alignItems='center'
                spacing={{
                  xs: 1,
                  sm: 2,
                }}
                width={{
                  xs: '100%',
                  sm: '90%',
                }}
              >
                <CTAInstallButton
                  showAgent='Chrome'
                  variant={agent === 'Chrome' ? 'contained' : 'outlined'}
                  text={agent === 'Chrome' ? undefined : ''}
                  trackerLinkProps={{
                    defaultRef: propRef ?? 'homepage',
                    queryRefEnable: true,
                    pathnameRefEnable: false,
                  }}
                  sx={{
                    width: agent === 'Chrome' ? '100%' : 'max-content',
                    bgcolor: agent === 'Chrome' ? 'primary.main' : '#fff',
                  }}
                />
                <CTAInstallButton
                  showAgent='Edge'
                  variant={agent === 'Edge' ? 'contained' : 'outlined'}
                  text={agent === 'Edge' ? undefined : ''}
                  trackerLinkProps={{
                    defaultRef: propRef ?? 'homepage',
                    queryRefEnable: true,
                    pathnameRefEnable: false,
                  }}
                  sx={{
                    width: agent === 'Edge' ? '100%' : 'max-content',
                    bgcolor: agent === 'Edge' ? 'primary.main' : '#fff',
                  }}
                />
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Stack
              position='relative'
              justifyContent={'center'}
              height='100%'
              // p={{
              //   xs: 0,
              //   sm: 6,
              // }}
            >
              <Box
                onClick={() => {
                  openVideoPopup(PRIMARY_YOUTUBE_VIDEO_EMBED_URL);
                }}
                sx={{
                  cursor: 'pointer',
                  boxShadow: '0px 4px 16px 0px rgba(118, 1, 211, 0.08)',
                  borderRadius: 2,
                  overflow: 'hidden',
                }}
              >
                <YoutubePlayerBox
                  borderRadius={0}
                  youtubeLink={PRIMARY_YOUTUBE_VIDEO_EMBED_URL}
                  sx={{
                    pointerEvents: 'none',
                  }}
                />
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HeroSection;
