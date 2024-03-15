import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

import FeaturesCarousel from '@/features/landing/components/FeaturesCarousel';

import CallToActionSection from './CallToActionSection';
import HeroSection from './HeroSection';
import MaxAIInNumbers from './MaxAIInNumbers';
import TrustedBy from './TrustedBy';
import UserComment from './UserComment';

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

      {/* feature carousel */}
      <FeaturesCarousel />

      {/* trusted by */}
      <TrustedBy />

      {/* maxai in numbers */}
      <MaxAIInNumbers />

      {/* user comment */}
      <UserComment />

      {/* call to action section */}
      <CallToActionSection propRef={propRef} />
    </Stack>
  );
};

export default HomePageContent;
