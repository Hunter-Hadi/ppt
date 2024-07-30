import Stack from '@mui/material/Stack'
import { SxProps } from '@mui/material/styles'
import { useRouter } from 'next/router'
import React from 'react'
import { FC, useEffect } from 'react'

import { LANDING_PRIMARY_VIDEO_ASSETS_URL } from '@/features/landing/constants'

import CallToActionSection from './CallToActionSection'
import FeaturesContentAbTestV7SlideAutoVideo from './FeaturesCarousel/FeaturesContentAbTestV7SlideAutoVideo'
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
    <Stack color='text.primary' component={'main'} sx={sx}>
      {/* heroSection */}
      <HeroSection
        propRef={propRef}
        // loading={!loaded}
        inLandingVideoABTest
        heroVideoProps={{
          videoSrc: LANDING_PRIMARY_VIDEO_ASSETS_URL,
          variant: 'autoplay',
        }}
      />
      {/* trusted by */}
      <TrustedBy />

      <HowItWork />

      {/* feature  */}
      <FeaturesContentAbTestV7SlideAutoVideo />
      {/* maxai in numbers */}
      <MaxAIInNumbers />

      {/* user comment */}
      <UserComment />

      {/* call to action section */}
      <CallToActionSection propRef={propRef} />
    </Stack>
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
