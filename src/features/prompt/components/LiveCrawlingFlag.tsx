import { Typography } from '@mui/material';
import React from 'react';

const LiveCrawlingFlag = () => {
  return (
    <Typography
      variant={'custom'}
      sx={(t) => {
        const isDark = t.palette.mode === 'dark';
        return {
          fontSize: 14,
          color: 'primary.main',
          bgcolor: isDark
            ? 'rgba(178, 115, 255, 0.16)'
            : 'rgba(118, 1, 211, 0.08)',
          px: 0.5,
          py: '2px',
          mr: 1,
          borderRadius: 1,
        };
      }}
    >
      Live Crawling
    </Typography>
  );
};

export default LiveCrawlingFlag;
