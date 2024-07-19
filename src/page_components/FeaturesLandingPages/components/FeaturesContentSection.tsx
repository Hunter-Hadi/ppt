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
  imageUrl: string
  videoUrl?: string

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
    if (abTestTitleDirection === 'supersede') {
      return 'row-reverse'
    }
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
        px={4}
        sx={{
          bgcolor: abTestTitleDirection === 'left' ? '#f9f7fe' : 'transparent',
        }}
      >
        <Grid
          container
          alignItems='center'
          flexDirection={flexDirection}
          spacing={
            abTestTitleDirection === 'top' || abTestTitleDirection === 'left'
              ? 0
              : 12
          }
          gap={abTestTitleDirection === 'top' ? 6 : 0}
        >
          <Grid item xs={12} sm={flexDirectionSmNumber} order={textBoxOrder}>
            <Stack
              height={'100%'}
              justifyContent='center'
              sx={{
                p: abTestTitleDirection === 'left' ? '5rem' : 0,
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
                fontSize={abTestTitleDirection === 'top' ? 30 : 32}
                textAlign={abTestTitleDirection === 'top' ? 'center' : 'start'}
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
              width: abTestTitleDirection === 'top' ? '100%' : 'auto',
            }}
          >
            {imageUrl && !videoUrl && (
              <ResponsiveImage
                src={imageUrl}
                alt={title}
                width={1168}
                height={864}
                style={
                  abTestTitleDirection === 'top'
                    ? {
                        maxHeight: 560,
                      }
                    : undefined
                }
              />
            )}
            {videoUrl && (
              <Box>
                <HeroVideoBox
                  imageCover={imageUrl}
                  videoSrc={videoUrl}
                  windowAutoPlay={true}
                  videoStyle={{
                    boxShadow: 'none',
                    maxHeight: 560,
                  }}
                />
              </Box>
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
