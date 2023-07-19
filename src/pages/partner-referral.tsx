import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import { INSTALL_LINK } from '@/global_constants';
import HomePageContent from '@/page_components/LandingPage/HomePageContent';
import { APP_API } from '@/utils/api';
import { sendLarkBotMessage } from '@/utils/larkBot';
import { post } from '@/utils/request';

const WHITE_LIST_REFS: string[] = [];

const PartnerReferral = () => {
  const router = useRouter();
  const { query, isReady } = router;
  const loading = useRef(false);

  const shareInstallLink = useMemo(() => {
    return `${INSTALL_LINK}?ref=${query.ref || 'default'}`;
  }, [query.ref]);

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
  }, [query]);

  useEffect(() => {
    if (!isReady) return;
    //sendMessage();
  }, [isReady, sendMessage]);

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView();
      }
    }
  }, []);

  useEffect(() => {
    if (query.ref) {
      const ref = query.ref as string;
      if (WHITE_LIST_REFS.includes(ref)) {
        router.push({
          pathname: '/install',
          query: {
            ref,
          },
        });
      }
    }
  }, [query]);

  return (
    <AppContainer sx={{ bgcolor: '#fff' }}>
      <AppDefaultSeoLayout />
      <HomePageContent installLink={shareInstallLink} />
    </AppContainer>
  );
};
export default PartnerReferral;
