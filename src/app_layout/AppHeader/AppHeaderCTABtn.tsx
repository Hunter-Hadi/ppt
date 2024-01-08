import { Button, buttonClasses } from '@mui/material';
import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import useCheckExtension from '@/features/extension/hooks/useCheckExtension';
import { APP_PROJECT_LINK } from '@/global_constants';
import CTAInstallButton from '@/page_components/CTAInstallButton';

const AppHeaderCTABtn = () => {
  const { hasExtension } = useCheckExtension();
  const { t } = useTranslation();

  const cacheSx = useMemo(() => {
    return {
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
    };
  }, []);

  if (hasExtension) {
    return (
      <Button variant='contained' sx={cacheSx} href={APP_PROJECT_LINK}>
        {t('common:sign_in')}
      </Button>
    );
  }

  return (
    <CTAInstallButton
      sx={cacheSx}
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
