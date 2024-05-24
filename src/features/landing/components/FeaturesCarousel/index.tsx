import { Box, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';

import useAppHeaderState from '@/hooks/useAppHeaderState';

import FeaturesCarouselContent from './FeaturesCarouselContent';
import FeaturesSelectorNav from './FeaturesSelectorNav';

const WHITE_LIST_FEATURES_ITEM_KEY: IFeaturesCarouselItemKey[] = [
  'Chat',
  'Rewriter',
  'Summary',
  'Reply',
  'Reader',
  'Prompts',
  'Search',
  'Art',
  'Translator',
];

export type IFeaturesCarouselItemKey =
  | 'Chat'
  | 'Rewriter'
  | 'Summary'
  | 'Reply'
  | 'Reader'
  | 'Prompts'
  | 'Search'
  | 'Art'
  | 'Translator';
export const FEATURES_CAROUSEL_LIST: IFeaturesCarouselItemKey[] = [
  'Chat',
  'Rewriter',
  'Summary',
  'Reply',
  'Reader',
  'Prompts',
  'Search',
  'Art',
  'Translator',
];

export const FEATURES_CONTENT_DATA_MAP: Record<
  IFeaturesCarouselItemKey,
  {
    icon: string;
    label: string;
    fullName: string;
    title: string;
    imageUrl: string;
    descriptionLabel?: string;
    descriptionList: string[];
  }
> = {
  Chat: {
    icon: 'chat',
    label: 'pages:home_page__features_carousel__feature_chat__label',
    fullName: 'pages:home_page__features_carousel__feature_chat__label',
    title: 'pages:home_page__features_carousel__feature_chat__title',
    imageUrl: '/assets/landing/feature-carousel/chat.png',
    descriptionLabel:
      'pages:home_page__features_carousel__feature_chat__description_label',
    descriptionList: [
      'pages:home_page__features_carousel__feature_chat__description1',
      'pages:home_page__features_carousel__feature_chat__description2',
      'pages:home_page__features_carousel__feature_chat__description3',
      'pages:home_page__features_carousel__feature_chat__description4',
    ],
  },
  Rewriter: {
    icon: 'rewriter',
    label: 'pages:home_page__features_carousel__feature_rewriter__label',
    fullName: 'pages:home_page__features_carousel__feature_rewriter__label',
    title: 'pages:home_page__features_carousel__feature_rewriter__title',
    imageUrl: '/assets/landing/feature-carousel/rewriter.png',
    descriptionList: [
      'pages:home_page__features_carousel__feature_rewriter__description1',
      'pages:home_page__features_carousel__feature_rewriter__description2',
      'pages:home_page__features_carousel__feature_rewriter__description3',
      'pages:home_page__features_carousel__feature_rewriter__description4',
      'pages:home_page__features_carousel__feature_rewriter__description5',
    ],
  },

  Reply: {
    icon: 'reply',
    label: 'pages:home_page__features_carousel__feature_reply__label',
    fullName:
      'pages:home_page__features_carousel__feature_reply__label__full_name',

    title: 'pages:home_page__features_carousel__feature_reply__title',
    imageUrl: '/assets/landing/feature-carousel/reply.png',
    descriptionLabel:
      'pages:home_page__features_carousel__feature_reply__description_label',
    descriptionList: [
      'pages:home_page__features_carousel__feature_reply__description1',
      'pages:home_page__features_carousel__feature_reply__description2',
      'pages:home_page__features_carousel__feature_reply__description3',
      'pages:home_page__features_carousel__feature_reply__description4',
    ],
  },
  Summary: {
    icon: 'summary',
    label: 'pages:home_page__features_carousel__feature_summary__label',
    fullName: 'pages:home_page__features_carousel__feature_summary__label',
    title: 'pages:home_page__features_carousel__feature_summary__title',
    imageUrl: '/assets/landing/feature-carousel/summary.png',
    descriptionLabel:
      'pages:home_page__features_carousel__feature_summary__description_label',
    descriptionList: [
      'pages:home_page__features_carousel__feature_summary__description1',
      'pages:home_page__features_carousel__feature_summary__description2',
      'pages:home_page__features_carousel__feature_summary__description3',
      'pages:home_page__features_carousel__feature_summary__description4',
    ],
  },
  Search: {
    icon: 'search',
    label: 'pages:home_page__features_carousel__feature_search__label',
    fullName: 'pages:home_page__features_carousel__feature_search__label',

    title: 'pages:home_page__features_carousel__feature_search__title',
    imageUrl: '/assets/landing/feature-carousel/search.png',
    descriptionList: [
      'pages:home_page__features_carousel__feature_search__description1',
      'pages:home_page__features_carousel__feature_search__description2',
      'pages:home_page__features_carousel__feature_search__description3',
      'pages:home_page__features_carousel__feature_search__description4',
    ],
  },
  Art: {
    icon: 'art',
    label: 'pages:home_page__features_carousel__feature_art__label',
    fullName: 'pages:home_page__features_carousel__feature_art__label',
    title: 'pages:home_page__features_carousel__feature_art__title',
    imageUrl: '/assets/landing/feature-carousel/art.png',
    descriptionList: [
      'pages:home_page__features_carousel__feature_art__description1',
      'pages:home_page__features_carousel__feature_art__description2',
      'pages:home_page__features_carousel__feature_art__description3',
      'pages:home_page__features_carousel__feature_art__description4',
    ],
  },
  Translator: {
    icon: 'translator',
    label: 'pages:home_page__features_carousel__feature_translator__label',
    fullName: 'pages:home_page__features_carousel__feature_translator__label',

    title: 'pages:home_page__features_carousel__feature_translator__title',
    imageUrl: '/assets/landing/feature-carousel/translator.png',
    descriptionList: [
      'pages:home_page__features_carousel__feature_translator__description1',
      'pages:home_page__features_carousel__feature_translator__description2',
      'pages:home_page__features_carousel__feature_translator__description3',
      'pages:home_page__features_carousel__feature_translator__description4',
    ],
  },
  Reader: {
    icon: 'reader',
    label: 'pages:home_page__features_carousel__feature_reader__label',
    fullName:
      'pages:home_page__features_carousel__feature_reader__label__full_name',

    title: 'pages:home_page__features_carousel__feature_reader__title',
    imageUrl: '/assets/landing/feature-carousel/reader.png',
    descriptionList: [
      'pages:home_page__features_carousel__feature_reader__description1',
      'pages:home_page__features_carousel__feature_reader__description2',
      'pages:home_page__features_carousel__feature_reader__description3',
      'pages:home_page__features_carousel__feature_reader__description4',
    ],
  },
  Prompts: {
    icon: 'prompts',
    label: 'pages:home_page__features_carousel__feature_prompts__label',
    fullName: 'pages:home_page__features_carousel__feature_prompts__label',

    title: 'pages:home_page__features_carousel__feature_prompts__title',
    imageUrl: '/assets/landing/feature-carousel/prompts.png',
    descriptionList: [
      'pages:home_page__features_carousel__feature_prompts__description1',
      'pages:home_page__features_carousel__feature_prompts__description2',
      'pages:home_page__features_carousel__feature_prompts__description3',
      'pages:home_page__features_carousel__feature_prompts__description4',
    ],
  },
};

const FeaturesCarousel = () => {
  const { t } = useTranslation();

  const { asPath, isReady, query } = useRouter();

  const { appHeaderHeight } = useAppHeaderState();

  const [showNavButton, setShowNavButton] = React.useState(false);

  const theme = useTheme();
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm')); // 屏幕宽度小于 768 时为 true

  const featuresSelectorScrollContainerRef = React.useRef<HTMLDivElement>(null);

  const [activeFeature, setActiveFeature] =
    React.useState<IFeaturesCarouselItemKey>(FEATURES_CAROUSEL_LIST[0]);

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
        (featureCarouselItem) => featureCarouselItem === activeFeature,
      );
      const nextIndex = (currentIndex + 1) % FEATURES_CAROUSEL_LIST.length;
      setActiveFeature(FEATURES_CAROUSEL_LIST[nextIndex]);
      scrollToView(FEATURES_CAROUSEL_LIST[nextIndex]);
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
          setShowNavButton(true);
        }}
        onMouseLeave={() => {
          stopAutoPlay.current = false;
          setShowNavButton(false);
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

        <FeaturesSelectorNav
          // 小屏幕时，一致显示 nav btn
          showNavButton={isDownSm ? true : showNavButton}
          activeValue={activeFeature}
          containerRef={featuresSelectorScrollContainerRef}
          onClick={(targetItem) => {
            // if (isDownSm) {
            setActiveFeature(targetItem);
            scrollToView(targetItem);
            // }
          }}
        />

        <FeaturesCarouselContent activeFeatureItem={activeFeature} />
      </Box>
    </Box>
  );
};

export default FeaturesCarousel;
