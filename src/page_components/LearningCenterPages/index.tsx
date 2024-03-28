import { Stack } from '@mui/material';
import React from 'react';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import BasicUsage from '@/page_components/LearningCenterPages/BasicUsage';
import Features from '@/page_components/LearningCenterPages/Features';
import Introduction from '@/page_components/LearningCenterPages/introduction';
import LearningCenterSideMenu from '@/page_components/LearningCenterPages/LearningCenterSideMenu';

const LearningCenterPages = () => {
  return (
    <AppContainer
      sx={{
        bgcolor: '#fff',
        py: {
          xs: 5,
          md: 10,
        },
      }}
      maxWidth={1312}
    >
      <AppDefaultSeoLayout title={'Learning Center | MaxAI.me'} />
      <Stack direction='row' width={'100%'}>
        {/* sideMenu */}
        <LearningCenterSideMenu />

        {/* content */}
        <Stack spacing={6}>
          {/* introduction */}
          <Introduction />

          {/* basic usage */}
          <BasicUsage />

          {/* features */}
          <Features />
        </Stack>
      </Stack>
    </AppContainer>
  );
};

export default LearningCenterPages;
