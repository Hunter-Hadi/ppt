import { useTranslation } from 'next-i18next';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import Abilities from '@/page_components/UseCasePages/components/Abilities';
import Banner from '@/page_components/UseCasePages/components/Banner';
import CommentSwiper from '@/page_components/UseCasePages/components/CommentSwiper';
import Description from '@/page_components/UseCasePages/components/Description';
import InstallInChrome from '@/page_components/UseCasePages/components/InstallInChrome';
import TakeBackTime from '@/page_components/UseCasePages/components/TakeBackTime';
// import PricingPage from '@/features/pricing/PricingPage';

const ExecutivesPages = () => {
  const { t } = useTranslation();

  return (
    <>
      <AppDefaultSeoLayout title={'Executives | MaxAI.me'} />

      <Banner
        title={t('pages:use_cases__executives_page__banner__title')}
        description={t('pages:use_cases__executives_page__banner__description')}
        iconPath='/assets/svg/executives/1.svg'
        buttonText={t('pages:use_cases__executives_page__button_text')}
      />

      <Description
        title={t('pages:use_cases__executives_page__description__title')}
        content={t('pages:use_cases__executives_page__description__content')}
        buttonText={t(
          'pages:use_cases__executives_page__description__button_text',
        )}
      />

      <Abilities
        title={t('pages:use_cases__executives_page__abilities__title')}
        data={[
          {
            iconPath: '/assets/svg/Industries-icon/1_click_64px.svg',
            title: t('pages:use_cases__executives_page__abilities_1__title'),
            content: t(
              'pages:use_cases__executives_page__abilities_1__content',
            ),
          },
          {
            iconPath: '/assets/svg/Industries-icon/ai_powered_search_64px.svg',
            title: t('pages:use_cases__executives_page__abilities_2__title'),
            content: t(
              'pages:use_cases__executives_page__abilities_2__content',
            ),
          },
          {
            iconPath: '/assets/svg/Industries-icon/ai_models_64px.svg',
            title: t('pages:use_cases__executives_page__abilities_3__title'),
            content: t(
              'pages:use_cases__executives_page__abilities_3__content',
            ),
          },
          {
            iconPath: '/assets/svg/Industries-icon/ai_writing_64px.svg',
            title: t('pages:use_cases__executives_page__abilities_4__title'),
            content: t(
              'pages:use_cases__executives_page__abilities_4__content',
            ),
          },
          {
            iconPath: '/assets/svg/Industries-icon/ai_infused_64px.svg',
            title: t('pages:use_cases__executives_page__abilities_5__title'),
            content: t(
              'pages:use_cases__executives_page__abilities_5__content',
            ),
          },
          {
            iconPath: '/assets/svg/Industries-icon/enhanced_ai-_64px.svg',
            title: t('pages:use_cases__executives_page__abilities_6__title'),
            content: t(
              'pages:use_cases__executives_page__abilities_6__content',
            ),
          },
        ]}
      />

      <TakeBackTime
        iconPath='/assets/svg/executives/2.svg'
        title={t('pages:use_cases__executives_page__take_time__title')}
        description={t('pages:use_cases__executives_page__take_time__content')}
        buttonText={t(
          'pages:use_cases__executives_page__take_time__button_text',
        )}
      />

      <CommentSwiper />

      <InstallInChrome />
    </>
  );
};

export default ExecutivesPages;
