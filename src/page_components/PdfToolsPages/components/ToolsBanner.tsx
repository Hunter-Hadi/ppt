import { Box, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC } from 'react';

interface IToolsBannerProps {
  title: string;
  description: string;
}

const ToolsBanner: FC<IToolsBannerProps> = ({ title, description }) => {
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
            lg: 36,
          },
          color: 'text.primary',
        }}
      >
        {t(title)}
      </Typography>

      <Typography
        sx={{
          fontSize: {
            xs: 14,
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

export default ToolsBanner;
