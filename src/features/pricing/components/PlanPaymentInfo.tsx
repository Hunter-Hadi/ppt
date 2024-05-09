import { Box, Stack, SxProps, Typography } from '@mui/material';
import { capitalize } from 'lodash-es';
import { useTranslation } from 'next-i18next';
import React, { FC, useMemo } from 'react';

import { PLAN_PRICE_MAP } from '@/features/pricing/constant';
import { RENDER_PLAN_TYPE } from '@/features/pricing/type';
import { truncateToDecimalPlaces } from '@/utils/dataHelper/numberHelper';

import { transformRenderTypeToPlanType } from '../utils';
import PlanProductivityValue from './PlanProductivityValue';

interface IProps {
  type?: RENDER_PLAN_TYPE;
  showDesc?: boolean;
  sx?: SxProps;
  isPopular?: boolean;
  compareMonthlyPrice?: boolean;
}

const PlanPaymentInfo: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const { type = 'free', sx, showDesc, isPopular, compareMonthlyPrice } = props;

  const isTeamPlan = ['basic_team', 'pro_team', 'elite_team'].includes(type);

  const fontSx = useMemo(
    () => ({
      title: {
        fontSize: 20,
        fontWeight: 700,
        lineHeight: 1.2,
      },
      compareMonthlyPrice: {
        fontSize: 24,
        fontWeight: 900,
        lineHeight: 1.4,
      },
      price: {
        fontSize: 48,
        fontWeight: 900,
        lineHeight: 1.2,
      },
      paymentInfo: {
        fontSize: 16,
        fontWeight: 400,
        lineHeight: 1.5,
      },
      desc: {
        fontSize: 20,
        fontWeight: 400,
        lineHeight: 1.5,
      },
    }),
    [],
  );

  const title = useMemo(() => {
    if (type !== 'free') {
      const typeName = type.split('_')[0];
      return `MaxAI ${capitalize(typeName)}`;
    }

    // free
    return 'MaxAI Free';
  }, [type]);

  const renderPayInfo = () => {
    if (type !== 'free') {
      const isYearly = type.includes('yearly');

      if (isYearly) {
        return (
          <Stack direction={'row'} alignItems='center' spacing={0.5}>
            {compareMonthlyPrice && (
              <Typography
                variant='custom'
                component='p'
                sx={{
                  ...fontSx.compareMonthlyPrice,
                  color: '#9a989e',
                  textDecorationLine: 'line-through',
                }}
              >
                $
                {PLAN_PRICE_MAP[transformRenderTypeToPlanType(type, 'monthly')]}
              </Typography>
            )}
            <Typography variant='custom' component='p' sx={fontSx.price}>
              ${truncateToDecimalPlaces(PLAN_PRICE_MAP[type] / 12, 2)}
            </Typography>
            <Typography variant='custom' color='grey' sx={fontSx.paymentInfo}>
              {t('pricing:payment_info__per_month')} <br />
              {t('pricing:payment_info__billed_yearly')}
            </Typography>
          </Stack>
        );
      } else {
        return (
          <Stack direction={'row'} alignItems='center' spacing={0.5}>
            <Typography variant='custom' component='p' sx={fontSx.price}>
              ${PLAN_PRICE_MAP[type]}
            </Typography>
            <Typography variant='custom' color='grey' sx={fontSx.paymentInfo}>
              {t('pricing:payment_info__per_month')}
              {isTeamPlan && (
                <>
                  <br />
                  {t('pricing:payment_info__team__per_user__desc')}
                </>
              )}
            </Typography>
          </Stack>
        );
      }
    }

    // free
    return (
      <Typography variant='custom' component='p' sx={fontSx.price}>
        Free
      </Typography>
    );
  };

  const desc = useMemo(() => {
    if (type.includes('basic')) {
      return t('pricing:payment_info__basic_desc');
    }

    if (type.includes('pro')) {
      return t('pricing:payment_info__pro_desc');
    }

    if (type.includes('elite')) {
      return t('pricing:payment_info__elite_desc');
    }

    // free
    return t('pricing:payment_info__free_desc');
  }, [type, t]);

  return (
    <Stack spacing={1} sx={sx}>
      <Typography
        variant='custom'
        sx={{
          ...fontSx.title,
          color: isPopular ? 'primary.main' : 'primary.main',
        }}
      >
        {title}
      </Typography>
      {type !== 'free' ? (
        <PlanProductivityValue
          renderType={type}
          isPopular={isPopular}
          sx={{ mt: 0.5 }}
        />
      ) : (
        // 占位符
        <Box height={24} mt={0.5} />
      )}
      <Box mt={2}>{renderPayInfo()}</Box>

      {showDesc && (
        <Typography
          variant='custom'
          color='text.secondary'
          mt={1}
          sx={fontSx.desc}
        >
          {desc}
        </Typography>
      )}
    </Stack>
  );
};

export default PlanPaymentInfo;
