import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useMemo } from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import AppLoadingLayout from '@/app_layout/AppLoadingLayout';
import useEffectOnce from '@/features/common/hooks/useEffectOnce';
import { objectToQueryString } from '@/features/common/utils/dataHelper/objectHelper';
import {
  PROMPT_LIBRARY_PROXY_BASE_PATH,
  WWW_PROJECT_LINK,
} from '@/global_constants';

const PromptsPages = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const canonicalLink = useMemo(() => {
    const locale = router.query.locale;
    let fullHref = `${WWW_PROJECT_LINK}${PROMPT_LIBRARY_PROXY_BASE_PATH}`;
    if (locale) {
      fullHref = `${fullHref}${locale ? `/${locale}` : ''}`;
    }

    return `${fullHref}/library`;
  }, [router.query.locale]);

  useEffectOnce(() => {
    const cloneQuery = { ...router.query };
    let prefixHref = PROMPT_LIBRARY_PROXY_BASE_PATH;
    if (cloneQuery.locale) {
      prefixHref += `/${cloneQuery.locale}`;
      delete cloneQuery.locale;
    }

    let queryString = '';
    if (Object.keys(cloneQuery).length > 0) {
      queryString = '?' + objectToQueryString(cloneQuery);
    }

    router.push(`${prefixHref}/library${queryString}`);
  });

  return (
    <Box height={'50vh'}>
      <AppDefaultSeoLayout
        title={t('seo:prompts__title')}
        description={t('seo:prompts__description')}
        socialImage={'https://www.maxai.me/prompts-social.png'}
        canonical={canonicalLink}
      />

      <AppLoadingLayout loading />
    </Box>
  );
};

export default PromptsPages;
