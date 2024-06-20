import React, { FC } from 'react';

import LanguageItem from './LanguageItem';
import PricingItem from './PricingItem';
import ProductsItem from './ProductsItem';
import ResourcesItem from './ResourcesItem';

interface IProps {
  menuKey: string;
  isSmallScreen?: boolean;
}

const AppHeaderMenuItem: FC<IProps> = ({ menuKey, isSmallScreen }) => {
  if (menuKey === 'Resources') {
    return <ResourcesItem isSmallScreen={isSmallScreen} />;
  }

  if (menuKey === 'Pricing') {
    return <PricingItem isSmallScreen={isSmallScreen} />;
  }

  if (menuKey === 'Language') {
    return <LanguageItem isSmallScreen={isSmallScreen} />;
  }

  if (menuKey === 'Products') {
    return <ProductsItem isSmallScreen={isSmallScreen} />;
  }

  return null;
};

export default AppHeaderMenuItem;
