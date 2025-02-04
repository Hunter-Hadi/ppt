import ArrowOutwardOutlinedIcon from '@mui/icons-material/ArrowOutwardOutlined';
import { Box, Stack, SxProps, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';

import ProLink from '@/components/ProLink';
import ResponsiveImage from '@/components/ResponsiveImage';

interface IProps {
  sx?: SxProps;
}

const PrivacyFriendlyNumbersBox: FC<IProps> = ({ sx }) => {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <Stack
      sx={{
        bgcolor: '#F9FAFB',
        overflow: 'hidden',
        borderRadius: 4,
        cursor: 'default',
        ...sx,
      }}
    >
      <Stack
        spacing={1}
        bgcolor='#DFDCFF'
        sx={{
          p: {
            xs: 1.5,
            sm: 3,
          },
        }}
      >
        <Typography
          variant='custom'
          fontSize={{
            xs: 32,
            sm: 40,
          }}
          fontWeight={700}
        >
          {t('pages:home_page__in_numbers__privacy_friendly__title')}
        </Typography>
        <Typography
          variant='custom'
          fontSize={16}
          lineHeight={1.5}
          color='text.secondary'
        >
          {t('pages:home_page__in_numbers__privacy_friendly__description')}
        </Typography>

        <Box
          sx={{
            pb: 1,
            width: 'fit-content',
            borderBottom: '1px solid',
            borderColor: 'text.primary',
          }}
        >
          <ProLink
            href='/privacy'
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: 'text.primary',
              gap: 1,
            }}
          >
            <Typography variant='custom' fontSize={16} lineHeight={1.5}>
              {t('pages:home_page__in_numbers__privacy_friendly__explore')}
            </Typography>

            <ArrowOutwardOutlinedIcon />
          </ProLink>
        </Box>
      </Stack>
      <Box p={2}>
        <ResponsiveImage
          alt={'100% privacy friendly'}
          src='/assets/landing/numbers/privacy-friendly.svg'
          width={608}
          height={399}
        />
      </Box>
    </Stack>
  );
};

export default PrivacyFriendlyNumbersBox;
