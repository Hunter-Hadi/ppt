import { Box, Grid, Typography, useMediaQuery } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import ResponsiveImage from '@/components/ResponsiveImage';
import { LOVED_BY_NUM, STAR_RATINGS_NUM } from '@/features/landing/constants';

import NumbersBox from './NumbersBox';
import PrivacyFriendlyNumbersBox from './PrivacyFriendlyNumbersBox';

const MaxAIInNumbers = () => {
  const isDown600 = useMediaQuery('(max-width:600px)'); // 小于 600px 时为 true

  const { t } = useTranslation();

  return (
    <Box
      id='homepage-features-carousel'
      py={{
        xs: 7,
        md: 14,
      }}
      px={2}
      bgcolor='white'
    >
      <Box maxWidth={1312} mx='auto'>
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
          {t('pages:home_page__in_numbers__title')}
        </Typography>

        <Grid container spacing={4}>
          <Grid item xs={12} sm={12} md={6}>
            <PrivacyFriendlyNumbersBox
              sx={{
                height: '100%',
              }}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={6}>
            <Grid container spacing={4}>
              <Grid item xs={isDown600 ? 12 : 6} sm={6}>
                <NumbersBox
                  title={LOVED_BY_NUM}
                  subTitle={t(
                    'pages:home_page__in_numbers__professionals__sub_title',
                  )}
                  description={t(
                    'pages:home_page__in_numbers__professionals__description',
                  )}
                  content={
                    <ResponsiveImage
                      alt={'professionals'}
                      src={'/assets/landing/numbers/1M+.svg'}
                      width={240}
                      height={80}
                    />
                  }
                />
              </Grid>
              <Grid item xs={isDown600 ? 12 : 6} sm={6}>
                <NumbersBox
                  title={STAR_RATINGS_NUM}
                  subTitle={t(
                    'pages:home_page__in_numbers__ratings__sub_title',
                  )}
                  description={t(
                    'pages:home_page__in_numbers__ratings__description',
                  )}
                  content={
                    <ResponsiveImage
                      alt={'5-star ratings'}
                      src={'/assets/landing/numbers/12K+.svg'}
                      width={240}
                      height={80}
                    />
                  }
                />
              </Grid>
              <Grid item xs={isDown600 ? 12 : 6} sm={6}>
                <NumbersBox
                  title={'#1'}
                  subTitle={t(
                    'pages:home_page__in_numbers__product__sub_title',
                  )}
                  description={t(
                    'pages:home_page__in_numbers__product__description',
                  )}
                  content={
                    <ResponsiveImage
                      alt={'on-product-hunt'}
                      src={'/assets/landing/numbers/on-product-hunt.svg'}
                      width={240}
                      height={80}
                    />
                  }
                />
              </Grid>
              <Grid item xs={isDown600 ? 12 : 6} sm={6}>
                <NumbersBox
                  title={'9'}
                  subTitle={t('pages:home_page__in_numbers__hours__sub_title')}
                  description={t(
                    'pages:home_page__in_numbers__hours__description',
                  )}
                  content={
                    <ResponsiveImage
                      alt={'hours'}
                      src={'/assets/landing/numbers/9.svg'}
                      width={240}
                      height={80}
                    />
                  }
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} lg={12}>
            <Grid container spacing={4}>
              <Grid item xs={isDown600 ? 12 : 6} sm={6} md={6} lg={3}>
                <NumbersBox
                  title={'60M+'}
                  subTitle={t(
                    'pages:home_page__in_numbers__generations__sub_title',
                  )}
                  description={t(
                    'pages:home_page__in_numbers__generations__description',
                  )}
                  content={
                    <ResponsiveImage
                      alt={'generations'}
                      src={'/assets/landing/numbers/60M+.svg'}
                      width={240}
                      height={80}
                    />
                  }
                  sx={{
                    '.numbers-box-title': {
                      color: '#248FFA',
                    },
                    '.numbers-box-sub-title': {
                      color: '#248FFA',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={isDown600 ? 12 : 6} sm={6} md={6} lg={3}>
                <NumbersBox
                  title={'98%'}
                  subTitle={t('pages:home_page__in_numbers__users__sub_title')}
                  description={t(
                    'pages:home_page__in_numbers__users__description',
                  )}
                  content={
                    <ResponsiveImage
                      alt={'users'}
                      src={'/assets/landing/numbers/users.svg'}
                      width={240}
                      height={80}
                    />
                  }
                  sx={{
                    '.numbers-box-title': {
                      color: '#34A853',
                    },
                    '.numbers-box-sub-title': {
                      color: '#34A853',
                    },
                  }}
                />
              </Grid>
              <Grid item xs={isDown600 ? 12 : 6} sm={6} md={6} lg={3}>
                <NumbersBox
                  title={'65K+'}
                  subTitle={t(
                    'pages:home_page__in_numbers__companies__sub_title',
                  )}
                  description={t(
                    'pages:home_page__in_numbers__companies__description',
                  )}
                  content={
                    <ResponsiveImage
                      alt={'companies'}
                      src={'/assets/landing/numbers/65K+.svg'}
                      width={240}
                      height={80}
                    />
                  }
                />
              </Grid>
              <Grid item xs={isDown600 ? 12 : 6} sm={6} md={6} lg={3}>
                <NumbersBox
                  title={'58'}
                  subTitle={t(
                    'pages:home_page__in_numbers__languages__sub_title',
                  )}
                  description={t(
                    'pages:home_page__in_numbers__languages__description',
                  )}
                  content={
                    <ResponsiveImage
                      alt={'languages'}
                      src={'/assets/landing/numbers/58.svg'}
                      width={240}
                      height={80}
                    />
                  }
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Box mt={4} />
      </Box>
    </Box>
  );
};

export default MaxAIInNumbers;
