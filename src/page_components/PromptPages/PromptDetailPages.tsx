import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import AppLoadingLayout from '@/app_layout/AppLoadingLayout';
import useEffectOnce from '@/features/common/hooks/useEffectOnce';
import { objectToQueryString } from '@/features/common/utils/dataHelper/objectHelper';
import { PROMPT_LIBRARY_PROXY_BASE_PATH_TEST } from '@/global_constants';

const PromptDetailPages: FC<{
  id?: string;
  notFound?: boolean;
}> = (props) => {
  const router = useRouter();
  const { notFound, id } = props;

  useEffectOnce(() => {
    if (notFound) {
      router.push('/404');
    } else if (id) {
      const cloneQuery = { ...router.query };

      let prefixHref = PROMPT_LIBRARY_PROXY_BASE_PATH_TEST;

      if (cloneQuery.locale) {
        prefixHref += `/${cloneQuery.locale}`;
        delete cloneQuery.locale;
      }

      let queryString = '';
      if (Object.keys(cloneQuery).length > 0) {
        queryString = '?' + objectToQueryString(cloneQuery);
      }

      router.push(`${prefixHref}/library/${id}${queryString}`);
    } else {
      router.push('/');
    }
  });

  return (
    <Box height={'50vh'}>
      <AppDefaultSeoLayout />
      <AppLoadingLayout loading />
    </Box>
  );
};

export default PromptDetailPages;
