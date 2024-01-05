import React, { FC } from 'react';

import FeaturesItem from './FeaturesItem';
import IndustriesItem from './IndustriesItem';
import LanguageItem from './LanguageItem';
import LearningCenterItem from './LearningCenterItem';
import PricingItem from './PricingItem';

interface IProps {
  menuKey: string;
}

const AppHeaderMenuItem: FC<IProps> = ({ menuKey }) => {
  if (menuKey === 'Industries') {
    return <IndustriesItem />;
  }

  if (menuKey === 'Features') {
    return <FeaturesItem />;
  }

  if (menuKey === 'Pricing') {
    return <PricingItem />;
  }

  if (menuKey === 'Learning-center') {
    return <LearningCenterItem />;
  }

  if (menuKey === 'Language') {
    return <LanguageItem />;
  }

  return null;
};

export default AppHeaderMenuItem;
