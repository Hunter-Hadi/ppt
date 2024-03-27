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
        alignItems: {
          xs: 'center',
          md: 'center',
        },
      }}
    >
      <Typography
        component='h2'
        variant='custom'
        sx={{
          fontSize: {
            xs: 40,
            lg: 48,
          },
          fontWeight: 700,
        }}
      >
        {title}
      </Typography>

      <Typography
        fontSize={'18px'}
        sx={{
          fontSize: '16px',
        }}
        mt='24px'
      >
        {description}
      </Typography>
    </Box>
  );
};

export default ToolBoxBanner;
