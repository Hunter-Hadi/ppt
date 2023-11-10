import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import AppFooter from '@/app_layout/AppFooter';
import AppHeader from '@/app_layout/AppHeader';
import useEffectOnce from '@/hooks/useEffectOnce';
import HomePageContent from '@/page_components/LandingPage/HomePageContent';

const EmbedIntroduction = () => {
  const router = useRouter();
  const { query } = router;
  const [loaded, setLoaded] = useState(false);
  const contentRef = useRef<any>(null);

  const showLogo = useMemo(() => {
    if (query.logo) {
      return query.logo === '0' ? false : true;
    }
    return true;
  }, [query.logo]);

  const showHeader = useMemo(() => query.header === '1', [query]);

  const showFooter = useMemo(() => query.footer === '1', [query]);

  useEffectOnce(() => setLoaded(true));

  useEffect(() => {
    if (loaded && window.parent) {
      window.parent.postMessage(
        {
          type: 'embed',
          height: contentRef.current?.offsetHeight,
        },
        '*',
      );
    }
  }, [loaded]);

  return (
    <Box ref={contentRef}>
      <AppDefaultSeoLayout />
      {showHeader && <AppHeader />}
      <HomePageContent iniFrame showLogo={showLogo} />
      {showFooter && <AppFooter />}
    </Box>
  );
};

export default EmbedIntroduction;
