import { GetStaticPaths, GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ParsedUrlQuery } from 'querystring';
import sanitizeHtml from 'sanitize-html';
import sanitize from 'sanitize-html';

import { IPromptCardData, IPromptDetailData } from '@/features/prompt/types';
import { makeI18nStaticPathsWithOriginalParams } from '@/i18n/utils/staticHelper';
import PromptDetailPages from '@/page_components/PromptPages/PromptDetailPages';
import { PROMPT_API } from '@/utils/api';
import { objectFilterEmpty } from '@/utils/dataHelper/objectHelper';
import { IResponseData, webappPost } from '@/utils/request';
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
  return makeI18nStaticPathsWithOriginalParams({
    paths: promptIds.map((id) => ({
      params: {
        id,
      },
    })),
    fallback: false,
  });
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
    const result = await webappPost<IResponseData<IPromptDetailData>>(
      PROMPT_API.GET_PROMPT_DETAIL,
      { id },
    );
    if (result.data && result.data.prompt_title) {
      const promptDetail = result.data;
      promptDetail.prompt_template = sanitizeHtml(
        promptDetail.prompt_template,
        {
          allowedTags: [],
          allowedAttributes: false,
          nonBooleanAttributes: [],
          disallowedTagsMode: 'recursiveEscape',
        } as sanitize.IOptions,
      );
      console.log(JSON.stringify(promptDetail));

      return {
        props: {
          seo: {
            title: `Prompt "${promptDetail.prompt_title}" | MaxAI.me`,
            description: promptDetail.teaser,
          },
          id,
          defaultPromptDetail: promptDetail,
          updatedAt: Date.now(),

          ...translationData,
        },
      };
    }
  } catch (e) {
    console.log(e);
  }
  console.log('not data found', context.params?.id);
  return {
    props: {
      id: context.params?.id,
      defaultPromptDetail: null,
      seo: {
        title: 'Prompt | MaxAI.me',
        description:
          'Complete your everyday tasks with Prompt Management and 1-Click Prompts in minutes that used to take hours.',
      },
      updatedAt: Date.now(),

      ...translationData,
    },
  };
};
