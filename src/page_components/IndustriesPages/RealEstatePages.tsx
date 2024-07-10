import { useTranslation } from 'next-i18next'
import React from 'react'

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout'
import Abilities from '@/page_components/IndustriesPages/components/Abilities'
import Banner from '@/page_components/IndustriesPages/components/Banner'
import CommentSwiper from '@/page_components/IndustriesPages/components/CommentSwiper'
import Description from '@/page_components/IndustriesPages/components/Description'
import InstallInChrome from '@/page_components/IndustriesPages/components/InstallInChrome'
import TakeBackTime from '@/page_components/IndustriesPages/components/TakeBackTime'

const RealEstatePages = () => {
  const { t } = useTranslation()

  return (
    <>
      <AppDefaultSeoLayout title={t('seo:industries__real_estate__title')} />

      <Banner
        title={t('pages:industries__real_estate_page__banner__title')}
        description={t(
          'pages:industries__real_estate_page__banner__description',
        )}
        iconPath='/assets/svg/real-estate/1.svg'
        buttonText={t('pages:industries__real_estate_page__button_text')}
      />

      <Description
        title={t('pages:industries__real_estate_page__description__title')}
        content={t('pages:industries__real_estate_page__description__content')}
        buttonText={t(
          'pages:industries__real_estate_page__description__button_text',
        )}
      />

      <Abilities
        title={t('pages:industries__real_estate_page__abilities__title')}
        data={[
          {
            iconPath: '/assets/svg/Industries-icon/1_click_64px.svg',
            title: t('pages:industries__real_estate_page__abilities_1__title'),
            content: t(
              'pages:industries__real_estate_page__abilities_1__content',
            ),
          },
          {
            iconPath: '/assets/svg/Industries-icon/ai_powered_search_64px.svg',
            title: t('pages:industries__real_estate_page__abilities_2__title'),
            content: t(
              'pages:industries__real_estate_page__abilities_2__content',
            ),
          },
          {
            iconPath: '/assets/svg/Industries-icon/ai_writing_64px.svg',
            title: t('pages:industries__real_estate_page__abilities_3__title'),
            content: t(
              'pages:industries__real_estate_page__abilities_3__content',
            ),
          },
          {
            iconPath: '/assets/svg/Industries-icon/ai_infused_64px.svg',
            title: t('pages:industries__real_estate_page__abilities_4__title'),
            content: t(
              'pages:industries__real_estate_page__abilities_4__content',
            ),
          },
          {
            iconPath: '/assets/svg/Industries-icon/enhanced_ai-_64px.svg',
            title: t('pages:industries__real_estate_page__abilities_5__title'),
            content: t(
              'pages:industries__real_estate_page__abilities_5__content',
            ),
          },
        ]}
      />

      <TakeBackTime
        iconPath='/assets/svg/real-estate/2.svg'
        title={t('pages:industries__real_estate_page__take_time__title')}
        description={t(
          'pages:industries__real_estate_page__take_time__content',
        )}
        buttonText={t(
          'pages:industries__real_estate_page__take_time__button_text',
        )}
      />

      <CommentSwiper />

      <InstallInChrome />
    </>
  )
}

export default RealEstatePages
