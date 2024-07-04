import { Box, Grid, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';

import ProLink from '@/components/ProLink';
import { mixpanelTrack } from '@/features/mixpanel/utils';
import useFunnelSurveyController from '@/features/survey/hooks/useFunnelSurveyController';
import { APP_PROJECT_LINK } from '@/global_constants';
import useShareTrackerLink from '@/hooks/useShareTrackerLink';
import { gaEvent } from '@/utils/gtag';

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
  const { reStartOpenPopupTimer } = useFunnelSurveyController(
    'SURVEY_INSTALL_DROPPED',
  );

  const { ref } = useShareTrackerLink();

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
        <Grid item xs={12} sm={6} md={4}>
          <Box display={'flex'} minHeight={260} height='100%'>
            <HowItWorkStepItem
              linkTo={extensionLink}
              onClick={(e) => {
                reStartOpenPopupTimer(30 * 1000); // 30s
                mixpanelTrack('install_started', {
                  ref,
                });
                // new gtag conversion (MCC)
                gaEvent({
                  eventName: 'conversion',
                  params: {
                    send_to: 'AW-16634122609/nsVpCIWD8b8ZEPGi4vs9',
                    ref,
                  },
                });
              }}
              title={t('pages:home_page__how_it_works__step1__title')}
              description={t(
                'pages:home_page__how_it_works__step1__description',
              )}
              step={1}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box display={'flex'} minHeight={260} height='100%'>
            <HowItWorkStepItem
              linkTo={`${APP_PROJECT_LINK}/login`}
              title={t('pages:home_page__how_it_works__step2__title')}
              description={t(
                'pages:home_page__how_it_works__step2__description',
              )}
              step={2}
            />
          </Box>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Box display={'flex'} minHeight={260} height='100%'>
            <HowItWorkStepItem
              title={t('pages:home_page__how_it_works__step3__title')}
              description={t(
                'pages:home_page__how_it_works__step3__description',
              )}
              step={3}
            />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

const HowItWorkStepItem: FC<{
  title: string;
  description: React.ReactNode;
  step: number;
  onClick?: (e: any) => void;
  linkTo?: string;
}> = ({ title, description, step, onClick, linkTo }) => {
  const { t } = useTranslation();
  return (
    <Stack
      spacing={2}
      p={3}
      borderRadius={4}
      bgcolor='#F9FAFB'
      width='100%'
      onClick={onClick}
      {...(linkTo
        ? {
            component: 'a',
            href: linkTo,
            target: '_blank',
            underline: 'always',
            color: 'text.primary',
          }
        : {})}
      sx={{
        cursor: linkTo ? 'pointer' : 'default',
      }}
    >
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
        fontSize={40}
        lineHeight={1.5}
        fontWeight={700}
        sx={{
          textDecoration: linkTo ? 'underline' : 'none',
        }}
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
