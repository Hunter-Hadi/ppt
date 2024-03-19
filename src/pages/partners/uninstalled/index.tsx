import { Box, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import HomePageContent from '@/features/landing/components/HomePageContent';
import { useSendRefCount } from '@/hooks/useSendRefCount';
import FixedCtaButton from '@/page_components/partners/FixedCtaButton';
import TryExtensionButton from '@/page_components/TryExtensionButton';

const PartnersUnInstallPage = () => {
  const router = useRouter();

  const name = router.query?.name as string;

  const propRef = name;

  useSendRefCount(propRef, 'partners-uninstalled');

  const partnersName = useMemo(() => {
    if (!name) {
      return '';
    }
    if (Array.isArray(name)) {
      return name[0].split('-').join(' ');
    } else {
      return name.split('-').join(' ');
    }
  }, [name]);

  useEffect(() => {
    if (!name && router.isReady) {
      router.replace('/');
    }
  }, [name, router]);

  if (!name) return null;

  return (
    <Box
      sx={{
        bgcolor: '#fff',
        position: 'relative',
        pb: 10,
      }}
    >
      <AppDefaultSeoLayout />
      <Stack
        minHeight={240}
        bgcolor={'#F8F9FA'}
        alignItems={'center'}
        justifyContent={'center'}
        spacing={2}
        px={{
          xs: 2,
          sm: 0,
        }}
        py={1.5}
        boxSizing='border-box'
      >
        <Typography
          component='h2'
          variant='custom'
          textAlign={'center'}
          fontSize={48}
        >
          🎉 {partnersName} has been uninstalled
        </Typography>
        {/* <Typography>
          To get started,{' '}
          <ProLink
            muiLinkProps={{
              rel: 'noopener nofollow',
            }}
            href='https://api.notion.com/v1/oauth/authorize?client_id=323a93e9-98a0-4f5a-a194-af728f1b817e&response_type=code&owner=user&redirect_uri=https%3A%2F%2Ftheo-lartigau.notion.site%2FChatGPT-to-Notion-af29d9538dca4493a15bb4ed0fde7f91'
            underline='always'
            target={'_blank'}
          >
            click here
          </ProLink>{' '}
          .
        </Typography> */}
      </Stack>
      <Box position='relative'>
        <TryExtensionButton propRef={propRef} />
        <HomePageContent propRef={propRef} />
      </Box>
      <FixedCtaButton propRef={propRef} />
    </Box>
  );
};
export default PartnersUnInstallPage;
