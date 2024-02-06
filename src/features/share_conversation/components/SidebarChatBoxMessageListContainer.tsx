import Box from '@mui/material/Box';
import { SxProps } from '@mui/material/styles';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useMemo, useRef } from 'react';

import AppLoadingLayout from '@/app_layout/AppLoadingLayout';
import Custom404 from '@/components/Custom404';
import SidebarChatBoxMessageItem from '@/features/share_conversation/components/SidebarChatBoxMessageItem';
import useMessageListPaginator from '@/features/share_conversation/hooks/useMessageListPaginator';
import useShareConversationPaginator from '@/features/share_conversation/hooks/useShareConversationPaginator';

import useShareConversationParameters from '../hooks/useShareConversationParameters';
export const messageListContainerId = 'message-list-scroll-container';

interface IProps {
  conversationId: string;
  sx?: SxProps;
}

const SidebarChatBoxMessageListContainer: FC<IProps> = (props) => {
  const { conversationId, sx } = props;

  const { isReady } = useRouter();

  const scrollContainerRef = useRef<HTMLElement | null>(null);

  // 用于判断 当前触发的 effect 时是否需要滚动到底部
  const needScrollToBottomRef = useRef(true);

  // const [messageItemIsReady, setMessageItemIsReady] = React.useState(false)

  const { isLoading, isFetching, data, error } =
    useShareConversationPaginator(conversationId);

  const { shareConversationParameters } = useShareConversationParameters();

  const { page_size } = shareConversationParameters;

  const dataIsReady = useMemo(() => isReady && !!data?.length, [isReady, data]);

  const { slicedMessageList } = useMessageListPaginator(
    !!(dataIsReady && conversationId && !isFetching),
    scrollContainerRef,
    data || [],
    {
      pageSize: page_size,
      buffer: 1,
    },
  );

  console.log(`slicedMessageList`, data);

  const loading = useMemo(
    () => isLoading || isFetching,
    [isLoading, isFetching],
  );

  const isError = useMemo(() => {
    return !!error;
  }, [error]);

  const handleScrollToBottom = (force = false) => {
    const containerElement = scrollContainerRef.current;
    if (force) {
      needScrollToBottomRef.current = true;
    }
    if (needScrollToBottomRef.current && containerElement) {
      containerElement.scrollTo(0, containerElement.scrollHeight);
    }
  };

  useEffect(() => {
    if (!loading && isReady && data?.length) {
      handleScrollToBottom();
      needScrollToBottomRef.current = false;
    }
  }, [isReady, loading, data]);

  return (
    <Box
      ref={scrollContainerRef}
      id={messageListContainerId}
      sx={{
        flex: 1,
        height: 0,
        overflowY: 'auto',
        fontFamily: 'Roboto, Helvetica, Arial, sans-serif',
        ...sx,
      }}
    >
      {/* <Box position={'fixed'} left={16}>
        <h4>page: {shareConversationParameters.page}</h4>
        <h4>total: {shareConversationParameters.total}</h4>
        <h4>isLoading: {`${isLoading}`}</h4>
        <h4>isFetching: {`${isFetching}`}</h4>
      </Box> */}
      {isError && <Custom404 />}

      {loading && <AppLoadingLayout loading />}
      {slicedMessageList &&
        slicedMessageList.map((message, index) => {
          return (
            <SidebarChatBoxMessageItem
              key={message.messageId + '_sidebar_chat_message_' + String(index)}
              className={`use-chat-gpt-ai__message-item use-chat-gpt-ai__message-item--${message.type}`}
              message={message}
              loading={false}
              order={index + 1}
            />
          );
        })}
    </Box>
  );
};

export default SidebarChatBoxMessageListContainer;
