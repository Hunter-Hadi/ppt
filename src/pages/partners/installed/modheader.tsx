import { Box, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import AppLoadingLayout from '@/app_layout/AppLoadingLayout';
import ProLink from '@/components/ProLink';
import HomePageContent from '@/features/landing/components/HomePageContent';
import { makeStaticProps } from '@/i18n/utils/staticHelper';
import FixedCtaButton from '@/page_components/partners_components/FixedCtaButton';
import TryExtensionButton from '@/page_components/partners_components/TryExtensionButton';

const ModHeader = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace(
      'https://www.maxai.me/partners/installed?name=ModHeader&propRef=installed-modheader&changelogText=To+get+started%2Cclick+here.&changelogLink=https%3A%2F%2Fmodheader.com%2F',
    );
  }, [router]);

  return <AppLoadingLayout loading />;

  const propRef = 'installed-modheader';
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
          🎉 ModHeader
          <br />
          has been installed
        </Typography>
        <Typography>
          To get started,{' '}
          <ProLink
            muiLinkProps={{
              rel: 'noopener nofollow',
            }}
            href='https://modheader.com/'
            underline='always'
            target={'_blank'}
          >
            click here
          </ProLink>
        </Typography>
      </Stack>
      <Box position='relative'>
        <TryExtensionButton propRef={propRef} />
        <HomePageContent propRef={propRef} />
      </Box>
      <FixedCtaButton propRef={propRef} />
    </Box>
  );
};
export default ModHeader;

const getStaticProps = makeStaticProps();
export { getStaticProps };
