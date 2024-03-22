import { Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import useExtensionUpdateRemindDialogState from '@/features/extension/hooks/useExtensionUpdateRemindDialog';
import { ChromeExtensionDetectorState } from '@/features/extension/store';
import PromptLibrary from '@/features/prompt_library/components/PromptLibrary';
import usePromptLibrary from '@/features/prompt_library/hooks/usePromptLibrary';
import usePromptLibraryAuth from '@/features/prompt_library/hooks/usePromptLibraryAuth';
import usePromptLibraryParameters from '@/features/prompt_library/hooks/usePromptLibraryParameters';

const PromptsPages = () => {
  const router = useRouter();
  const { initPromptLibrary } = usePromptLibrary();
  const { promptLibraryListParameters } = usePromptLibraryParameters();
  const { setMaxAIChromeExtensionInstallHandler } = usePromptLibraryAuth();
  const { checkIsInstalled } = useRecoilValue(ChromeExtensionDetectorState);

  const {
    isExtensionVersionGreaterThanRequiredVersion,
    openUpdateRemindDialog,
  } = useExtensionUpdateRemindDialogState();

  const { cancelSelectPromptLibraryCard } = usePromptLibrary();

  useEffect(() => {
    setMaxAIChromeExtensionInstallHandler(async () => {
      // 1. 先判断是否安装了插件
      // 2. 如果安装了插件，判断插件的版本是否大于 2.4.7
      // 3. 如果大于 2.4.7 ，返回 true
      // 4. 如果小于 2.4.7 ，弹出提示框，返回 false
      const isInstallExtension = checkIsInstalled();
      if (isInstallExtension) {
        if (isExtensionVersionGreaterThanRequiredVersion('2.4.7')) {
          return true;
        } else {
          openUpdateRemindDialog();
          cancelSelectPromptLibraryCard();
          return false;
        }
      } else {
        return false;
      }
    });
  }, [
    checkIsInstalled,
    openUpdateRemindDialog,
    isExtensionVersionGreaterThanRequiredVersion,
  ]);

  useEffect(() => {
    if (router.isReady) {
      initPromptLibrary({
        query: (router.query.query as string) || '',
        page_size: Number(router.query.page_size as string) || 12,
        page: Number(router.query.page as string) || 0,
        use_case: (router.query.use_case as string) || 'All',
        category: (router.query.category as string) || 'All',
      });
    }
  }, [router.isReady]);
  useEffect(() => {
    if (promptLibraryListParameters.enabled) {
      router.push({
        pathname: '/prompts',
        query: {
          query: promptLibraryListParameters.query,
          page_size: promptLibraryListParameters.page_size,
          page: promptLibraryListParameters.page,
          use_case: promptLibraryListParameters.use_case,
          category: promptLibraryListParameters.category,
        },
      });
    }
  }, [promptLibraryListParameters]);
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
        PromptLibraryHeaderProps={{
          sx: {
            top: 64,
            zIndex: 1,
            bgcolor: 'background.paper',
          },
        }}
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

export default PromptsPages;
