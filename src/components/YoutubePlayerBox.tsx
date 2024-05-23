import { Box, CircularProgress, Stack, SxProps } from '@mui/material';
import React, { FC, useMemo, useState } from 'react';

interface IProps {
  youtubeLink: string;
  borderRadius?: number;
  sx?: SxProps;
  autoplay?: boolean;
}

const YoutubePlayerBox: FC<IProps> = ({
  youtubeLink,
  borderRadius = 16,
  sx,
  autoplay,
}) => {
  const [loading, setLoading] = useState(true);

  const fixYoutubeLink = useMemo(() => {
    const url = new URL(youtubeLink);
    const searchParams = new URLSearchParams(url.search);
    if (autoplay) {
      searchParams.set('autoplay', '1');
    }
    url.search = searchParams.toString();
    return url.toString();
  }, [youtubeLink, autoplay]);

  return (
    <Box
      className='video-container'
      sx={{
        '&.video-container': {
          position: 'relative',
          paddingBottom: '56.25%' /* 16:9 */,
          height: 0,
          width: '100%',
        },
        '&.video-container iframe': {
          borderRadius: borderRadius + 'px',
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        },
        ...sx,
      }}
    >
      {loading && (
        <Stack
          sx={{
            position: 'absolute',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            background: '#f5f5f5',
            borderRadius: 2,
          }}
        >
          <CircularProgress size={30} sx={{ m: '0 auto' }} />
        </Stack>
      )}

      <iframe
        title='YouTube video player'
        width='560'
        height='315'
        src={fixYoutubeLink}
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        onLoad={() => {
          setLoading(false);
        }}
      />
    </Box>
  );
};
export default YoutubePlayerBox;
