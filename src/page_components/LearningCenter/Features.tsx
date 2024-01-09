import { Stack, Typography } from '@mui/material';
import React from 'react';

const BasicUsage = () => {
  // const { openVideoPopup } = useVideoPopupController();

  return (
    <Stack spacing={6} alignItems='center' id='features'>
      <Typography
        variant='custom'
        component={'h2'}
        fontWeight={700}
        fontSize={{
          xs: 32,
          md: 40,
        }}
      >
        Features
      </Typography>

      {/* <Box>

      </Box>

        <Stack></Stack> */}

      {/* <Grid container rowGap={6} columnSpacing={4}>
        {VIDEOS_LIST.map((videoItem) => (
          <Grid item key={videoItem.title} xs={12} sm={6}>
            <Stack spacing={3}>
              <Box
                onClick={() => {
                  openVideoPopup(videoItem.videoLink);
                }}
                sx={{
                  cursor: 'pointer',
                }}
              >
                <YoutubePlayerBox
                  borderRadius={16}
                  youtubeLink={videoItem.videoLink}
                  sx={{
                    pointerEvents: 'none',
                  }}
                />
              </Box>
              <Typography
                variant='custom'
                fontSize={{
                  xs: 18,
                  md: 24,
                }}
                fontWeight={700}
                lineHeight={1.4}
              >
                {videoItem.title}
              </Typography>
            </Stack>
          </Grid>
        ))}
      </Grid> */}
    </Stack>
  );
};

export default BasicUsage;
