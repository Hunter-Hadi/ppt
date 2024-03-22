import { GetStaticPathsResult } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { i18nLocales } from '@/i18n/utils';

export function makeStaticProps() {
  return async function getStaticProps(ctx) {
    const locale = ctx?.params?.locale?.toString() || 'en';

    return {
      props: {
        ...(await serverSideTranslations(locale)),
      },
      revalidate: 86400, // 24 hours
    };
  };
}

export const makeStaticPaths = () => {
  return async function getStaticPaths() {
    const popularLanguages = ['en'];
    return {
      fallback: 'blocking',
      paths: popularLanguages.map((lang) => ({
        params: {
          locale: lang,
        },
      })),
    };
  };
};

export const makeI18nStaticPathsWithOriginalParams = (
  originalParams: GetStaticPathsResult,
) => {
  const { paths: originalPaths, ...restParams } = originalParams;
  const newPaths = originalPaths
    .map((originalPath) =>
      i18nLocales.map((locale) => {
        if (typeof originalPath === 'string') {
          return `/${locale}/${originalPath}`;
        } else {
          return {
            params: { locale, ...originalPath.params },
          };
        }
      }),
    )
    .flat();

  return {
    paths: newPaths,
    ...restParams,
  };
};
