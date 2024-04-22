// plan button more content
// 一般为 配合 plan button 渲染
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import LoadingButton from '@mui/lab/LoadingButton';
import { buttonClasses } from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { SxProps } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import React, { FC, useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import { PricingPlanCategoryState } from '@/features/pricing/store';
import { RENDER_PLAN_TYPE } from '@/features/pricing/type';
import {
  getYearlyPriceOfMonthlyPriceHowMuchSaveUpEachYear,
  transformRenderTypeToPlanType,
} from '@/features/pricing/utils';

export type IPlanButtonMoreContentType =
  | 'legal-tips'
  | 'yearly-sell'
  | 'placeholder'
  | null;

interface IPlanButtonMoreContentProps {
  renderType: RENDER_PLAN_TYPE;
  contentType?: IPlanButtonMoreContentType;
  sx?: SxProps;
  disabled?: boolean;
  loading?: boolean;
  isPopular?: boolean;
  onClick?: (targetPaymentPlan: RENDER_PLAN_TYPE) => Promise<void>;
}

const PlanButtonMoreContent: FC<IPlanButtonMoreContentProps> = ({
  contentType,
  renderType,
  onClick,
  loading,
  disabled,
  isPopular,
  sx,
}) => {
  const { t } = useTranslation();

  const pricingPlanCategory = useRecoilValue(PricingPlanCategoryState);

  const yearlySellTargetPlan = useMemo(() => {
    return transformRenderTypeToPlanType(
      renderType,
      pricingPlanCategory === 'team' ? 'team_yearly' : 'yearly',
    );
  }, [renderType, pricingPlanCategory]);

  if (!contentType) {
    return <></>;
  }

  if (contentType === 'legal-tips') {
    return (
      <Stack
        className='plan-button-more-content legal-tips'
        direction='row'
        alignItems='center'
        justifyContent='center'
        height={22}
        mt={1}
        sx={sx}
        spacing={0.5}
      >
        {renderType === 'free' ? null : (
          <>
            <CheckOutlinedIcon
              sx={{
                fontSize: 18,
                color: 'primary.main',
              }}
            />

            <Typography variant='caption' color='text.primary' lineHeight={1.5}>
              {t('button:cancel_anytime')}
            </Typography>
          </>
        )}
      </Stack>
    );
  }

  if (contentType === 'yearly-sell') {
    return (
      <Stack
        className='plan-button-more-content yearly-sell'
        alignItems={'center'}
        justifyContent='center'
        height={22}
        mt={1}
      >
        <LoadingButton
          size='small'
          onClick={() => {
            onClick && onClick(yearlySellTargetPlan);
          }}
          endIcon={<ChevronRightOutlinedIcon />}
          disabled={disabled || loading}
          variant='text'
          sx={{
            width: 'max-content',
            height: '100%',
            p: 0,
            fontSize: 14,
            lineHeight: 1.5,
            letterSpacing: 0,
            // color: isPopular ? '#FF8800' : 'primary.main',
            color: isPopular ? 'promotionColor.fontMain' : 'primary.main',
            '&:hover': {
              bgcolor: 'transparent',
              // color: isPopular ? '#FF8800' : 'customColor.hoverColor',
              color: isPopular
                ? 'promotionColor.fontMain'
                : 'customColor.hoverColor',
            },
            [`& .${buttonClasses.endIcon}`]: {
              ml: 0,
            },
            ...sx,
          }}
        >
          {loading ? (
            <CircularProgress
              size={14}
              sx={{ mr: 0.6, color: 'rgba(0, 0, 0, 0.26)' }}
            />
          ) : null}
          {t('pricing:plan_button__save_with_yearly_plan', {
            PRICE: `$${getYearlyPriceOfMonthlyPriceHowMuchSaveUpEachYear(
              renderType,
            )}`,
          })}
        </LoadingButton>
      </Stack>
    );
  }

  return <></>;
};

export default PlanButtonMoreContent;
