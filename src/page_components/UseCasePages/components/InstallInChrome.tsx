import { Box, buttonClasses, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';

import CTAInstallButton from '@/page_components/CTAInstallButton';

const InstallInChrome = () => {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        background: 'linear-gradient(0deg, #F8FAFC 0%, #F8FAFC 100%), #FFF',
        py: {
          xs: 7,
          md: 14,
        },
        px: '10px',
      }}
    >
      <Stack
        maxWidth='sm'
        alignItems='center'
        justifyContent='center'
        direction='column'
        sx={{ margin: '0 auto' }}
      >
        <Typography
          component='h2'
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
          {t('pages:use_cases__common__install__title')}
        </Typography>

        <Typography
          fontSize={'18px'}
          mt='24px'
          textAlign='center'
          sx={{
            mb: {
              xs: 4,
              md: 5,
            },
          }}
        >
          {t('pages:use_cases__common__install__content')}
        </Typography>

        <CTAInstallButton
          variant={'contained'}
          trackerLinkProps={{
            queryRefEnable: true,
            pathnameRefEnable: false,
          }}
          iconSize={40}
          adaptiveLabel
          sx={{
            height: 56,
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
      </Stack>
    </Box>
  );
};

export default InstallInChrome;
