import { Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import PromptLibrary from '@/features/prompt_library/components/PromptLibrary';
import usePromptLibrary from '@/features/prompt_library/hooks/usePromptLibrary';
import usePromptLibraryAuth from '@/features/prompt_library/hooks/usePromptLibraryAuth';
import { ChromeExtensionDetectorState } from '@/store';

const PromptsPage = () => {
  const { initPromptLibrary } = usePromptLibrary();
  const { setMaxAIChromeExtensionInstallHandler } = usePromptLibraryAuth();
  const { checkIsInstalled } = useRecoilValue(ChromeExtensionDetectorState);
  useEffect(() => {
    initPromptLibrary({});
    setMaxAIChromeExtensionInstallHandler(async () => {
      return checkIsInstalled();
    });
  }, [checkIsInstalled]);
  return (
    <AppContainer sx={{ bgcolor: '#fff' }}>
      <AppDefaultSeoLayout
        title='Prompts | MaxAI.me'
        description={
          'Complete your everyday tasks with Prompt Management and 1-Click Prompts in minutes that used to take hours.'
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
      </Stack>
      <PromptLibrary
        runtime={'WebPage'}
        sx={{
          '.maxai__prompt_library__title': {
            display: 'none',
          },
        }}
      />
    </AppContainer>
  );
};

export default PromptsPage;
