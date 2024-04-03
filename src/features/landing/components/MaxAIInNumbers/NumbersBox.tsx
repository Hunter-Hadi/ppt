import { Box, Stack, SxProps, Typography } from '@mui/material';
import React, { FC } from 'react';

interface IProps {
  title: string | React.ReactNode;
  subTitle?: string | React.ReactNode;
  description?: string | React.ReactNode;
  content: string | React.ReactNode;
  height?: number;
  sx?: SxProps;
  linkTo?: string;
}

const NumbersBox: FC<IProps> = ({
  title,
  subTitle,
  description,
  content,
  sx,
  linkTo,
}) => {
  return (
    <Stack
      component={linkTo ? 'a' : 'div'}
      href={linkTo}
      target={linkTo ? '_blank' : undefined}
      sx={{
        bgcolor: '#F9FAFB',
        p: {
          xs: 1.5,
          sm: 3,
        },
        borderRadius: 4,
        minHeight: {
          xs: 270,
          sm: 295,
        },
        boxSizing: 'border-box',
        cursor: linkTo ? 'pointer' : 'default',
        color: 'text.primary',
        transition: linkTo ? 'all 0.3s' : 'none',
        '&:hover': {
          bgcolor: linkTo ? '#efefef' : '#F9FAFB',
        },
        ...sx,
      }}
    >
      {typeof title === 'string' ? (
        <Typography
          className={'numbers-box-title'}
          variant='custom'
          fontSize={{
            xs: 48,
            sm: 56,
          }}
          fontWeight={700}
          color='primary.main'
        >
          {title}
        </Typography>
      ) : (
        title
      )}

      {typeof subTitle === 'string' ? (
        <Typography
          className={'numbers-box-sub-title'}
          variant='custom'
          fontSize={{
            xs: 18,
            sm: 20,
          }}
          fontWeight={700}
          color='primary.main'
          mt={0.5}
        >
          {subTitle}
        </Typography>
      ) : (
        subTitle
      )}

      {typeof description === 'string' ? (
        <Typography
          className={'numbers-box-description'}
          variant='custom'
          fontSize={{
            xs: 14,
            sm: 16,
          }}
          mt={1}
        >
          {description}
        </Typography>
      ) : (
        description
      )}

      <Box className={'numbers-box-content'} mt={'auto'}>
        {content}
      </Box>
    </Stack>
  );
};

export default NumbersBox;
