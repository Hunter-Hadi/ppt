import Stack from '@mui/material/Stack';
import React, { FC } from 'react';

import CopyTooltipIconButton from '@/features/share_conversation/components/CopyTooltipIconButton';
import { IUserChatMessage } from '@/features/share_conversation/types';
import { formatChatMessageContent } from '@/features/share_conversation/utils/chatMessagesHelper';

const SidebarChatBoxUserTools: FC<{
  message: IUserChatMessage;
}> = (props) => {
  const { message } = props;
  const currentMessageText = formatChatMessageContent(message);
  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      width={'100%'}
      justifyContent={'flex-end'}
    >
      <CopyTooltipIconButton copyText={currentMessageText} />
    </Stack>
  );
};
export default SidebarChatBoxUserTools;
