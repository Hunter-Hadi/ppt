import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';

interface IProps {
  isSmallScreen?: boolean;
}

const FeaturesItem: FC<IProps> = ({ isSmallScreen }) => {
  const { t } = useTranslation();

  return (
    <Stack py={1.5} px={2}>
      <Typography
        variant='custom'
        fontSize={16}
        fontWeight={500}
        lineHeight={1.5}
      >
        {t('modules:header__menu__features')}
      </Typography>
    </Stack>
  );
};

export default FeaturesItem;
