import React, { useEffect } from 'react';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import HomePageContent from '@/page_components/LandingPage/HomePageContent';

const UsechatgptPage = () => {
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
    <AppContainer sx={{ bgcolor: '#fff' }}>
      <AppDefaultSeoLayout
        title={'UseChatGPT.AI: Use AI Anywhere (ChatGPT, Bard, Bing, Claude)'}
        description={
          'The fastest way to use AI anywhere online. One click to compose, improve writing, summarize, explain, fix spelling & grammar, change tone, translate, or reply to any text.'
        }
        canonical={'https://www.maxai.me/usechatgpt'}
      />
      <HomePageContent showLogo={false} />
    </AppContainer>
  );
};
export default UsechatgptPage;
