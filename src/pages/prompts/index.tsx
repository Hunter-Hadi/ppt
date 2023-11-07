import { Stack, Typography } from '@mui/material';
import React from 'react';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import { PromptListLayout, PromptTagSelector } from '@/features/prompt';

const PromptsPage = () => {
  const [loaded, setLoaded] = React.useState(false);

  return (
    <AppContainer sx={{ bgcolor: '#fff' }}>
      <AppDefaultSeoLayout
        title='Prompts | MaxAI.me'
        description={
          'Complete your everyday tasks with Prompt Management and One-Click Prompts in minutes that used to take hours.'
        }
        socialImage={'https://www.maxai.me/prompts-social.png'}
      />
      <Stack mt={4} alignItems={'center'} spacing={4} mb={2}>
        <Stack alignItems={'center'} spacing={1}>
          <Typography variant={'h1'}>1-Click Prompts</Typography>
          <Typography variant={'body2'} color='text.secondary'>
            for ChatGPT, Claude, Bard
          </Typography>
        </Stack>
        <PromptTagSelector onLoaded={() => setLoaded(true)} />
      </Stack>
      {loaded && <PromptListLayout />}
    </AppContainer>
  );
};

export default PromptsPage;
