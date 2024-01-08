import '@/styles/globals.css';
// init i18n
import '@/i18n';

import CloseIcon from '@mui/icons-material/Close';
import { IconButton, ThemeProvider } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { SnackbarKey, SnackbarProvider } from 'notistack';
import React, { useEffect } from 'react';
import { RecoilRoot } from 'recoil';

import AppFooter from '@/app_layout/AppFooter';
import AppHeader from '@/app_layout/AppHeader/index';
import customMuiTheme from '@/config/customMuiTheme';
import globalFont from '@/config/font';
import GlobalVideoPopup from '@/features/videoPopup/components/GlobalVideoPopup';
import { GA_TRACKING_ID } from '@/pages/_document';
import AppInit from '@/utils/AppInit';
import { initFingerPrint } from '@/utils/fingerPrint';
import { SnackbarUtilsConfigurator } from '@/utils/globalSnackbar';

// Create a client
const queryClient = new QueryClient();

function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const notistackRef = React.useRef(null);

  const isEmbedPage = router.pathname.startsWith('/embed');

  useEffect(() => {
    initFingerPrint();
  }, []);

  return (
    <>
      <Head>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
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
          `,
        }}
      ></Script>
      <RecoilRoot>
        {/*// @ts-ignore*/}
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
                    closeSnackbar: (p: SnackbarKey) => void;
                  };
                  if (snRef.closeSnackbar) {
                    snRef.closeSnackbar(key);
                  }
                }
              }}
            >
              <CloseIcon fontSize='inherit' sx={{ color: 'white' }} />
            </IconButton>
          )}
        >
          <SnackbarUtilsConfigurator />
          <ThemeProvider theme={customMuiTheme}>
            <QueryClientProvider client={queryClient}>
              <AppInit />
              {!isEmbedPage && <AppHeader />}
              {/*// @ts-ignore*/}
              <Component {...pageProps} />
              {!isEmbedPage && <AppFooter />}
              <GlobalVideoPopup />
            </QueryClientProvider>
          </ThemeProvider>
        </SnackbarProvider>
      </RecoilRoot>
    </>
  );
}
export default App;
