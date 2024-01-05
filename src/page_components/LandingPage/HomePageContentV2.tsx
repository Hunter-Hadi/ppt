import { Stack } from '@mui/material';
import React from 'react';

import AIPower from './AIPower';
import HeroSection from './HeroSection';
import LoveByUser from './LoveByUser';
import OneClickMagic from './OneClickMagic';
import ProfessionalAbility from './ProfessionalAbility';

const HomePageContent = () => {
  return (
    <Stack>
      {/* heroSection */}
      <HeroSection />
      {/* ai power */}
      <AIPower />
      {/* love by user */}
      <LoveByUser />
      {/* One click magic */}
      <OneClickMagic />
      {/* professional ability */}
      <ProfessionalAbility />
      {/* Why is MaxAI.me Chrome extension the best */}
      {/* Comment 1M+ professionals choose MaxAI.me */}
      {/* call to action section */}
    </Stack>
  );
};

export default HomePageContent;
