import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import PlanFeaturesTableV3 from '@/features/pricing/components/PlanFeaturesTableV3';
import PricingFaqBox from '@/features/pricing/components/PricingFaqBox';
import TeamPlanTips from '@/features/pricing/components/TeamPlanTips';
import {
  PricingPaymentTypeAtom,
  PricingPlanCategoryState,
} from '@/features/pricing/store';
import PromotionBannerForElite from '@/features/promotion/components/promotion_banners/PromotionBannerForElite';

const PricingPages = () => {
  const { t } = useTranslation();

  const setPricingPlanCategory = useSetRecoilState(PricingPlanCategoryState);

  const setPaymentType = useSetRecoilState(PricingPaymentTypeAtom);

  useEffect(() => {
    setPricingPlanCategory('individual');
    setPaymentType('yearly');
  }, []);

  return (
    <AppContainer
      sx={{
        bgcolor: '#fff',
        maxWidth: '100vw',
        '& > div': {
          maxWidth: '100vw',
          p: 0,
        },
      }}
    >
      <AppDefaultSeoLayout title={t('seo:pricing__title')} />
      {/* <PricingPlanCategoryBar /> */}
      <PromotionBannerForElite />
      <TeamPlanTips />

      <Stack
        maxWidth={1298}
        mx={'auto'}
        px={3}
        pb={15}
        pt={4}
        sx={{
          boxSizing: 'border-box',
        }}
      >
        {/* better plans */}
        {/* <Stack alignItems='center'>
          <Typography
            variant='custom'
            fontSize={{
              xs: 32,
              sm: 48,
            }}
            fontWeight={700}
            component={'h2'}
            textAlign={'center'}
            mb={3}
          >
            {t('pages:pricing__better_plan__title')}
          </Typography>
          <Stack
            direction='row'
            alignItems={'center'}
            gap={{
              xs: 1,
              sm: 3,
            }}
            flexWrap={'wrap'}
            sx={{
              width: 'max-content',
              mb: 6,
            }}
          >
            <A16zTop50AppsBadge />
            <IndicatorDecorator>
              <Stack justifyContent={'center'} alignItems='center'>
                <Typography
                  variant='custom'
                  fontSize={{
                    xs: 20,
                    sm: 24,
                  }}
                  fontWeight={700}
                  color='primary.main'
                >
                  {LOVED_BY_NUM}
                </Typography>
                <Typography
                  variant='custom'
                  fontSize={{
                    xs: 14,
                    sm: 16,
                  }}
                >
                  {t('pages:home_page__hero_section__indicator2_label')}
                </Typography>
              </Stack>
            </IndicatorDecorator>
            <IndicatorDecorator>
              <Stack justifyContent={'center'} alignItems='center'>
                <Typography
                  variant='custom'
                  fontSize={{
                    xs: 20,
                    sm: 24,
                  }}
                  fontWeight={700}
                  color='primary.main'
                >
                  {STAR_RATINGS_NUM}
                </Typography>
                <Typography
                  variant='custom'
                  fontSize={{
                    xs: 14,
                    sm: 16,
                  }}
                >
                  {t('pages:home_page__hero_section__indicator3_label')}
                </Typography>
              </Stack>
            </IndicatorDecorator>
          </Stack>
          <BetterPlansDisplay popularPlan={'elite'} />
        </Stack> */}
        {/* compare plans */}
        <Stack
          spacing={6}
          // mt={20}
          // sx={{
          //   display: {
          //     xs: 'none',
          //     sm: 'flex',
          //   },
          // }}
        >
          <Typography
            variant='custom'
            fontSize={{
              xs: 32,
              sm: 48,
            }}
            fontWeight={700}
            component={'h2'}
            textAlign={'center'}
            // mb={4}
          >
            {t('pages:pricing__compare_plans__title')}
          </Typography>
          <PlanFeaturesTableV3 popularPlan={'elite'} />
        </Stack>
        {/* faq */}
        <PricingFaqBox sx={{ mt: 24 }} />
      </Stack>
    </AppContainer>
  );
};

export default PricingPages;
