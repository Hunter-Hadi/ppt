import { useRouter } from 'next/router';
import { GetStaticPaths, GetStaticProps } from 'next/types';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ParsedUrlQuery } from 'querystring';

import { makeI18nStaticPathsWithOriginalParams } from '@/i18n/utils/staticHelper';
import ToolsDetail from '@/page_components/ToolsPages/components/ToolsDetail';
import {
  IToolUrkKeyType,
  toolsObjectData,
} from '@/page_components/ToolsPages/constant';

export const getStaticPaths: GetStaticPaths = async () => {
  const toolList = Object.keys(toolsObjectData).map((key) => key);
  return makeI18nStaticPathsWithOriginalParams({
    paths: toolList.map((toolUrlKey) => ({
      params: { urlKey: toolUrlKey },
    })),
    fallback: false,
  });
};
const UrlKeyToolsDetail = () => {
  const router = useRouter();
  const { urlKey } = router.query as { urlKey: IToolUrkKeyType };
  return <ToolsDetail urlKey={urlKey} />;
};
export default UrlKeyToolsDetail;

export const getStaticProps: GetStaticProps = async (context) => {
  const locale = context?.params?.locale?.toString() || 'en';
  const translationData = await serverSideTranslations(locale);
  const { urlKey } = context?.params as ParsedUrlQuery;

  try {
    console.log('simply context 1', context);
    if (!urlKey) {
      // jump to 404
      return {
        notFound: true,
      };
    }
    return {
      props: {
        urlKey,
        updatedAt: Date.now(),
        ...translationData,
      },
    };
  } catch (e) {
    console.log(e);
    return {
      props: {
        urlKey,
        updatedAt: Date.now(),
        ...translationData,
      },
    };
  }
};
