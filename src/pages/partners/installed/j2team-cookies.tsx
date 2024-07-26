import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout'
import AppLoadingLayout from '@/app_layout/AppLoadingLayout'
import HomePageContent from '@/features/landing/components/HomePageContent'
import { makeStaticProps } from '@/i18n/utils/staticHelper'
import FixedCtaButton from '@/page_components/PartnersPages/components/FixedCtaButton'
import TryExtensionButton from '@/page_components/PartnersPages/components/TryExtensionButton'

const J2teamCookies = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace(
      'https://www.maxai.me/partners/installed?name=J2TEAM+Cookies&propRef=installed-j2team-cookies',
    )
  }, [router])

  return <AppLoadingLayout loading />
  const linkRef = 'installed-j2team-cookies'
  return (
    <Box
      sx={{
        bgcolor: '#fff',
        position: 'relative',
        pb: 10,
      }}
    >
      <AppDefaultSeoLayout />
      <Stack
        height={240}
        bgcolor={'#F8F9FA'}
        alignItems={'center'}
        justifyContent={'center'}
        spacing={2}
        px={{
          xs: 2,
          sm: 0,
        }}
      >
        <Typography
          component='h2'
          variant='custom'
          textAlign={'center'}
          fontSize={48}
        >
          🎉 J2TEAM Cookies has been installed
        </Typography>
      </Stack>
      <Box position='relative'>
        <TryExtensionButton propRef={linkRef} />
        <HomePageContent propRef={linkRef} />
      </Box>
      <FixedCtaButton propRef={linkRef} partnerPageType='installed' />
    </Box>
  )
}
export default J2teamCookies

const getStaticProps = makeStaticProps()
export { getStaticProps }
