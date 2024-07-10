import { useTranslation } from 'next-i18next'
import React from 'react'

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout'
import Abilities from '@/page_components/IndustriesPages/components/Abilities'
import Banner from '@/page_components/IndustriesPages/components/Banner'
import CommentSwiper from '@/page_components/IndustriesPages/components/CommentSwiper'
import Description from '@/page_components/IndustriesPages/components/Description'
import InstallInChrome from '@/page_components/IndustriesPages/components/InstallInChrome'
import TakeBackTime from '@/page_components/IndustriesPages/components/TakeBackTime'
// import PricingPage from '@/features/pricing/PricingPage';

const EducationPages = () => {
  const { t } = useTranslation()
  return (
    <>
      <AppDefaultSeoLayout title={t('seo:industries__education__title')} />

      <Banner
        title={t('pages:industries__education_page__banner__title')}
        description={t('pages:industries__education_page__banner__description')}
        iconPath='/assets/svg/education/1.svg'
        buttonText={t('pages:industries__education_page__button_text')}
      />

      <Description
        title={t('pages:industries__education_page__description__title')}
        content={t('pages:industries__education_page__description__content')}
        buttonText={t(
          'pages:industries__education_page__description__button_text',
        )}
      />

      <Abilities
        data={[
          {
            iconPath:
              '/assets/svg/Industries-icon/curriculum development_64px.svg',
            title: t('pages:industries__education_page__abilities_1__title'),
            content: t(
              'pages:industries__education_page__abilities_1__content',
            ),
          },
          {
            iconPath: '/assets/svg/Industries-icon/learning_materials_64px.svg',
            title: t('pages:industries__education_page__abilities_2__title'),
            content: t(
              'pages:industries__education_page__abilities_2__content',
            ),
          },
          {
            iconPath:
              '/assets/svg/Industries-icon/administrative_efficiency_64px.svg',
            title: t('pages:industries__education_page__abilities_3__title'),
            content: t(
              'pages:industries__education_page__abilities_3__content',
            ),
          },
        ]}
      />

      <TakeBackTime
        iconPath='/assets/svg/education/2.svg'
        title={t('pages:industries__education_page__take_time__title')}
        description={t('pages:industries__education_page__take_time__content')}
        buttonText={t(
          'pages:industries__education_page__take_time__button_text',
        )}
      />

      <CommentSwiper />

      <InstallInChrome />
    </>
  )
}

export default EducationPages
