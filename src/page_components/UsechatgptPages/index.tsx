import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import HomePageContent from '@/features/landing/components/HomePageContent';

const UsechatgptPages = () => {
  const { t } = useTranslation();
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView();
      }
    }
  }, []);
  return (
    <>
      <AppDefaultSeoLayout
        title={t('seo:usechatgpt__title')}
        description={t('seo:usechatgpt__description')}
        canonical={'https://www.maxai.me/usechatgpt'}
      />
      <HomePageContent />
    </>
  );
};
export default UsechatgptPages;
