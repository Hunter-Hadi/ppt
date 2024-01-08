import { Box, Grid, Stack, SvgIcon, SxProps, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import YoutubePlayerBox from '@/components/YoutubePlayerBox';
import { PRIMARY_YOUTUBE_VIDEO_EMBED_URL } from '@/global_constants';
import useBrowserAgent from '@/hooks/useBrowserAgent';

import CTAInstallButton from '../../../page_components/CTAInstallButton';

const HeroSection = () => {
  const { browserAgent: agent } = useBrowserAgent();

  const { t } = useTranslation();

  return (
    <Box
      bgcolor='white'
      pt={{
        xs: 6,
        md: 10,
      }}
      pb={7}
      px={2}
      overflow='hidden'
    >
      <Box maxWidth={1312} mx='auto'>
        <Grid container rowSpacing={3} spacing={2}>
          <Grid item xs={12} sm={12} md={6}>
            <Stack
              p={{
                xs: 0,
                sm: 2,
                md: 3,
              }}
            >
              <Typography
                variant='custom'
                fontSize={{
                  xs: 40,
                  sm: 48,
                  lg: 64,
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
              <Typography variant='body2' mb={4}>
                {t('pages:home_page__hero_section__desc')}
              </Typography>
              <Stack
                direction={{
                  xs: 'column',
                  sm: 'row',
                }}
                alignItems='center'
                spacing={{
                  xs: 1,
                  sm: 2,
                }}
              >
                <CTAInstallButton
                  showAgent='Chrome'
                  variant={agent === 'Chrome' ? 'contained' : 'outlined'}
                  trackerLinkProps={{
                    defaultRef: 'homepage',
                    queryRefEnable: true,
                    pathnameRefEnable: false,
                  }}
                  sx={{
                    width: '100%',
                  }}
                />
                <CTAInstallButton
                  showAgent='Edge'
                  variant={agent === 'Edge' ? 'contained' : 'outlined'}
                  trackerLinkProps={{
                    defaultRef: 'homepage',
                    queryRefEnable: true,
                    pathnameRefEnable: false,
                  }}
                  sx={{
                    width: '100%',
                  }}
                />
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Stack
              position='relative'
              p={{
                xs: 0,
                sm: 6,
              }}
            >
              <Star
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  fontSize: {
                    xs: 0,
                    sm: 38,
                  },
                }}
              />
              <Star
                sx={{
                  position: 'absolute',
                  top: '40%',
                  right: '-4%',
                  fontSize: {
                    xs: 0,
                    sm: 50,
                  },
                }}
              />
              <Star
                sx={{
                  position: 'absolute',
                  bottom: '10%',
                  left: 0,
                  fontSize: {
                    xs: 0,
                    sm: 16,
                  },
                }}
              />
              <YoutubePlayerBox
                borderRadius={16}
                youtubeLink={PRIMARY_YOUTUBE_VIDEO_EMBED_URL}
                sx={{
                  boxShadow: '0px 4px 16px 0px rgba(118, 1, 211, 0.08)',
                }}
              />
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

const Star: FC<{ sx?: SxProps }> = ({ sx }) => (
  <SvgIcon sx={sx}>
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' fill='none'>
      <path
        d='M14.3376 2.06901C14.9819 0.327775 17.4447 0.327775 18.089 2.06901L21.0835 10.1615C21.286 10.7089 21.7177 11.1405 22.2651 11.3431L30.3576 14.3376C32.0988 14.9819 32.0988 17.4447 30.3576 18.089L22.2651 21.0835C21.7177 21.286 21.286 21.7177 21.0835 22.2651L18.089 30.3576C17.4447 32.0988 14.9819 32.0988 14.3376 30.3576L11.3431 22.2651C11.1405 21.7177 10.7089 21.286 10.1615 21.0835L2.06901 18.089C0.327775 17.4447 0.327775 14.9819 2.06901 14.3376L10.1615 11.3431C10.7089 11.1405 11.1405 10.7089 11.3431 10.1615L14.3376 2.06901Z'
        fill='#B069E9'
        fill-opacity='0.32'
      />
    </svg>
  </SvgIcon>
);

export default HeroSection;
