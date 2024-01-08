import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import ProLink from '@/components/ProLink';
import { WWW_PROJECT_LINK } from '@/global_constants';
import { FAQ_PRICING } from '@/global_constants/faq/pricing';
import FAQList from '@/page_components/FAQList';

import PlanCtaButton from './components/PlanCtaButton';
import PlanFeaturesTable from './components/PlanFeaturesTable';

const PricingPage = () => {
  const { t } = useTranslation(['pages']);

  return (
    <Stack maxWidth={1312} mx={'auto'} pt={8} pb={15} spacing={8}>
      <Stack spacing={4}>
        <Stack>
          <Typography
            variant='custom'
            component={'h3'}
            textAlign={'center'}
            mb={4}
            fontSize={{
              xs: 32,
              md: 48,
            }}
          >
            {t('pricing__title')}
          </Typography>
          <PlanFeaturesTable popularPlan={'elite'} />
        </Stack>

        <PlanCtaButton
          sx={{
            height: 64,
          }}
          buttonProps={{
            btnDesc: true,
          }}
        />
      </Stack>

      {/* <Stack spacing={2.5}>
        <Typography variant='h1' component={'h3'} textAlign={'center'}>
          Simple Pricing
        </Typography>
        <PricingPlanPanel />
      </Stack> */}
      <Box>
        <Typography
          variant='h4'
          component={'h2'}
          textAlign={'center'}
          fontWeight={'bold'}
          mb={4}
          id='FAQs'
        >
          {t('faq__title')}
        </Typography>
        <FAQList faqList={FAQ_PRICING} />
        <Box mb={5} />
        <Typography
          variant='caption'
          color='text.secondary'
          sx={{
            opacity: 0.4,
            fontSize: 12,
          }}
        >
          {t('modules:faq_list__disclaimer_part1')}
          <ProLink
            href={`${WWW_PROJECT_LINK}/terms`}
            color='inherit'
            underline='always'
          >
            {t('modules:faq_list__terms_of_service')}
          </ProLink>
          {t('modules:faq_list__disclaimer_part2')}
        </Typography>
      </Box>
    </Stack>
  );
};

export default PricingPage;
