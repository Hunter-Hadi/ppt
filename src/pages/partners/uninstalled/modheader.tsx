import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import HomePageContent from '@/features/landing/components/HomePageContent';
import FixedCtaButton from '@/page_components/partners/FixedCtaButton';
import TryExtensionButton from '@/page_components/TryExtensionButton';

const ModHeader = () => {
  const propRef = 'uninstalled-modheader';
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
        height={280}
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
          ModHeader <br />
          has been uninstalled
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
