import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import { SxProps } from '@mui/material/styles';
import React, { FC, useMemo } from 'react';

import ChatIconFileList from '@/features/share_conversation/components/ChatIconFileUpload/ChatIconFileList';
import messageWithErrorBoundary from '@/features/share_conversation/components/sidebarMessages/messageWithErrorBoundary';
import SidebarChatBoxUserTools from '@/features/share_conversation/components/sidebarMessages/SidebarUserMessage/SidebarChatBoxUserTools';
import {
  IChatUploadFile,
  IUserChatMessage,
} from '@/features/share_conversation/types';
import { formatChatMessageContent } from '@/features/share_conversation/utils/chatMessagesHelper';

const BaseSidebarUserMessage: FC<{
  message: IUserChatMessage;
  order?: number;
}> = (props) => {
  const { message, order } = props;
  const memoSx = useMemo(() => {
    return {
      whiteSpace: 'pre-wrap',
      p: 1,
      gap: 1,
      wordBreak: 'break-word',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      bgcolor: 'rgba(144, 101, 176, 0.16)',
      // border: '1px solid',
      // borderColor: isDarkMode ? 'customColor.borderColor' : 'transparent',
      color: 'text.primary',
      maxWidth: '100%',
      width: 'auto',
      borderRadius: '8px',
      borderBottomRightRadius: 0,
      flexWrap: 'wrap',
      ml: 'auto',
      mr: '0',
      overflow: 'hidden',
    } as SxProps;
  }, [message]);
  const renderData = useMemo(() => {
    let attachments: IChatUploadFile[] = [];
    if (message.type === 'user') {
      attachments = (message as IUserChatMessage)?.meta?.attachments || [];
      if (attachments && attachments.length) {
        attachments = attachments.filter(
          (item) => item.uploadStatus === 'success',
        );
      }
    }
    return {
      attachments,
      messageText: formatChatMessageContent(message),
    };
  }, [message]);

  const showDivider = useMemo(() => {
    return !message.meta?.includeHistory && order !== 1;
  }, [message, order]);

  return (
    <>
      {showDivider && <Divider sx={{ mb: 2 }} />}

      <Stack
        className={'chat-message--text'}
        sx={{
          ...memoSx,
        }}
      >
        {renderData.attachments.length > 0 && (
          <ChatIconFileList
            size={'small'}
            direction={'row'}
            disabledRemove
            sx={{ mb: 1 }}
            files={renderData.attachments}
          />
        )}
        {renderData.messageText}
        <SidebarChatBoxUserTools message={message} />
      </Stack>
    </>
  );
};

export const SidebarUserMessage = messageWithErrorBoundary(
  BaseSidebarUserMessage,
);
