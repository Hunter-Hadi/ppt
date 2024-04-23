import { Box, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useRecoilValue } from 'recoil';

import { PricingPlanCategoryState } from '@/features/pricing/store';
import { getMonthlyPriceOfYearlyPriceDiscount } from '@/features/pricing/utils';
import PromotionCountdown from '@/features/promotion/components/PromotionCountdown';

const PromotionBannerForElite = () => {
  const { t } = useTranslation();
  const pricingPlanCategory = useRecoilValue(PricingPlanCategoryState);
  if (pricingPlanCategory === 'team') {
    // team plan 没有 promotion, 不显示 promotion banner
    return null;
  }
  return (
    <>
      <Stack position={'relative'} overflow={'hidden'}>
        {/*background*/}
        <img
          alt={'promotion'}
          width={'100%'}
          src='/assets/promotion/banner-bg.png'
          style={{
            position: 'absolute',
            objectFit: 'cover',
            objectPosition: 'center',
            zIndex: 2,
          }}
        />
        <PromotionCountdown
          sx={{
            my: 8,
            zIndex: 2,
          }}
          CountdownTimeBoxSx={{
            bgcolor: 'promotionColor.backgroundMain',
          }}
          spacing={6}
          title={
            <Typography
              variant={'custom'}
              fontSize={'48px'}
              fontWeight={700}
              lineHeight={1.2}
              textAlign={'center'}
            >
              <span>
                {t(
                  'modules:promotion__banner__elite__title__limited_time_offer',
                )}
              </span>
              <br />
              <span>
                {`${t('modules:promotion__banner__elite__title__part1')} `}
              </span>
              <span style={{ position: 'relative', color: '#fff' }}>
                <Box
                  component={'i'}
                  sx={{
                    top: -4,
                    left: -4,
                    padding: '4px',
                    transform: 'rotate(-5deg)',
                    zIndex: -1,
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '22px',
                    bgcolor: 'promotionColor.backgroundMain',
                  }}
                />
                {`${getMonthlyPriceOfYearlyPriceDiscount('elite')}%`}
              </span>
              <span>{` ${t(
                'modules:promotion__banner__elite__title__part2',
              )} 👇`}</span>
            </Typography>
          }
        />
      </Stack>
    </>
  );
};
export default PromotionBannerForElite;
