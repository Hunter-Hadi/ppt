import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import CallToActionSection from '@/features/landing/components/CallToActionSection';
import FunnelSurveyPopup from '@/features/survey/components/FunnelSurveyPopup';
import FeaturesContentSection from '@/page_components/FeaturesLandingPages/components/FeaturesContentSection';
import FeaturesLandingBanner from '@/page_components/FeaturesLandingPages/components/FeaturesLandingBanner';
interface IProps {
  propRef?: string;
}
const TranslatePages: FC<IProps> = ({ propRef }) => {
  const { t } = useTranslation();

  return (
    <Stack>
      <AppDefaultSeoLayout
        title={t('seo:features_landing__translate__title')}
        description={t('seo:features_landing__translate__desc')}
      />
      <FeaturesLandingBanner
        title={t('features_landing:translate_pages__title')}
        description={t('features_landing:translate_pages__description')}
      />
      <FeaturesContentSection
        icon='1-click'
        title={t('features_landing:translate_pages__section1__title')}
        description={
          <Stack spacing={2} mt={2}>
            <Typography
              variant='custom'
              fontSize={18}
              color='text.secondary'
              lineHeight={1.5}
            >
              {t(
                'features_landing:translate_pages__section1__description__part1',
              )}
            </Typography>
            <Typography
              variant='custom'
              fontSize={18}
              color='text.secondary'
              lineHeight={1.5}
            >
              {t(
                'features_landing:translate_pages__section1__description__part2',
              )}
            </Typography>
          </Stack>
        }
        imageUrl='/assets/features-landing/translate/1.png'
      />
      <FeaturesContentSection
        icon='translate'
        title={t('features_landing:translate_pages__section2__title')}
        description={
          <Stack spacing={2} mt={2}>
            <Typography
              variant='custom'
              fontSize={18}
              color='text.secondary'
              lineHeight={1.5}
            >
              {t(
                'features_landing:translate_pages__section2__description__part1',
              )}
            </Typography>
            <Typography
              variant='custom'
              fontSize={18}
              color='text.secondary'
              lineHeight={1.5}
            >
              {t(
                'features_landing:translate_pages__section2__description__part2',
              )}
            </Typography>
          </Stack>
        }
        imageUrl='/assets/features-landing/translate/2.png'
        textWithImageLayout='imageToText'
      />
      <FeaturesContentSection
        icon='and'
        title={t('features_landing:more_over_section__title')}
        description={
          <Stack spacing={2} mt={2}>
            <Typography
              variant='custom'
              fontSize={18}
              color='text.secondary'
              lineHeight={1.5}
            >
              {t('features_landing:more_over_section__description__part1')}
            </Typography>
            <Typography
              variant='custom'
              fontSize={18}
              color='text.secondary'
              lineHeight={1.5}
            >
              {t('features_landing:more_over_section__description__part2')}
            </Typography>
          </Stack>
        }
        imageUrl='/assets/features-landing/more.png'
      />
      <CallToActionSection
        ctaButtonTrackerLinkProps={{
          defaultRef: propRef ?? '',
          queryRefEnable: true,
          pathnameRefEnable: true,
        }}
      />
      <FunnelSurveyPopup sceneType='SURVEY_INSTALL_DROPPED' />
    </Stack>
  );
};

export default TranslatePages;
