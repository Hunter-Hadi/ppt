import { Box, Skeleton, Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

import AppLoadingLayout from '@/app_layout/AppLoadingLayout';
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

  testing?: boolean;
}

const HomePageContent: FC<IProps> = ({ propRef, testing }) => {
  const { isReady, asPath } = useRouter();

  const {
    // variant,
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

  if (testing) {
    return (
      <AppLoadingLayout loading={!loaded} sx={{ minHeight: '50vh' }}>
        <Stack color='text.primary'>
          {/* heroSection */}
          <HeroSection
            propRef={propRef}
            // loading={!loaded}
            title={title}
            description={description}
          />

          {/* feature carousel */}
          {featuresCarousel && <FeaturesCarousel />}
          {featuresExpand && <FeaturesExpandSection />}
          {/* {!loaded && <FeaturesCarouselSkeleton />} */}

          {/* trusted by */}
          <TrustedBy />

          {/* maxai in numbers */}
          <MaxAIInNumbers />

          {/* user comment */}
          <UserComment />

          {/* call to action section */}
          <CallToActionSection propRef={propRef} />
        </Stack>
      </AppLoadingLayout>
    );
  }

  return (
    <Stack color='text.primary'>
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
      {!loaded && <FeaturesCarouselSkeleton />}

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

FeaturesCarousel;

const FeaturesCarouselSkeleton = () => {
  return (
    <Box
      py={{
        xs: 7,
        md: 12,
      }}
      px={2}
      sx={{
        // 用隐藏的 Skeleton 元素来占位
        opacity: 0,
        mx: 'auto',
        maxWidth: 1312,
        width: '100%',
      }}
    >
      <Skeleton variant='rounded' width={'100%'} height={600} />
    </Box>
  );
};

export default HomePageContent;
