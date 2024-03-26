import styled from '@emotion/styled';
import {
  Box,
  Stack,
  Theme,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from '@mui/material';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useRecoilState } from 'recoil';

import { IOptionType } from '@/components/select/BaseSelect';

import { PLAN_PRICE_MAP } from '../constant';
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
    label: 'payment_type_switch__yearly',
    value: 'yearly',
  },
  {
    label: 'payment_type_switch__monthly',
    value: 'monthly',
  },
];

const PaymentTypeSwitch: FC<{
  onChange?: (newValue: IOptionType) => void;
}> = ({ onChange }) => {
  const { t } = useTranslation(['modules']);
  const [tooltipOpen, setTooltipOpen] = useState(false);
  const [paymentType, setPaymentType] = useRecoilState(PricingPaymentTypeAtom);

  const YearlyTooltip = (
    <Typography variant='caption'>
      {t('payment_type_switch__tooltip1')}
      <br />
      {t('payment_type_switch__tooltip2', {
        num: Math.round(
          (1 - PLAN_PRICE_MAP['elite_yearly'] / PLAN_PRICE_MAP['elite']) * 100,
        ),
      })}
    </Typography>
  );

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
      onMouseEnter={() => setTooltipOpen(true)}
      onMouseLeave={() => setTooltipOpen(false)}
    >
      <Box
        width={110}
        borderRadius={10}
        bgcolor='primary.main'
        position='absolute'
        top={0}
        bottom={0}
        left={0}
        sx={{
          // transition: 'transform .25s ease'
          transform:
            paymentType === 'yearly' ? 'translateX(0px)' : 'translateX(100%)',
        }}
      />

      <ColorTooltip
        open={tooltipOpen}
        title={YearlyTooltip}
        placement='top'
        arrow
      >
        <Box width={110} position='absolute' top={5} bottom={0} left={0}></Box>
      </ColorTooltip>

      {PAYMENT_TYPES.map((type) => (
        <Box
          key={type.value}
          width={110}
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
          }}
        >
          <Typography
            variant='body2'
            color={type.value === paymentType ? 'white' : 'text.secondary'}
          >
            {t(type.label)}
          </Typography>
        </Box>
      ))}
    </Stack>
  );
};
export default PaymentTypeSwitch;
