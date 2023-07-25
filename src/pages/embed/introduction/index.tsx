import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useRef, useState } from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
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
      <HomePageContent iniFrame showLogo={showLogo} />
    </Box>
  );
};

export default EmbedIntroduction;
