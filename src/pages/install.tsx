import { Card, CardContent, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { FC, useCallback, useLayoutEffect, useRef } from 'react';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import ProLink from '@/components/ProLink';
import ResponsiveImage from '@/components/ResponsiveImage';
import { APP_EXTERNAL_LINKS } from '@/global_constants';
import ProducthuntHonor from '@/page_components/LandingPage/ProducthuntHonor';
import { APP_API } from '@/utils/api';
import { sendLarkBotMessage } from '@/utils/larkBot';
import { post } from '@/utils/request';
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

const InstallPage: FC = () => {
  const router = useRouter();
  const { query, isReady } = router;
  const loading = useRef(false);

  const sendMessage = useCallback(async () => {
    if (loading.current) return;
    const date = dayjs().format('YYYY-MM-DD HH:mm:ss');
    loading.current = true;
    // let ip = '';
    // let country = '';
    // let resultJson: any = {};
    try {
      // const result = await fetchWithTimeout('https://ipapi.co/json/');
      // resultJson = await result.json();
      // ip = resultJson.ip;
      // country = resultJson.country_capital;
      // debugger;
    } catch (e) {}
    post(APP_API.REF_COUNT, {
      data: {
        ref: query.ref || 'default',
        date,
      },
    });
    sendLarkBotMessage(
      'Install',
      `ref: ${query.ref || 'default'}\ndate: ${date}\n`,
      {
        uuid: '0d862c50-2985-48ca-91cf-d325c596e1f9',
      },
    );
    setTimeout(() => {
      location.href = APP_EXTERNAL_LINKS.CHROME_EXTENSION;
    }, 500);
  }, [query]);

  useLayoutEffect(() => {
    if (!isReady) return;
    sendMessage();
  }, [isReady, sendMessage]);

  return (
    <AppContainer sx={{ bgcolor: '#fff' }}>
      <AppDefaultSeoLayout
        title={'Install | MaxAI.me'}
        canonical={'https://www.maxai.me/install'}
      />
      <Card
        elevation={0}
        sx={{
          height: '80vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CardContent>
          <ProducthuntHonor
            sx={{
              mb: 4,
              gap: { xs: 2, sm: 4 },
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
            }}
          />
          <Stack alignItems={'center'} justifyItems='center'>
            <ResponsiveImage
              width={431}
              height={160}
              src={'/assets/install-connect.png'}
              alt={'Install Chrome Extension'}
            />

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
                href={APP_EXTERNAL_LINKS.CHROME_EXTENSION}
                sx={{ color: 'inherit' }}
                target='_blank'
                underline={'always'}
              >
                {`"MaxAI.me"`}
              </ProLink>
              {` extension...`}
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
  );
};

export default InstallPage;
