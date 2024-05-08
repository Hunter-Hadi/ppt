import StarIcon from '@mui/icons-material/Star';
import { Box, Stack, SxProps, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { FC, useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import PlanButton from '@/features/pricing/components/PlanButton';
import {
  PricingPaymentTypeAtom,
  PricingPlanCategoryState,
} from '@/features/pricing/store';
import { RENDER_PLAN_TYPE } from '@/features/pricing/type';
import { getMonthlyPriceOfYearlyPriceDiscount } from '@/features/pricing/utils';
import { CURRENT_PROMOTION_PATHNAME } from '@/features/promotion/constants';

import PaymentTypeSwitch from '../PaymentTypeSwitch';
import PlanPaymentInfo from '../PlanPaymentInfo';
import { IFeatureColumnType } from './type';
export interface IFeaturesTableHeaderCellProps {
  columnType: IFeatureColumnType;

  showPaymentSwitch?: boolean;
  isPopular?: boolean;
  sx?: SxProps;
  isFirst: boolean;
  isLast: boolean;
  inFixed?: boolean;
}

const FeaturesTableHeaderCell: FC<IFeaturesTableHeaderCellProps> = ({
  isPopular = false,
  showPaymentSwitch = false,
  columnType,
  isFirst,
  isLast,
  inFixed,
  sx,
}) => {
  const { pathname } = useRouter();
  const { t } = useTranslation();
  const paymentType = useRecoilValue(PricingPaymentTypeAtom);
  const pricingPlanCategory = useRecoilValue(PricingPlanCategoryState);

  const renderSaveFlag = (
    paymentPlanType: RENDER_PLAN_TYPE,
    isPopular: boolean,
  ) => {
    return (
      <>
        {/* 付费的plan，并且年付的才显示 */}
        {/* 优惠标识 */}
        {paymentPlanType !== 'free' &&
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
                NUM: getMonthlyPriceOfYearlyPriceDiscount(paymentPlanType),
              })}
            </Typography>
          </Stack>
        ) : null}
      </>
    );
  };

  const getCurrentPricingPaymentPlan = (columnType: string) => {
    if (columnType === 'free') {
      return 'free' as RENDER_PLAN_TYPE;
    }

    let paymentPlanType =
      paymentType === 'yearly' ? `${columnType}_yearly` : columnType;

    if (pricingPlanCategory === 'team') {
      // team plan 暂时只有月付的，所以这里都先返回月付的
      paymentPlanType = `${columnType}_team`;
    }

    return paymentPlanType as RENDER_PLAN_TYPE;
  };

  const sxMemo = useMemo(() => {
    const borderColor = isPopular ? 'primary.main' : 'customColor.borderColor';
    let resultSx: SxProps = {
      position: 'relative',
      // borderRight: isLast ? '0px solid' : '1px solid',
      // borderColor: '#E0E0E0',
      px: 2,
      pt: 3,
      pb: 2,
      // minWidth: columnType === 'features' ? 320 : 230,
      boxSizing: 'border-box',
      flexShrink: 0,
      // flexGrow: 1,

      // bgcolor: '#F5F6F7',

      bgcolor: isPopular ? '#F9F5FF' : '#F5F6F7',

      borderColor: 'transparent',
      borderStyle: 'solid',
      borderWidth: 0,

      overflow: 'hidden',

      borderLeftWidth: 0,
      borderRightWidth: 0,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderBottomColor: 'customColor.borderColor',
      borderTopColor: borderColor,

      ...sx,
    };

    if (isFirst) {
      resultSx = {
        ...resultSx,
        borderTopLeftRadius: 8,
        borderLeftColor: borderColor,
        borderLeftWidth: 1,
      };
    }

    if (isLast) {
      resultSx = {
        ...resultSx,
        borderTopRightRadius: 8,
        borderRightColor: borderColor,
        borderRightWidth: 1,
      };
    }

    if (inFixed) {
      resultSx = {
        ...resultSx,
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
      };
    }

    if (isPopular) {
      resultSx = {
        ...resultSx,
        // borderColor: 'promotionColor.backgroundMain',
        borderLeftColor: borderColor,
        borderLeftWidth: 1,
        borderRightColor: borderColor,
        borderRightWidth: 1,
        borderTopRightRadius: 0,
        overflow: 'unset',
      };
    }

    return resultSx;
  }, [isPopular, sx, columnType, isFirst, isLast, inFixed]);

  const paymentPlanType = getCurrentPricingPaymentPlan(columnType);

  const moreContentType = useMemo(() => {
    // TODO: refine
    if (pathname === CURRENT_PROMOTION_PATHNAME) {
      return null;
    }
    if (
      paymentPlanType === 'free' ||
      paymentType === 'yearly' ||
      pricingPlanCategory === 'team'
    ) {
      return 'legal-tips';
    } else {
      return 'yearly-sell';
    }
  }, [paymentPlanType, paymentType]);

  if (columnType === 'features') {
    return (
      <Stack
        key={columnType}
        justifyContent={'center'}
        alignItems={'center'}
        id={`features-table-header-${columnType}`}
        sx={sxMemo}
      >
        {showPaymentSwitch && <PaymentTypeSwitch />}
      </Stack>
    );
  }

  return (
    <Stack
      key={columnType}
      id={`features-table-header-${columnType}`}
      sx={sxMemo}
    >
      {isPopular ? (
        <>
          <Stack
            justifyContent={'center'}
            alignItems={'center'}
            sx={{
              position: 'absolute',
              top: -37,
              height: 28,
              left: -1,
              right: -1,
              // width: '100%',
              px: 1,
              py: 0.5,
              color: 'primary.main',
              borderRadius: '8px 8px 0px 0px',
              bgcolor: '#F1E6FF',
              border: '1px solid',
              borderColor: 'primary.main',
              fontWeight: 600,
              borderBottom: 'none',
            }}
            direction={'row'}
            gap={0.5}
          >
            <StarIcon
              sx={{
                fontSize: '20px',
                color: 'inherit',
              }}
            />
            {t('modules:plan_features_table__most_popular')}
          </Stack>
        </>
      ) : null}
      {renderSaveFlag(getCurrentPricingPaymentPlan(columnType), isPopular)}

      <PlanPaymentInfo
        isPopular={isPopular}
        type={paymentPlanType}
        showDesc
        sx={{
          mb: 2,
        }}
      />
      <Box mt='auto'>
        <PlanButton
          renderType={paymentPlanType}
          isPopular={isPopular}
          variant={isPopular ? 'contained' : 'outlined'}
          moreContentType={moreContentType}
          sx={{
            borderRadius: 2,
          }}
        />
      </Box>
    </Stack>
  );
};

export default FeaturesTableHeaderCell;
