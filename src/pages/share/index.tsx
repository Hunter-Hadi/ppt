import { AppBar, Box, Button, Divider, Stack, Toolbar } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import { useTranslation } from 'react-i18next';

import ShareConversationCopyLInk from '@/features/share_conversation/components/ShareConversationCopyLInk';
import SidebarChatBoxMessageListContainer from '@/features/share_conversation/components/SidebarChatBoxMessageListContainer';
import AppLogo from '@/page_components/AppLogo';

const ShareChatHistory = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const { isReady, query } = router;

  const conversationId =
    'b97f88fb49c34102d73474230cf4c1d4b019c1ddb15b9e7fa97484bb';

  if (!isReady) {
    return null;
  }

  return (
    <Stack flex={1} maxHeight='100vh'>
      {/* share header */}
      <AppBar
        component={'header'}
        position={'relative'}
        sx={{
          bgcolor: 'background.paper',
          zIndex: (t) => t.zIndex.drawer + 10,
          boxShadow: (t) => (t.palette.mode === 'dark' ? 1 : 'none'),
        }}
      >
        <Toolbar
          disableGutters
          sx={{
            boxSizing: 'border-box',
            color: 'text.primary',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            maxWidth: 1312,
            mx: 'auto',
            px: 2,
            py: {
              xs: 1,
              sm: 2,
            },
          }}
        >
          <AppLogo />

          <Box flex={1} />

          <ShareConversationCopyLInk />
        </Toolbar>
        <Divider />
      </AppBar>

      {/* share conversation */}
      <SidebarChatBoxMessageListContainer
        conversationId={conversationId}
        sx={{
          maxWidth: 900,
          py: 1,
          mx: 'auto',
        }}
      />

      {/* share footer */}
      <Stack
        alignItems={'center'}
        justifyContent='center'
        py={2}
        bgcolor='background.paper'
        borderTop={`1px solid`}
        borderColor='divider'
      >
        <Button variant='contained' href='/' target='_blank'>
          {t('share_conversion:footer__start_with')}
        </Button>
      </Stack>
    </Stack>
  );
};

export default ShareChatHistory;
