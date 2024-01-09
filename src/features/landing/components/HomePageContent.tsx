import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import AIPower from './AIPower';
import CallToActionSection from './CallToActionSection';
import HeroSection from './HeroSection';
import LoveByUser from './LoveByUser';
import OneClickMagic from './OneClickMagic';
import ProfessionalAbility from './ProfessionalAbility';
import UserComment from './UserComment';
import WhyMe from './WhyMe';

const HomePageContent = () => {
  const { isReady, asPath } = useRouter();

  useEffect(() => {
    if (isReady && asPath) {
      const hash = asPath.split('#')[1];
      const element = document.getElementById(`homepage-${hash}`);
      if (element) {
        element.scrollIntoView();
      }
    }
  }, [isReady, asPath]);

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
      <WhyMe />
      {/* Comment 1M+ professionals choose MaxAI.me */}
      <UserComment />
      {/* call to action section */}
      <CallToActionSection />
    </Stack>
  );
};

export default HomePageContent;
