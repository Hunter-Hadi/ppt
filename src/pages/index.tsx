import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import { APP_PROJECT_LINK } from '@/global_constants';
import HomePageContent from '@/page_components/LandingPage/HomePageContent';

const LandingPage = () => {
  const router = useRouter();

  const [ref, setRef] = useState('');

  useEffect(() => {
    if (router.query.ref) {
      setRef(router.query.ref as string);
    }
  }, [router.query]);

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
  return (
    <AppContainer sx={{ bgcolor: '#fff' }}>
      <AppDefaultSeoLayout />
      <HomePageContent showLogo={false} />

      {/* 如果有 ref 传入，通过加载 iframe 来保存 ref 到 app */}
      {ref ? (
        <iframe
          id='app-landing-page-iframe'
          style={{
            position: 'absolute',
            opacity: 0,
            width: '1px',
            height: '1px',
            top: 0,
            left: 0,
            border: 'none',
            display: 'block',
            zIndex: -1,
            pointerEvents: 'none',
          }}
          src={`${APP_PROJECT_LINK}/embed/refCache?ref=${ref}`}
          // src={`http://localhost:3000/landing?ref=${ref}`}
        />
      ) : null}
    </AppContainer>
  );
};
export default LandingPage;
