import React, { FC } from 'react';

import FeaturesItem from './FeaturesItem';
import IndustriesItem from './IndustriesItem';
import LanguageItem from './LanguageItem';
import LearningCenterItem from './LearningCenterItem';
import PricingItem from './PricingItem';

interface IProps {
  menuKey: string;
  mini?: boolean;
}

const AppHeaderMenuItem: FC<IProps> = ({ menuKey, mini }) => {
  if (menuKey === 'Industries') {
    return <IndustriesItem mini={mini} />;
  }

  if (menuKey === 'Features') {
    return <FeaturesItem mini={mini} />;
  }

  if (menuKey === 'Pricing') {
    return <PricingItem mini={mini} />;
  }

  if (menuKey === 'Learning-center') {
    return <LearningCenterItem mini={mini} />;
  }

  if (menuKey === 'Language') {
    return <LanguageItem mini={mini} />;
  }

  return null;
};

export default AppHeaderMenuItem;
