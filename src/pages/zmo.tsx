import { Card, CardContent, Stack, Typography } from '@mui/material'
import dayjs from 'dayjs'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import React, { FC, useCallback, useLayoutEffect, useMemo, useRef } from 'react'

import AppContainer from '@/app_layout/AppContainer'
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout'
import ProLink from '@/components/ProLink'
import { makeStaticProps } from '@/i18n/utils/staticHelper'
import { APP_API } from '@/utils/api'
import { webappPost } from '@/utils/request'
//
// async function fetchWithTimeout(url: string) {
//   const timeout = 1000;
//
//   const controller = new AbortController();
//   const id = setTimeout(() => controller.abort(), timeout);
//   const response = await fetch(url, {
//     signal: controller.signal,
//   });
//   clearTimeout(id);
//   return response;
// }

const ZmoInstallPage: FC = () => {
  const ZMO_URL = 'https://imgcreator.zmo.ai/'
  const { t } = useTranslation()
  const router = useRouter()
  const { query, isReady } = router
  const loading = useRef(false)

  const ref = useMemo(() => {
    return `${query?.ref || 'default'}`
  }, [query])

  const routerPath = useMemo(
    () => `${ZMO_URL}?ref=${ref}&utm_campaign=${ref}`,
    [ref],
  )

  const sendMessage = useCallback(async () => {
    if (loading.current) return
    const date = dayjs().format('YYYY-MM-DD HH:mm:ss')
    loading.current = true
    // let ip = '';
    // let country = '';
    // let resultJson: any = {};
    try {
      // const result = await fetchWithTimeout('https://ipapi.co/json/');
      // resultJson = await result.json();
      // ip = resultJson.ip;
      // country = resultJson.country_capital;
      // debugger;
    } catch (e) {
      console.log('fetch ip error: \t', e)
    }
    const prefixRef = `[tozmo]-${ref}`
    webappPost(APP_API.REF_COUNT, {
      data: {
        ref: prefixRef,
        date,
      },
    })
    setTimeout(() => {
      location.href = routerPath
    }, 500)
  }, [ref, routerPath])

  useLayoutEffect(() => {
    if (!isReady) return
    sendMessage()
  }, [isReady, sendMessage])

  return (
    <AppContainer sx={{ bgcolor: '#fff' }}>
      <AppDefaultSeoLayout
        title={t('seo:zmo__title')}
        description={t('seo:zmo__description')}
        canonical={ZMO_URL}
      />
      <Card
        elevation={0}
        sx={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CardContent>
          <Stack alignItems={'center'} justifyItems='center'>
            <Typography
              fontWeight={700}
              variant='h5'
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                columnGap: 1,
              }}
            >
              {`Redirecting to `}
              <ProLink
                href={routerPath}
                sx={{ color: 'inherit' }}
                target='_blank'
                underline={'always'}
              >
                {`"IMGCREATOR"`}
              </ProLink>
              {`...`}
            </Typography>
            <Typography
              color='text.secondary'
              variant='body1'
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              Please wait for 2-3 seconds.
            </Typography>
          </Stack>
        </CardContent>
      </Card>
    </AppContainer>
  )
}

export default ZmoInstallPage

const getStaticProps = makeStaticProps()
export { getStaticProps }
