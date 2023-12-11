import { useQuery } from '@tanstack/react-query';

import { IPromptDetailData } from '@/features/prompt/types';
import { PROMPT_API } from '@/utils/api';
import { IResponseData, post } from '@/utils/request';

const usePromptDetail = (id?: string) => {
  return useQuery({
    queryKey: [PROMPT_API.GET_PROMPT_DETAIL, id],
    queryFn: async () => {
      if (!id) {
        return null;
      }
      return post<IResponseData<IPromptDetailData>>(
        PROMPT_API.GET_PROMPT_DETAIL,
        {
          id,
        },
      );
    },
  });
};
export { usePromptDetail };
