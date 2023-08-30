import { useRouter } from 'next/router';
import React, { FC, useCallback, useLayoutEffect } from 'react';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import AppLoadingLayout from '@/app_layout/AppLoadingLayout';

const InstallPage: FC = () => {
  const router = useRouter();
  const { query, isReady } = router;

  const sendMessage = useCallback(async () => {
    location.href = `https://api.maxai.me/app/install?ref=${
      query.ref || 'default'
    }`;
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
      <AppLoadingLayout
        loading
        sx={{
          height: '50vh',
        }}
      />
    </AppContainer>
  );
};

export default InstallPage;
