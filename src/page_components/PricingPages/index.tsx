import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import React from 'react';

import AppContainer from '@/app_layout/AppContainer';
import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout';
import A16zTop50AppsBadge from '@/features/landing/components/HeroSection/A16zTop50AppsBadge';
import BetterPlansDisplay from '@/features/pricing/components/BetterPlansDisplay';
import PlanFeaturesTableV2 from '@/features/pricing/components/PlanFeaturesTableV2';
import PricingFaqBox from '@/features/pricing/components/PricingFaqBox';
import PricingPlanCategoryBar from '@/features/pricing/components/PricingPlanCategoryBar';
import PromotionBannerForElite from '@/features/promotion/components/promotion_banners/PromotionBannerForElite';

const PricingPages = () => {
  const { t } = useTranslation();
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
      <PricingPlanCategoryBar />
      <PromotionBannerForElite />

      <Stack
        maxWidth={1640}
        mx={'auto'}
        px={3}
        pb={15}
        pt={8}
        sx={{
          boxSizing: 'border-box',
        }}
      >
        {/* better plans */}
        <Stack alignItems='center'>
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
          <Box width={'max-content'} mb={6}>
            <A16zTop50AppsBadge />
          </Box>
          <BetterPlansDisplay popularPlan={'elite'} />
        </Stack>
        {/* compare plans */}
        <Stack
          spacing={4}
          mt={20}
          sx={{
            display: {
              xs: 'none',
              sm: 'flex',
            },
          }}
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
            mb={4}
          >
            {t('pages:pricing__compare_plans__title')}
          </Typography>
          <PlanFeaturesTableV2 popularPlan={'elite'} />
        </Stack>
        {/* faq */}
        <PricingFaqBox sx={{ mt: 24 }} />
      </Stack>
    </AppContainer>
  );
};

export default PricingPages;
