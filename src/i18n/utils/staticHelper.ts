import { GetStaticPathsResult } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { i18nLocales } from '@/i18n/utils';

const POPULAR_LANGUAGE_LOCALE = ['en', 'zh-CN', 'fr'];

export function makeStaticProps() {
  return async function getStaticProps(ctx) {
    const locale = ctx?.params?.locale?.toString() || 'en';

    return {
      props: {
        ...(await serverSideTranslations(locale)),
      },
      // revalidate: 86400, // 24 hours
    };
  };
}

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
