import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

import useLandingABTester from '@/features/ab_tester/hooks/useLandingABTester';
import FeaturesCarousel from '@/features/landing/components/FeaturesCarousel';

import CallToActionSection from './CallToActionSection';
import FeaturesExpandSection from './FeaturesCarousel/FeaturesExpandVariantSection';
import HeroSection from './HeroSection';
import MaxAIInNumbers from './MaxAIInNumbers';
import TrustedBy from './TrustedBy';
import UserComment from './UserComment';

interface IProps {
  propRef?: string;
}

const HomePageContent: FC<IProps> = ({ propRef }) => {
  const { isReady, asPath } = useRouter();

  const {
    variant,
    loaded,
    title,
    description,
    featuresCarousel,
    featuresExpand,
  } = useLandingABTester();

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
      <h1>variant: {variant}</h1>
      {/* heroSection */}
      <HeroSection
        propRef={propRef}
        loading={!loaded}
        title={title}
        description={description}
      />

      {/* feature carousel */}
      {featuresCarousel && <FeaturesCarousel />}
      {featuresExpand && <FeaturesExpandSection />}

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
