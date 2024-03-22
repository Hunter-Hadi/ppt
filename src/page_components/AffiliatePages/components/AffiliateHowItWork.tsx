import { Box, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { Trans, useTranslation } from 'react-i18next';

import ProLink from '@/components/ProLink';
import {
  AFFILIATE_PROGRAM_LINK,
  AFFILIATE_PROGRAM_SIGN_UP_LINK,
} from '@/page_components/AffiliatePages/constant';

const HOW_IT_WORKS_LIST = [
  {
    title: 'affiliate:how_it_works__step1__title',
    description: () => (
      <Trans i18nKey='affiliate:how_it_works__step1__description'>
        <ProLink
          href={AFFILIATE_PROGRAM_SIGN_UP_LINK}
          target='_blank'
          underline='always'
        >
          Sign up
        </ProLink>{' '}
        for the affiliate program and get your exclusive affiliate link.
      </Trans>
    ),
  },
  {
    title: 'affiliate:how_it_works__step2__title',
    description: () => (
      <Trans i18nKey='affiliate:how_it_works__step2__description'>
        Share your unique link with your audience and track the performance in
        real-time via
        <ProLink
          href={AFFILIATE_PROGRAM_LINK}
          target='_blank'
          underline='always'
        >
          Rewardful
        </ProLink>
        .
      </Trans>
    ),
  },
  {
    title: 'affiliate:how_it_works__step3__title',
    description: () => (
      <Trans i18nKey='affiliate:how_it_works__step3__description'>
        Earn
        <Typography
          variant='custom'
          fontSize={28}
          fontWeight={900}
          fontStyle={'italic'}
          color='primary.main'
        >
          25%
        </Typography>
        recurring commission through the first year of each new subscriber that
        you refer to MaxAI!
      </Trans>
    ),
  },
];

const AffiliateHowItWork = () => {
  const { t } = useTranslation();
  return (
    <Box maxWidth={1312} mx={'auto'} py={9} px={2}>
      <Typography
        variant='custom'
        component='h2'
        textAlign={'center'}
        fontSize={{
          xs: 36,
          sm: 48,
        }}
        mb={6}
      >
        {t('affiliate:how_it_works__title')}
      </Typography>
      {/* <Box height={} /></Box> */}
      <Grid container direction={'row'} spacing={4}>
        {HOW_IT_WORKS_LIST.map((workItem, index) => {
          return (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <Box display={'flex'} minHeight={280} height='100%'>
                <HowItWorkStepItem
                  title={t(workItem.title)}
                  description={workItem.description()}
                  step={index + 1}
                />
              </Box>
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

const HowItWorkStepItem = ({ title, description, step }) => {
  const { t } = useTranslation();
  return (
    <Stack spacing={2} p={3} borderRadius={4} bgcolor='#F9FAFB' width='100%'>
      <Typography
        variant='custom'
        fontSize={16}
        lineHeight={1.5}
        fontWeight={500}
      >
        {t('affiliate:how_it_works__step__label')} {step}
      </Typography>
      <Typography
        variant='custom'
        fontSize={56}
        lineHeight={1.5}
        fontWeight={700}
      >
        {title}
      </Typography>
      <Typography
        variant='custom'
        fontSize={18}
        lineHeight={1.5}
        color='text.secondary'
      >
        {description}
      </Typography>
    </Stack>
  );
};

export default AffiliateHowItWork;
