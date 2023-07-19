import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import useEffectOnce from '@/hooks/useEffectOnce';
import HomePageContent from '@/page_components/LandingPage/HomePageContent';

// 用于外部嵌入的 overview 页面
const EmbedOverview = () => {
  const [loaded, setLoaded] = useState(false);
  const contentRef = useRef<any>(null);

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
    <Box
      ref={contentRef}
      sx={{
        position: 'relative',
        pb: 10,
      }}
    >
      <AppDefaultSeoLayout />
      <HomePageContent annoyingButton iniFrame />
    </Box>
  );
};

export default EmbedOverview;
