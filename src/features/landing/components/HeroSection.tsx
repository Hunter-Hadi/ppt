import { Box, Grid, Stack, SvgIcon, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import YoutubePlayerBox from '@/components/YoutubePlayerBox';
import {
  LOVED_BY_NUM,
  PRIMARY_YOUTUBE_VIDEO_EMBED_URL,
  STAR_RATINGS_NUM,
} from '@/features/landing/constants';
import useVideoPopupController from '@/features/videoPopup/hooks/useVideoPopupController';
import useBrowserAgent from '@/hooks/useBrowserAgent';
import CTAInstallButton from '@/page_components/CTAInstallButton';
import IndicatorDecorator from '@/page_components/IndicatorDecorator';
import { safeOpenUrl } from '@/utils/location';

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
                <IndicatorDecorator>
                  <Stack
                    justifyContent={'center'}
                    alignItems='center'
                    sx={{
                      '&:hover': {
                        color: 'primary.main',
                        cursor: 'pointer',
                        transition: 'color 0.3s ease',
                      },
                    }}
                    onClick={() => {
                      safeOpenUrl(
                        'https://a16z.com/100-gen-ai-apps/',
                        '_blank',
                      );
                    }}
                  >
                    <Stack direction={'row'} alignItems='center' spacing={1}>
                      <A16zIcon />
                      <Typography
                        variant='custom'
                        fontSize={{
                          xs: 20,
                          sm: 24,
                        }}
                        fontWeight={700}
                        color='primary.main'
                      >
                        2024
                      </Typography>
                    </Stack>
                    <Typography
                      variant='custom'
                      color='inherit'
                      fontSize={{
                        xs: 14,
                        sm: 16,
                      }}
                    >
                      {t('pages:home_page__hero_section__indicator1_label')}
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

export const A16zIcon = () => {
  return (
    <SvgIcon>
      <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M0 4.8C0 2.14903 2.14903 0 4.8 0H24V19.2C24 21.851 21.851 24 19.2 24H4.8C2.14903 24 0 21.851 0 19.2V4.8Z'
          fill='#F79321'
        />
        <path
          fill-rule='evenodd'
          clip-rule='evenodd'
          d='M9.13159 7.96094H8.3091V9.14085H9.13159V15.8272H10.4391V7.96094H9.13159ZM6.99611 10.3804V9.99371H8.31707V15.8256H7.02833V15.3745C6.4484 15.7934 5.70737 16.0189 4.9019 15.9545C3.48429 15.7934 2.32442 14.6334 2.16332 13.2157C1.97001 11.3792 3.41985 9.80039 5.22409 9.80039C5.86846 9.80039 6.51283 10.0259 6.99611 10.3804ZM4.80525 14.6334C5.96512 14.8912 6.99611 14.0213 6.99611 12.8935C6.99611 11.8625 6.19065 11.057 5.22409 11.057C4.09644 11.057 3.19432 12.088 3.41985 13.248C3.58094 13.9568 4.12866 14.5046 4.80525 14.6334ZM21.8949 10.0617H17.4519V11.2416H20.3051L17.4517 14.6464V15.8264H21.8947V14.6464H19.0408L21.8942 11.2416H21.8949V10.0617ZM11.6298 11.2544L11.6299 11.2544C11.2591 11.75 11.0394 12.3653 11.0394 13.0318C11.0394 14.6718 12.3688 16.0013 14.0088 16.0013C15.6487 16.0013 16.9781 14.6718 16.9781 13.0318C16.9781 11.4095 15.6772 10.0911 14.0618 10.0628L15.6555 7.96094H14.1271L11.6298 11.2544ZM14.0087 14.7588C14.9627 14.7588 15.7359 13.9854 15.7359 13.0315C15.7359 12.0775 14.9627 11.3042 14.0087 11.3042C13.0548 11.3042 12.2815 12.0775 12.2815 13.0315C12.2815 13.9854 13.0548 14.7588 14.0087 14.7588Z'
          fill='white'
        />
      </svg>
    </SvgIcon>
  );
};

export default HeroSection;
