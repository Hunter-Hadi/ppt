import { useSearchParams } from 'next/navigation';

import { IPromptCardData } from '@/features/prompt/types';
import { PROMPT_API } from '@/utils/api';
import { objectFilterEmpty } from '@/utils/dataHelper/objectHelper';
import { webappPost } from '@/utils/request';
import usePaginatedQuery, { PaginatedData } from '@/utils/usePaginatedQuery';

const usePromptSearch = (defaultPageSize = 12) => {
  const searchParams = useSearchParams();
  const category = searchParams.get('category') || '';
  const use_case = searchParams.get('use_case') || '';
  const keyword = searchParams.get('keyword') || '';
  const pageSize = Number(searchParams.get('pageSize')) || defaultPageSize;
  return usePaginatedQuery(
    [PROMPT_API.SEARCH_PROMPT, category, use_case, keyword, pageSize],
    async (page, page_size) => {
      let postCategory = category ? decodeURIComponent(category) : '';
      let postUseCase = use_case ? decodeURIComponent(use_case) : '';
      if (postCategory === 'All') {
        postCategory = '';
      }
      if (postUseCase === 'All') {
        postUseCase = '';
      }
      return webappPost<PaginatedData<IPromptCardData>>(
        PROMPT_API.SEARCH_PROMPT,
        objectFilterEmpty({
          page,
          page_size,
          category: postCategory,
          use_case: postUseCase,
          keyword,
        }),
      );
    },
    {
      pageSize,
    },
  );
};
export { usePromptSearch };
