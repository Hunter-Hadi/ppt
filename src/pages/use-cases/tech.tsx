import { useTranslation } from 'react-i18next';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import Abilities from '@/page_components/UseCasesComponents/Abilities';
import Banner from '@/page_components/UseCasesComponents/Banner';
import CommentSwiper from '@/page_components/UseCasesComponents/CommentSwiper';
import Description from '@/page_components/UseCasesComponents/Description';
import InstallInChrome from '@/page_components/UseCasesComponents/InstallInChrome';
import TakeBackTime from '@/page_components/UseCasesComponents/TakeBackTime';

const Tech = () => {
  const { t } = useTranslation('pages');

  return (
    <>
      <AppDefaultSeoLayout title={'Tech | MaxAI.me'} />

      <Banner
        title={t('use_cases__tech_page__banner__title')}
        description={t('use_cases__tech_page__banner__description')}
        iconPath='/assets/svg/tech/1.svg'
        buttonText={t('use_cases__tech_page__button_text')}
      />

      <Description
        title={t('use_cases__tech_page__description__title')}
        content={t('use_cases__tech_page__description__content')}
        buttonText={t('use_cases__tech_page__description__button_text')}
      />

      <Abilities
        title={t('use_cases__tech_page__abilities__title')}
        data={[
          {
            iconPath: '/assets/svg/Industries-icon/1_click_64px.svg',
            title: t('use_cases__tech_page__abilities_1__title'),
            content: t('use_cases__tech_page__abilities_1__content'),
          },
          {
            iconPath: '/assets/svg/Industries-icon/ai_powered_search_64px.svg',
            title: t('use_cases__tech_page__abilities_2__title'),
            content: t('use_cases__tech_page__abilities_2__content'),
          },
          {
            iconPath: '/assets/svg/Industries-icon/ai_models_64px.svg',
            title: t('use_cases__tech_page__abilities_3__title'),
            content: t('use_cases__tech_page__abilities_3__content'),
          },
          {
            iconPath: '/assets/svg/Industries-icon/ai_writing_64px.svg',
            title: t('use_cases__tech_page__abilities_4__title'),
            content: t('use_cases__tech_page__abilities_4__content'),
          },
          {
            iconPath: '/assets/svg/Industries-icon/ai_infused_64px.svg',
            title: t('use_cases__tech_page__abilities_5__title'),
            content: t('use_cases__tech_page__abilities_5__content'),
          },
          {
            iconPath: '/assets/svg/Industries-icon/enhanced_ai-_64px.svg',
            title: t('use_cases__tech_page__abilities_6__title'),
            content: t('use_cases__tech_page__abilities_6__content'),
          },
        ]}
      />

      <TakeBackTime
        iconPath='/assets/svg/tech/2.svg'
        title={t('use_cases__tech_page__take_time__title')}
        description={t('use_cases__tech_page__take_time__content')}
        buttonText={t('use_cases__tech_page__take_time__button_text')}
      />

      <CommentSwiper />

      <InstallInChrome />
    </>
  );
};

export default Tech;
