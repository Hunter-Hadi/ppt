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

  const { asPath, isReady, query } = useRouter();

  const { appHeaderHeight } = useAppHeaderState();

  // const theme = useTheme();
  // const isDownSm = useMediaQuery(theme.breakpoints.down('sm')); // 屏幕宽度小于 768 时为 true

  const featuresSelectorScrollContainerRef = React.useRef<HTMLDivElement>(null);

  const [activeFeature, setActiveFeature] =
    React.useState<IFeaturesCarouselItemKey>(FEATURES_CAROUSEL_LIST[0].value);

  const scrollToView = (value: IFeaturesCarouselItemKey) => {
    const container = featuresSelectorScrollContainerRef.current;

    const featureCarouselItem = document.getElementById(
      `feature-carousel-${value}`,
    );
    if (container && featureCarouselItem) {
      const itemReact = featureCarouselItem.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      // 子元素左侧相对于容器左侧的位置
      const elemLeftRelativeToContainer = itemReact.left - containerRect.left;

      // 子元素右侧相对于容器左侧的位置
      const elemRightRelativeToContainer =
        itemReact.right - containerRect.left + container.scrollLeft;

      if (elemLeftRelativeToContainer < container.scrollLeft) {
        // 子元素的最左侧在容器的可视范围左侧之外，需要向左滚动
        container.scrollBy({
          left: elemLeftRelativeToContainer,
          behavior: 'smooth',
        });
      } else if (
        elemRightRelativeToContainer >
        container.scrollLeft + containerRect.width
      ) {
        // 子元素的最右侧在容器的可视范围右侧之外，需要向右滚动
        // 计算滚动的目标位置：元素最右侧相对于容器左侧的位置减去容器的宽度

        container.scrollBy({
          left: elemRightRelativeToContainer - containerRect.width,
          behavior: 'smooth',
        });
      }
    }
  };

  // 判断是否根据 query 滚动到 feature 模块
  const isScrollIntoFeature = React.useRef(false);
  useEffect(() => {
    if (!isReady) {
      return;
    }
    const queryFeature = (query.feature?.toString() ??
      '') as IFeaturesCarouselItemKey;
    if (WHITE_LIST_FEATURES_ITEM_KEY.includes(queryFeature)) {
      setActiveFeature(queryFeature);
      scrollToView(queryFeature);

      // if (window && window.scrollTo) {
      //   const featureCarouseTitle = document.querySelector(
      //     '#homepage-features-carousel > div > h2',
      //   );

      //   if (featureCarouseTitle) {
      //     const needToScrollHeight =
      //       featureCarouseTitle.getBoundingClientRect().top;

      //     const currentScrollTop =
      //       window.pageYOffset || document.documentElement.scrollTop;
      //     window.scrollTo({
      //       top: currentScrollTop + (needToScrollHeight - appHeaderHeight),
      //       behavior: 'smooth',
      //     });
      //   }
      // }
      isScrollIntoFeature.current = true;
    }
  }, [asPath, isReady, appHeaderHeight, query]);

  const timer = React.useRef<number | null>(null);
  const stopAutoPlay = React.useRef(false);
  useEffect(() => {
    if (isScrollIntoFeature.current) {
      // 如果根据 query 滚动到了 feature 模块，不需要自动播放
      return;
    }
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
      scrollToView(FEATURES_CAROUSEL_LIST[nextIndex].value);
    }, 3500);

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, [activeFeature, isReady]);

  return (
    <Box
      id='homepage-features-carousel'
      py={{
        xs: 7,
        md: 12,
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
            xs: 36,
            sm: 48,
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
                // onMouseEnter={() => {
                //   if (!isDownSm) {
                //     setActiveFeature(featuresCarouselItem.value);
                //     scrollToView(featuresCarouselItem.value);
                //   }
                // }}
                onClick={() => {
                  // if (isDownSm) {
                  setActiveFeature(featuresCarouselItem.value);
                  scrollToView(featuresCarouselItem.value);
                  // }
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
