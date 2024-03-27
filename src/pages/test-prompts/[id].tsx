import { GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ParsedUrlQuery } from 'querystring';

import { IPromptCardData } from '@/features/prompt/types';
import PromptDetailPages from '@/page_components/PromptPages/PromptDetailPages';
import { PROMPT_API } from '@/utils/api';
import { objectFilterEmpty } from '@/utils/dataHelper/objectHelper';
import { webappPost } from '@/utils/request';
import { PaginatedData } from '@/utils/usePaginatedQuery';
export default PromptDetailPages;

// HACK: 临时用的
export const listApiGetAllData = async (
  listApi: (page: number, page_size: number) => Promise<PaginatedData<any>>,
  startPage = 0,
  pageSize = 100,
) => {
  const totalData: any[] = [];
  let page = startPage;
  let data = await listApi(page, pageSize);
  console.log(data.total, data.data.length);
  while (data.data.length > 0) {
    totalData.push(...data.data);
    page++;
    data = await listApi(page, pageSize);
  }
  return totalData;
};

export const getStaticPaths: GetStaticPaths = async () => {
  const list = await listApiGetAllData(
    (page, page_size) =>
      webappPost<PaginatedData<IPromptCardData>>(
        PROMPT_API.SEARCH_PROMPT,
        objectFilterEmpty({
          page,
          page_size,
        }),
      ),
    0,
  );
  const promptIds: string[] = list.map((item) => item.id);
  console.log('promptIds', promptIds.length, promptIds[0], promptIds[1]);
  // debugger
  const testBuildPromptIds = [
    '093f99337ff362a46a39d3bec58667d1af95e8b1',
    'de6e82e904df3d8cba10477fc9f844d70bdf2d74',
  ];
  return {
    paths: testBuildPromptIds.map((id) => ({
      params: {
        id,
      },
    })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context?.params?.locale?.toString() || 'en';
  const translationData = await serverSideTranslations(locale);
  try {
    const params = context.params as ParsedUrlQuery;

    const id = params?.id;
    if (!id) {
      // jump to 404
      return {
        notFound: true,
      };
    }
    return {
      props: {
        id,
        updatedAt: Date.now(),
        ...translationData,
      },
    };
  } catch (e) {
    console.log(e);
  }
  console.log('not data found', context.params?.id);
  return {
    props: {
      id: context.params?.id,
      updatedAt: Date.now(),

      ...translationData,
    },
  };
};
