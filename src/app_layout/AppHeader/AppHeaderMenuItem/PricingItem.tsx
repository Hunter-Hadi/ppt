import { MenuItem, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { isInIframe } from '@/utils/utils';

interface IProps {
  mini?: boolean;
}

const PricingItem: FC<IProps> = ({ mini = false }) => {
  const { t } = useTranslation('modules');

  const textRender = () => (
    <Typography
      variant='custom'
      fontSize={16}
      lineHeight={1.5}
      fontWeight={500}
      sx={{
        cursor: 'pointer',
      }}
    >
      {t('header__menu__pricing')}
    </Typography>
  );

  const handleClick = () => {
    window.open('/pricing', isInIframe() ? '_blank' : '_self');
  };

  if (mini) {
    return <MenuItem onClick={handleClick}>{textRender()}</MenuItem>;
  }

  return (
    <Stack px={2} onClick={handleClick}>
      {textRender()}
    </Stack>
  );
};

export default PricingItem;
