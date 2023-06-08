import { Stack, SxProps } from '@mui/material';
import React, { FC } from 'react';

const ProducthuntHonor: FC<{ sx?: SxProps; noDay?: boolean }> = ({
  sx,
  noDay = false,
}) => {
  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      sx={{
        gap: {
          xs: 1,
          sm: 2,
          md: 4,
        },
        '% a': {
          flex: 1,
        },
        '& img': {
          width: '100%',
          height: 'auto',
        },
        ...sx,
      }}
    >
      <a
        href='https://www.producthunt.com/posts/use-chatgpt?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-use&#0045;chatgpt'
        target='_blank'
        rel='nofollow noopener noreferrer'
      >
        <img
          src='https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=385023&theme=light&period=weekly'
          alt='Use&#0032;ChatGPT - Use&#0032;ChatGPT&#0032;&#0038;&#0032;GPT&#0045;4&#0032;on&#0032;any&#0032;website&#0032;without&#0032;copy&#0045;pasting | Product Hunt'
        />
      </a>
      {!noDay && (
        <a
          href='https://www.producthunt.com/posts/use-chatgpt?utm_source=badge-top-post-badge&utm_medium=badge&utm_souce=badge-use&#0045;chatgpt'
          target='_blank'
          rel='nofollow noopener noreferrer'
        >
          <img
            src='https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=385023&theme=light&period=daily'
            alt='Use&#0032;ChatGPT - Use&#0032;ChatGPT&#0032;&#0038;&#0032;GPT&#0045;4&#0032;on&#0032;any&#0032;website&#0032;without&#0032;copy&#0045;pasting | Product Hunt'
          />
        </a>
      )}
    </Stack>
  );
};

export default ProducthuntHonor;
