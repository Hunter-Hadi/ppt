// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// import required modules
// Import Swiper React components
import {
  IUserCommentType,
  USER_COMMENT_TYPES,
} from '@/features/landing/constants/userComment';

import CommentContent from './CommentContent';
import CommentTypeSelector from './CommentTypeSelector';

const UserComment = () => {
  const { t } = useTranslation('pages');

  const theme = useTheme();
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm')); // 屏幕宽度小于 768 时为 true

  const commentSelectorScrollContainerRef = React.useRef<HTMLDivElement>(null);

  const [activeFeature, setActiveFeature] = React.useState<IUserCommentType>(
    USER_COMMENT_TYPES[0].type,
  );

  const scrollToCenter = (value: IUserCommentType) => {
    const container = commentSelectorScrollContainerRef.current;

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

      const currentIndex = USER_COMMENT_TYPES.findIndex(
        (item) => item.type === activeFeature,
      );
      const nextIndex = (currentIndex + 1) % USER_COMMENT_TYPES.length;
      setActiveFeature(USER_COMMENT_TYPES[nextIndex].type);
      scrollToCenter(USER_COMMENT_TYPES[nextIndex].type);
    }, 5000);

    return () => {
      if (timer.current) {
        clearInterval(timer.current);
      }
    };
  }, [activeFeature]);

  return (
    <Box
      id='homepage-user-comment'
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
            xs: 36,
            sm: 48,
          }}
          mb={6}
        >
          {t('home_page__user_comment__title')}
        </Typography>

        <Stack
          direction='row'
          flexWrap={'nowrap'}
          spacing={2}
          ref={commentSelectorScrollContainerRef}
          sx={{
            overflowX: 'auto',
            mb: 4,
            '&::-webkit-scrollbar': {
              display: 'none',
            },
          }}
        >
          {USER_COMMENT_TYPES.map((commentTypeItem) => {
            return (
              <Box
                key={commentTypeItem.type}
                onMouseEnter={() => {
                  if (!isDownSm) {
                    setActiveFeature(commentTypeItem.type);
                    scrollToCenter(commentTypeItem.type);
                  }
                }}
                onClick={() => {
                  if (isDownSm) {
                    setActiveFeature(commentTypeItem.type);
                    scrollToCenter(commentTypeItem.type);
                  }
                }}
                id={`feature-carousel-${commentTypeItem.type}`}
              >
                <CommentTypeSelector
                  active={activeFeature === commentTypeItem.type}
                  type={commentTypeItem.type}
                  label={commentTypeItem.label}
                />
              </Box>
            );
          })}
        </Stack>

        <CommentContent activeCommentType={activeFeature} />
      </Box>
    </Box>
  );
};

export default UserComment;
