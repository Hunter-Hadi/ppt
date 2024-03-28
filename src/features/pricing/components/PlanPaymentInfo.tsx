import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import { Box, Stack, SxProps, Typography } from '@mui/material';
import { capitalize } from 'lodash-es';
import { useTranslation } from 'next-i18next';
import React, { FC, useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import { PLAN_PRICE_MAP } from '@/features/pricing/constant';
import { PricingPaymentTypeAtom } from '@/features/pricing/store';
import { RENDER_PLAN_TYPE } from '@/features/pricing/type';

interface IProps {
  type?: RENDER_PLAN_TYPE;
  showDesc?: boolean;
  sx?: SxProps;
  size?: 'normal' | 'mini';
  variant?: 'normal' | 'mini';
  isPopular?: boolean;
}

const PlanProductivity = {
  free: 1,
  pro: 3,
  elite: 5,
  pro_yearly: 3,
  elite_yearly: 5,
};

const fontSxMap = {
  normal: {
    title: {
      fontSize: 20,
      fontWeight: 700,
      lineHeight: 1.2,
    },
    price: {
      fontSize: 48,
      fontWeight: 900,
      lineHeight: 1.2,
    },
    paymentInfo: {
      fontSize: 16,
      fontWeight: 500,
      lineHeight: 1.5,
    },
    desc: {
      fontSize: 20,
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },
  mini: {
    title: {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: 1.2,
    },
    price: {
      fontSize: 32,
      fontWeight: 700,
      lineHeight: 1.2,
    },
    paymentInfo: {
      fontSize: 14,
      fontWeight: 500,
      lineHeight: 1.35,
    },
    desc: {
      fontSize: 16,
      fontWeight: 400,
      lineHeight: 1.5,
    },
  },
};

const PlanPaymentInfo: FC<IProps> = (props) => {
  const { t } = useTranslation();
  const {
    type = 'free',
    sx,
    showDesc,
    size = 'normal',
    variant = 'normal',
    isPopular,
  } = props;

  const paymentType = useRecoilValue(PricingPaymentTypeAtom);

  const fontSx = useMemo(() => fontSxMap[size], [size]);

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
          <Stack direction={'row'} alignItems='center' spacing={1}>
            <Typography variant='custom' component='p' sx={fontSx.price}>
              ${PLAN_PRICE_MAP[type]}
            </Typography>
            <Typography variant='custom' color='grey' sx={fontSx.paymentInfo}>
              {t('modules:plan_payment_info__per_month')} <br />
              {t('modules:plan_payment_info__billed_yearly')}
            </Typography>
          </Stack>
        );
      } else {
        return (
          <Stack direction={'row'} alignItems='center' spacing={1}>
            <Typography variant='custom' component='p' sx={fontSx.price}>
              ${PLAN_PRICE_MAP[type]}
            </Typography>
            <Typography
              variant='custom'
              color='grey'
              pt={1}
              sx={fontSx.paymentInfo}
            >
              {t('modules:plan_payment_info__per_month')}
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
    if (type == 'pro' || type === 'pro_yearly') {
      return t('modules:plan_payment_info__pro_desc');
    }

    if (type == 'elite' || type === 'elite_yearly') {
      return t('modules:plan_payment_info__elite_desc');
    }

    // free
    return t('modules:plan_payment_info__free_desc');
  }, [type, t]);

  if (variant === 'mini') {
    return (
      <Stack spacing={1} sx={sx}>
        <Typography variant='custom' sx={fontSx.title}>
          {title}
        </Typography>
        {showDesc && (
          <Typography variant='custom' sx={fontSx.desc}>
            {desc}
          </Typography>
        )}
      </Stack>
    );
  }

  return (
    <Stack spacing={1} sx={sx}>
      {/* 付费的plan，并且年付的才显示 */}
      {type !== 'free' && paymentType === 'yearly' ? (
        <Stack
          direction={'row'}
          alignItems='center'
          justifyContent='space-between'
          sx={{
            width: 'max-content',
            borderRadius: 2,
            px: 1,
            py: '1px',
            border: '1px solid',
            borderColor: isPopular ? '#34A853' : '#ABEFC6',
            bgcolor: isPopular ? '#34A853' : '#DCFAE6',
            color: isPopular ? '#fff' : '#067647',
            boxSizing: 'border-box',
          }}
        >
          <Typography
            variant='custom'
            fontSize={16}
            lineHeight={1.5}
            fontWeight={500}
            color='inherit'
          >
            {t('pages:pricing__save_up_to', {
              NUM: Math.round(
                (1 -
                  PLAN_PRICE_MAP[type] /
                    PLAN_PRICE_MAP[
                      type.replace('_yearly', '') as RENDER_PLAN_TYPE
                    ]) *
                  100,
              ),
            })}
          </Typography>
        </Stack>
      ) : null}
      {/* 免费用户用占位符 */}
      {type === 'free' && paymentType === 'yearly' ? (
        <Box
          sx={{
            height: 28,
          }}
        />
      ) : null}
      <Typography variant='custom' sx={fontSx.title}>
        {title}
      </Typography>
      <Stack direction={'row'} alignItems='center' spacing={0.5}>
        <Typography
          variant='custom'
          fontSize={16}
          lineHeight={1.5}
          color='primary.main'
        >
          {t('pages:pricing__productivity')}
        </Typography>
        <ProductivityValue value={PlanProductivity[type]} />
      </Stack>
      {renderPayInfo()}
      {showDesc && (
        <Typography variant='custom' sx={fontSx.desc}>
          {desc}
        </Typography>
      )}
    </Stack>
  );
};

const ProductivityValue: FC<{ value: number }> = ({ value }) => {
  return (
    <Stack direction={'row'} alignItems='center' spacing={0.4}>
      {Array.from({ length: value }).map((_, index) => {
        return (
          <RocketLaunchIcon
            key={index}
            sx={{ color: 'primary.main', fontSize: 18 }}
          />
        );
      })}
    </Stack>
  );
};

export default PlanPaymentInfo;
