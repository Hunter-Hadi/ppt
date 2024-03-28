import {
  AppBar,
  Box,
  Divider,
  Stack,
  ThemeProvider,
  Toolbar,
} from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import ShareConversationCopyLInk from '@/features/share_conversation/components/ShareConversationCopyLInk';
import SidebarChatBoxMessageListContainer from '@/features/share_conversation/components/SidebarChatBoxMessageListContainer';
import { SHARE_CONVERSATION_MIN_WIDTH } from '@/features/share_conversation/constants';
import ConversationCustomTheme from '@/features/share_conversation/utils/ConversationCustomTheme';
import AppLogo from '@/page_components/AppLogo';
import CTAInstallButton from '@/page_components/CTAInstallButton';

interface IProps {
  conversationId: string;
}

const ShareChatHistoryPages: FC<IProps> = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const { isReady, query } = router;

  const conversationId = query.id as string;
  // const { conversationId } = props;

  if (!isReady) {
    return null;
  }

  return (
    <ThemeProvider theme={ConversationCustomTheme}>
      <AppDefaultSeoLayout title={'Share Conversation | MaxAI.me'} />
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
            maxWidth: SHARE_CONVERSATION_MIN_WIDTH,
            width: '100%',
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
          <CTAInstallButton
            variant='contained'
            iconSize={0}
            text={t('share_conversion:footer__get_for_free')}
            sx={{
              px: 2,
              py: 1,
              minHeight: 'unset',
              height: 'max-content',
            }}
            trackerLinkProps={{
              pathnameRefEnable: false,
              queryRefEnable: false,
              defaultRef: 'share-link',
            }}
          />
        </Stack>
      </Stack>
    </ThemeProvider>
  );
};

export default ShareChatHistoryPages;
