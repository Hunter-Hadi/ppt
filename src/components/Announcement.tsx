import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';

import { WWW_PROJECT_LINK } from '@/global_constants';
import useEffectOnce from '@/hooks/useEffectOnce';
import {
  getLocalStorage,
  ILocalStorageKeyType,
  setLocalStorage,
} from '@/utils/localStorage';

const TWEET_URL = 'https://twitter.com/MaxAI_HQ';

const REBRAND_ANNOUNCEMENT_HIDDEN_SAVE_KEY =
  'REBRAND_ANNOUNCEMENT_HIDDEN_SAVE_KEY' as ILocalStorageKeyType;

const Announcement = () => {
  const [loaded, setLoaded] = useState(false);
  const [hide, setHide] = useState(false);

  const updateFlag = async (flag: boolean) => {
    setHide(flag);
    setLocalStorage(REBRAND_ANNOUNCEMENT_HIDDEN_SAVE_KEY, flag);
  };

  useEffectOnce(() => {
    const flag = getLocalStorage(REBRAND_ANNOUNCEMENT_HIDDEN_SAVE_KEY);
    setHide(flag === 'true');
    setLoaded(true);
  });

  if (!loaded || hide) return null;

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
        fontSize={16}
        alignItems='center'
        justifyContent='center'
        maxWidth={395}
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
          <Typography variant='caption' fontSize={16} fontWeight={500}>
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
          <Typography variant='caption' fontSize={16} fontWeight={500}>
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
          }}
        >
          Read More
        </Button>
      </Stack>
      <IconButton
        sx={{ flexShrink: 0, ml: 0.5, color: 'inherit' }}
        onClick={() => updateFlag(true)}
      >
        <CloseIcon sx={{ fontSize: '24px' }} />
      </IconButton>
    </Stack>
  );
};

export default Announcement;
