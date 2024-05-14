import { GetStaticPathsResult, GetStaticPropsResult } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { i18nLocales } from '@/i18n/utils';

const POPULAR_LANGUAGE_LOCALE = ['en', 'zh-CN', 'fr'];

// 生成带有 i18n 数据的 getStaticProps
export function makeStaticProps() {
// makeStaticPropsResult?: () => GetStaticPropsResult<{ [key: string]: any }>,
  return async function getStaticProps(ctx) {
    const locale = ctx?.params?.locale?.toString() || 'en';
    return {
      props: {
        ...(await serverSideTranslations(locale)),
      },
      // revalidate: 86400 * 30, // 24 hours * 30
    };
  };
}

// 生成所有 i18n code 的 静态路由
export const makeStaticPaths = () => {
  return async function getStaticPaths() {
    return {
      fallback: 'blocking',
      paths: i18nLocales.map((lang) => ({
        params: {
          locale: lang,
        },
      })),
    };
  };
};

// 基于传入的 originalParams，将所有的 i18n locale 结合传入的 originalPaths 生成静态路径
export const makeI18nStaticPathsWithOriginalParams = (
  originalParams: GetStaticPathsResult,
  withPopularLanguage = false,
) => {
  const { paths: originalPaths, ...restParams } = originalParams;

  const newPaths = originalPaths
    .map((originalPath) =>
      (withPopularLanguage ? POPULAR_LANGUAGE_LOCALE : i18nLocales).map(
        (locale) => {
          if (typeof originalPath === 'string') {
            return `/${locale}/${originalPath}`;
          } else {
            return {
              params: { locale, ...originalPath.params },
            };
          }
        },
      ),
    )
    .flat();

  return {
    paths: newPaths,
    ...restParams,
    fallback: withPopularLanguage ? 'blocking' : restParams.fallback,
  };
};

// 基于传入的 locale，将原始的 GetStaticPropsResult 转换为包含 i18n 的 GetStaticPropsResult
export const makeI18nStaticPropsWithOriginalParams = async (
  locale: string,
  originalParams: GetStaticPropsResult<any>,
) => {
  const translationData = await serverSideTranslations(locale);

  if ('props' in originalParams) {
    const { props: originalProps, ...resetParams } = originalParams;

    return {
      props: {
        ...originalProps,
        ...translationData,
      },
      ...resetParams,
    };
  } else {
    return originalParams;
  }
};
