import { Stack } from '@mui/material';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

import AppLoadingLayout from '@/app_layout/AppLoadingLayout';
import useLandingABTester from '@/features/ab_tester/hooks/useLandingABTester';

import CallToActionSection from './CallToActionSection';
import FeaturesExpandVariantSection from './FeaturesCarousel/FeaturesExpandVariantSection';
import FeaturesWithSceneVariantSection from './FeaturesCarousel/FeaturesWithSceneVariantSection';
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
    // variant,
    loaded,
    title,
    description,
    featuresWithScene,
    heroVideoVariant,
  } = useLandingABTester(true);

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
    <AppLoadingLayout loading={!loaded} sx={{ minHeight: '90vh' }}>
      <Stack color='text.primary'>
        {/* heroSection */}
        <HeroSection
          propRef={propRef}
          // loading={!loaded}
          title={title}
          description={description}
          heroVideoProps={{
            videoSrc:
              heroVideoVariant === 'autoplay' ? '/assets/test.mov' : undefined,
            variant: heroVideoVariant,
          }}
        />
        {/* feature  */}
        {featuresWithScene ? (
          <FeaturesWithSceneVariantSection />
        ) : (
          <FeaturesExpandVariantSection />
        )}
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
};

// const FeaturesCarouselSkeleton = () => {
//   return (
//     <Box
//       py={{
//         xs: 7,
//         md: 12,
//       }}
//       px={2}
//       sx={{
//         // 用隐藏的 Skeleton 元素来占位
//         opacity: 0,
//         mx: 'auto',
//         maxWidth: 1312,
//         width: '100%',
//       }}
//     >
//       <Skeleton variant='rounded' width={'100%'} height={600} />
//     </Box>
//   );
// };

export default HomePageContent;
