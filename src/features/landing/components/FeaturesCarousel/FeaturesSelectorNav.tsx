import ArrowBackIosNewOutlinedIcon from '@mui/icons-material/ArrowBackIosNewOutlined';
import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import React, { FC } from 'react';

import {
  FEATURES_CAROUSEL_LIST,
  IFeaturesCarouselItemKey,
} from '@/features/landing/components/FeaturesCarousel';
import FeaturesSelector from '@/features/landing/components/FeaturesCarousel/FeaturesSelector';

interface IProps {
  activeValue: IFeaturesCarouselItemKey;
  containerRef: React.RefObject<HTMLDivElement>;
  onClick?: (targetItem: IFeaturesCarouselItemKey) => void;
  showNavButton?: boolean;
}

const FeaturesSelectorNav: FC<IProps> = ({
  onClick,
  activeValue,
  containerRef,
  showNavButton,
}) => {
  return (
    <Box
      sx={{
        position: 'relative',
      }}
    >
      <Stack
        direction='row'
        flexWrap={'nowrap'}
        spacing={2.5}
        ref={containerRef}
        sx={{
          overflowX: 'auto',
          mb: 4,
          '&::-webkit-scrollbar': {
            display: 'none',
          },
        }}
      >
        {FEATURES_CAROUSEL_LIST.map((featuresCarouselItem) => {
          return (
            <Box
              key={featuresCarouselItem}
              // onMouseEnter={() => {
              //   if (!isDownSm) {
              //     setActiveFeature(featuresCarouselItem.value);
              //     scrollToView(featuresCarouselItem.value);
              //   }
              // }}
              onClick={() => {
                // if (isDownSm) {
                onClick && onClick(featuresCarouselItem);
                // setActiveFeature(featuresCarouselItem.value);
                // scrollToView(featuresCarouselItem.value);
                // }
              }}
              id={`feature-carousel-${featuresCarouselItem}`}
            >
              <FeaturesSelector
                activeCarouseItem={featuresCarouselItem}
                active={activeValue === featuresCarouselItem}
              />
            </Box>
          );
        })}
      </Stack>
      {showNavButton && (
        <>
          <Button
            sx={{
              position: 'absolute',
              padding: {
                xs: 1.6,
                sm: 1,
              },
              borderRadius: '50%',
              top: '50%',
              right: '-12px',
              minWidth: 'auto',
              transform: 'translateY(-50%)',
            }}
            variant='outlined'
            onClick={() => {
              const currentIndex = FEATURES_CAROUSEL_LIST.findIndex(
                (featuresCarouselItem) => featuresCarouselItem === activeValue,
              );
              const nextIndex =
                (currentIndex + 1) % FEATURES_CAROUSEL_LIST.length;
              onClick && onClick(FEATURES_CAROUSEL_LIST[nextIndex]);
            }}
          >
            <ArrowForwardIosOutlinedIcon
              sx={{
                fontSize: {
                  xs: 20,
                  sm: 18,
                },
              }}
            />
          </Button>

          <Button
            sx={{
              position: 'absolute',
              padding: {
                xs: 1.6,
                sm: 1,
              },
              borderRadius: '50%',
              top: '50%',
              left: '-12px',
              minWidth: 'auto',
              transform: 'translateY(-50%)',
            }}
            variant='outlined'
            onClick={() => {
              const currentIndex = FEATURES_CAROUSEL_LIST.findIndex(
                (featuresCarouselItem) => featuresCarouselItem === activeValue,
              );
              const prevIndex =
                (currentIndex - 1 + FEATURES_CAROUSEL_LIST.length) %
                FEATURES_CAROUSEL_LIST.length;
              onClick && onClick(FEATURES_CAROUSEL_LIST[prevIndex]);
            }}
          >
            <ArrowBackIosNewOutlinedIcon
              sx={{
                fontSize: {
                  xs: 20,
                  sm: 18,
                },
              }}
            />
          </Button>
        </>
      )}
    </Box>
  );
};

export default FeaturesSelectorNav;
