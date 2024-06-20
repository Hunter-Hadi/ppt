import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';

import MenuLinkItem from './components/MenuLinkItem';

interface IProps {
  isSmallScreen?: boolean;
}

const PricingItem: FC<IProps> = ({ isSmallScreen = false }) => {
  const { t } = useTranslation();

  return (
    <MenuLinkItem link='/pricing' isSmallScreen={isSmallScreen}>
      <Typography
        variant='custom'
        fontSize={16}
        lineHeight={1.5}
        fontWeight={500}
        color='text.primary'
      >
        {t('modules:header__menu__pricing')}
      </Typography>
    </MenuLinkItem>
  );
};

export default PricingItem;
