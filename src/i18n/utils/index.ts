import { PROMPT_LIBRARY_PROXY_BASE_PATH } from '@/global_constants';
import languageCodeMap from '@/packages/common/constants/languageCodeMap.json';

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

// 补全 href 中的 locale，
// 需要处理 带有 PROMPT_LIBRARY_PROXY_BASE_PATH 的情况
export const fixHrefWithLocale = (
  href: string,
  newLocale: string | undefined,
) => {
  let fixedHref = href;

  if (fixedHref.startsWith('/')) {
    if (newLocale) {
      if (fixedHref.startsWith(PROMPT_LIBRARY_PROXY_BASE_PATH)) {
        fixedHref = fixedHref.replace(
          PROMPT_LIBRARY_PROXY_BASE_PATH,
          `${PROMPT_LIBRARY_PROXY_BASE_PATH}/${newLocale}`,
        );
      } else {
        fixedHref = `/${newLocale}${fixedHref}`;
      }
    }
  }

  return fixedHref;
};
