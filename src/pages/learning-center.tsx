import { Stack } from '@mui/material';
import React from 'react';

import AppContainer from '@/app_layout/AppContainer';
import BasicUsage from '@/page_components/LearningCenter/BasicUsage';
import Introduction from '@/page_components/LearningCenter/introduction';
import LearningCenterSideMenu from '@/page_components/LearningCenter/LearningCenterSideMenu';

const LearningCenter = () => {
  return (
    <AppContainer sx={{ bgcolor: '#fff', py: 10 }} maxWidth={1312}>
      <Stack direction='row' width={'100%'}>
        {/* sideMenu */}
        <LearningCenterSideMenu />

        {/* content */}
        <Stack spacing={6}>
          {/* introduction */}
          <Introduction />

          {/* basic usage */}
          <BasicUsage />
        </Stack>
      </Stack>
    </AppContainer>
  );
};

export default LearningCenter;
