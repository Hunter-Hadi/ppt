import CallMadeOutlinedIcon from '@mui/icons-material/CallMadeOutlined';
import { Box, Button, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { A16zIcon } from '@/features/landing/components/HeroSection';
import { LOVED_BY_NUM, STAR_RATINGS_NUM } from '@/features/landing/constants';
import IndicatorDecorator from '@/page_components/IndicatorDecorator';
import { safeOpenUrl } from '@/utils/location';

const AffiliateHeroSection = () => {
  const { t } = useTranslation();
  return (
    <Box pt={4} pb={9}>
      <Box maxWidth={1312} mx='auto' px={2}>
        <Stack
          direction={'row'}
          alignItems='center'
          justifyContent={'center'}
          flexWrap={'wrap'}
          gap={{
            xs: 1.5,
            sm: 3,
          }}
          mb={4}
        >
          <IndicatorDecorator>
            <Stack
              justifyContent={'center'}
              alignItems='center'
              sx={{
                '&:hover': {
                  color: 'primary.main',
                  cursor: 'pointer',
                  transition: 'color 0.3s ease',
                },
              }}
              onClick={() => {
                safeOpenUrl('https://a16z.com/100-gen-ai-apps/', '_blank');
              }}
            >
              <Stack direction={'row'} alignItems='center' spacing={1}>
                <A16zIcon />
                <Typography
                  variant='custom'
                  fontSize={{
                    xs: 20,
                    sm: 24,
                  }}
                  fontWeight={700}
                  color='primary.main'
                >
                  2024
                </Typography>
              </Stack>
              <Typography
                variant='custom'
                color='inherit'
                fontSize={{
                  xs: 14,
                  sm: 16,
                }}
              >
                {t('pages:home_page__hero_section__indicator1_label')}
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
                #1 {t('affiliate:hero_section__indicator__label')}
              </Typography>
              <Typography
                variant='custom'
                fontSize={{
                  xs: 14,
                  sm: 16,
                }}
              >
                Product Hunt
              </Typography>
            </Stack>
          </IndicatorDecorator>
        </Stack>
        <Box
          pt={9}
          pb={12}
          sx={{
            bgcolor: 'primary.main',
            color: '#fff',
            borderRadius: 4,
          }}
        >
          <Stack>
            <Typography
              variant='custom'
              fontSize={{
                xs: 48,
                sm: 56,
                md: 72,
              }}
              fontWeight={600}
              lineHeight={1.4}
              textAlign={'center'}
            >
              {t('affiliate:hero_section__title')} <br />{' '}
              {t('affiliate:main_keywords')}
            </Typography>
            <Typography
              variant='custom'
              fontSize={{
                xs: 16,
                sm: 20,
              }}
              textAlign={'center'}
              color='#F1E4FF'
              mt={3}
            >
              {t('affiliate:hero_section__description__part1')}{' '}
              <Typography
                variant='custom'
                fontSize={{ xs: 20, sm: 24 }}
                fontWeight={700}
                fontStyle='italic'
              >
                25%
              </Typography>
              <br />
              {t('affiliate:hero_section__description__part2')}
            </Typography>

            <Button
              variant='contained'
              sx={{
                width: 260,
                height: 60,
                bgcolor: '#000',
                color: '#fff',
                mt: 6,
                fontSize: 18,
                mx: 'auto',
              }}
              endIcon={<CallMadeOutlinedIcon />}
            >
              {t('affiliate:call_to_action__text')}
            </Button>
          </Stack>
        </Box>
      </Box>
    </Box>
  );
};

export default AffiliateHeroSection;
