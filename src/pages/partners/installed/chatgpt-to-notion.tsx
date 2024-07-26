import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout'
import AppLoadingLayout from '@/app_layout/AppLoadingLayout'
import ProLink from '@/components/ProLink'
import HomePageContent from '@/features/landing/components/HomePageContent'
import { makeStaticProps } from '@/i18n/utils/staticHelper'
import FixedCtaButton from '@/page_components/PartnersPages/components/FixedCtaButton'
import TryExtensionButton from '@/page_components/PartnersPages/components/TryExtensionButton'

const ChatgptToNotion = () => {
  const router = useRouter()

  useEffect(() => {
    router.replace(
      `https://www.maxai.me/partners/installed?name=ChatGPT+to+Notion&propRef=installed-chatgpt-to-notion&changelogText=To+get+started%2C+click+here.&changelogLink=https%3A%2F%2Fapi.notion.com%2Fv1%2Foauth%2Fauthorize%3Fclient_id%3D323a93e9-98a0-4f5a-a194-af728f1b817e%26response_type%3Dcode%26owner%3Duser%26redirect_uri%3Dhttps%253A%252F%252Ftheo-lartigau.notion.site%252FChatGPT-to-Notion-af29d9538dca4493a15bb4ed0fde7f91`,
    )
  }, [router])

  return <AppLoadingLayout loading />

  const propRef = 'installed-chatgpt-to-notion'
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
        height={336}
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
          🎉 ChatGPT to Notion
          <br />
          has been installed
        </Typography>
        <Typography>
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
        </Typography>
      </Stack>
      <Box position='relative'>
        <TryExtensionButton propRef={propRef} />
        <HomePageContent propRef={propRef} />
      </Box>
      <FixedCtaButton propRef={propRef} partnerPageType='installed' />
    </Box>
  )
}
export default ChatgptToNotion

const getStaticProps = makeStaticProps()
export { getStaticProps }
