import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import React, { FC } from 'react';

import CTAInstallButton from '@/page_components/CTAInstallButton';
import FeaturesLandingIcons from '@/page_components/FeaturesPages/components/FeaturesLandingIcons';
import PoweredBy from '@/page_components/FeaturesPages/components/PoweredBy';

interface IProps {
  title: string;
  description: string;
  poweredBy?: string;
}

const FeaturesLandingBanner: FC<IProps> = ({
  title,
  description,
  poweredBy = 'ChatGPT',
}) => {
  return (
    <Box
      bgcolor='#f9f5ff'
      pt={{
        xs: 4,
        md: 7,
      }}
      pb={9}
      px={2}
      overflow='hidden'
      sx={{
        backgroundImage: `url("/assets/landing/hero-section-bg.png")`,
        backgroundSize: 'cover',
        backgroundPositionY: '-40px',
      }}
    >
      <Box maxWidth={1312} mx='auto'>
        <Stack textAlign={'center'}>
          <Typography
            variant='custom'
            fontSize={{
              xs: 48,
              sm: 56,
            }}
            fontWeight={700}
          >
            {title}
          </Typography>
          <PoweredBy name={poweredBy} />
          <Typography
            variant='custom'
            fontSize={{
              xs: 16,
              sm: 20,
            }}
            color='text.secondary'
            lineHeight={1.5}
            sx={{
              width: '65%',
              mt: 3,
              mx: 'auto',
            }}
          >
            {description}
          </Typography>
          <Stack
            direction={'row'}
            alignItems='center'
            spacing={3}
            width='max-content'
            mx='auto'
            mt={6}
          >
            <FeaturesLandingIcons icon='finger-right' sx={{ fontSize: 44 }} />
            <CTAInstallButton
              sx={{
                width: 300,
                borderRadius: 50,
                fontSize: 18,
                boxShadow: '0px 1px 5px 0px #9065b0',
              }}
              trackerLinkProps={{
                queryRefEnable: true,
                pathnameRefEnable: true,
              }}
              variant={'contained'}
            />
            <FeaturesLandingIcons icon='finger-left' sx={{ fontSize: 44 }} />
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};

export default FeaturesLandingBanner;
