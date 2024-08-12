import Stack from '@mui/material/Stack'
import { SxProps } from '@mui/material/styles'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React from 'react'
import { FC, useEffect } from 'react'

import AppLoadingLayout from '@/app_layout/AppLoadingLayout'
import useLandingABTester from '@/features/ab_tester/hooks/useLandingABTester'
import { LANDING_PRIMARY_VIDEO_ASSETS_URL } from '@/features/landing/constants'

import CallToActionSection from './CallToActionSection'
import FeaturesContentAbTestV7SlideAutoVideo from './FeaturesCarousel/FeaturesContentAbTestV7SlideAutoVideo'
import HeroSection from './HeroSection'
// import HowItWork from './HowItWork'
// import MaxAIInNumbers from './MaxAIInNumbers'
// import TrustedBy from './TrustedBy'
// import UserComment from './UserComment'

const HowItWork = dynamic(() => import('./HowItWork'), {
  loading: () => <AppLoadingLayout loading />,
  ssr: false,
})
const MaxAIInNumbers = dynamic(() => import('./MaxAIInNumbers'), {
  loading: () => <AppLoadingLayout loading />,
  ssr: false,
})
const TrustedBy = dynamic(() => import('./TrustedBy'), {
  loading: () => <AppLoadingLayout loading />,
  ssr: false,
})
const UserComment = dynamic(() => import('./UserComment'), {
  loading: () => <AppLoadingLayout loading />,
  ssr: false,
})

interface IProps {
  propRef?: string
  sx?: SxProps
}

const HomePageContent: FC<IProps> = ({ propRef, sx }) => {
  const { isReady, asPath } = useRouter()

  const { title, loaded } = useLandingABTester(true)

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
    <AppLoadingLayout
      loading={!loaded}
      sx={{
        height: '100vh',
      }}
    >
      <Stack color='text.primary' component={'main'} sx={sx}>
        {/* heroSection */}
        <HeroSection
          title={title}
          propRef={propRef}
          // loading={!loaded}
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
    </AppLoadingLayout>
  )
}

export default HomePageContent
