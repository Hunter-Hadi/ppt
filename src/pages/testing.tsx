import Button from '@mui/material/Button';
import React, { FC, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import { PreferredLanguageAtom } from '@/i18n/store';
import { PROMPT_API } from '@/utils/api';
import { post } from '@/utils/request';

const TestIngPage: FC = () => {
  const { t } = useTranslation();

  const [preferredLanguage, setPreferredLanguage] = useRecoilState(
    PreferredLanguageAtom,
  );

  const handleChange = (lang: string) => {
    setPreferredLanguage(lang);
  };

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

      <p>current language: {preferredLanguage}</p>
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
