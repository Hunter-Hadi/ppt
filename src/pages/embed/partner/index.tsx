import { Box, Typography } from '@mui/material';
import { useEffect, useRef, useState } from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import HomePageContent from '@/features/landing/components/HomePageContent';
import useEffectOnce from '@/hooks/useEffectOnce';

// 用于外部嵌入的 overview 页面
const EmbedPartner = () => {
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
        px: {
          xs: 2,
          sm: 0,
        },
      }}
    >
      <AppDefaultSeoLayout />
      <Box
        sx={{
          position: 'relative',
          top: {
            xs: 24,
            sm: 42,
          },
          width: 'max-content',
          mx: 'auto',
          bgcolor: '#F4EBFB',
          borderRadius: 99,
          px: 2,
          py: 1,
          whiteSpace: 'nowrap',
        }}
      >
        <Typography color='primary'>{`Try our partner's new extension 👇`}</Typography>
      </Box>
      <HomePageContent />
    </Box>
  );
};

export default EmbedPartner;
