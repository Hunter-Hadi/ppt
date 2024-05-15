import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { Stack, Typography } from '@mui/material';
import React, { FC } from 'react';

import ProLink from '@/components/ProLink';
import { MAXAI_WWW_SHARE_TRACKER_LINK } from '@/global_constants';
import { useInstallChromeExtensionLink } from '@/hooks';

import CTAInstallButton from '../CTAInstallButton';

interface IProps {
  propRef?: string;
  partnerPageType: 'updated' | 'installed' | 'uninstalled';
}

const FixedCtaButton: FC<IProps> = ({ propRef, partnerPageType }) => {
  const { ref: pathnameRef } = useInstallChromeExtensionLink();

  const ref = propRef ?? pathnameRef;

  return (
    <Stack
      direction={'row'}
      alignItems={'center'}
      justifyContent={'center'}
      spacing={2}
      sx={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        height: 80,
        borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        bgcolor: '#fff',
        zIndex: 1201,
      }}
    >
      <CTAInstallButton
        variant={'contained'}
        sx={{
          width: { xs: '100%', sm: 354 },
          height: 56,
          fontSize: 18,
          fontWeight: 600,
        }}
        trackerLinkProps={{
          queryRefEnable: false,
          pathnameRefEnable: false,
          defaultRef: propRef,
        }}
      />
      <ProLink
        href={`${MAXAI_WWW_SHARE_TRACKER_LINK}?partner=${partnerPageType}_${ref}`}
        target='_blank'
      >
        <Typography
          variant='body2'
          sx={{
            display: 'flex',
            alignItems: 'center',
            color: '#000',
          }}
        >
          Learn more
          <ArrowForwardIosOutlinedIcon sx={{ fontSize: 20, ml: 1 }} />
        </Typography>
      </ProLink>
    </Stack>
  );
};

export default FixedCtaButton;
