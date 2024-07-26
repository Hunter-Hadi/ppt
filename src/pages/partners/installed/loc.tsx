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

const LocPartners = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace(
      'https://www.maxai.me/partners/installed?name=L.O.C&propRef=installed-loc',
    )
  }, [router])

  return <AppLoadingLayout loading />
  const linkRef = 'installed-loc'
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
          🎉 L.O.C has been installed
        </Typography>
        {/* <Typography>
          To get started,{' '}
          <ProLink
            muiLinkProps={{
              rel: 'noopener nofollow',
            }}
            href='https://api.notion.com/v1/oauth/authorize?client_id=323a93e9-98a0-4f5a-a194-af728f1b817e&response_type=code&owner=user&redirect_uri=https%3A%2F%2Ftheo-lartigau.notion.site%2FChatGPT-to-Notion-af29d9538dca4493a15bb4ed0fde7f91'
            underline='always'
            target={'_blank'}
          >
            click here
          </ProLink>{' '}
          .
        </Typography> */}
      </Stack>
      <Box position='relative'>
        <TryExtensionButton propRef={linkRef} />
        <HomePageContent propRef={linkRef} />
      </Box>
      <FixedCtaButton propRef={linkRef} partnerPageType='installed' />
    </Box>
  )
}
export default LocPartners

const getStaticProps = makeStaticProps()
export { getStaticProps }
