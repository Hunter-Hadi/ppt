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

  return (
    <Box
      sx={{
        px: {
          xs: 2,
          sm: 4,
          md: 6,
        },
        borderRadius: 4,
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
        px={{
          xs: 2,
          sm: 4,
          md: 6,
        }}
        py={{
          xs: 4,
          sm: 6,
        }}
        sx={{
          cursor: 'default',
          minHeight: 570,
        }}
      >
        <Typography
          variant='custom'
          fontSize={{
            xs: 24,
            sm: 28,
            md: 36,
          }}
          fontWeight={700}
          textAlign={'center'}
          mb={2}
        >
          {`"`}
          {comments[0].content}
          {`"`}
        </Typography>
        <Avatar alt={comments[0].name} src={comments[0].avatar} />
        <Typography>{comments[0].name}</Typography>
        <Stars count={5} size={20} />
      </Stack>
    </Box>
  );
};

export default CommentContent;
