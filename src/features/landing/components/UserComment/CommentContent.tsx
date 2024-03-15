import { Avatar, Box, Stack, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';

import {
  IUserCommentType,
  USER_COMMENTS,
} from '@/features/landing/constants/userComment';

import Stars from './Stars';

interface IProps {
  activeCommentType: IUserCommentType;
}

const CommentContent: FC<IProps> = ({ activeCommentType }) => {
  const comments = useMemo(() => {
    return USER_COMMENTS.filter(
      (comment) => comment.type === activeCommentType,
    );
  }, [activeCommentType]);

  console.log(`comments`, activeCommentType, comments);

  return (
    <Box
      sx={{
        px: 6,
        bgcolor: '#F9FAFB',

        '.swiper': {
          width: '100%',

          height: '100%',
        },

        '.swiper-free-mode > .swiper-wrapper': {
          transitionTimingFunction: 'linear',
        },

        '.swiper-wrapper': {
          alignItems: 'center',
        },
      }}
    >
      {/* 暂时先渲染一条 */}
      <Stack
        justifyContent={'center'}
        alignItems={'center'}
        spacing={2}
        px={6}
        py={6}
        sx={{
          cursor: 'default',
          minHeight: 400,
        }}
      >
        <Typography
          variant='custom'
          fontSize={36}
          fontWeight={700}
          textAlign={'center'}
          mb={2}
        >
          {comments[0].content}
        </Typography>
        <Avatar alt={comments[0].name} src={comments[0].avatar} />
        <Typography>{comments[0].name}</Typography>
        <Stars count={5} size={20} />
      </Stack>

      {/* <Swiper
        navigation={true}
        pagination={true}
        modules={[Navigation, Pagination]}
      >
        {comments.map((comment) => {
          return (
            <SwiperSlide key={comment.avatar}>
              <Stack
                justifyContent={'center'}
                alignItems={'center'}
                spacing={2}
                px={6}
                py={6}
                sx={{
                  cursor: 'default',
                }}
              >
                <Typography
                  variant='custom'
                  fontSize={36}
                  fontWeight={700}
                  textAlign={'center'}
                  mb={2}
                >
                  {comment.content}
                </Typography>
                <Avatar alt={comment.name} src={comment.avatar} />
                <Typography>{comment.name}</Typography>
                <Stars count={5} size={20} />
              </Stack>
            </SwiperSlide>
          );
        })}
      </Swiper> */}
    </Box>
  );
};

export default CommentContent;
