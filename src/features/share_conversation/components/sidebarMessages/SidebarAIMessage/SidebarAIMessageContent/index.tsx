import React, { FC } from 'react';

import SidebarAIMessageImageContent from '@/features/share_conversation/components/sidebarMessages/SidebarAIMessage/SidebarAIMessageContent/SidebarAIMessageImageContent';
import SidebarAIMessageTextContent from '@/features/share_conversation/components/sidebarMessages/SidebarAIMessage/SidebarAIMessageContent/SidebarAIMessageTextContent';
import { IAIResponseMessage } from '@/features/share_conversation/types';

const SidebarAIMessageContent: FC<{
  AIMessage: IAIResponseMessage;
}> = (props) => {
  const { AIMessage } = props;
  const contentType =
    AIMessage?.originalMessage?.content?.contentType || 'text';
  if (contentType === 'image') {
    return <SidebarAIMessageImageContent AIMessage={AIMessage} />;
  }
  return <SidebarAIMessageTextContent AIMessage={AIMessage} />;
};
export default SidebarAIMessageContent;
