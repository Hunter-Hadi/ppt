import { Box, Grid, Skeleton, Stack, SxProps, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { FC, useMemo } from 'react'

import AppLoadingLayout from '@/app_layout/AppLoadingLayout'
import CustomIcon from '@/components/CustomIcon'
import useLandingABTester from '@/features/ab_tester/hooks/useLandingABTester'
import HeroVideoBox, {
  IHeroVideoProps,
} from '@/features/landing/components/HeroSection/HeroVideoBox'
import MaxAIIndicatorBadge from '@/features/landing/components/MaxAIIndicatorBadge'
import { RESOURCES_URL } from '@/global_constants'
import useBrowserAgent from '@/hooks/useBrowserAgent'
import { IUseShareTrackerLinkProps } from '@/hooks/useShareTrackerLink'
import CTAInstallButton from '@/page_components/CTAInstallButton'

interface IProps {
  propRef?: string
  title?: React.ReactNode
  description?: React.ReactNode

  heroVideoProps?: IHeroVideoProps

  trackerLinkProps?: IUseShareTrackerLinkProps

  loading?: boolean
  sx?: SxProps

  titleComponent?: React.ElementType

  // 是否显示顶部的指标徽章
  showIndicatorBadge?: boolean

  // 首页视频的 ab test （v8）
  inLandingVideoABTest?: boolean
}

const HeroSection: FC<IProps> = ({
  propRef,
  title: propTitle,
  description: propDescription,
  heroVideoProps,
  trackerLinkProps,
  loading,
  showIndicatorBadge = true,
  titleComponent = 'h1',
  sx,
  inLandingVideoABTest,
}) => {
  const { browserAgent: agent } = useBrowserAgent()

  const { t } = useTranslation()

  // const { openVideoPopup } = useVideoPopupController();

  const { variant, enabled } = useLandingABTester(inLandingVideoABTest)

  const title = useMemo(() => {
    return propTitle ? (
      propTitle
    ) : (
      <>
        {t('pages:home_page__hero_section__title__part1')}
        <br />
        {t('pages:home_page__hero_section__title__part2')}
      </>
    )
  }, [propTitle, t])

  const description = useMemo(() => {
    return propDescription ? (
      propDescription
    ) : (
      <>{t('pages:home_page__hero_section__desc__ab_test_v4__variant2')}</>
    )
  }, [propDescription, t])

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
              {showIndicatorBadge && (
                <MaxAIIndicatorBadge
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
                  component={titleComponent}
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
                    icon='Claude3-5Sonnet'
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
                    Claude 3.5 Sonnet
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
                    Gemini 1.5 Pro
                  </Typography>
                </Stack>
              </Stack>
            </Stack>
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
            {inLandingVideoABTest && enabled ? (
              <AppLoadingLayout
                loading={loading || !variant}
                loadingText=''
                sx={{
                  position: 'relative',
                  height: 0,
                  pt: '56.25%',
                  bgcolor: '#f5efff',

                  '& .MuiCircularProgress-root': {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                  },
                }}
              >
                {variant === 'youtube_video' ? (
                  <HeroVideoBox
                    videoSrc={`https://www.youtube.com/embed/XfiZMwAD_KU?si=2augGW9ea-vZzJK6`}
                    variant={'youtube-autoplay'}
                  />
                ) : (
                  <HeroVideoBox
                    videoSrc={`${RESOURCES_URL}/video/landing-page-primary.mp4`}
                    videoPosterUrl={`/assets/landing/hero-section/video-cover.png`}
                    variant={'autoplay'}
                  />
                )}
              </AppLoadingLayout>
            ) : (
              <HeroVideoBox {...heroVideoProps} />
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default HeroSection

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
  )
}
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
  )
}
