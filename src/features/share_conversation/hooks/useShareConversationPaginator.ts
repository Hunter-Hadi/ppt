import { keepPreviousData, useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import useShareConversationParameters from '@/features/share_conversation/hooks/useShareConversationParameters';
import ShareConversationService, {
  SHARE_CONVERSATION_API,
} from '@/features/share_conversation/service';
import { IChatMessage } from '@/features/share_conversation/types';

const useShareConversationPaginator = (share_id: string) => {
  const { isReady } = useRouter();

  const [shareConversationData, setShareConversationData] = useState<
    IChatMessage[]
  >([]);

  const { shareConversationParameters, updateShareConversationParameters } =
    useShareConversationParameters();

  const { page, page_size, sort } = shareConversationParameters;

  useEffect(() => {
    if (page === 0) {
      // 如果 page 重置为 0，清空数据
      setShareConversationData([]);
    }
  }, [page]);

  const useQueryResponse = useQuery({
    queryKey: [
      SHARE_CONVERSATION_API.GET_CONVERSATION_MESSAGE,
      share_id,
      page,
      page_size,
      sort,
    ],
    queryFn: async () => {
      const paginationData =
        await ShareConversationService.getConverSationMessageByShareId({
          share_id,
          page,
          page_size,
          sort,
        });
      if (paginationData?.data) {
        const total =
          (paginationData.total_page + 1) * paginationData.current_page_size;
        updateShareConversationParameters({
          total: total,
        });
        setShareConversationData((preState) => {
          // 根据 create_at 时间戳 排序
          return [...preState, ...paginationData.data].sort(
            (a, b) => dayjs(a.created_at).unix() - dayjs(b.created_at).unix(),
          );
        });
        return paginationData.data;
      } else {
        throw new Error('Network error. Please try again.');
      }
    },
    placeholderData: keepPreviousData,
    enabled: isReady,
    refetchOnWindowFocus: false,
    retry: 1,
  });

  return {
    ...useQueryResponse,
    data: shareConversationData,
  };
};

export default useShareConversationPaginator;
