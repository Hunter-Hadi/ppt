import { buttonClasses } from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import { FC, useMemo } from 'react';

import MenuLinkItem from '@/app_layout/AppHeader/AppHeaderMenuItem/components/MenuLinkItem';
import { MAXAI_CHROME_EXTENSION_APP_HOMEPAGE_URL } from '@/features/common/constants';
import CTAInstallButton from '@/page_components/CTAInstallButton';

interface IProps {
  isSmallScreen?: boolean;
}

const AppHeaderCTABtn: FC<IProps> = ({ isSmallScreen }) => {
  // const { hasExtension, loaded } = useCheckExtension();
  // const { connectMaxAIAccount, isLogin, loading } = useConnectMaxAIAccount();
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
    return !isSmallScreen;
    if (!isSmallScreen) {
      return true;
    }
    return false;
  }, [isSmallScreen]);

  return (
    <Stack direction={'row'} spacing={1.5} alignItems='center'>
      {showSignInButton && (
        <MenuLinkItem
          link={`${MAXAI_CHROME_EXTENSION_APP_HOMEPAGE_URL}/login`}
          isSmallScreen={isSmallScreen}
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
      {/* {showSignInButton && (
        <MenuLinkItem
          isSmallScreen={isSmallScreen}
          onClick={() => {
            connectMaxAIAccount();
          }}
        >
          {loading ? (
            <CircularProgress size={20} />
          ) : (
            <Typography
              variant='custom'
              fontSize={16}
              lineHeight={1.5}
              fontWeight={500}
              color='text.primary'
            >
              {t('common:sign_in')}
            </Typography>
          )}
        </MenuLinkItem>
      )} */}

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
