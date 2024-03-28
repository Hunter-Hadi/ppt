import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { Box, Button, ButtonProps, Stack, Typography } from '@mui/material';
import { capitalize } from 'lodash-es';
import { useTranslation } from 'next-i18next';
import React, { FC, useMemo } from 'react';

import { RENDER_PLAN_TYPE } from '@/features/pricing/type';
import { APP_PROJECT_LINK } from '@/global_constants';

import { renderTypeToName } from '../utils';

export interface IPlanButtonProps extends ButtonProps {
  renderType: RENDER_PLAN_TYPE;
  btnText?: string;
  variant?: 'contained' | 'outlined';
  // show btn desc
  btnDesc?: boolean;
}

const PlanButton: FC<IPlanButtonProps> = (props) => {
  const {
    renderType,
    btnText,
    sx,
    variant = 'contained',
    btnDesc,
    ...resetProps
  } = props;

  const { t } = useTranslation();

  const planName = useMemo(() => {
    return renderTypeToName(renderType);
  }, [renderType]);

  const text = useMemo(() => {
    if (btnText) {
      return btnText;
    }

    if (planName === 'free') {
      return t('button:start_for', { plan: capitalize(planName) });
    }

    return t('button:upgrade_to', { plan: capitalize(planName) });
    // return `Start your 3-day free trial`;
  }, [btnText, planName, t]);

  const handleClick = async () => {
    try {
      window.open(`${APP_PROJECT_LINK}/pricing`, '_blank');
    } catch (error) {
      console.error('post create_checkout_session error:', error);
    }
  };

  return (
    <Box component={'span'}>
      <Button
        fullWidth
        variant={variant}
        onClick={handleClick}
        sx={{
          height: 56,
          fontSize: 18,
          fontWeight: 600,
          ...sx,
        }}
        {...resetProps}
      >
        {text}
      </Button>

      {btnDesc && (
        <Stack
          spacing={0.2}
          // mt={0.5}
          py={0.5}
          direction='row'
          alignItems='center'
          justifyContent='center'
        >
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
      )}
    </Box>
  );
};

export default PlanButton;
