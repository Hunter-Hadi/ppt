import { Box, Grid, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

const HOW_IT_WORKS_LIST = [
  {
    title: 'affiliate:how_it_works__step1__title',
    description: 'affiliate:how_it_works__step1__description',
  },
  {
    title: 'affiliate:how_it_works__step2__title',
    description: 'affiliate:how_it_works__step2__description',
  },
  {
    title: 'affiliate:how_it_works__step3__title',
    description: 'affiliate:how_it_works__step3__description',
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
              <Box display={'flex'} minHeight={280}>
                <HowItWorkStepItem
                  title={t(workItem.title)}
                  description={t(workItem.description)}
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
