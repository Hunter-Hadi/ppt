import PlayCircleFilledWhiteOutlinedIcon from '@mui/icons-material/PlayCircleFilledWhiteOutlined';
import { Stack, Typography } from '@mui/material';
import React, { FC } from 'react';

import useVideoPopupController from '@/features/videoPopup/hooks/useVideoPopupController';

const QUICK_VIDEO_LIST = [
  {
    title: `Summarize & Chat with Webpage and PDF`,
    videoLink: `https://www.youtube.com/embed/72UM1jMaJhY`,
  },
  {
    title: `PDF AI Viewer`,
    videoLink: `https://www.youtube.com/embed/eYO5Dh6Ruic`,
  },
  {
    title: `Gmail Assistant (Help me write)`,
    videoLink: `https://www.youtube.com/embed/fwaqJyTwefI`,
  },
  {
    title: `Outlook Assistant (Help me write)`,
    videoLink: `https://www.youtube.com/embed/Y2yZ4wWQDno`,
  },
  {
    title: `X/Twitter Assistant (Help me write)`,
    videoLink: `https://www.youtube.com/embed/3UQaOm8sWVI`,
  },
  {
    title: `Using GPT-4 AI Model operated by MaxAI`,
    videoLink: `https://www.youtube.com/embed/mAi1D9cbGos`,
  },
  {
    title: `Using ChatGPT-16k AI Model operated by MaxAI`,
    videoLink: `https://www.youtube.com/embed/QA4gxm3xtLE`,
  },
  {
    title: `Using Claude-2-100k AI Model operated by MaxAI`,
    videoLink: `https://www.youtube.com/embed/3hHrqmIU284`,
  },
  {
    title: `Using Claude-instant-100k AI Model operated by MaxAI`,
    videoLink: `https://www.youtube.com/embed/qwFVrq3Epcs`,
  },
  {
    title: `MaxAI Paid Models (Unlimited gpt-3.5-turbo operated by MaxAI)`,
    videoLink: `https://www.youtube.com/embed/zgq2DKlwEYk`,
  },
];

const FeatureQuickVideoList: FC<{ planName: string }> = ({ planName }) => {
  const { openVideoPopup } = useVideoPopupController();

  return (
    <Stack
      spacing={4}
      sx={{
        p: 2,
        border: '1px solid',
        borderRadius: 1,
        borderColor: (t) => t.palette.grey[300],
      }}
    >
      <Typography
        variant='custom'
        fontSize={22}
        fontWeight={800}
        lineHeight={1.2}
      >
        Quick video tours for MaxAI {planName} members:
      </Typography>

      <Stack spacing={1}>
        {QUICK_VIDEO_LIST.map((item, index) => (
          <Stack
            key={index}
            direction={'row'}
            spacing={1}
            alignItems={'center'}
            sx={{
              cursor: 'pointer',
            }}
            onClick={() => {
              openVideoPopup(item.videoLink);
            }}
          >
            <PlayCircleFilledWhiteOutlinedIcon
              sx={{
                color: 'primary.main',
                fontSize: 20,
              }}
            />
            <Typography
              variant='body2'
              sx={{
                textDecorationLine: 'underline',
              }}
            >
              {item.title}
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
};

export default FeatureQuickVideoList;
