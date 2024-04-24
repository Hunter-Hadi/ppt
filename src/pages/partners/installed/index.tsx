import { Box, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect, useMemo } from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import ProLink from '@/components/ProLink';
import HomePageContent from '@/features/landing/components/HomePageContent';
import usePartnersInfo from '@/features/partners/hooks/usePartnersInfo';
import { useSendRefCount } from '@/hooks/useSendRefCount';
import { makeStaticProps } from '@/i18n/utils/staticHelper';
import FixedCtaButton from '@/page_components/partners_components/FixedCtaButton';
import TryExtensionButton from '@/page_components/partners_components/TryExtensionButton';

const PartnersInstallPage = () => {
  const router = useRouter();

  const { name, propRef, changelogText, changelogLink } = usePartnersInfo();

  useSendRefCount(propRef, 'partners-installed');

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
          🎉 {partnersName} has been installed
        </Typography>
        {changelogText && changelogLink ? (
          <Typography>
            <ProLink
              muiLinkProps={{
                rel: 'noopener nofollow',
              }}
              href={changelogLink}
              underline='always'
              target={'_blank'}
            >
              {changelogText}
            </ProLink>
          </Typography>
        ) : null}
      </Stack>
      <Box position='relative'>
        <TryExtensionButton propRef={propRef} />
        <HomePageContent propRef={propRef} />
      </Box>
      <FixedCtaButton propRef={propRef} />
    </Box>
  );
};
export default PartnersInstallPage;

const getStaticProps = makeStaticProps();
export { getStaticProps };
