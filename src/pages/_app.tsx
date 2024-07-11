// Import Swiper React components
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/scrollbar'
import '@/styles/globals.css'
import '@/features/share_conversation/styles/markdown.css'

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import { IconButton, Stack, ThemeProvider } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import Script from 'next/script'
import { appWithTranslation, useTranslation } from 'next-i18next'
import nextI18nextConfig from 'next-i18next.config'
import { SnackbarKey, SnackbarProvider } from 'notistack'
import React, { useEffect } from 'react'
import { RecoilRoot } from 'recoil'

import AppFooter from '@/app_layout/AppFooter'
import AppHeader from '@/app_layout/AppHeader'
import AppLoadingLayout from '@/app_layout/AppLoadingLayout'
import CacheRefAndRewardfulId from '@/components/CacheRefAndRewardfulId'
import customMuiTheme from '@/config/customMuiTheme'
import globalFont from '@/config/font'
import DevRefreshABTestLandingCookie from '@/features/ab_tester/components/DevRefreshABTestVariantCookie'
import ClientUserIdGenerator from '@/features/track_user_interactions/components/ClientUserIdGenerator'
import { CACHE_CLIENT_USER_ID_PAGE_PATHNAME } from '@/features/track_user_interactions/constant'
import {
  trackUserInteraction,
  useTrackUserInteractions,
} from '@/features/track_user_interactions/utils'
import GlobalVideoPopup from '@/features/video_popup/components/GlobalVideoPopup'
import { APP_PROJECT_LINK } from '@/global_constants'
import useAutoRedirectLanguage from '@/hooks/useAutoRedirectLanguage'
import { GA_TRACKING_ID, GA_TRACKING_ID_MCC } from '@/pages/_document'
import AppInit from '@/utils/AppInit'
import { initFingerPrint } from '@/utils/fingerPrint'
import { SnackbarUtilsConfigurator } from '@/utils/globalSnackbar'

// Create a client
const queryClient = new QueryClient()

function App({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const notistackRef = React.useRef(null)
  const { autoRedirectDone } = useAutoRedirectLanguage() //根据浏览器语言自动重定向到对应的语言页面
  const { i18n } = useTranslation()

  const isEmbedPage = router.pathname.startsWith('/embed')

  useTrackUserInteractions(i18n)

  useEffect(() => {
    if (CACHE_CLIENT_USER_ID_PAGE_PATHNAME === router.pathname) {
      return
    }

    trackUserInteraction('page_load', {
      id: router.pathname,
    })
  }, [router.pathname])

  useEffect(() => {
    initFingerPrint()
  }, [])

  if (CACHE_CLIENT_USER_ID_PAGE_PATHNAME === router.pathname) {
    return (
      <Stack>
        <Component {...pageProps} />
      </Stack>
    )
  }

  if (!autoRedirectDone) {
    return (
      <ThemeProvider theme={customMuiTheme}>
        <AppLoadingLayout
          loading
          sx={{
            height: '100vh',
          }}
        />
      </ThemeProvider>
    )
  }

  return (
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>

      {/* eslint-disable-next-line react/no-unknown-property */}
      <style jsx global>{`
        html {
          font-family: ${globalFont.style.fontFamily}, sans-serif, -apple-system,
            BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell,
            Fira Sans, Droid Sans, Helvetica Neue !important;
        }
      `}</style>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy='afterInteractive'
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_TRACKING_ID}`}
      />
      <Script
        id='gtag-init'
        strategy='afterInteractive'
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_TRACKING_ID}', {
              page_path: window.location.pathname,
              cookie_flags: 'max-age=7200;secure;samesite=none',
            });
            gtag('config', '${GA_TRACKING_ID_MCC}');
          `,
        }}
      ></Script>
      <RecoilRoot>
        <SnackbarProvider
          maxSnack={3}
          preventDuplicate
          ref={notistackRef}
          hideIconVariant
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          action={(key) => (
            <IconButton
              onClick={() => {
                if (notistackRef?.current) {
                  const snRef = notistackRef?.current as {
                    closeSnackbar: (p: SnackbarKey) => void
                  }
                  if (snRef.closeSnackbar) {
                    snRef.closeSnackbar(key)
                  }
                }
              }}
            >
              <CloseOutlinedIcon fontSize='inherit' sx={{ color: 'white' }} />
            </IconButton>
          )}
        >
          <SnackbarUtilsConfigurator />
          <ThemeProvider theme={customMuiTheme}>
            <QueryClientProvider client={queryClient}>
              <AppInit />
              {!isEmbedPage && <AppHeader />}
              <ClientUserIdGenerator targetHost={APP_PROJECT_LINK} />
              <Component {...pageProps} />
              {!isEmbedPage && <AppFooter />}
              <GlobalVideoPopup />
              <CacheRefAndRewardfulId />
              <DevRefreshABTestLandingCookie />
            </QueryClientProvider>
          </ThemeProvider>
        </SnackbarProvider>
      </RecoilRoot>
    </>
  )
}

export default appWithTranslation(App, nextI18nextConfig)
