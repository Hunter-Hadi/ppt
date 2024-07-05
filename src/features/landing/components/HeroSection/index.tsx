import StarIcon from '@mui/icons-material/Star';
import { Box, Grid, Skeleton, Stack, SxProps, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC, useMemo } from 'react';

import CustomIcon from '@/components/CustomIcon';
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
  sx?: SxProps;

  // 临时属性，用于测试
  // 控制 indicator 是否在顶部，默认底部
  isIndicatorContentTop?: boolean;
}

const HeroSection: FC<IProps> = ({
  propRef,
  title: propTitle,
  description: propDescription,
  heroVideoProps,
  trackerLinkProps,
  loading,
  sx,
  isIndicatorContentTop = false,
}) => {
  const { browserAgent: agent } = useBrowserAgent();

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
      </>
    );
  }, [propTitle, t]);

  const description = useMemo(() => {
    return propDescription ? (
      propDescription
    ) : (
      <>{t('pages:home_page__hero_section__desc__ab_test_v4__variant2')}</>
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

        ...sx,
      }}
    >
      <Box maxWidth={1040} mx='auto'>
        <Grid container rowSpacing={3} spacing={4}>
          <Grid item xs={12} sm={12} md={12}>
            <Stack
              p={{
                xs: 0,
                sm: 2,
              }}
              className='content-wrapper'
              sx={[
                {
                  p: {
                    xs: 0,
                    sm: 2,
                  },
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlign: 'center',
                  maxWidth: 'unset',
                  mx: 'auto',
                },
              ]}
            >
              {isIndicatorContentTop && (
                <IndicatorContent
                  isABTestAddNewAndNewSort={true}
                  sx={{
                    mb: 3,
                  }}
                />
              )}
              {loading ? (
                <TitleSkeleton />
              ) : (
                <Typography
                  variant='custom'
                  className='title'
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
                  className='description'
                  fontSize={{
                    xs: 16,
                    sm: 18,
                    lg: 22,
                  }}
                >
                  {description}
                </Typography>
              )}
              {/* margin spacing */}
              <Box height={32} />
              <Stack
                direction={'row'}
                alignItems='center'
                spacing={{
                  xs: 1,
                  sm: 2,
                }}
                width={{
                  xs: '100%',
                  sm: '60%',
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
                spacing={1}
                alignItems='center'
                justifyContent={'center'}
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
                <Stack direction={'row'} spacing={0.5}>
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
                    GPT-4o
                  </Typography>
                </Stack>

                <Stack direction={'row'} spacing={0.5}>
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
                    Claude 3.5
                  </Typography>
                </Stack>

                <Stack direction={'row'} spacing={0.5}>
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
              {!isIndicatorContentTop && (
                <IndicatorContent
                  sx={{
                    mt: 4,
                  }}
                />
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
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

interface IIndicatorContentProps {
  sx?: SxProps;
  isABTestAddNewAndNewSort?: boolean;
}
const IndicatorContent: FC<IIndicatorContentProps> = ({
  sx,
  isABTestAddNewAndNewSort = false,
}) => {
  const { t } = useTranslation();
  return (
    <Stack
      direction={isABTestAddNewAndNewSort ? 'row-reverse' : 'row'}
      alignItems={'center'}
      justifyContent='center'
      gap={{
        xs: 1,
        sm: 3,
      }}
      flexWrap={'wrap'}
      sx={{
        ...sx,
      }}
    >
      <A16zTop50AppsBadge
        sx={
          isABTestAddNewAndNewSort
            ? {
                color: 'text.secondary',
              }
            : undefined
        }
      />
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
            color={isABTestAddNewAndNewSort ? 'text.secondary' : undefined}
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
            color={isABTestAddNewAndNewSort ? 'text.secondary' : undefined}
          >
            {t('pages:home_page__hero_section__indicator3_label')}
          </Typography>
        </Stack>
      </IndicatorDecorator>
      {isABTestAddNewAndNewSort && (
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
              4.8/5
            </Typography>
            <Stack flexDirection='row'>
              {[...Array(5)].map((_, index) => (
                <StarIcon
                  key={index}
                  sx={{
                    fontSize: 16,
                    color: '#ffb000',
                  }}
                />
              ))}
            </Stack>
          </Stack>
        </IndicatorDecorator>
      )}
    </Stack>
  );
};
