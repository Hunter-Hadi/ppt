import { cloneDeep } from 'lodash-es';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { objectToQueryString } from '@/features/common/utils/dataHelper/objectHelper';
import languageCodeMap from '@/i18n/types/languageCodeMap.json';

import { removeLocaleInPathname } from '../utils';

export const useLanguages = () => {
  const router = useRouter();

  const currentLocale = useMemo(() => {
    return router.query.locale ? (router.query.locale as string) : 'en';
  }, [router.query]);

  const routerToLanguagesPagesLink = useMemo(() => {
    const targetPathname = removeLocaleInPathname(router.pathname);

    const cloneQuery = cloneDeep(router.query);

    // 默认使用当前页面的 pathname 作为 redirect
    let redirect = targetPathname;

    let href = '/languages';

    // 如果当前页面有 redirect 参数，使用当前页面的 redirect 参数
    if (cloneQuery.redirect) {
      redirect = cloneQuery.redirect.toString();
      delete cloneQuery.redirect;
    }

    // // 如果当前页面有 locale 参数，拼接到 href 前面，并且删除 locale 参数
    if (cloneQuery.locale) {
      // href = `/${cloneQuery.locale}/languages`;
      delete cloneQuery.locale;
    }

    // 如果 query 中有参数是绑定在动态路由上的，则需要替换 redirect 中的对应参数
    if (Object.keys(cloneQuery).length > 0) {
      const queryKeys = Object.keys(cloneQuery);
      queryKeys.forEach((key) => {
        const queryValue = cloneQuery[key];
        if (queryValue && redirect.includes(`[${key}]`)) {
          redirect = redirect.replace(`[${key}]`, queryValue.toString());
          delete cloneQuery[key];
        }
      });
    }

    // 如果当前页面有其他参数，拼接到 redirect 参数后
    if (Object.keys(cloneQuery).length > 0) {
      redirect = `${redirect}?${objectToQueryString(cloneQuery)}`;
    }

    return `${href}?redirect=${encodeURIComponent(redirect)}`;
  }, [router.pathname, router.query]);

  return {
    languageLabel:
      languageCodeMap[currentLocale]?.label ?? languageCodeMap['en'].label,
    currentLocale: currentLocale,
    routerToLanguagesPagesLink,
  };
};
