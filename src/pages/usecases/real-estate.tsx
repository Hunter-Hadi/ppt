import { useTranslation } from 'react-i18next';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';

import Abilities from './components/Abilities';
import Banner from './components/Banner';
import CommentSwiper from './components/CommentSwiper';
import Description from './components/Description';
import InstallInChrome from './components/InstallInChrome';
import TakeBackTime from './components/TakeBackTime';

const RealEstate = () => {
  const { t } = useTranslation('pages');

  return (
    <>
      <AppDefaultSeoLayout title={'Real-estate | MaxAI.me'} />

      <Banner
        title={t('use_cases__real_estate_page__banner__title')}
        description={t('use_cases__real_estate_page__banner__description')}
        iconPath='/assets/svg/real-estate/1.svg'
        buttonText={t('use_cases__real_estate_page__button_text')}
      />

      <Description
        title={t('use_cases__real_estate_page__description__title')}
        content={t('use_cases__real_estate_page__description__content')}
        buttonText={t('use_cases__real_estate_page__description__button_text')}
      />

      <Abilities
        title={t('use_cases__real_estate_page__abilities__title')}
        data={[
          {
            iconPath: '/assets/svg/Industries-icon/1_click_64px.svg',
            title: t('use_cases__real_estate_page__abilities_1__title'),
            content: t('use_cases__real_estate_page__abilities_1__content'),
          },
          {
            iconPath: '/assets/svg/Industries-icon/ai_powered_search_64px.svg',
            title: t('use_cases__real_estate_page__abilities_2__title'),
            content: t('use_cases__real_estate_page__abilities_2__content'),
          },
          {
            iconPath: '/assets/svg/Industries-icon/ai_writing_64px.svg',
            title: t('use_cases__real_estate_page__abilities_3__title'),
            content: t('use_cases__real_estate_page__abilities_3__content'),
          },
          {
            iconPath: '/assets/svg/Industries-icon/ai_infused_64px.svg',
            title: t('use_cases__real_estate_page__abilities_4__title'),
            content: t('use_cases__real_estate_page__abilities_4__content'),
          },
          {
            iconPath: '/assets/svg/Industries-icon/enhanced_ai-_64px.svg',
            title: t('use_cases__real_estate_page__abilities_5__title'),
            content: t('use_cases__real_estate_page__abilities_5__content'),
          },
        ]}
      />

      <TakeBackTime
        iconPath='/assets/svg/real-estate/2.svg'
        title={t('use_cases__real_estate_page__take_time__title')}
        description={t('use_cases__real_estate_page__take_time__content')}
        buttonText={t('use_cases__real_estate_page__take_time__button_text')}
      />

      <CommentSwiper />

      <InstallInChrome />
    </>
  );
};

export default RealEstate;
