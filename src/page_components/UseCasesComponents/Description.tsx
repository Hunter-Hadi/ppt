import { Box, buttonClasses, Stack, Typography } from '@mui/material';
import { FC } from 'react';

import CTAInstallButton from '@/page_components/CTAInstallButton';

interface IDescriptionProps {
  title: string;
  content: string;
  buttonText: string;
}

const Description: FC<IDescriptionProps> = ({ title, content, buttonText }) => {
  return (
    <Box
      sx={{
        py: {
          xs: 7,
          md: 14,
        },
        px: 2,
      }}
    >
      <Stack
        maxWidth='900px'
        alignItems='center'
        justifyContent='center'
        direction='column'
        sx={{ margin: '0 auto' }}
      >
        <Typography
          component='h3'
          variant='custom'
          sx={{
            fontSize: {
              xs: 32,
              lg: 40,
            },
            fontWeight: 700,
          }}
          textAlign='center'
        >
          {title}
        </Typography>

        <Typography
          component='h2'
          fontSize={16}
          my={{
            xs: 4,
            md: 6,
          }}
          textAlign='center'
          mb='64px'
        >
          {content}
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
            fontSize: {
              xs: 16,
              sm: 18,
            },
            background: 'primary.main',
            [`& .${buttonClasses.startIcon}`]: {
              display: {
                xs: 'none',
                sm: 'inherit',
              },
            },
          }}
        />
      </Stack>
    </Box>
  );
};

export default Description;
