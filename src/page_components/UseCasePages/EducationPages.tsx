import { useTranslation } from 'next-i18next';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import Abilities from '@/page_components/UseCasePages/components/Abilities';
import Banner from '@/page_components/UseCasePages/components/Banner';
import CommentSwiper from '@/page_components/UseCasePages/components/CommentSwiper';
import Description from '@/page_components/UseCasePages/components/Description';
import InstallInChrome from '@/page_components/UseCasePages/components/InstallInChrome';
import TakeBackTime from '@/page_components/UseCasePages/components/TakeBackTime';
// import PricingPage from '@/features/pricing/PricingPage';

const EducationPages = () => {
  const { t } = useTranslation();
  return (
    <>
      <AppDefaultSeoLayout title={'Education | MaxAI.me'} />

      <Banner
        title={t('pages:use_cases__education_page__banner__title')}
        description={t('pages:use_cases__education_page__banner__description')}
        iconPath='/assets/svg/education/1.svg'
        buttonText={t('pages:use_cases__education_page__button_text')}
      />

      <Description
        title={t('pages:use_cases__education_page__description__title')}
        content={t('pages:use_cases__education_page__description__content')}
        buttonText={t(
          'pages:use_cases__education_page__description__button_text',
        )}
      />

      <Abilities
        data={[
          {
            iconPath:
              '/assets/svg/Industries-icon/curriculum development_64px.svg',
            title: t('pages:use_cases__education_page__abilities_1__title'),
            content: t('pages:use_cases__education_page__abilities_1__content'),
          },
          {
            iconPath: '/assets/svg/Industries-icon/learning_materials_64px.svg',
            title: t('pages:use_cases__education_page__abilities_2__title'),
            content: t('pages:use_cases__education_page__abilities_2__content'),
          },
          {
            iconPath:
              '/assets/svg/Industries-icon/administrative_efficiency_64px.svg',
            title: t('pages:use_cases__education_page__abilities_3__title'),
            content: t('pages:use_cases__education_page__abilities_3__content'),
          },
        ]}
      />

      <TakeBackTime
        iconPath='/assets/svg/education/2.svg'
        title={t('pages:use_cases__education_page__take_time__title')}
        description={t('pages:use_cases__education_page__take_time__content')}
        buttonText={t(
          'pages:use_cases__education_page__take_time__button_text',
        )}
      />

      <CommentSwiper />

      <InstallInChrome />
    </>
  );
};

export default EducationPages;
