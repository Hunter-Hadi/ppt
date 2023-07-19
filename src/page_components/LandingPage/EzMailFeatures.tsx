import BoltIcon from '@mui/icons-material/Bolt';
import DraftsIcon from '@mui/icons-material/Drafts';
import LanguageIcon from '@mui/icons-material/Language';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { Container, Grid, Stack, Typography } from '@mui/material';
import React, { useMemo } from 'react';

import CustomIcon from '@/components/CustomIcon';

const EzMailFeatures = () => {
  const iconStyle = useMemo(
    () => ({ color: 'primary.main', fontSize: 28 }),
    [],
  );
  return (
    <Stack
      bgcolor={'#fafafa'}
      py={{
        xs: 2,
        lg: 6,
        xl: 9,
      }}
      px={{
        xs: 2,
        sm: 6,
        md: 10,
        lg: 12,
        xl: 15.5,
      }}
    >
      <Container maxWidth='sm'>
        <Typography
          textAlign={'center'}
          fontSize={32}
          fontWeight={700}
          component={'h2'}
          variant={'custom'}
          mb={{
            xs: 4,
            sm: 4,
            lg: 6,
          }}
        >
          {`What you'll get with EzMail.AI?`}
        </Typography>
        <Grid container spacing={2} bgcolor={'#fff'} maxWidth={560} mx='auto'>
          <Grid item xs={12}>
            <Stack direction={'row'} spacing={2} alignItems={'center'} p={1.5}>
              <BoltIcon sx={iconStyle} />
              <Typography variant={'body1'}>
                Reply to emails 10X faster
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction={'row'} spacing={2} alignItems={'center'} p={1.5}>
              <DraftsIcon sx={iconStyle} />
              <Typography variant={'body1'}>
                Always have pre-filled replies ready to go
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction={'row'} spacing={2} alignItems={'center'} p={1.5}>
              <CustomIcon icon={'Neurology'} sx={iconStyle} />
              <Typography variant={'body1'}>
                {`Al drafts emails as "you"`}
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction={'row'} spacing={2} alignItems={'center'} p={1.5}>
              <LanguageIcon sx={iconStyle} />
              <Typography variant={'body1'}>
                Reply with confidence like a native speaker
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction={'row'} spacing={2} alignItems={'center'} p={1.5}>
              <PhoneIphoneIcon sx={iconStyle} />
              <Typography variant={'body1'}>
                Works on both mobile and desktop
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <Stack direction={'row'} spacing={2} alignItems={'center'} p={1.5}>
              <CustomIcon icon={'NoSetup'} sx={iconStyle} />
              <Typography variant={'body1'}>No manual setup needed</Typography>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Stack>
  );
};
export default EzMailFeatures;
