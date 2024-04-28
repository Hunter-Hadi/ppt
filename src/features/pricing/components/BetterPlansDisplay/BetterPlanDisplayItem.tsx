import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import capitalize from 'lodash-es/capitalize';
import { useTranslation } from 'next-i18next';
import React, { FC, useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import { PLAN_PRICE_MAP } from '@/features/pricing//constant';
import PlanButton from '@/features/pricing/components/PlanButton';
import PlanProductivityValue from '@/features/pricing/components/PlanProductivityValue';
import { IBetterPlanDataItem } from '@/features/pricing/constant/better_plans';
import {
  PricingPaymentTypeAtom,
  PricingPlanCategoryState,
} from '@/features/pricing/store';
import { RENDER_PLAN_TYPE } from '@/features/pricing/type';
import { getMonthlyPriceOfYearlyPriceDiscount } from '@/features/pricing/utils';
import { truncateToDecimalPlaces } from '@/utils/dataHelper/numberHelper';

import FeaturesUsageItemRender from './FeaturesUsageItemRender';

const MOST_POPULAR_HEIGHT = 40;

interface IBetterPlanDisplayItemProps extends IBetterPlanDataItem {
  isPopular?: boolean;
}

const BetterPlanDisplayItem: FC<IBetterPlanDisplayItemProps> = ({
  isPopular,
  renderPlan,
  displayFeaturesSubTitle,
  displayFeatures,
}) => {
  const { t } = useTranslation();

  const theme = useTheme();
  const isDownMd = useMediaQuery(theme.breakpoints.down('md')); // 屏幕宽度小于 1024 时为 true

  const paymentType = useRecoilValue(PricingPaymentTypeAtom);
  const pricingPlanCategory = useRecoilValue(PricingPlanCategoryState);

  // 获取当前 renderPlan 的类型，然后用字符串拼接的方式 获取 年付和月付 的价格
  // const { monthlyPrice, yearlyPrice } = useMemo(() => {
  //   const planKey = renderPlan.split('_')[0] as RENDER_PLAN_TYPE;

  //   const yearlyPlanKey = `${planKey}_yearly` as RENDER_PLAN_TYPE;
  //   return {
  //     monthlyPrice: PLAN_PRICE_MAP[planKey],
  //     yearlyPrice: PLAN_PRICE_MAP[yearlyPlanKey],
  //   };
  // }, [renderPlan]);

  const currentPricingPaymentPlan = useMemo(() => {
    if (renderPlan === 'free') {
      return 'free' as RENDER_PLAN_TYPE;
    }

    let paymentPlanType =
      paymentType === 'yearly' ? `${renderPlan}_yearly` : renderPlan;

    if (pricingPlanCategory === 'team') {
      // team plan 暂时只有月付的，所以这里都先返回月付的
      paymentPlanType = `${renderPlan}_team`;
    }

    return paymentPlanType as RENDER_PLAN_TYPE;
  }, [paymentType, pricingPlanCategory, renderPlan]);

  const renderSaveFlag = () => {
    return (
      <>
        {/* 付费的plan，并且年付的才显示 */}
        {/* 优惠标识 */}
        {renderPlan !== 'free' &&
        paymentType === 'yearly' &&
        pricingPlanCategory !== 'team' ? (
          <Stack
            direction={'row'}
            alignItems='center'
            justifyContent='space-between'
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              width: 'max-content',
              borderBottomLeftRadius: '8px',
              px: 1.2,
              py: 0.4,
              bgcolor: isPopular ? 'primary.main' : '#F4EBFF',
              color: isPopular ? '#fff' : 'promotionColor.fontMain',
              boxSizing: 'border-box',
            }}
          >
            <Typography
              variant='custom'
              fontSize={16}
              lineHeight={1.5}
              fontWeight={500}
              color={isPopular ? '#fff' : 'primary.main'}
            >
              {t('pages:pricing__save_up_to', {
                NUM: getMonthlyPriceOfYearlyPriceDiscount(renderPlan),
              })}
            </Typography>
          </Stack>
        ) : null}
      </>
    );
  };

  return (
    <Stack
      sx={{
        position: 'relative',
        top: isPopular && !isDownMd ? -MOST_POPULAR_HEIGHT : 0,
        height:
          isPopular && !isDownMd
            ? `calc(100% + ${MOST_POPULAR_HEIGHT}px)`
            : '100%',
        border: '1px solid',
        borderColor: isPopular ? 'primary.main' : 'divider',
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: '0px 4px 6px -2px #10182808',
      }}
    >
      {/* popular flag */}
      {isPopular && (
        <Stack
          direction='row'
          alignItems='center'
          justifyContent='center'
          bgcolor='#F1E6FF'
          spacing={0.5}
          height={MOST_POPULAR_HEIGHT}
        >
          <Typography
            variant='custom'
            fontSize={16}
            lineHeight={1.5}
            color='primary.main'
          >
            {t('common:most_popular')}
          </Typography>
          <AutoAwesomeIcon
            sx={{
              color: 'primary.main',
              fontSize: 18,
            }}
          />
        </Stack>
      )}

      {/* payment info */}
      <Stack p={3} position='relative'>
        {renderSaveFlag()}

        {/* plan title */}
        <Typography
          variant='custom'
          fontSize={24}
          lineHeight={1.4}
          fontWeight={700}
          color={'primary.main'}
        >
          MaxAI {capitalize(renderPlan)}
        </Typography>

        {/* plan productivity */}
        <PlanProductivityValue
          renderType={renderPlan}
          isPopular={isPopular}
          sx={{ mt: 1 }}
        />

        {/* plan price */}
        <Stack spacing={1} mt={2}>
          <Stack direction={'row'} alignItems='baseline' spacing={1}>
            {/* 这里比较特殊，需要一直显示 month 价格 */}
            <Typography
              variant='custom'
              fontSize={56}
              lineHeight={1.2}
              fontWeight={700}
              color='text.primary'
            >
              $
              {paymentType === 'yearly'
                ? truncateToDecimalPlaces(
                    PLAN_PRICE_MAP[currentPricingPaymentPlan] / 12,
                    2,
                  )
                : PLAN_PRICE_MAP[currentPricingPaymentPlan]}
            </Typography>
            <Typography
              variant='custom'
              fontSize={18}
              lineHeight={1.4}
              color='text.secondary'
            >
              / {t('common:month')}
            </Typography>
          </Stack>

          {/* paymentType 为 yearly 时才渲染这一行 */}
          {paymentType === 'yearly' && (
            <Typography
              variant='custom'
              fontSize={16}
              lineHeight={1.5}
              fontWeight={600}
              color='text.primary'
            >
              {t('pricing:payment_info__pay_by_yearly', {
                PRICE: `$${PLAN_PRICE_MAP[currentPricingPaymentPlan]}`,
              })}
            </Typography>
          )}
        </Stack>

        {/* plan button */}
        <PlanButton
          renderType={currentPricingPaymentPlan}
          sx={{
            mt: 3,
          }}
          isPopular={isPopular}
          variant={isPopular ? 'contained' : 'outlined'}
          moreContentType={
            renderPlan === 'free' ||
            paymentType === 'yearly' ||
            pricingPlanCategory === 'team'
              ? 'legal-tips'
              : 'yearly-sell'
          }
        />
      </Stack>

      <Divider />

      {/* features info */}
      <Stack px={3} py={4} spacing={3}>
        <Typography
          variant='custom'
          fontSize={16}
          lineHeight={1.5}
          fontWeight={600}
        >
          {displayFeaturesSubTitle(t)}
        </Typography>

        <Stack spacing={2}>
          {displayFeatures.map((featureItem, index) => {
            if (featureItem.featuresUsageCategory) {
              return (
                <FeaturesUsageItemRender
                  key={index}
                  renderPlan={renderPlan}
                  displayFeatureData={featureItem}
                />
              );
            }

            return (
              <Stack key={index} spacing={2}>
                <Stack direction={'row'} spacing={1.5}>
                  <Box width={20} lineHeight={0}>
                    {featureItem.status === 'checked' ? (
                      <CheckCircleOutlineOutlinedIcon
                        sx={{
                          color: 'text.primary',
                          fontSize: 20,
                        }}
                      />
                    ) : (
                      <CloseOutlinedIcon
                        sx={{
                          color: 'error.main',
                          fontSize: 20,
                        }}
                      />
                    )}
                  </Box>
                  <Stack spacing={0.5}>
                    {typeof featureItem.title === 'string' ? (
                      <Typography
                        variant='custom'
                        fontSize={14}
                        lineHeight={1.5}
                        color='customText.primary'
                      >
                        {t(featureItem.title)}
                      </Typography>
                    ) : (
                      featureItem.title
                    )}
                    {typeof featureItem.description === 'string' ? (
                      <Typography
                        variant='custom'
                        fontSize={12}
                        lineHeight={1.5}
                        color='customText.tertiary'
                      >
                        {t(featureItem.description)}
                      </Typography>
                    ) : (
                      featureItem.description
                    )}
                    {typeof featureItem.moreDescription === 'string' ? (
                      <Typography
                        variant='custom'
                        fontSize={12}
                        lineHeight={1.5}
                        color='customText.tertiary'
                      >
                        {t(featureItem.moreDescription)}
                      </Typography>
                    ) : (
                      featureItem.moreDescription
                    )}
                  </Stack>
                </Stack>
                {featureItem.divider && <Divider />}
              </Stack>
            );
          })}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default BetterPlanDisplayItem;
