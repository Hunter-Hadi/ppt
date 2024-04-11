import styled from '@emotion/styled';
import {
  Stack,
  Theme,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';
import { useRecoilState } from 'recoil';

import { IOptionType } from '@/components/select/BaseSelect';
import { PLAN_PRICE_MAP } from '@/features/pricing/constant';

import { PricingPaymentTypeAtom } from '../store';
import { IPaymentType } from '../type';

const ColorTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => {
  const t = theme as Theme;
  return {
    [`& .${tooltipClasses.arrow}`]: {
      color: t.palette.primary.main,
    },
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: t.palette.primary.main,
      color: 'white',
    },
  };
});

const PAYMENT_TYPES = [
  {
    label: 'modules:payment_type_switch__yearly',
    value: 'yearly',
  },
  {
    label: 'modules:payment_type_switch__monthly',
    value: 'monthly',
  },
];

const PaymentTypeSwitch: FC<{
  onChange?: (newValue: IOptionType) => void;
}> = ({ onChange }) => {
  const { t } = useTranslation();
  const [paymentType, setPaymentType] = useRecoilState(PricingPaymentTypeAtom);

  return (
    <Stack
      direction='row'
      borderRadius={10}
      alignItems='center'
      width='max-content'
      border={'1px solid'}
      borderColor='primary.main'
      position='relative'
      mx='auto'
    >
      {PAYMENT_TYPES.map((type) => (
        <Stack
          direction={'row'}
          alignItems={'center'}
          gap={1}
          key={type.value}
          minWidth={110}
          borderRadius={10}
          textAlign='center'
          p={1}
          zIndex={1}
          onClick={() => {
            setPaymentType(type.value as IPaymentType);
            onChange && onChange(type);
          }}
          sx={{
            boxSizing: 'border-box',
            cursor: 'pointer',
            bgcolor:
              type.value === paymentType ? 'primary.main' : 'transparent',
          }}
        >
          <Typography
            width={'100%'}
            textAlign={'center'}
            variant='body2'
            color={type.value === paymentType ? 'white' : 'text.secondary'}
          >
            {t(type.label)}
          </Typography>
          {type.value === 'yearly' && (
            <Typography
              flexShrink={0}
              component={'span'}
              variant={'custom'}
              sx={{
                borderRadius: '100px',
                fontSize: '14px',
                border: '1px solid #F80',
                bgcolor: 'promotionColor.backgroundMain',
                padding: '2px 10px',
                color: 'white',
              }}
            >
              {t('modules:payment_type_switch__yearly__tip', {
                RATIO: Math.round(
                  (1 -
                    PLAN_PRICE_MAP['elite_yearly'] / PLAN_PRICE_MAP['elite']) *
                    100,
                ),
              })}
            </Typography>
          )}
        </Stack>
      ))}
    </Stack>
  );
};
export default PaymentTypeSwitch;
