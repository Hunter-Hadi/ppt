import { Button, buttonClasses } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';

import useCheckExtension from '@/features/extension/hooks/useCheckExtension';
import { APP_PROJECT_LINK } from '@/global_constants';
import CTAInstallButton from '@/page_components/CTAInstallButton';

const AppHeaderCTABtn = () => {
  const { hasExtension, loaded } = useCheckExtension();
  const { t } = useTranslation();

  const cacheSx = useMemo(() => {
    return {
      width: 'max-content',
      height: {
        xs: 48,
        sm: 56,
      },
      fontSize: 18,
      fontWeight: 600,
      borderRadius: 2,
      [`& .${buttonClasses.startIcon}`]: {
        display: {
          xs: 'none',
          sm: 'inherit',
        },
      },
    };
  }, []);

  if (!hasExtension) {
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
  }

  return (
    <Button
      variant='contained'
      sx={{ ...cacheSx, px: 3 }}
      href={APP_PROJECT_LINK}
    >
      {t('common:sign_in')}
    </Button>
  );
};

export default AppHeaderCTABtn;
