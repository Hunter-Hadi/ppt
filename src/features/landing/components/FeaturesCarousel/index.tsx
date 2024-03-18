import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import FeaturesCarouselContent from './FeaturesCarouselContent';
import FeaturesSelector from './FeaturesSelector';

export type IFeaturesCarouselItemKey =
  | 'Chat'
  | 'Rewriter'
  | 'Quick-Reply'
  | 'Summary'
  | 'Search'
  | 'Art'
  | 'Translator';

export interface IFeaturesCarouselItem {
  value: IFeaturesCarouselItemKey;
  icon: string;
  label: string;
}

const FEATURES_CAROUSEL_LIST: IFeaturesCarouselItem[] = [
  {
    value: 'Chat',
    icon: 'chat',
    label: 'pages:home_page__features_carousel__feature_chat__label',
  },
  {
    value: 'Rewriter',
    icon: 'rewriter',
    label: 'pages:home_page__features_carousel__feature_rewriter__label',
  },
  {
    value: 'Quick-Reply',
    icon: 'quick-reply',
    label: 'pages:home_page__features_carousel__feature_reply__label',
  },
  {
    value: 'Summary',
    icon: 'summary',
    label: 'pages:home_page__features_carousel__feature_summary__label',
  },
  {
    value: 'Search',
    icon: 'search',
    label: 'pages:home_page__features_carousel__feature_search__label',
  },
  {
    value: 'Art',
    icon: 'art',
    label: 'pages:home_page__features_carousel__feature_art__label',
  },
  {
    value: 'Translator',
    icon: 'translator',
    label: 'pages:home_page__features_carousel__feature_translator__label',
  },
];

const FeaturesCarousel = () => {
  const { t } = useTranslation();

  const theme = useTheme();
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm')); // 屏幕宽度小于 768 时为 true

  const featuresSelectorScrollContainerRef = React.useRef<HTMLDivElement>(null);

  const [activeFeature, setActiveFeature] =
    React.useState<IFeaturesCarouselItemKey>(FEATURES_CAROUSEL_LIST[0].value);

  const scrollToCenter = (value: IFeaturesCarouselItemKey) => {
    const container = featuresSelectorScrollContainerRef.current;

    const featureCarouselItem = document.getElementById(
      `feature-carousel-${value}`,
    );
    if (container && featureCarouselItem) {
      const itemLeft = featureCarouselItem.offsetLeft; // 子元素的左边距
      const itemWidth = featureCarouselItem.offsetWidth; // 子元素的宽度
      const containerWidth = container.offsetWidth; // 容器的宽度

      // 计算容器需要滚动的距离：子元素左边距 + 子元素宽度一半 - 容器宽度一半
      const scrollLeft = itemLeft + itemWidth / 2 - containerWidth / 2;

      // 执行滚动动画
      container.scroll({ left: scrollLeft, behavior: 'smooth' });
    }
  };

  const timer = React.useRef<number | null>(null);
  const stopAutoPlay = React.useRef(false);
  useEffect(() => {
    // 计时器，自动去更新 activeFeature， 每次更新至 USER_COMMENT_TYPES 下一个，超出长度回到第一个
    timer.current = window.setInterval(() => {
      if (stopAutoPlay.current) {
        return;
      }

      const currentIndex = FEATURES_CAROUSEL_LIST.findIndex(
        (featureCarouselItem) => featureCarouselItem.value === activeFeature,
      );
      const nextIndex = (currentIndex + 1) % FEATURES_CAROUSEL_LIST.length;
      setActiveFeature(FEATURES_CAROUSEL_LIST[nextIndex].value);
      scrollToCenter(FEATURES_CAROUSEL_LIST[nextIndex].value);
    }, 3500);

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, [activeFeature]);

  return (
    <Box
      id='homepage-features-carousel'
      py={{
        xs: 7,
        md: 14,
      }}
      px={2}
      bgcolor='white'
    >
      <Box
        maxWidth={1312}
        mx='auto'
        onMouseEnter={() => {
          stopAutoPlay.current = true;
        }}
        onMouseLeave={() => {
          stopAutoPlay.current = false;
        }}
      >
        <Typography
          variant='custom'
          component='h2'
          textAlign={'center'}
          fontSize={{
            xs: 24,
            sm: 32,
            lg: 48,
          }}
          mb={6}
        >
          {t('pages:home_page__features_carousel__title')}
        </Typography>

        <Stack
          direction='row'
          flexWrap={'nowrap'}
          spacing={2.5}
          ref={featuresSelectorScrollContainerRef}
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
                key={featuresCarouselItem.value}
                onMouseEnter={() => {
                  if (!isDownSm) {
                    setActiveFeature(featuresCarouselItem.value);
                    scrollToCenter(featuresCarouselItem.value);
                  }
                }}
                onClick={() => {
                  if (isDownSm) {
                    setActiveFeature(featuresCarouselItem.value);
                    scrollToCenter(featuresCarouselItem.value);
                  }
                }}
                id={`feature-carousel-${featuresCarouselItem.value}`}
              >
                <FeaturesSelector
                  active={activeFeature === featuresCarouselItem.value}
                  {...featuresCarouselItem}
                />
              </Box>
            );
          })}
        </Stack>

        <FeaturesCarouselContent activeFeatureItem={activeFeature} />
      </Box>
    </Box>
  );
};

export default FeaturesCarousel;
