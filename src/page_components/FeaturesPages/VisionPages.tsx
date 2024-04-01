import Stack from '@mui/material/Stack';
import { useTranslation } from 'next-i18next';
import React from 'react';

import CallToActionSection from '@/features/landing/components/CallToActionSection';
import FeaturesContentSection from '@/page_components/FeaturesPages/components/FeaturesContentSection';
import FeaturesLandingBanner from '@/page_components/FeaturesPages/components/FeaturesLandingBanner';

const VisionPages = () => {
  const { t } = useTranslation();

  return (
    <Stack>
      <FeaturesLandingBanner
        title={t('features_landing:vision_pages__title')}
        description={t('features_landing:vision_pages__description')}
      />
      <FeaturesContentSection
        icon='see'
        title={t('features_landing:vision_pages__section1__title')}
        description={[
          t('features_landing:vision_pages__section1__description__part1'),
          t('features_landing:vision_pages__section1__description__part2'),
        ]}
        imageUrl='/assets/features-landing/vision/1.png'
      />
      <FeaturesContentSection
        icon='image-scanner'
        title={t('features_landing:vision_pages__section2__title')}
        description={t('features_landing:vision_pages__section2__description')}
        imageUrl='/assets/features-landing/vision/2.png'
        textWithImageLayout='imageToText'
      />
      <FeaturesContentSection
        icon='chat'
        title={t('features_landing:vision_pages__section3__title')}
        description={t('features_landing:vision_pages__section3__description')}
        imageUrl='/assets/features-landing/vision/3.png'
      />
      <FeaturesContentSection
        icon='and'
        title={t('features_landing:more_over_section__title')}
        description={[
          t('features_landing:more_over_section__description__part1'),
          t('features_landing:more_over_section__description__part2'),
        ]}
        imageUrl='/assets/features-landing/more.png'
        textWithImageLayout='imageToText'
      />
      <CallToActionSection
        ctaButtonTrackerLinkProps={{
          defaultRef: '',
          queryRefEnable: true,
          pathnameRefEnable: true,
        }}
      />
    </Stack>
  );
};

export default VisionPages;
