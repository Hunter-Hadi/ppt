import { Box, Grid, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React from 'react';

import ProLink from '@/components/ProLink';
import useLandingABTester from '@/features/ab_tester/hooks/useLandingABTester';
import { APP_PROJECT_LINK } from '@/global_constants';
import useShareTrackerLink from '@/hooks/useShareTrackerLink';
import { openWindow } from '@/utils/utils';

const HOW_IT_WORKS_LIST = [
  {
    title: 'pages:home_page__how_it_works__step1__title',
    description: (t, extensionLink, onLinkClick) => (
      <>
        <ProLink
          href={extensionLink}
          target='_blank'
          underline='always'
          onClick={onLinkClick}
        >
          {t('pages:home_page__how_it_works__step1__description__part1')}
        </ProLink>
        {` `}
        {t('pages:home_page__how_it_works__step1__description__part2')}
      </>
    ),
  },
  {
    title: 'pages:home_page__how_it_works__step2__title',
    description: (t) => (
      <>
        {t('pages:home_page__how_it_works__step2__description__part1')}
        {` `}
        <ProLink
          href={`${APP_PROJECT_LINK}/login`}
          target='_blank'
          underline='always'
        >
          {t('pages:home_page__how_it_works__step2__description__part2')}
        </ProLink>
        {` `}
        {t('pages:home_page__how_it_works__step2__description__part3')}
      </>
    ),
  },
  {
    title: 'pages:home_page__how_it_works__step3__title',
    description: (t) => t('pages:home_page__how_it_works__step3__description'),
  },
];

const HowItWork = () => {
  const { t } = useTranslation();
  const { extensionLink } = useShareTrackerLink();
  const { installOpenWithNewWindow } = useLandingABTester();
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
        {t('pages:home_page__how_it_works__title')}
      </Typography>
      {/* <Box height={} /></Box> */}
      <Grid container direction={'row'} spacing={4}>
        {HOW_IT_WORKS_LIST.map((workItem, index) => {
          return (
            <Grid key={index} item xs={12} sm={6} md={4}>
              <Box display={'flex'} minHeight={260} height='100%'>
                <HowItWorkStepItem
                  title={t(workItem.title)}
                  description={workItem.description(t, extensionLink, (e) => {
                    if (installOpenWithNewWindow) {
                      e.preventDefault();
                      openWindow(extensionLink);
                    }
                  })}
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
        fontSize={44}
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

export default HowItWork;
