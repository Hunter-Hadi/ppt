import { Box, buttonClasses, Typography } from '@mui/material';
import { FC } from 'react';

import CTAInstallButton from '@/page_components/CTAInstallButton';

interface IBannerProps {
  title: string;
  description: string;
  iconPath: string;
  buttonText: string;
}

const Banner: FC<IBannerProps> = ({
  title,
  description,
  iconPath,
  buttonText,
}) => {
  return (
    <Box
      sx={{
        py: {
          xs: 6,
          md: 10,
        },
        px: 2,
        maxWidth: 1312,
        margin: '0 auto',
        display: 'flex',
        flexDirection: { xs: 'column-reverse', md: 'row' },
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: {
            xs: 'center',
            md: 'flex-start',
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
          mb={{
            xs: '24px',
            sm: '40px',
          }}
        >
          {description}
        </Typography>

        <CTAInstallButton
          variant={'contained'}
          text={buttonText}
          trackerLinkProps={{
            queryRefEnable: true,
            pathnameRefEnable: false,
          }}
          iconSize={0}
          adaptiveLabel
          sx={{
            height: 48,
            px: 3,
            fontSize: 18,
            background: 'primary.main',
            [`& .${buttonClasses.startIcon}`]: {
              display: {
                xs: 'none',
                sm: 'inherit',
              },
            },
          }}
        />
      </Box>

      <Box
        sx={{
          flex: 1,
        }}
      >
        <Box
          component='img'
          src={iconPath}
          alt={''}
          sx={{
            width: '100%',
            height: '100%',
            mb: {
              xs: 2,
              md: 0,
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default Banner;
