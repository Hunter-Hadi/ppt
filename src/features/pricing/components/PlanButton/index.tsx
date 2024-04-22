import { Box, Button, ButtonProps } from '@mui/material';
import { capitalize } from 'lodash-es';
import { useTranslation } from 'next-i18next';
import React, { FC, useMemo } from 'react';

import { RENDER_PLAN_TYPE } from '@/features/pricing/type';
import { renderTypeToName } from '@/features/pricing/utils';
import { APP_PROJECT_LINK } from '@/global_constants';

import PlanButtonMoreContent, {
  IPlanButtonMoreContentType,
} from './PlanButtonMoreContent';

export interface IPlanButtonProps extends ButtonProps {
  renderType: RENDER_PLAN_TYPE;
  btnText?: string;
  variant?: 'contained' | 'outlined';

  // plan button more content
  moreContentType?: IPlanButtonMoreContentType;

  isPopular?: boolean;
}

const PlanButton: FC<IPlanButtonProps> = (props) => {
  const {
    renderType,
    btnText,
    sx,
    variant = 'contained',
    moreContentType,
    isPopular,
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

      {moreContentType && (
        <PlanButtonMoreContent
          renderType={renderType}
          contentType={moreContentType}
          onClick={handleClick}
          isPopular={isPopular}
        />
      )}
    </Box>
  );
};

export default PlanButton;
