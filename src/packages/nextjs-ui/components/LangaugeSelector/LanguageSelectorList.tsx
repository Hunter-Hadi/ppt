import { Grid, GridProps, RegularBreakpoints } from '@mui/material';
import { useRouter } from 'next/router';
import React, { FC, useMemo } from 'react';

import { i18nLocales, removeLocaleInPathname } from '@/i18n/utils';
import languageCodeMap from '@/packages/common/constants/languageCodeMap.json';
import NextJsProLink from '@/packages/nextjs-ui/components/NextJsProLink';

interface IProps {
  containerProps?: Omit<GridProps, 'container' | 'item'>;
  itemBreakpoints?: RegularBreakpoints;
}

const LanguageSelectorList: FC<IProps> = ({
  containerProps,
  itemBreakpoints,
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

  return (
    <Grid container spacing={2} {...containerProps}>
      {i18nLocales.map((locale) => {
        return (
          <Grid key={locale} item md={2} xs={4} sm={4} {...itemBreakpoints}>
            <NextJsProLink
              locale={locale}
              href={redirectUrl}
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
