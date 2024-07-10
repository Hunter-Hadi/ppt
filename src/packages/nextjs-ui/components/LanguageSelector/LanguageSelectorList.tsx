import { Grid, GridProps, RegularBreakpoints } from '@mui/material';
import cloneDeep from 'lodash-es/cloneDeep';
import { useRouter } from 'next/router';
import React, { FC, useMemo } from 'react';

import { I18N_LOCALES } from '@/packages/common';
import languageCodeMap from '@/packages/common/constants/languageCodeMap.json';
import NextJsProLink from '@/packages/nextjs-ui/components/NextJsProLink';

interface IProps {
  containerProps?: Omit<GridProps, 'container' | 'item'>;
  itemBreakpoints?: RegularBreakpoints;
  basePath?: string;
}

// 为了修复类似 /[locale]/languages pathname
// 需要删除 /[locale] 前缀，返回 剩下的原始 pathname
export const removeLocaleInPathname = (pathname: string) => {
  const locale = I18N_LOCALES.find((locale) =>
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

const LanguageSelectorList: FC<IProps> = ({
  containerProps,
  itemBreakpoints,
  basePath,
}) => {
  const router = useRouter();

  const redirectUrl = useMemo(() => {
    if (router.query.redirect) {
      return router.query.redirect as string;
    } else if (router.pathname) {
      return removeLocaleInPathname(router.pathname);
    } else {
      return '/';
    }
  }, [router.query, router.pathname]);

  const newQuery = useMemo(() => {
    const cloneQuery = cloneDeep(router.query);
    if (cloneQuery.redirect) {
      delete cloneQuery.redirect;
    }
    if (cloneQuery.locale) {
      delete cloneQuery.locale;
    }
    return cloneQuery;
  }, [router.query]);

  return (
    <Grid container spacing={2} {...containerProps}>
      {I18N_LOCALES.map((locale) => {
        return (
          <Grid key={locale} item md={2} xs={4} sm={4} {...itemBreakpoints}>
            <NextJsProLink
              hardRefresh
              locale={locale}
              href={{
                pathname: (basePath ?? '') + redirectUrl,
                query: newQuery,
              }}
              underline='hover'
              sx={{
                color: 'text.primary',
                '&:hover': {
                  color: 'text.secondary',
                },
              }}
            >
              {languageCodeMap[locale].label}
            </NextJsProLink>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default LanguageSelectorList;
