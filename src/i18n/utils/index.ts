import languageCodeMap from '@/i18n/types/languageCodeMap.json';

export const i18nLocales = Object.keys(languageCodeMap);

// 为了修复类似 /[locale]/languages pathname
// 需要删除 /[locale] 前缀，返回 剩下的原始 pathname
export const removeLocaleInPathname = (pathname: string) => {
  const locale = i18nLocales.find((locale) =>
    pathname.startsWith(`/${locale}`),
  );
  if (locale) {
    return pathname.replace(`/${locale}`, '');
  }
  if (pathname.startsWith('/[locale]')) {
    const fixedPathname = pathname.replace('/[locale]', '');
    return fixedPathname === '' ? '/' : fixedPathname;
  }
  return pathname;
};
