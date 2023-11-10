import Button from '@mui/material/Button';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { FC, useEffect } from 'react';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import { PROMPT_API } from '@/utils/api';
import { post } from '@/utils/request';

const TestIngPage: FC = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();

  const handleChange = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    i18n.changeLanguage(newLocale);
    router.push({ pathname, query }, asPath, { locale: newLocale });
  };

  console.log(`i18n`, i18n);

  const [data, setData] = React.useState<any>(null);

  useEffect(() => {
    post(PROMPT_API.SEARCH_PROMPT, {
      page: 0,
      page_size: 12,
    }).then((res) => {
      setData(res);
    });
  }, []);

  return (
    <AppContainer sx={{ wordBreak: 'break-word', py: 4 }}>
      <AppDefaultSeoLayout title={'Testing | MaxAI.me'} />

      <p>current language: {i18n.language}</p>
      <h1>common:test : {t('common:test')}</h1>
      <h1>page:test1 : {t('page:test1')}</h1>
      <h1>page:test2 : {t('page:test2')}</h1>

      <Button
        onClick={() => {
          handleChange('en');
        }}
      >
        to be en
      </Button>
      <Button
        onClick={() => {
          handleChange('zh_CN');
        }}
      >
        to be zh
      </Button>

      <p>data: {JSON.stringify(data)}</p>
    </AppContainer>
  );
};

export default TestIngPage;

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale)),
    },
  };
}
