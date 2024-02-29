import { Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface IProps {
  isSmallScreen?: boolean;
}

const FeaturesItem: FC<IProps> = ({ isSmallScreen }) => {
  const { t } = useTranslation('modules');

  return (
    <Stack py={1.5} px={2}>
      <Typography
        variant='custom'
        fontSize={16}
        fontWeight={500}
        lineHeight={1.5}
      >
        {t('header__menu__features')}
      </Typography>
    </Stack>
  );
};

export default FeaturesItem;
