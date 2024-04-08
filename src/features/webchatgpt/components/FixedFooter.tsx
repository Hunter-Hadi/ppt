import ArrowForwardIosOutlinedIcon from '@mui/icons-material/ArrowForwardIosOutlined';
import { Stack, Typography } from '@mui/material';
import React, { FC } from 'react';

import ProLink from '@/components/ProLink';
import { MAXAI_WWW_SHARE_TRACKER_LINK } from '@/global_constants';
import CTAInstallButton from '@/page_components/CTAInstallButton';

interface IProps {
  propRef?: string;
}

const FixedFooter: FC<IProps> = ({ propRef }) => {
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
        href={`${MAXAI_WWW_SHARE_TRACKER_LINK}?ref=${propRef}`}
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

export default FixedFooter;
