import { buttonClasses } from '@mui/material';
import React from 'react';

import CTAInstallButton from '@/page_components/CTAInstallButton';

const AppHeaderCTABtn = () => {
  return (
    <CTAInstallButton
      sx={{
        width: 'max-content',
        height: { xs: 48, sm: 56 },
        fontSize: 18,
        fontWeight: 600,
        [`& .${buttonClasses.startIcon}`]: {
          display: {
            xs: 'none',
            sm: 'inherit',
          },
        },
      }}
      trackerLinkProps={{
        queryRefEnable: false,
        pathnameRefEnable: true,
        pathnameRefPrefix: 'topbar',
      }}
      variant={'contained'}
      adaptiveLabel
    />
  );
};

export default AppHeaderCTABtn;
