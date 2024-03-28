import { Box, buttonClasses, Typography } from '@mui/material';
import { FC } from 'react';

import CTAInstallButton from '@/page_components/CTAInstallButton';

interface ITakeBackTimeProps {
  title: string;
  description: string;
  iconPath: string;
  buttonText: string;
}

const TakeBackTime: FC<ITakeBackTimeProps> = ({
  title,
  description,
  iconPath,
  buttonText,
}) => {
  return (
    <Box
      sx={{
        py: {
          xs: 7,
          md: 14,
        },
        px: 2,
        maxWidth: 1312,
        margin: '0 auto',
      }}
    >
      <Typography
        component='h3'
        variant='custom'
        textAlign='center'
        sx={{
          fontSize: {
            xs: 32,
            lg: 40,
          },
          fontWeight: 700,
        }}
      >
        {title}
      </Typography>

      <Box
        sx={{
          mt: { xs: 4, md: 6 },
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        <Box
          sx={{
            flex: 1,
          }}
        >
          <Box
            component='img'
            src={iconPath}
            alt={''}
            style={{
              width: '100%',
            }}
          />
        </Box>

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: { xs: 'center', md: 'flex-start' },
          }}
        >
          <Typography
            fontSize={'18px'}
            sx={{
              mb: {
                xs: 4,
                md: 5,
              },
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
      </Box>
    </Box>
  );
};

export default TakeBackTime;
