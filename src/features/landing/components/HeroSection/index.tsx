import { Box, Grid, Skeleton, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC, useMemo } from 'react';

import CustomIcon from '@/components/CustomIcon';
import useLandingABTester from '@/features/ab_tester/hooks/useLandingABTester';
import A16zTop50AppsBadge from '@/features/landing/components/HeroSection/A16zTop50AppsBadge';
import HeroVideoBox, {
  IHeroVideoProps,
} from '@/features/landing/components/HeroSection/HeroVideoBox';
import IndicatorDecorator from '@/features/landing/components/IndicatorDecorator';
import { LOVED_BY_NUM, STAR_RATINGS_NUM } from '@/features/landing/constants';
import useBrowserAgent from '@/hooks/useBrowserAgent';
import { IUseShareTrackerLinkProps } from '@/hooks/useShareTrackerLink';
import CTAInstallButton from '@/page_components/CTAInstallButton';

interface IProps {
  propRef?: string;
  title?: React.ReactNode;
  description?: React.ReactNode;

  heroVideoProps?: IHeroVideoProps;

  trackerLinkProps?: IUseShareTrackerLinkProps;

  loading?: boolean;
}

const HeroSection: FC<IProps> = ({
  propRef,
  title: propTitle,
  description: propDescription,
  heroVideoProps,
  trackerLinkProps,
  loading,
}) => {
  const { browserAgent: agent } = useBrowserAgent();

  const { heroSectionLayout } = useLandingABTester();

  const { t } = useTranslation();

  // const { openVideoPopup } = useVideoPopupController();

  const title = useMemo(() => {
    return propTitle ? (
      propTitle
    ) : (
      <>
        {t('pages:home_page__hero_section__title__part1')}
        <br />
        {t('pages:home_page__hero_section__title__part2')}
        <br />
        {t('pages:home_page__hero_section__title__part3')}
      </>
    );
  }, [propTitle, t]);

  const description = useMemo(() => {
    return propDescription ? (
      propDescription
    ) : (
      <>{t('pages:home_page__hero_section__desc')}</>
    );
  }, [propDescription, t]);

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
          <Grid
            item
            xs={12}
            sm={12}
            md={heroSectionLayout === 'ttb-layout' ? 12 : 6}
          >
            <Stack
              p={{
                xs: 0,
                sm: 2,
              }}
              sx={[
                {
                  p: {
                    xs: 0,
                    sm: 2,
                  },
                  justifyContent:
                    heroSectionLayout === 'ttb-layout'
                      ? 'center'
                      : 'flex-start',
                  alignItems:
                    heroSectionLayout === 'ttb-layout'
                      ? 'center'
                      : 'flex-start',
                  textAlign:
                    heroSectionLayout === 'ttb-layout' ? 'center' : 'left',
                  maxWidth: heroSectionLayout === 'ttb-layout' ? 864 : 'unset',
                  mx: heroSectionLayout === 'ttb-layout' ? 'auto' : 'unset',
                },
              ]}
            >
              {loading ? (
                <TitleSkeleton />
              ) : (
                <Typography
                  variant='custom'
                  fontSize={{
                    xs: 40,
                    sm: 48,
                    lg: 56,
                  }}
                  component='h1'
                  fontWeight={700}
                >
                  {title}
                </Typography>
              )}
              {/* margin spacing */}
              <Box height={24} />
              {loading ? (
                <DescriptionSkeleton />
              ) : (
                <Typography
                  variant='body2'
                  fontSize={{
                    xs: 14,
                    sm: 16,
                    lg: 18,
                  }}
                >
                  {description}
                </Typography>
              )}
              {/* margin spacing */}
              <Box height={32} />
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
                mb={1.5}
              >
                <CTAInstallButton
                  showAgent='Chrome'
                  variant={agent === 'Chrome' ? 'contained' : 'outlined'}
                  text={agent === 'Chrome' ? undefined : ''}
                  trackerLinkProps={{
                    defaultRef: propRef ?? 'homepage',
                    queryRefEnable: true,
                    pathnameRefEnable: false,
                    ...trackerLinkProps,
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
                    ...trackerLinkProps,
                  }}
                  sx={{
                    width: agent === 'Edge' ? '100%' : 'max-content',
                    bgcolor: agent === 'Edge' ? 'primary.main' : '#fff',
                  }}
                />
              </Stack>
              <Stack
                direction={'row'}
                spacing={0.5}
                alignItems='center'
                justifyContent='center'
                width={'100%'}
                fontSize={{
                  xs: 12,
                  md: 16,
                }}
                flexWrap={'wrap'}
              >
                <Typography
                  variant='custom'
                  fontSize={'inherit'}
                  lineHeight={1.5}
                  flexShrink={0}
                >
                  Powered by
                </Typography>
                <CustomIcon
                  icon='GPT4o'
                  sx={{
                    fontSize: {
                      xs: 20,
                      md: 24,
                    },
                  }}
                />
                <Typography
                  variant='custom'
                  fontSize={'inherit'}
                  lineHeight={1.5}
                  flexShrink={0}
                >
                  GPT-4o,
                </Typography>
                <CustomIcon
                  icon='ClaudeLogo'
                  sx={{
                    fontSize: {
                      xs: 20,
                      md: 24,
                    },
                  }}
                />
                <Typography
                  variant='custom'
                  fontSize={'inherit'}
                  lineHeight={1.5}
                  flexShrink={0}
                >
                  Claude 3,
                </Typography>
                <CustomIcon
                  icon='GeminiPro'
                  sx={{
                    fontSize: {
                      xs: 20,
                      md: 24,
                    },
                  }}
                />
                <Typography
                  variant='custom'
                  fontSize={'inherit'}
                  lineHeight={1.5}
                  flexShrink={0}
                >
                  Gemini 1.5
                </Typography>
              </Stack>
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            sm={12}
            md={heroSectionLayout === 'ttb-layout' ? 12 : 6}
          >
            <HeroVideoBox {...heroVideoProps} />
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default HeroSection;

const TitleSkeleton = () => {
  return (
    <Box
      sx={{
        // 用隐藏的 Skeleton 元素来占位
        opacity: 0,
      }}
    >
      <Skeleton height={70} />
      <Skeleton height={70} />
      <Skeleton height={70} />
    </Box>
  );
};
const DescriptionSkeleton = () => {
  return (
    <Box
      sx={{
        // 用隐藏的 Skeleton 元素来占位
        opacity: 0,
      }}
    >
      <Skeleton height={27} />
      <Skeleton height={27} />
    </Box>
  );
};
