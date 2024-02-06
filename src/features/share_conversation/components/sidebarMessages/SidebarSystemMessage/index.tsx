import { FC } from 'react';

import messageWithErrorBoundary from '@/features/share_conversation/components/sidebarMessages/messageWithErrorBoundary';
import { ISystemChatMessage } from '@/features/share_conversation/types';

const BaseSidebarSystemMessage: FC<{
  message: ISystemChatMessage;
}> = (props) => {
  // system message 暂时不渲染
  return null;
};
export const SidebarSystemMessage = messageWithErrorBoundary(
  BaseSidebarSystemMessage,
);
