import { Box } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import useEffectOnce from '@/hooks/useEffectOnce';
import HomePageContent from '@/page_components/LandingPage/HomePageContent';

const EmbedIntroduction = () => {
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
      <HomePageContent annoyingButton />
    </Box>
  );
};

export default EmbedIntroduction;
