import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { Box, Stack, SxProps, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';

import PlanButton from '@/features/pricing/components/PlanButton';
import {
  PricingPaymentTypeAtom,
  PricingPlanCategoryState,
} from '@/features/pricing/store';
import { RENDER_PLAN_TYPE } from '@/features/pricing/type';
import { getMonthlyPriceOfYearlyPriceDiscount } from '@/features/pricing/utils';

import PaymentTypeSwitch from '../PaymentTypeSwitch';
import PlanPaymentInfo from '../PlanPaymentInfo';
import {
  FEATURE_TABLE_FIRST_COLUMN_WIDTH,
  IFeatureColumn,
  TABLE_COLUMN,
} from '.';
interface IProps {
  headerElRef?: React.RefObject<HTMLElement>;
  sx?: SxProps;
  showPaymentTypeSwitch?: boolean;
  popularPlan?: IFeatureColumn;
  inFixed?: boolean;
}

const FeaturesTableHeader: FC<IProps> = ({
  headerElRef,
  sx,
  showPaymentTypeSwitch,
  popularPlan,
  inFixed,
}) => {
  const { t } = useTranslation();
  const paymentType = useRecoilValue(PricingPaymentTypeAtom);
  const pricingPlanCategory = useRecoilValue(PricingPlanCategoryState);

  const renderSaveFlag = (
    paymentPlanType: RENDER_PLAN_TYPE,
    isPopularColumn: boolean,
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
              top: isPopularColumn && !inFixed ? 0 : 0,
              right: 0,
              width: 'max-content',
              borderBottomLeftRadius: '8px',
              px: 1.2,
              py: 0.4,
              bgcolor: isPopularColumn ? 'primary.main' : '#F4EBFF',
              color: isPopularColumn ? '#fff' : 'promotionColor.fontMain',
              boxSizing: 'border-box',
            }}
          >
            <Typography
              variant='custom'
              fontSize={16}
              lineHeight={1.5}
              fontWeight={500}
              color={isPopularColumn ? '#fff' : 'primary.main'}
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

  const getCurrentPricingPaymentPlan = (column: string) => {
    if (column === 'free') {
      return 'free' as RENDER_PLAN_TYPE;
    }

    let paymentPlanType =
      paymentType === 'yearly' ? `${column}_yearly` : column;

    if (pricingPlanCategory === 'team') {
      // team plan 暂时只有月付的，所以这里都先返回月付的
      paymentPlanType = `${column}_team`;
    }

    return paymentPlanType as RENDER_PLAN_TYPE;
  };

  const renderHeaderContent = (column: string) => {
    const paymentPlanType = getCurrentPricingPaymentPlan(column);

    if (column === 'features') {
      return showPaymentTypeSwitch ? (
        <Stack alignItems={'center'} justifyContent='center' height={'100%'}>
          <PaymentTypeSwitch />
        </Stack>
      ) : null;
    }

    const isPopularColumn = column === popularPlan;

    return (
      <>
        <PlanPaymentInfo
          isPopular={isPopularColumn}
          type={paymentPlanType}
          showDesc
          sx={{
            mb: 2,
          }}
        />
        <Box mt='auto'>
          <PlanButton
            renderType={paymentPlanType}
            isPopular={isPopularColumn}
            variant={isPopularColumn ? 'contained' : 'outlined'}
            moreContentType={
              paymentPlanType === 'free' || paymentType === 'yearly'
                ? 'legal-tips'
                : 'yearly-sell'
            }
            sx={{
              borderRadius: 2,
            }}
          />
        </Box>
      </>
    );
  };

  return (
    <Stack
      direction={'row'}
      ref={headerElRef}
      sx={{
        width: '100%',
        bgcolor: '#F5F6F7',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        ...sx,
      }}
    >
      {TABLE_COLUMN.map((column, index) => {
        const isPopularColumn = column === popularPlan;

        const isLast = index === TABLE_COLUMN.length - 1;

        return (
          <Stack
            key={column}
            id={`features-table-header-${column}`}
            sx={[
              {
                position: 'relative',
                flex: 1,
                // borderRight: isLast ? '0px solid' : '1px solid',
                // borderColor: '#E0E0E0',
                px: 2,
                pt: 3,
                pb: 2,
                minWidth:
                  column === 'features'
                    ? FEATURE_TABLE_FIRST_COLUMN_WIDTH
                    : '230px',
                boxSizing: 'border-box',

                // bgcolor: '#F5F6F7',
                bgcolor: isPopularColumn ? '#F9F5FF' : '#F5F6F7',

                borderTopLeftRadius: index === 0 ? 8 : 0,
                borderTopRightRadius: isLast ? 8 : 0,
              },
              isPopularColumn
                ? {
                    // border: '2px solid #8B44FF',
                  }
                : {},
            ]}
          >
            {isPopularColumn && !inFixed ? (
              <>
                <Box
                  sx={{
                    position: 'absolute',
                    border: '1px solid',
                    borderColor: 'primary.main',
                    top: -1,
                    left: -1,
                    right: -1,
                    bottom: -1,
                  }}
                />
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
                    fontWeight: 600,
                  }}
                  direction={'row'}
                  gap={0.5}
                >
                  {t('modules:plan_features_table__most_popular')}
                  <AutoAwesomeIcon
                    sx={{
                      color: 'primary.main',
                      fontSize: 18,
                    }}
                  />
                </Stack>
              </>
            ) : null}
            {column !== 'features' &&
              renderSaveFlag(
                getCurrentPricingPaymentPlan(column),
                isPopularColumn,
              )}

            {renderHeaderContent(column)}
          </Stack>
        );
      })}
    </Stack>
  );
};

export default FeaturesTableHeader;
