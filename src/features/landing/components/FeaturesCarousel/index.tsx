import { Box, Stack, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import useAppHeaderState from '@/hooks/useAppHeaderState';

import FeaturesCarouselContent from './FeaturesCarouselContent';
import FeaturesSelector from './FeaturesSelector';

const WHITE_LIST_FEATURES_ITEM_KEY: IFeaturesCarouselItemKey[] = [
  'Chat',
  'Rewriter',
  'Quick-Reply',
  'Summary',
  'Search',
  'Art',
  'Translator',
];

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

  const { asPath, isReady } = useRouter();

  const { appHeaderHeight } = useAppHeaderState();

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

  useEffect(() => {
    if (!isReady) {
      return;
    }
    const hash = asPath.split('#')[1] as IFeaturesCarouselItemKey;
    if (WHITE_LIST_FEATURES_ITEM_KEY.includes(hash)) {
      setActiveFeature(hash);
      scrollToCenter(hash);

      if (window && window.scrollTo) {
        const featureCarouseTitle = document.querySelector(
          '#homepage-features-carousel > div > h2',
        );

        if (featureCarouseTitle) {
          const needToScrollHeight =
            featureCarouseTitle.getBoundingClientRect().top;

          const currentScrollTop =
            window.pageYOffset || document.documentElement.scrollTop;
          window.scrollTo({
            top: currentScrollTop + (needToScrollHeight - appHeaderHeight),
            behavior: 'smooth',
          });
        }
      }
    }
  }, [asPath, isReady, appHeaderHeight]);

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
      <Box maxWidth={1312} mx='auto'>
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
                onClick={() => {
                  setActiveFeature(featuresCarouselItem.value);
                  scrollToCenter(featuresCarouselItem.value);
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
