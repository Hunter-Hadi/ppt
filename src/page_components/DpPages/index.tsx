import Stack from '@mui/material/Stack'
import { useRouter } from 'next/router'
import React, { useEffect, useMemo } from 'react'

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout'
import AppLoadingLayout from '@/app_layout/AppLoadingLayout'
import CallToActionSection from '@/features/landing/components/CallToActionSection'
import FeaturesCarousel from '@/features/landing/components/FeaturesCarousel'
import HeroSection from '@/features/landing/components/HeroSection'
import MaxAIInNumbers from '@/features/landing/components/MaxAIInNumbers'
import TrustedBy from '@/features/landing/components/TrustedBy'
import UserComment from '@/features/landing/components/UserComment'

const DpPage = () => {
  const { isReady, asPath, query } = useRouter()

  const { landingTitle, landingDescription } = query

  const title = useMemo(() => {
    if (landingTitle) {
      const afterParsingTitle = decodeURIComponent(`${landingTitle}`)
      return (
        <>
          {afterParsingTitle.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </>
      )
    }
  }, [landingTitle])

  const description = useMemo(() => {
    if (landingDescription) {
      const afterParsingDescription = decodeURIComponent(
        `${landingDescription}`,
      )
      return (
        <>
          {afterParsingDescription.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </>
      )
    }
  }, [landingDescription])

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
    <>
      <AppDefaultSeoLayout />
      <AppLoadingLayout loading={!isReady} sx={{ minHeight: '50vh' }}>
        <Stack color='text.primary'>
          {/* heroSection */}
          <HeroSection title={title} description={description} />

          {/* feature carousel */}
          <FeaturesCarousel />

          {/* trusted by */}
          <TrustedBy />

          {/* maxai in numbers */}
          <MaxAIInNumbers />

          {/* user comment */}
          <UserComment />

          {/* call to action section */}
          <CallToActionSection />
        </Stack>
      </AppLoadingLayout>
    </>
  )
}

export default DpPage
