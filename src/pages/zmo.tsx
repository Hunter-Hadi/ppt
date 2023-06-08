import { Card, CardContent, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, {
  FC,
  useCallback,
  useLayoutEffect,
  useMemo,
  useRef,
} from 'react';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import ProLink from '@/components/ProLink';
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

const ZmoInstallPage: FC = () => {
  const ZMO_URL = 'https://imgcreator.zmo.ai/';

  const router = useRouter();
  const { query, isReady } = router;
  const loading = useRef(false);

  const ref = useMemo(() => {
    return `${query?.ref || 'default'}`;
  }, [query]);

  const routerPath = useMemo(
    () => `${ZMO_URL}?ref=${ref}&utm_campaign=${ref}`,
    [ref],
  );

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
    const prefixRef = `[tozmo]-${ref}`;
    post(APP_API.REF_COUNT, {
      data: {
        ref: prefixRef,
        date,
      },
    });
    sendLarkBotMessage('Install', `ref: ${prefixRef}\ndate: ${date}\n`, {
      uuid: 'bc237ff0-3593-41a5-bc52-c14ae2489113',
    });
    setTimeout(() => {
      location.href = routerPath;
    }, 500);
  }, [ref, routerPath]);

  useLayoutEffect(() => {
    if (!isReady) return;
    sendMessage();
  }, [isReady, sendMessage]);

  return (
    <AppContainer sx={{ bgcolor: '#fff' }}>
      <AppDefaultSeoLayout
        title={
          'All-in-one AI Design Art Generator | AI Image Generator From Text | ImgCreator.AI'
        }
        description={`Create art and images with AI for free. ImgCreator.ai can generate images, art, illustrations, anime, logos, designs from text and images. Our proprietary technology will bring your imagination to life.`}
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
  );
};

export default ZmoInstallPage;
