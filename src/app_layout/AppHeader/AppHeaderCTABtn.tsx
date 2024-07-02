import { buttonClasses, Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC, useMemo } from 'react';

import MenuLinkItem from '@/app_layout/AppHeader/AppHeaderMenuItem/components/MenuLinkItem';
import { useConnectMaxAIAccount } from '@/features/common-auth';
import CTAInstallButton from '@/page_components/CTAInstallButton';

interface IProps {
  isSmallScreen?: boolean;
}

const AppHeaderCTABtn: FC<IProps> = ({ isSmallScreen }) => {
  // const { hasExtension, loaded } = useCheckExtension();
  const { connectMaxAIAccount, isLogin } = useConnectMaxAIAccount();
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

  const showSignInButton = useMemo(() => {
    return false;
    if (!isSmallScreen && !isLogin) {
      return true;
    }
    return false;
  }, [isSmallScreen, isLogin]);

  return (
    <Stack direction={'row'} spacing={1.5} alignItems='center'>
      {showSignInButton && (
        <MenuLinkItem
          isSmallScreen={isSmallScreen}
          onClick={(e) => {
            e.preventDefault();
            connectMaxAIAccount();
          }}
        >
          <Typography
            variant='custom'
            fontSize={16}
            lineHeight={1.5}
            fontWeight={500}
            color='text.primary'
          >
            {t('common:sign_in')}
          </Typography>
        </MenuLinkItem>
      )}

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
    </Stack>
  );
};

export default AppHeaderCTABtn;
