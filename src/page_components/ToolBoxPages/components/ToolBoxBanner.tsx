import { Box, Typography } from '@mui/material';
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

interface IToolBoxBannerProps {
  title: string;
  description: string;
}

const ToolBoxBanner: FC<IToolBoxBannerProps> = ({ title, description }) => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        pt: {
          xs: 6,
          md: 6,
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
            xs: 30,
            lg: 35,
          },
          color: 'text.primary',
        }}
      >
        {t(title)}
      </Typography>

      <Typography
        sx={{
          fontSize: {
            xs: 15,
            lg: 16,
          },
          color: 'text.secondary',
        }}
        mt='24px'
      >
        {t(description)}
      </Typography>
    </Box>
  );
};

export default ToolBoxBanner;
