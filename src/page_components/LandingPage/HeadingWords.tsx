import { Box } from '@mui/material';
import { FC, useEffect, useState } from 'react';
import TextTransition, { presets } from 'react-text-transition';

const TEXTS = [
  'with pre-filled drafts',
  'in your writing style',
  'personalized responses',
  'on mobile devices',
];
const delay = 2000;

const HeadingWords: FC = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((index + 1) % TEXTS.length);
    }, delay);
    return () => clearInterval(interval);
  });
  return (
    <Box
      component={'span'}
      sx={{
        position: 'relative',
        display: 'inline-flex',
      }}
    >
      <TextTransition
        springConfig={presets.gentle}
        style={{ margin: '0 4px' }}
        inline
      >
        {TEXTS[index % TEXTS.length]}
      </TextTransition>
    </Box>
  );
};
export default HeadingWords;
