import { Stack, SxProps, Typography } from '@mui/material';
import { capitalize } from 'lodash-es';
import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { RENDER_PLAN_TYPE } from '@/features/pricing/type';

import { PLAN_PRICE_MAP } from '../constant';
interface IProps {
  type?: RENDER_PLAN_TYPE;
  showDesc?: boolean;
  sx?: SxProps;
  size?: 'normal' | 'mini';
  variant?: 'normal' | 'mini';
}

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
  const { t } = useTranslation(['modules']);
  const {
    type = 'free',
    sx,
    showDesc,
    size = 'normal',
    variant = 'normal',
  } = props;

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
              {t('plan_payment_info__per_month')} <br />
              {t('plan_payment_info__billed_yearly')}
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
              {t('plan_payment_info__per_month')}
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
      return t('plan_payment_info__pro_desc');
    }

    if (type == 'elite' || type === 'elite_yearly') {
      return t('plan_payment_info__elite_desc');
    }

    // free
    return t('plan_payment_info__free_desc');
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
      <Typography variant='custom' sx={fontSx.title}>
        {title}
      </Typography>
      {renderPayInfo()}
      {showDesc && (
        <Typography variant='custom' sx={fontSx.desc}>
          {desc}
        </Typography>
      )}
    </Stack>
  );
};

export default PlanPaymentInfo;
