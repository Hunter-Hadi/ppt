import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { Box, Button, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

const NavigateToPrivacyPage = () => {
  const { t } = useTranslation('pages');

  return (
    <Box
      py={{ xs: 7, md: 14 }}
      px={2}
      sx={{
        background: 'linear-gradient(0deg, #F8FAFC 0%, #F8FAFC 100%), #FFF',
      }}
    >
      <Box
        mx='auto'
        sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
      >
        <Typography
          variant='custom'
          component='h2'
          textAlign={'center'}
          fontSize={{
            xs: 24,
            sm: 32,
            lg: 48,
          }}
          mb={3}
        >
          {t('home_page__privacy_section__title')}
        </Typography>

        <Typography variant='body2' mb={4} maxWidth='sm' textAlign='center'>
          {t('home_page__privacy_section__content')}
        </Typography>

        <Button
          href='/privacy'
          variant='contained'
          sx={{
            px: 3,
            py: 1.5,
            backgroundColor: 'rgba(0,0,0,0.87)',
            '&:hover': {
              backgroundColor: 'rgba(0,0,0,0.7)',
            },
          }}
          endIcon={<ArrowForwardIcon />}
        >
          {t('home_page__privacy_section__button_text')}
        </Button>
      </Box>
    </Box>
  );
};

export default NavigateToPrivacyPage;
