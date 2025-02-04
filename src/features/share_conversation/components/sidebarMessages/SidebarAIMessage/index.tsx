import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { SxProps, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React, { FC, useMemo } from 'react';

import { ContextMenuIcon } from '@/features/share_conversation/components/ContextMenuIcon';
import CustomMarkdown from '@/features/share_conversation/components/CustomMarkdown';
import {
  CaptivePortalIcon,
  ReadIcon,
} from '@/features/share_conversation/components/SearchWithAIIcons';
import messageWithErrorBoundary from '@/features/share_conversation/components/sidebarMessages/messageWithErrorBoundary';
import SidebarAIMessageContent from '@/features/share_conversation/components/sidebarMessages/SidebarAIMessage/SidebarAIMessageContent';
import SidebarAIMessageSkeletonContent from '@/features/share_conversation/components/sidebarMessages/SidebarAIMessage/SidebarAIMessageContent/SidebarAIMessageSkeletonContent';
import SidebarAIMessageCopilotStep from '@/features/share_conversation/components/sidebarMessages/SidebarAIMessage/SidebarAIMessageCopilotStep';
import SidebarAIMessageSourceLinks from '@/features/share_conversation/components/sidebarMessages/SidebarAIMessage/SidebarAIMessageSourceLinks';
import SidebarAIMessageTools from '@/features/share_conversation/components/sidebarMessages/SidebarAIMessage/SidebarAIMessageTools';
import {
  IAIResponseMessage,
  IAIResponseOriginalMessageMetadataTitle,
} from '@/features/share_conversation/types';
import { textHandler } from '@/features/share_conversation/utils/textHelper';

interface IProps {
  message: IAIResponseMessage;
  isDarkMode?: boolean;
  liteMode?: boolean;
  loading?: boolean;
}

const BaseSidebarAIMessage: FC<IProps> = (props) => {
  const { message, liteMode = false, loading = false } = props;
  const theme = useTheme();
  const isDarkMode = theme.palette.mode === 'dark';
  const isRichAIMessage = message.originalMessage !== undefined && !liteMode;
  const renderData = useMemo(() => {
    try {
      const currentRenderData = {
        title: message.originalMessage?.metadata?.title,
        copilot: message.originalMessage?.metadata?.copilot,
        sources: message.originalMessage?.metadata?.sources,
        sourcesLoading:
          message.originalMessage?.metadata?.sources?.status === 'loading',
        sourcesHasContent: false,
        answer: message.text,
        content: message.originalMessage?.content,
        messageIsComplete: message.originalMessage?.metadata?.isComplete,
        deepDive: message.originalMessage?.metadata?.deepDive,
      };
      if (Object.keys(currentRenderData?.sources || {}).length > 1) {
        currentRenderData.sourcesHasContent = true;
      }
      if (message.originalMessage?.content?.text) {
        currentRenderData.answer =
          textHandler(message.originalMessage.content.text, {
            noResponseTag: true,
            noSummaryTag: true,
          }) || message.text;
      }
      currentRenderData.answer = currentRenderData.answer.replace(/^\s+/, '');
      return currentRenderData;
    } catch (e) {
      return {
        title: undefined,
        copilot: undefined,
        sources: undefined,
        sourcesLoading: false,
        sourcesHasContent: false,
        answer: message.text,
        content: undefined,
        messageIsComplete: false,
        deepDive: undefined,
      };
    }
  }, [message]);
  const memoSx = useMemo(() => {
    return {
      whiteSpace: 'pre-wrap',
      width: '100%',
      p: 1,
      gap: 1,
      wordBreak: 'break-word',
      borderRadius: '8px',
      borderBottomLeftRadius: 0,
      color: 'text.primary',
      // border: '1px solid',
      // borderColor: isDarkMode ? 'customColor.borderColor' : 'transparent',
      bgcolor: 'customColor.secondaryBackground',
      boxSizing: 'border-box',
    } as SxProps;
  }, []);
  const isWaitFirstAIResponseText = useMemo(() => {
    return !renderData.answer;
  }, [renderData.answer]);

  const coverLoading = useMemo(() => {
    // 如果是 rich ai message，需要判断 messageIsComplete
    if (isRichAIMessage) {
      return !renderData.messageIsComplete || loading;
    }
    return loading;
  }, [loading, renderData.messageIsComplete, isRichAIMessage]);

  return (
    <Stack className={'chat-message--text'} sx={{ ...memoSx }}>
      {isRichAIMessage ? (
        <Stack spacing={2}>
          {renderData.title && (
            <MetadataTitleRender
              title={renderData.title}
              fontSx={{
                fontWeight: 'bold',
                fontSize: '28px',
                color: 'text.primary',
              }}
            />
          )}
          {renderData.copilot && (
            <Stack spacing={1}>
              {renderData.copilot?.title && (
                <MetadataTitleRender title={renderData.copilot.title} />
              )}
              <Stack spacing={1}>
                {renderData.copilot.steps.map((copilotStep) => {
                  return (
                    <SidebarAIMessageCopilotStep
                      messageIsComplete={renderData.messageIsComplete}
                      copilot={copilotStep}
                      key={copilotStep.title}
                    />
                  );
                })}
              </Stack>
            </Stack>
          )}
          {renderData.sources && renderData.sourcesHasContent && (
            <Stack spacing={1}>
              <Stack direction={'row'} alignItems='center' spacing={1}>
                {renderData.sourcesLoading && !renderData.messageIsComplete ? (
                  <CircularProgress size={18} />
                ) : (
                  <CaptivePortalIcon
                    sx={{
                      color: 'primary.main',
                      fontSize: 20,
                    }}
                  />
                )}
                <Typography
                  sx={{
                    color: 'primary.main',
                    fontSize: 18,
                  }}
                >
                  Sources
                </Typography>
              </Stack>
              <SidebarAIMessageSourceLinks
                sourceLinks={renderData.sources.links || []}
                loading={renderData.sourcesLoading}
              />
            </Stack>
          )}
          {renderData.content && (
            <Stack>
              {!renderData.messageIsComplete ? (
                <Stack direction={'row'} alignItems='center' spacing={1}>
                  <CircularProgress size={18} />
                  <Typography
                    sx={{
                      color: 'primary.main',
                      fontSize: 18,
                      lineHeight: '20px',
                    }}
                  >
                    {renderData.content.contentType === 'text' && 'Writing'}
                    {renderData.content.contentType === 'image' &&
                      'Creating image'}
                  </Typography>
                </Stack>
              ) : (
                <Stack direction={'row'} alignItems='center' spacing={1}>
                  {renderData.content.title?.titleIcon ? (
                    <Stack
                      alignItems={'center'}
                      justifyContent={'center'}
                      width={16}
                      height={16}
                    >
                      <ContextMenuIcon
                        sx={{
                          color: 'primary.main',
                          fontSize:
                            renderData.content.title?.titleIconSize || 18,
                        }}
                        icon={renderData.content.title?.titleIcon}
                      />
                    </Stack>
                  ) : (
                    <ReadIcon
                      sx={{
                        color: 'primary.main',
                        fontSize: 20,
                      }}
                    />
                  )}
                  <Typography
                    sx={{
                      color: 'primary.main',
                      fontSize: 18,
                      lineHeight: '20px',
                    }}
                  >
                    {renderData.content.title?.title || 'Answer'}
                  </Typography>
                </Stack>
              )}
              {isWaitFirstAIResponseText && !renderData.messageIsComplete ? (
                <SidebarAIMessageSkeletonContent
                  contentType={renderData.content.contentType}
                />
              ) : (
                <SidebarAIMessageContent AIMessage={message} />
              )}
            </Stack>
          )}
          {renderData.deepDive && (
            <Stack spacing={1}>
              {renderData.deepDive.title && (
                <MetadataTitleRender title={renderData.deepDive.title} />
              )}
              <div
                className={`markdown-body ${
                  isDarkMode ? 'markdown-body-dark' : ''
                }`}
              >
                <CustomMarkdown>{renderData.deepDive.value}</CustomMarkdown>
              </div>
            </Stack>
          )}
        </Stack>
      ) : (
        <div
          className={`markdown-body ${isDarkMode ? 'markdown-body-dark' : ''}`}
        >
          <CustomMarkdown>{renderData.answer}</CustomMarkdown>
        </div>
      )}
      {!coverLoading ? (
        <SidebarAIMessageTools message={message as IAIResponseMessage} />
      ) : (
        <Box />
      )}
    </Stack>
  );
};
const MetadataTitleRender: FC<{
  title: IAIResponseOriginalMessageMetadataTitle;
  fontSx?: SxProps;
}> = (props) => {
  const { fontSx } = props;
  const { title, titleIcon, titleIconSize } = props.title;
  return (
    <Stack direction={'row'} alignItems='center' spacing={1}>
      {titleIcon && (
        <Stack
          alignItems={'center'}
          justifyContent={'center'}
          width={16}
          height={16}
        >
          <ContextMenuIcon
            sx={{
              color: 'primary.main',
              fontSize: titleIconSize || 18,
            }}
            icon={titleIcon}
          />
        </Stack>
      )}
      <Typography
        sx={{
          color: 'primary.main',
          fontSize: 18,
          ...fontSx,
        }}
      >
        {title}
      </Typography>
    </Stack>
  );
};
export const SidebarAIMessage = messageWithErrorBoundary(BaseSidebarAIMessage);
