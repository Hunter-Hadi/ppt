import { useTheme } from '@mui/material';
import React, { FC, useMemo } from 'react';

import CustomMarkdown from '@/features/share_conversation/components/CustomMarkdown';
import { IAIResponseMessage } from '@/features/share_conversation/types';
import { textHandler } from '@/features/share_conversation/utils/textHelper';

const SidebarAIMessageTextContent: FC<{
  AIMessage: IAIResponseMessage;
}> = (props) => {
  const { AIMessage } = props;
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const currentContentValue = useMemo(() => {
    let messageValue = AIMessage.text;
    if (AIMessage.originalMessage?.content?.text) {
      messageValue =
        textHandler(AIMessage.originalMessage.content.text, {
          noResponseTag: true,
          noSummaryTag: true,
        }) || AIMessage.text;
    }
    messageValue = messageValue.replace(/^\s+/, '');
    return messageValue;
  }, [AIMessage]);
  return (
    <div className={`markdown-body ${isDarkMode ? 'markdown-body-dark' : ''}`}>
      <CustomMarkdown>{currentContentValue}</CustomMarkdown>
    </div>
  );
};
export default SidebarAIMessageTextContent;
