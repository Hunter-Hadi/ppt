import React, { FC } from 'react';

import FeaturesItem from './FeaturesItem';
import IndustriesItem from './IndustriesItem';
import LanguageItem from './LanguageItem';
import LearningCenterItem from './LearningCenterItem';
import PricingItem from './PricingItem';

interface IProps {
  menuKey: string;
  isSmallScreen?: boolean;
}

const AppHeaderMenuItem: FC<IProps> = ({ menuKey, isSmallScreen }) => {
  if (menuKey === 'Industries') {
    return <IndustriesItem isSmallScreen={isSmallScreen} />;
  }

  if (menuKey === 'Features') {
    return <FeaturesItem isSmallScreen={isSmallScreen} />;
  }

  if (menuKey === 'Pricing') {
    return <PricingItem isSmallScreen={isSmallScreen} />;
  }

  if (menuKey === 'Learning-center') {
    return <LearningCenterItem isSmallScreen={isSmallScreen} />;
  }

  if (menuKey === 'Language') {
    return <LanguageItem isSmallScreen={isSmallScreen} />;
  }

  return null;
};

export default AppHeaderMenuItem;
