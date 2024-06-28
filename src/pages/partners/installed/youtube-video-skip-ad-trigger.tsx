import { Box, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import AppLoadingLayout from '@/app_layout/AppLoadingLayout';
import HomePageContent from '@/features/landing/components/HomePageContent';
import { makeStaticProps } from '@/i18n/utils/staticHelper';
import FixedCtaButton from '@/page_components/PartnersPages/components/FixedCtaButton';
import TryExtensionButton from '@/page_components/PartnersPages/components/TryExtensionButton';

const AIPromptGenius = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace(
      'https://www.maxai.me/partners/installed?name=Youtube+Video+Skip+Ad+Trigger&propRef=installed-youtube-video-skip-ad-trigger',
    );
  }, [router]);

  return <AppLoadingLayout loading />;

  const propRef = 'installed-youtube-video-skip-ad-trigger';
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
        height={336}
        bgcolor={'#F8F9FA'}
        alignItems={'center'}
        justifyContent={'center'}
        spacing={2}
        px={{
          xs: 2,
          sm: 0,
        }}
      >
        <Typography
          component='h2'
          variant='custom'
          textAlign={'center'}
          fontSize={48}
        >
          🎉 Youtube Video Skip Ad Trigger
          <br />
          has been installed
        </Typography>
        {/* <Typography>
          To get started,{' '}
          <ProLink
            muiLinkProps={{
              rel: 'noopener nofollow',
            }}
            href='https://docs.aipromptgenius.app/tutorial/01-create-edit-and-use-prompts/'
            underline='always'
            target={'_blank'}
          >
            click here
          </ProLink>{' '}
          to view the first part of the tutorial.
        </Typography> */}
      </Stack>
      <Box position='relative'>
        <TryExtensionButton propRef={propRef} />
        <HomePageContent propRef={propRef} />
      </Box>
      <FixedCtaButton propRef={propRef} partnerPageType='installed' />
    </Box>
  );
};
export default AIPromptGenius;

const getStaticProps = makeStaticProps();
export { getStaticProps };
