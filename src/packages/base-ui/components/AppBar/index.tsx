import LoadingButton from '@mui/lab/LoadingButton';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import debounce from 'lodash-es/debounce';
import React, { FC, useEffect, useMemo } from 'react';
import { useRecoilValue } from 'recoil';

import AuthAvatar, {
  IAuthAvatarProps,
} from '@/packages/auth/components/AuthAvatar';
import { useConnectMaxAIAccount } from '@/packages/auth/hooks/useConnectMaxAIAccount';
import { UserProfileState } from '@/packages/auth/store';
import AppLogo, { IAppLogoProps } from '@/packages/base-ui/components/AppLogo';
import { useMaxAITranslation } from '@/packages/common';

interface IAppBarProps {
  hidden?: boolean;
  ref?: React.RefObject<HTMLDivElement>;
  onHeightChange?: (height: number) => void;
  maxWidth?: number | string;
  href?: IAppLogoProps['href'];
  MenuListComponents?: React.ReactNode;
  CtaContentComponents?: React.ReactNode;
  hiddenSignInButton?: boolean;
  hiddenAvatar?: boolean;
  AvatarProps?: IAuthAvatarProps;
}

const AppBar: FC<IAppBarProps> = ({
  ref,
  hidden = false,
  maxWidth = 1312,
  href,
  hiddenSignInButton = false,
  MenuListComponents,
  CtaContentComponents,
  hiddenAvatar,
  AvatarProps,
  onHeightChange,
}) => {
  const { t } = useMaxAITranslation();
  const {
    connectMaxAIAccount,
    isLogin,
    loading: connectMaxAIAccountLoading,
  } = useConnectMaxAIAccount();
  const { loading: userProfileLoading, user: userProfile } =
    useRecoilValue(UserProfileState);

  const showAvatar = useMemo(() => {
    if (hiddenAvatar) {
      return false;
    }

    return isLogin && userProfile;
  }, [hiddenAvatar, isLogin, userProfile]);

  useEffect(() => {
    if (!onHeightChange || hidden) {
      return;
    }
    // 监听 窗口 变化, 触发 onHeightChange
    const resizeHandle = () => {
      const headerElement = document.getElementById('app-header');
      if (headerElement) {
        onHeightChange(headerElement.offsetHeight);
      }
    };
    const debouncedHandle = debounce(resizeHandle, 200);

    resizeHandle();

    window.addEventListener('resize', debouncedHandle);

    return () => {
      window.removeEventListener('resize', debouncedHandle);
    };
  }, [onHeightChange, hidden]);

  if (hidden) {
    return null;
  }

  return (
    <MuiAppBar
      id={'app-header'}
      ref={ref}
      component={'header'}
      position={'sticky'}
      sx={{
        bgcolor: 'background.paper',
        zIndex: (t) => t.zIndex.drawer + 10,
        boxShadow: (t) => (t.palette.mode === 'dark' ? 1 : 'none'),
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          boxSizing: 'border-box',
          color: 'text.primary',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: maxWidth,
          mx: 'auto',
          px: 2,
          py: {
            xs: 1,
            sm: 2,
          },
        }}
      >
        <AppLogo
          href={href}
          sx={{
            pb: '2px',
            pr: 2.5,
          }}
        />
        {MenuListComponents}
        {!showAvatar && !hiddenSignInButton ? (
          <LoadingButton
            loading={connectMaxAIAccountLoading || userProfileLoading}
            onClick={connectMaxAIAccount}
            sx={{
              fontSize: 16,
              lineHeight: 1.5,
              fontWeight: 500,
              color: 'text.primary',
            }}
          >
            {t('package__base_ui:app_bar__sign_in')}
          </LoadingButton>
        ) : null}
        {showAvatar && (
          <Box mr={CtaContentComponents ? 1.5 : 0}>
            <AuthAvatar {...AvatarProps} />
          </Box>
        )}
        {CtaContentComponents}
      </Toolbar>
      <Divider />
    </MuiAppBar>
  );
};

export default AppBar;
