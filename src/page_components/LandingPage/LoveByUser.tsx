import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import { Box, Stack, Typography } from '@mui/material';
import React from 'react';
import { useTranslation } from 'react-i18next';

import { LOVED_BY_NUM } from '@/global_constants';

import ProducthuntHonor from '../ProducthuntHonor';

const LoveByUser = () => {
  const { t } = useTranslation('pages');

  return (
    <Box
      py={{
        xs: 4,
        sm: 7,
      }}
      sx={{
        background: 'linear-gradient(0deg, #F8FAFC 0%, #F8FAFC 100%), #FFF',
      }}
    >
      <Box maxWidth={1312} mx='auto'>
        <Stack spacing={4} alignItems='center'>
          <Stack
            direction={{
              xs: 'column',
              sm: 'row',
            }}
            alignItems='center'
            justifyContent={'center'}
            spacing={4}
            flexWrap='wrap'
          >
            <Stack direction={'row'} alignItems='center'>
              {Array.from({ length: 5 }).map((_, index) => (
                <GradeRoundedIcon
                  key={index}
                  sx={{
                    color: '#F5A523',
                    fontSize: 40,
                  }}
                />
              ))}
            </Stack>
            <Typography
              variant={'custom'}
              fontSize={{
                xs: 36,
                sm: 48,
              }}
              color='rgba(0, 0, 0, 0.60)'
              fontWeight={700}
              textAlign='center'
              pl={0.8}
            >
              {t('home_page__loved_by_users', { num: LOVED_BY_NUM })}
            </Typography>
          </Stack>
          <ProducthuntHonor
            sx={{
              flexDirection: {
                xs: 'column',
                sm: 'row',
              },
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default LoveByUser;
