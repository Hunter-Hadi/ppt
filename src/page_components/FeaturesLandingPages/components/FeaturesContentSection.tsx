import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Stack from '@mui/material/Stack'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useTranslation } from 'next-i18next'
import React, { FC, useMemo } from 'react'

import ResponsiveImage from '@/components/ResponsiveImage'
import useBrowserAgent from '@/features/common/hooks/useBrowserAgent'
import HeroVideoBox from '@/features/landing/components/HeroSection/HeroVideoBox'
import CTAInstallButton from '@/page_components/CTAInstallButton'
import FeaturesLandingIcons from '@/page_components/FeaturesLandingPages/components/FeaturesLandingIcons'
import PictureRetouchingIcon, {
  IPictureRetouchingProps,
} from '@/page_components/FeaturesLandingPages/components/PictureRetouchingIcon'

interface IProps {
  icon: React.ReactNode
  title: string
  description: React.ReactNode
  imageUrl?: string
  videoUrl?: string
  videoPosterUrl?: string

  textWithImageLayout?: 'textToImage' | 'imageToText'

  pictureRetouchingDirection?: false | IPictureRetouchingProps['direction']

  showCtaInstallButton?: boolean

  abTestTitleDirection?: 'row' | 'supersede' | 'top' | 'left' | 'rightRegular'
}
const FeaturesContentSection: FC<IProps> = ({
  icon,
  title,
  description,
  imageUrl,
  videoUrl,
  textWithImageLayout = 'textToImage',
  pictureRetouchingDirection = false,
  showCtaInstallButton = false,
  abTestTitleDirection,
  videoPosterUrl,
}) => {
  const { t } = useTranslation()
  const theme = useTheme()
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm')) // 屏幕宽度小于 768 时为 true

  const { browserAgent } = useBrowserAgent()

  const textBoxOrder = useMemo(() => {
    if (
      isDownSm ||
      abTestTitleDirection === 'top' ||
      abTestTitleDirection === 'left'
    ) {
      return 1
    }
    return textWithImageLayout === 'textToImage' ? 1 : 2
  }, [textWithImageLayout, isDownSm, abTestTitleDirection])

  const imageBoxOrder = useMemo(() => {
    if (isDownSm) {
      return 2
    }
    return textWithImageLayout === 'textToImage' ? 2 : 1
  }, [textWithImageLayout, isDownSm])
  const flexDirection = useMemo(() => {
    if (abTestTitleDirection === 'top') {
      return 'column'
    }
    if (abTestTitleDirection === 'left') {
      return 'row'
    }
    return 'row'
  }, [abTestTitleDirection])
  const flexDirectionSmNumber = useMemo(() => {
    if (abTestTitleDirection === 'top') {
      return 12
    }

    return 6
  }, [abTestTitleDirection])
  const gridSpacing = useMemo(() => {
    if (abTestTitleDirection === 'top' || abTestTitleDirection === 'left') {
      return 0
    }
    if (abTestTitleDirection === 'supersede') {
      return { xs: 4, md: 6, lg: 12 }
    }
    return 12
  }, [abTestTitleDirection])
  const titleFontSize = useMemo(() => {
    if (abTestTitleDirection === 'top') {
      return {
        xs: 32,
        md: 40,
      }
    }
    return {
      xs: 28,
      md: 32,
    }
  }, [])
  return (
    <Box
      py={{
        xs: 6,
        md: 9,
      }}
    >
      <Box
        maxWidth={abTestTitleDirection === 'top' ? 1000 : 1312}
        mx='auto'
        px={
          abTestTitleDirection === 'left'
            ? 0
            : {
                xs: 2,
                md: 4,
              }
        }
        sx={{
          bgcolor: abTestTitleDirection === 'left' ? '#F9FAFB' : 'transparent',
          borderRadius: 4,
        }}
      >
        <Grid
          container
          alignItems={
            abTestTitleDirection === 'top'
              ? {
                  xs: 'start',
                  md: 'center',
                }
              : 'center'
          }
          flexDirection={flexDirection}
          spacing={gridSpacing}
          gap={abTestTitleDirection === 'top' ? 6 : 0}
        >
          <Grid item xs={12} sm={flexDirectionSmNumber} order={textBoxOrder}>
            <Stack
              height={'100%'}
              justifyContent='center'
              sx={{
                p: {
                  xs: abTestTitleDirection === 'left' ? '1rem' : 0,
                  md: abTestTitleDirection === 'left' ? '5rem' : 0,
                },
              }}
            >
              {typeof icon === 'string' ? (
                <Box
                  sx={{
                    color: 'primary.main',
                    fontSize: 24,
                    width: 'max-content',
                    lineHeight: 0,
                    borderRadius: '50%',
                    bgcolor: '#F4EBFF',
                    p: 1.5,
                  }}
                >
                  <FeaturesLandingIcons icon={icon} />
                </Box>
              ) : (
                icon
              )}
              <Typography
                component='h2'
                variant='custom'
                fontSize={titleFontSize}
                textAlign={
                  abTestTitleDirection === 'top'
                    ? {
                        xs: 'start',
                        md: 'center',
                      }
                    : 'start'
                }
                fontWeight={700}
                mt={abTestTitleDirection === 'top' ? 1 : 2}
              >
                {title}
              </Typography>
              {typeof description === 'string' ? (
                <Typography
                  variant='custom'
                  fontSize={18}
                  color='text.secondary'
                  mt={2}
                  lineHeight={1.5}
                >
                  {description}
                </Typography>
              ) : (
                description
              )}

              {showCtaInstallButton && (
                <CTAInstallButton
                  sx={{
                    width: 'max-content',
                    height: 44,
                    // borderRadius: 2,
                    fontSize: 16,
                    py: 1.5,
                    px: 2,
                    mt: 4,
                  }}
                  trackerLinkProps={{
                    queryRefEnable: true,
                    pathnameRefEnable: true,
                  }}
                  startIcon={null}
                  endIcon={null}
                  variant={'contained'}
                  text={t(
                    'features_landing:cta_text__add_to_browser_for_free',
                    {
                      BROWSER: browserAgent,
                    },
                  )}
                />
              )}
            </Stack>
          </Grid>
          <Grid
            item
            xs={12}
            sm={flexDirectionSmNumber}
            order={imageBoxOrder}
            sx={{
              position: 'relative',
              width: 'auto',
              ...(abTestTitleDirection === 'top' && videoUrl
                ? {
                    bgcolor: '#f9f5ff',
                    padding: '16px',
                    borderRadius: '16px',
                    width: '100%',
                  }
                : {}),
              ...(abTestTitleDirection === 'top' && !videoUrl
                ? {
                    width: '100%',
                  }
                : {}),
            }}
          >
            {imageUrl && !videoUrl && (
              <ResponsiveImage
                src={imageUrl}
                alt={title}
                loading='lazy'
                width={abTestTitleDirection === 'top' ? 1000 : 1168}
                height={abTestTitleDirection === 'top' ? 740 : 864}
              />
            )}
            {videoUrl && (
              <HeroVideoBox
                videoPosterUrl={videoPosterUrl}
                videoSrc={videoUrl}
                windowAutoPlay={true}
                videoStyle={{
                  boxShadow: 'none',
                  maxHeight: 560,
                }}
              />
            )}
            {pictureRetouchingDirection && (
              <PictureRetouchingIcon direction={pictureRetouchingDirection} />
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}

export default FeaturesContentSection
