import { Box, Typography } from '@mui/material';
import { FC } from 'react';

interface IToolBoxBannerProps {
  title: string;
  description: string;
}

const ToolBoxBanner: FC<IToolBoxBannerProps> = ({ title, description }) => {
  return (
    <Box
      sx={{
        pt: {
          xs: 6,
          md: 10,
        },
        pb: {
          xs: 2,
          md: 5,
        },
        maxWidth: 1312,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        component='h2'
        variant='custom'
        sx={{
          fontSize: {
            xs: 35,
            lg: 48,
          },
          fontWeight: 700,
        }}
      >
        {title}
      </Typography>

      <Typography
        sx={{
          fontSize: {
            xs: 15,
            lg: 20,
          },
        }}
        mt='24px'
      >
        {description}
      </Typography>
    </Box>
  );
};

export default ToolBoxBanner;
