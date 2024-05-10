import { Box, Grid, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import languageCodeMap from '@/i18n/types/languageCodeMap.json';
import { i18nLocales } from '@/i18n/utils';
import LanguageSwitchLink from '@/page_components/LanguageSwitchLink';

const LanguagesPages = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const redirectUrl = useMemo(() => {
    if (router.query.redirect) {
      return router.query.redirect as string;
    } else {
      return '/';
    }
  }, [router.query]);

  return (
    <Box pt={5} pb={10}>
      <AppDefaultSeoLayout />
      <Box maxWidth={1312} mx='auto' px={4}>
        <Typography variant='h5' mb={4}>
          {t('pages:languages__title')}
        </Typography>
        <Grid container spacing={2}>
          {i18nLocales.map((locale) => {
            return (
              <Grid key={locale} item xs={4} sm={4} md={2}>
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
      </Box>
    </Box>
  );
};

export default LanguagesPages;
