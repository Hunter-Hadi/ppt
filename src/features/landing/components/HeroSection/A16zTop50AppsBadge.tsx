import { Stack, SvgIcon, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React from 'react';

import IndicatorDecorator from '@/features/landing/components/IndicatorDecorator';

const A16zTop50AppsBadge = () => {
  const { t } = useTranslation();
  return (
    <IndicatorDecorator>
      <Stack
        justifyContent={'center'}
        alignItems='center'
        component={'a'}
        href='https://a16z.com/100-gen-ai-apps/'
        target={'_blank'}
        sx={{
          color: 'text.primary',
          '&:hover': {
            color: 'primary.main',
            cursor: 'pointer',
            transition: 'color 0.3s ease',
          },
        }}
      >
        <Stack direction={'row'} alignItems='center' spacing={1}>
          <A16zIcon />
          <Typography
            variant='custom'
            fontSize={{
              xs: 20,
              sm: 24,
            }}
            fontWeight={700}
            color='primary.main'
          >
            2024
          </Typography>
        </Stack>
        <Typography
          variant='custom'
          color='inherit'
          fontSize={{
            xs: 14,
            sm: 16,
          }}
        >
          {t('pages:home_page__hero_section__indicator1_label')}
        </Typography>
      </Stack>
    </IndicatorDecorator>
  );
};

const A16zIcon = () => {
  return (
    <SvgIcon>
      <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          d='M0 4.8C0 2.14903 2.14903 0 4.8 0H24V19.2C24 21.851 21.851 24 19.2 24H4.8C2.14903 24 0 21.851 0 19.2V4.8Z'
          fill='#F79321'
        />
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M9.13159 7.96094H8.3091V9.14085H9.13159V15.8272H10.4391V7.96094H9.13159ZM6.99611 10.3804V9.99371H8.31707V15.8256H7.02833V15.3745C6.4484 15.7934 5.70737 16.0189 4.9019 15.9545C3.48429 15.7934 2.32442 14.6334 2.16332 13.2157C1.97001 11.3792 3.41985 9.80039 5.22409 9.80039C5.86846 9.80039 6.51283 10.0259 6.99611 10.3804ZM4.80525 14.6334C5.96512 14.8912 6.99611 14.0213 6.99611 12.8935C6.99611 11.8625 6.19065 11.057 5.22409 11.057C4.09644 11.057 3.19432 12.088 3.41985 13.248C3.58094 13.9568 4.12866 14.5046 4.80525 14.6334ZM21.8949 10.0617H17.4519V11.2416H20.3051L17.4517 14.6464V15.8264H21.8947V14.6464H19.0408L21.8942 11.2416H21.8949V10.0617ZM11.6298 11.2544L11.6299 11.2544C11.2591 11.75 11.0394 12.3653 11.0394 13.0318C11.0394 14.6718 12.3688 16.0013 14.0088 16.0013C15.6487 16.0013 16.9781 14.6718 16.9781 13.0318C16.9781 11.4095 15.6772 10.0911 14.0618 10.0628L15.6555 7.96094H14.1271L11.6298 11.2544ZM14.0087 14.7588C14.9627 14.7588 15.7359 13.9854 15.7359 13.0315C15.7359 12.0775 14.9627 11.3042 14.0087 11.3042C13.0548 11.3042 12.2815 12.0775 12.2815 13.0315C12.2815 13.9854 13.0548 14.7588 14.0087 14.7588Z'
          fill='white'
        />
      </svg>
    </SvgIcon>
  );
};

export default A16zTop50AppsBadge;
