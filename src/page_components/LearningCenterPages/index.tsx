import Stack from '@mui/material/Stack'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { useEffect } from 'react'

import AppContainer from '@/app_layout/AppContainer'
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout'
import AppLoadingLayout from '@/app_layout/AppLoadingLayout'
import { WWW_PROJECT_LINK } from '@/global_constants'
import BasicUsage from '@/page_components/LearningCenterPages/BasicUsage'
import Features from '@/page_components/LearningCenterPages/Features'
import Introduction from '@/page_components/LearningCenterPages/introduction'
import LearningCenterSideMenu from '@/page_components/LearningCenterPages/LearningCenterSideMenu'

const LearningCenterPages = () => {
  const { t } = useTranslation()
  const { replace } = useRouter()

  useEffect(() => {
    replace('/docs/help/')
  }, [replace])

  return (
    <>
      <AppDefaultSeoLayout
        title={t('seo:learning_center__title')}
        canonical={`${WWW_PROJECT_LINK}/docs/help/`}
      />

      <AppLoadingLayout
        loading
        sx={{
          height: '100vh',
        }}
      />
    </>
  )

  return (
    <AppContainer
      sx={{
        bgcolor: '#fff',
        py: {
          xs: 5,
          md: 10,
        },
      }}
      maxWidth={1312}
    >
      <AppDefaultSeoLayout title={t('seo:learning_center__title')} />
      <Stack direction='row' width={'100%'}>
        {/* sideMenu */}
        <LearningCenterSideMenu />

        {/* content */}
        <Stack spacing={6}>
          {/* introduction */}
          <Introduction />

          {/* basic usage */}
          <BasicUsage />

          {/* features */}
          <Features />
        </Stack>
      </Stack>
    </AppContainer>
  )
}

export default LearningCenterPages
