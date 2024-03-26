import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import AppLoadingLayout from '@/app_layout/AppLoadingLayout';
import useEffectOnce from '@/features/common/hooks/useEffectOnce';
import { PROMPT_LIBRARY_PROXY_BASE_PATH_TEST } from '@/global_constants';

const PromptsPages = () => {
  const router = useRouter();

  useEffectOnce(() => {
    let prefixHref = PROMPT_LIBRARY_PROXY_BASE_PATH_TEST;
    if (router.query.locale) {
      prefixHref += `/${router.query.locale}`;
    }
    router.push(`${prefixHref}/library`);
  });

  return (
    <Box height={'50vh'}>
      <AppDefaultSeoLayout />
      <AppLoadingLayout loading />
    </Box>
  );
};

export default PromptsPages;
