import { Box } from '@mui/material';
import { useRouter } from 'next/router';
import React, { FC, useMemo } from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import AppLoadingLayout from '@/app_layout/AppLoadingLayout';
import useEffectOnce from '@/features/common/hooks/useEffectOnce';
import { objectToQueryString } from '@/features/common/utils/dataHelper/objectHelper';
import {
  PROMPT_LIBRARY_PROXY_BASE_PATH,
  WWW_PROJECT_LINK,
} from '@/global_constants';

const PromptDetailPages: FC<{
  id?: string;
  notFound?: boolean;
}> = (props) => {
  const router = useRouter();
  const { notFound, id } = props;

  const canonicalLink = useMemo(() => {
    const locale = router.query.locale;
    let fullHref = `${WWW_PROJECT_LINK}${PROMPT_LIBRARY_PROXY_BASE_PATH}`;
    if (locale) {
      fullHref = `${fullHref}${locale ? `/${locale}` : ''}`;
    }

    return `${fullHref}/library`;
  }, [router.query.locale]);

  useEffectOnce(() => {
    if (notFound) {
      router.push('/404');
    } else if (id) {
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

      router.push(`${prefixHref}/library/${id}${queryString}`);
    } else {
      router.push('/');
    }
  });

  return (
    <Box height={'50vh'}>
      <AppDefaultSeoLayout
        title='Prompts | MaxAI.me'
        description={
          'Complete your everyday tasks with Prompt Management and 1-Click Prompts in minutes that used to take hours.'
        }
        socialImage={'https://www.maxai.me/prompts-social.png'}
        canonical={canonicalLink}
      />
      <AppLoadingLayout
        loading
        sx={{
          height: '50vh',
        }}
      />
    </Box>
  );
};

export default PromptDetailPages;
