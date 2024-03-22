import { useRouter } from 'next/router';
import { useMemo } from 'react';

import languageCodeMap from '@/i18n/types/languageCodeMap.json';

import { fixLocalePathname } from '../utils';

export const useLanguages = () => {
  const router = useRouter();

  const currentLocale = useMemo(() => {
    return router.query.locale ? (router.query.locale as string) : 'en';
  }, [router.query]);

  const routerToLanguagesPagesLink = useMemo(() => {
    const targetPathname = fixLocalePathname(router.pathname);

    const redirect = router.query.redirect
      ? router.query.redirect.toString()
      : targetPathname;

    return `${
      router.query.locale ? `/${router.query.locale}` : ``
    }/languages?redirect=${encodeURIComponent(redirect)}`;
  }, [router.pathname, router.query]);

  return {
    languageLabel: languageCodeMap[currentLocale].label,
    currentLocale: currentLocale,
    routerToLanguagesPagesLink,
  };
};
