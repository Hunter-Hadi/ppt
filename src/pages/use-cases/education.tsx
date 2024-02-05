import { useTranslation } from 'react-i18next';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import Abilities from '@/page_components/UseCasesComponents/Abilities';
import Banner from '@/page_components/UseCasesComponents/Banner';
import CommentSwiper from '@/page_components/UseCasesComponents/CommentSwiper';
import Description from '@/page_components/UseCasesComponents/Description';
import InstallInChrome from '@/page_components/UseCasesComponents/InstallInChrome';
import TakeBackTime from '@/page_components/UseCasesComponents/TakeBackTime';
// import PricingPage from '@/features/pricing/PricingPage';

const Education = () => {
  const { t } = useTranslation('pages');

  return (
    <>
      <AppDefaultSeoLayout title={'Education | MaxAI.me'} />

      <Banner
        title={t('use_cases__education_page__banner__title')}
        description={t('use_cases__education_page__banner__description')}
        iconPath='/assets/svg/education/1.svg'
        buttonText={t('use_cases__education_page__button_text')}
      />

      <Description
        title={t('use_cases__education_page__description__title')}
        content={t('use_cases__education_page__description__content')}
        buttonText={t('use_cases__education_page__description__button_text')}
      />

      <Abilities
        data={[
          {
            iconPath:
              '/assets/svg/Industries-icon/curriculum development_64px.svg',
            title: t('use_cases__education_page__abilities_1__title'),
            content: t('use_cases__education_page__abilities_1__content'),
          },
          {
            iconPath: '/assets/svg/Industries-icon/learning_materials_64px.svg',
            title: t('use_cases__education_page__abilities_2__title'),
            content: t('use_cases__education_page__abilities_2__content'),
          },
          {
            iconPath:
              '/assets/svg/Industries-icon/administrative_efficiency_64px.svg',
            title: t('use_cases__education_page__abilities_3__title'),
            content: t('use_cases__education_page__abilities_3__content'),
          },
        ]}
      />

      <TakeBackTime
        iconPath='/assets/svg/education/2.svg'
        title={t('use_cases__education_page__take_time__title')}
        description={t('use_cases__education_page__take_time__content')}
        buttonText={t('use_cases__education_page__take_time__button_text')}
      />

      <CommentSwiper />

      <InstallInChrome />
    </>
  );
};

export default Education;
