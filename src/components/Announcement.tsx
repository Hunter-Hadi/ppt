import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { atom, useRecoilState } from 'recoil';

import { WWW_PROJECT_LINK } from '@/global_constants';
import useEffectOnce from '@/hooks/useEffectOnce';

const TWEET_URL = 'https://twitter.com/MaxAI_HQ/status/1673665954062954500';

const NOT_HEADER_PATH = ['/partners/'];

const AnnouncementShowAtom = atom({
  key: 'AnnouncementShowAtom',
  default: true,
});

const Announcement = () => {
  const { pathname } = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [show, setShow] = useRecoilState(AnnouncementShowAtom);

  const isNotHeader = NOT_HEADER_PATH.some((path) => pathname.startsWith(path));

  const updateFlag = async (flag: boolean) => {
    setShow(flag);
  };

  useEffectOnce(() => {
    setLoaded(true);
  });

  if (!loaded || !show) return null;

  if (isNotHeader) {
    return null;
  }

  return (
    <Stack
      direction='row'
      bgcolor='#DDB1FF'
      color='rgba(0,0,0,0.87)'
      p={1}
      alignItems='center'
    >
      <Stack
        direction='row'
        flex={1}
        fontSize={{
          xs: 14,
          sm: 16,
        }}
        alignItems='center'
        justifyContent='center'
        maxWidth={402}
        mx={'auto'}
      >
        <Link
          sx={{
            color: 'inherit',
            textDecoration: 'underline!important',
            mr: 0.5,
          }}
          href={'https://www.usechatgpt.ai'}
          target={'_blank'}
        >
          <Typography
            variant='caption'
            fontSize={{
              xs: 14,
              sm: 16,
            }}
            fontWeight={500}
          >
            UseChatGPT.AI
          </Typography>
        </Link>
        is now
        <Link
          sx={{
            color: 'inherit',
            textDecoration: 'underline!important',
            ml: 0.5,
          }}
          href={WWW_PROJECT_LINK}
          target={'_blank'}
        >
          <Typography
            variant='caption'
            fontSize={{
              xs: 14,
              sm: 16,
            }}
            fontWeight={500}
          >
            MaxAI.me
          </Typography>
        </Link>
        . 🎉
        <Button
          variant='outlined'
          color='inherit'
          href={TWEET_URL}
          target={'_blank'}
          sx={{
            ml: 'auto !important',
            color: 'inherit',
            borderColor: 'inherit',
            px: {
              xs: '5px',
              sm: 2,
            },
          }}
        >
          Read More
        </Button>
      </Stack>
      <IconButton
        sx={{ flexShrink: 0, ml: 0.5, color: 'inherit' }}
        onClick={() => updateFlag(false)}
      >
        <CloseOutlinedIcon sx={{ fontSize: '24px' }} />
      </IconButton>
    </Stack>
  );
};

export default Announcement;
