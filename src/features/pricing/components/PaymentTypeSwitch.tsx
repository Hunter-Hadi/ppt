import { Stack, SxProps, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';
import { useRecoilState } from 'recoil';

import { IOptionType } from '@/components/select/BaseSelect';
import { PricingPaymentTypeAtom } from '@/features/pricing/store';
import { IPaymentType } from '@/features/pricing/type';
import { getMonthlyPriceOfYearlyPriceDiscount } from '@/features/pricing/utils';

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
  sx?: SxProps;
}> = ({ onChange, sx }) => {
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
      sx={sx}
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
                // bgcolor: 'promotionColor.backgroundMain',
                bgcolor: '#FF8800',
                padding: '2px 10px',
                color: 'white',
              }}
            >
              {t('modules:payment_type_switch__yearly__tip', {
                RATIO: getMonthlyPriceOfYearlyPriceDiscount('elite'),
              })}
            </Typography>
          )}
        </Stack>
      ))}
    </Stack>
  );
};
export default PaymentTypeSwitch;
