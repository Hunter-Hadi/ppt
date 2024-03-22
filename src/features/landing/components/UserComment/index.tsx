// Import Swiper styles
import 'swiper/css';
import 'swiper/css/free-mode';

import { Box, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';

// import required modules
// Import Swiper React components
import {
  IUserCommentType,
  USER_COMMENT_TYPES,
} from '@/features/landing/constants/userComment';

import CommentContent from './CommentContent';
import CommentTypeSelector from './CommentTypeSelector';

const UserComment = () => {
  const { t } = useTranslation();

  const theme = useTheme();
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm')); // 屏幕宽度小于 768 时为 true

  const commentSelectorScrollContainerRef = React.useRef<HTMLDivElement>(null);

  const [activeFeature, setActiveFeature] = React.useState<IUserCommentType>(
    USER_COMMENT_TYPES[0].type,
  );

  const scrollToCenter = (value: IUserCommentType) => {
    const container = commentSelectorScrollContainerRef.current;

    const userCommentItem = document.getElementById(
      `user-comment-type-${value}`,
    );
    if (container && userCommentItem) {
      const itemReact = userCommentItem.getBoundingClientRect();
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
          {t('pages:home_page__user_comment__title')}
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
                id={`user-comment-type-${commentTypeItem.type}`}
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
