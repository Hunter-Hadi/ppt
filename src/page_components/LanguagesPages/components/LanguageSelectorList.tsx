import { Grid, GridProps, RegularBreakpoints } from '@mui/material';
import { useRouter } from 'next/router';
import React, { FC, useMemo } from 'react';

import languageCodeMap from '@/i18n/types/languageCodeMap.json';
import { i18nLocales } from '@/i18n/utils';
import LanguageSwitchLink from '@/page_components/LanguageSwitchLink';

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
    } else {
      return '/';
    }
  }, [router.query]);
  return (
    <Grid container spacing={2} {...containerProps}>
      {i18nLocales.map((locale) => {
        return (
          <Grid key={locale} item md={2} xs={4} sm={4} {...itemBreakpoints}>
            <LanguageSwitchLink
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
            </LanguageSwitchLink>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default LanguageSelectorList;
