import SouthOutlinedIcon from '@mui/icons-material/SouthOutlined'
import Stack from '@mui/material/Stack'
import { SxProps } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { FC, useEffect } from 'react'

import AppLoadingLayout from '@/app_layout/AppLoadingLayout'
import useLandingABTester from '@/features/ab_tester/hooks/useLandingABTester'
import CallToActionSection from '@/features/landing/components/CallToActionSection'
import FeaturesContentAbTestV4VariantContent2Section from '@/features/landing/components/FeaturesCarousel/FeaturesContentAbTestV4VariantContent2Section'
import FeaturesContentAbTestV7CardAutoVideo from '@/features/landing/components/FeaturesCarousel/FeaturesContentAbTestV7CardAutoVideo'
import FeaturesContentAbTestV7AutoVideo from '@/features/landing/components/FeaturesCarousel/FeaturesContentAbTestV7SlideAutoVideo'
import FeaturesContentAbTestV7VariantContentSection from '@/features/landing/components/FeaturesCarousel/FeaturesContentAbTestV7VariantContentSection'
import HeroSection from '@/features/landing/components/HeroSection'
import HowItWork from '@/features/landing/components/HowItWork'
import MaxAIInNumbers from '@/features/landing/components/MaxAIInNumbers'
import UserComment from '@/features/landing/components/UserComment'
import { RESOURCES_URL } from '@/global_constants'
import ProLink from '@/packages/base-ui/components/ProLink'
interface IProps {
  propRef?: string
  sx?: SxProps
}

const FeaturesExploreMore: FC<IProps> = ({ propRef, sx }) => {
  const { t } = useTranslation()
  const { isReady, asPath } = useRouter()

  const { variant, loaded, variantConfig } = useLandingABTester(true)
  console.log(`variantConfig`, variant, variantConfig)

  useEffect(() => {
    if (isReady && asPath) {
      const hash = asPath.split('#')[1]
      const element = document.getElementById(`homepage-${hash}`)
      if (element) {
        element.scrollIntoView()
      }
    }
  }, [isReady, asPath])

  return (
    <AppLoadingLayout loading={!loaded} sx={{ minHeight: '90vh' }}>
      <Stack
        color='text.primary'
        sx={{
          position: 'relative',
          pt: 3,
          ...sx,
        }}
      >
        {/* Explore more button */}
        <ProLink href={'/'} target={'_blank'}>
          <Stack
            direction={'row'}
            alignItems='center'
            justifyContent='center'
            spacing={1}
            py={1}
            px={2.5}
            sx={{
              position: 'absolute',
              top: 0,
              left: '50%',
              transform: 'translateX(-50%)',
              bgcolor: '#EDE4FF',
              color: 'primary.main',
              width: 'max-content',
              borderRadius: 100,
            }}
          >
            <Typography
              fontSize={18}
              fontWeight={500}
              lineHeight={1.5}
              variant='custom'
            >
              {t('features_landing:explore_more_features')}
            </Typography>
            <SouthOutlinedIcon />
          </Stack>
        </ProLink>

        {/* heroSection */}
        <HeroSection
          titleComponent={'h2'}
          showIndicatorBadge={false}
          propRef={propRef}
          // loading={!loaded}
          heroVideoProps={{
            videoSrc: `${RESOURCES_URL}/video/landing-page-primary.mp4`,
            videoPosterUrl: `/assets/landing/hero-section/video-cover.png`,
            variant: 'autoplay',
            windowAutoPlay: true,
          }}
        />

        <HowItWork />

        {/* feature  */}
        {!variant ? (
          <FeaturesContentAbTestV4VariantContent2Section
            abTestTitleDirection={'supersede'}
            abTestFeaturesType={'image'}
          />
        ) : (
          <>
            {(variant === '7-1' || variant === '7-2') && (
              <FeaturesContentAbTestV4VariantContent2Section
                abTestTitleDirection={variantConfig?.titleDirection}
                abTestFeaturesType={variantConfig?.featuresType}
              />
            )}
            {variant === '7-3' && <FeaturesContentAbTestV7AutoVideo />}
            {variant === '7-4' && (
              <FeaturesContentAbTestV7VariantContentSection />
            )}
            {variant === '7-5' && <FeaturesContentAbTestV7CardAutoVideo />}
          </>
        )}

        {/* maxai in numbers */}
        <MaxAIInNumbers />

        {/* user comment */}
        <UserComment />

        {/* call to action section */}
        <CallToActionSection propRef={propRef} />
      </Stack>
    </AppLoadingLayout>
  )
}

export default FeaturesExploreMore
