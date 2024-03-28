import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import AppLoadingLayout from '@/app_layout/AppLoadingLayout';
import useEffectOnce from '@/features/common/hooks/useEffectOnce';
import { objectToQueryString } from '@/features/common/utils/dataHelper/objectHelper';
import { PROMPT_LIBRARY_PROXY_BASE_PATH } from '@/global_constants';

const PromptsPages = () => {
  const router = useRouter();

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
      <AppDefaultSeoLayout />
      <AppLoadingLayout loading />
    </Box>
  );
};

export default PromptsPages;
