import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

import AIPower from './AIPower';
import CallToActionSection from './CallToActionSection';
import HeroSection from './HeroSection';
import LoveByUser from './LoveByUser';
import NavigateToPrivacyPage from './NavigateToPrivacyPage';
import OneClickMagic from './OneClickMagic';
import ProfessionalAbility from './ProfessionalAbility';
import UserComment from './UserComment';
import WhyMe from './WhyMe';

interface IProps {
  propRef?: string;
}

const HomePageContent: FC<IProps> = ({ propRef }) => {
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
    <Stack color='text.primary'>
      {/* heroSection */}
      <HeroSection propRef={propRef} />
      {/* ai power */}
      <AIPower />
      {/* love by user */}
      <LoveByUser />
      {/* One click magic */}
      <OneClickMagic />
      {/* professional ability */}
      <ProfessionalAbility />
      {/* Why is MaxAI.me Chrome extension the best */}
      <WhyMe propRef={propRef} />
      {/* Comment 1M+ professionals choose MaxAI.me */}
      <UserComment />
      {/* navigate to privacy page section */}
      <NavigateToPrivacyPage />
      {/* call to action section */}
      <CallToActionSection propRef={propRef} />
    </Stack>
  );
};

export default HomePageContent;
