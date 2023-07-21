import { Box, Stack, Typography } from '@mui/material';
import React from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import ProLink from '@/components/ProLink';
import LandingPageEmbedBox from '@/page_components/LandingPage/LandingPageEmbedBox';

const AIPromptGenius = () => {
  return (
    <Box sx={{ bgcolor: '#fff' }}>
      <AppDefaultSeoLayout />
      <Stack
        height={336}
        bgcolor={'#F8F9FA'}
        alignItems={'center'}
        justifyContent={'center'}
        spacing={2}
      >
        <Typography
          component='h2'
          variant='custom'
          textAlign={'center'}
          fontSize={48}
        >
          🎉 AI Prompt Genius
          <br />
          has been installed
        </Typography>
        <Typography>
          To get started,{' '}
          <ProLink
            href='https://docs.aipromptgenius.app/tutorial/01-create-edit-and-use-prompts/'
            underline='always'
            target={'_blank'}
          >
            click here
          </ProLink>{' '}
          to view the first part of the tutorial.
        </Typography>
      </Stack>
      <LandingPageEmbedBox linkRef='aipromptgenius' />
    </Box>
  );
};
export default AIPromptGenius;
