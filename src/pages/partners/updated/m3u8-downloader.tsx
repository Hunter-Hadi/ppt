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

const UpdatedPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.replace(
      'https://www.maxai.me/partners/updated/?name=M3U8+Downloader&propRef=m3u8downloader&changelogLink=https%3A%2F%2Fhellohelloworld.notion.site%2FHow-to-use-M3U8-Downloader-aeee55c1c4cd4914bcad82c6036642b7%2383e34b74071f4ca2913525ddac9019d5',
    );
  }, [router]);

  return <AppLoadingLayout loading />;
  const propRef = 'm3u8downloader';
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
          🎉 M3U8 Downloader has been updated
        </Typography>
        <Typography>
          <ProLink
            muiLinkProps={{
              rel: 'noopener nofollow',
            }}
            href='https://hellohelloworld.notion.site/How-to-use-M3U8-Downloader-aeee55c1c4cd4914bcad82c6036642b7#83e34b74071f4ca2913525ddac9019d5 '
            underline='always'
            target={'_blank'}
          >
            Click for Changelogs.
          </ProLink>
        </Typography>
      </Stack>
      <Box position='relative'>
        <TryExtensionButton propRef={propRef} />
        <HomePageContent propRef={propRef} />
      </Box>
      <FixedCtaButton propRef={propRef} partnerPageType='updated' />
    </Box>
  );
};
export default UpdatedPage;

const getStaticProps = makeStaticProps();
export { getStaticProps };
