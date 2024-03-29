import { useRouter } from 'next/router';
import { GetStaticPaths } from 'next/types';

import {
  makeI18nStaticPathsWithOriginalParams,
  makeStaticProps,
} from '@/i18n/utils/staticHelper';
import ToolBoxDetail from '@/page_components/ToolBoxPages/components/ToolBoxDetail';
import {
  IToolUrkKeyType,
  toolBoxObjData,
} from '@/page_components/ToolBoxPages/constant';

export const getStaticPaths: GetStaticPaths = async () => {
  const toolList = Object.keys(toolBoxObjData).map((key) => key);
  return makeI18nStaticPathsWithOriginalParams({
    paths: toolList.map((toolUrlKey) => ({
      params: { urlKey: toolUrlKey },
    })),
    fallback: false,
  });
};

const UrlKeyToolBoxDetail = () => {
  const router = useRouter();
  const { urlKey } = router.query as { urlKey: IToolUrkKeyType };
  console.log('simply urlKey', urlKey);
  return <ToolBoxDetail urlKey={urlKey} />;
};
export default UrlKeyToolBoxDetail;

export const getStaticProps = makeStaticProps();
