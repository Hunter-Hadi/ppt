import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { Box, Stack, SxProps, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';

import { PricingPaymentTypeAtom } from '@/features/pricing/store';
import { RENDER_PLAN_TYPE } from '@/features/pricing/type';

import PaymentTypeSwitch from '../PaymentTypeSwitch';
import PlanButton from '../PlanButton';
import PlanPaymentInfo from '../PlanPaymentInfo';
import {
  FEATURE_TABLE_FIRST_COLUMN_WIDTH,
  IFeatureColumn,
  IFeatureTableVariant,
  TABLE_COLUMN,
} from '.';

interface IProps {
  headerElRef?: React.RefObject<HTMLDivElement>;
  sx?: SxProps;
  showPaymentTypeSwitch?: boolean;
  variant: IFeatureTableVariant;
  assignRenderPlan?: RENDER_PLAN_TYPE[];
  popularPlan?: IFeatureColumn;
  popularStyle?: 'badge' | 'tag';
}

const FeaturesTableHeader: FC<IProps> = ({
  variant,
  headerElRef,
  sx,
  showPaymentTypeSwitch,
  assignRenderPlan = [],
  popularPlan,
  popularStyle = 'tag',
}) => {
  const { t } = useTranslation();
  const paymentType = useRecoilValue(PricingPaymentTypeAtom);

  const canRenderPlan = (plan: RENDER_PLAN_TYPE) => {
    // 当 assignRenderPlan 为空时，默认全部渲染
    if (!assignRenderPlan || assignRenderPlan.length <= 0) {
      return true;
    }

    return assignRenderPlan.includes(plan);
  };

  const renderHeaderContent = (column: string) => {
    const paymentPlanType = (
      column === 'free'
        ? 'free'
        : paymentType === 'yearly'
        ? `${column}_yearly`
        : column
    ) as RENDER_PLAN_TYPE;

    if (column === 'features') {
      return showPaymentTypeSwitch ? (
        variant !== 'mini' && assignRenderPlan.length <= 0 ? (
          <PaymentTypeSwitch />
        ) : null
      ) : null;
    }

    const isPopularColumn = column === popularPlan;

    return (
      <>
        <PlanPaymentInfo
          isPopular={isPopularColumn}
          size='mini'
          variant={variant}
          type={paymentPlanType}
          showDesc
          sx={{
            mb: variant === 'mini' ? 1 : 2,
          }}
        />
        {variant === 'mini' ? (
          <Stack spacing={1} direction='row' alignItems='center'>
            <CheckOutlinedIcon
              sx={{
                fontSize: 18,
                color: 'primary.main',
              }}
            />

            <Typography variant='caption' color='text.primary'>
              {t('button:cancel_anytime')}
            </Typography>
          </Stack>
        ) : (
          <Box mt='auto'>
            <PlanButton renderType={paymentPlanType} btnDesc />
          </Box>
        )}
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
        if (
          column !== 'features' &&
          !canRenderPlan(column as RENDER_PLAN_TYPE)
        ) {
          return null;
        }

        const isPopularColumn = column === popularPlan;

        const isLast = index === TABLE_COLUMN.length - 1;

        return (
          <Stack
            key={column}
            id={`features-table-header-${column}`}
            justifyContent='center'
            sx={[
              {
                position: 'relative',
                flex: 1,
                borderRight: isLast ? '0px solid' : '1px solid',
                borderColor: '#E0E0E0',
                px: 2,
                py: 1.5,
                minWidth:
                  index === 0 ? FEATURE_TABLE_FIRST_COLUMN_WIDTH : '230px',
                boxSizing: 'border-box',

                // bgcolor: '#F5F6F7',

                bgcolor: isPopularColumn ? '#FBF5FF' : '#F5F6F7',

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
            {isPopularColumn && (
              <>
                <Box
                  sx={{
                    position: 'absolute',
                    border: '2px solid',
                    borderColor: 'primary.main',
                    top: -1,
                    left: -1,
                    right: -1,
                    bottom: -1,
                    borderTopLeftRadius: 2,
                    borderTopRightRadius: 2,
                  }}
                />
                {popularStyle === 'tag' && (
                  <Stack
                    justifyContent={'center'}
                    alignItems={'center'}
                    sx={{
                      position: 'absolute',
                      top: -34,
                      height: 28,
                      left: -1,
                      right: -1,
                      // width: '100%',
                      px: 1,
                      py: 0.5,
                      color: '#fff',
                      borderRadius: '8px 8px 0px 0px',
                      bgcolor: 'primary.main',
                    }}
                  >
                    {t('modules:plan_features_table__most_popular')}
                  </Stack>
                )}
                {popularStyle === 'badge' && (
                  <Stack
                    justifyContent={'center'}
                    alignItems={'center'}
                    sx={{
                      position: 'absolute',
                      top: 0,
                      width: 110,
                      height: 32,
                      right: 0,
                      color: '#fff',
                      bgcolor: 'primary.main',
                      borderBottomLeftRadius: 16,
                      fontSize: 14,
                      textAlign: 'center',
                    }}
                  >
                    {t('modules:plan_features_table__most_popular')}
                  </Stack>
                )}
              </>
            )}

            {renderHeaderContent(column)}
          </Stack>
        );
      })}
    </Stack>
  );
};

export default FeaturesTableHeader;
