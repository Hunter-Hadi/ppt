import Stack from '@mui/material/Stack'
import { SxProps } from '@mui/material/styles'
import { useRouter } from 'next/router'
import React from 'react'
import { FC, useEffect } from 'react'

import AppLoadingLayout from '@/app_layout/AppLoadingLayout'
import useLandingABTester from '@/features/ab_tester/hooks/useLandingABTester'
import { RESOURCES_URL } from '@/global_constants'

import CallToActionSection from './CallToActionSection'
import FeaturesContentAbTestV4VariantContent2Section from './FeaturesCarousel/FeaturesContentAbTestV4VariantContent2Section'
import FeaturesContentAbTestV7AutoVideo from './FeaturesCarousel/FeaturesContentAbTestV7AutoVideo'
import HeroSection from './HeroSection'
import HowItWork from './HowItWork'
import MaxAIInNumbers from './MaxAIInNumbers'
import TrustedBy from './TrustedBy'
import UserComment from './UserComment'

interface IProps {
  propRef?: string
  sx?: SxProps
}

const HomePageContent: FC<IProps> = ({ propRef, sx }) => {
  const { isReady, asPath } = useRouter()

  const { variant, loaded, variantConfig } = useLandingABTester(true)

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
      <Stack color='text.primary' component={'main'} sx={sx}>
        {/* heroSection */}
        <HeroSection
          propRef={propRef}
          // loading={!loaded}
          heroVideoProps={{
            videoSrc: `${RESOURCES_URL}/video/landing-page-primary.mp4`,
            variant: 'autoplay',
          }}
        />
        {/* trusted by */}
        <TrustedBy />

        <HowItWork />

        {/* feature  */}
        {(variant === '7-1' ||
          variant === '7-2' ||
          variant === '7-4' ||
          !variant) && (
          <FeaturesContentAbTestV4VariantContent2Section
            abTestTitleDirection={variantConfig?.titleDirection}
            abTestFeaturesType={variantConfig?.featuresType}
          />
        )}
        {variant === '7-3' && <FeaturesContentAbTestV7AutoVideo />}
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

// const FeaturesCarouselSkeleton = () => {
//   return (
//     <Box
//       py={{
//         xs: 7,
//         md: 12,
//       }}
//       px={2}
//       sx={{
//         // 用隐藏的 Skeleton 元素来占位
//         opacity: 0,
//         mx: 'auto',
//         maxWidth: 1312,
//         width: '100%',
//       }}
//     >
//       <Skeleton variant='rounded' width={'100%'} height={600} />
//     </Box>
//   );
// };

export default HomePageContent
