import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Toolbar from '@mui/material/Toolbar';
import debounce from 'lodash-es/debounce';
import React, { FC, useEffect } from 'react';

import { useConnectMaxAIAccount } from '@/features/common-auth/hooks/useConnectMaxAIAccount';
import AppLogo, { IAppLogoProps } from '@/packages/base-ui/components/AppLogo';
import Avatar from '@/packages/base-ui/components/Avatar';

interface IAppBarProps {
  hidden?: boolean;
  ref?: React.RefObject<HTMLDivElement>;
  onHeightChange?: (height: number) => void;
  maxWidth?: number | string;
  href?: IAppLogoProps['href'];
  MenuListComponents: React.ReactNode;
  // smallScreenQuery?: string | ((theme: Theme) => string);
}

const AppBar: FC<IAppBarProps> = ({
  ref,
  hidden = false,
  maxWidth = 1312,
  href,
  MenuListComponents,
  // smallScreenQuery,
  onHeightChange,
}) => {
  // const isSmallScreen = useMediaQuery(smallScreenQuery ?? '(max-width:1090px)'); // 屏幕宽度小于 1090 时为 true

  // TODO: isLogin 的状态不应该从这个 hook 里面获取
  const { isLogin } = useConnectMaxAIAccount();

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

        <Box flex={1} />

        {/* <AppHeaderCTABtn isSmallScreen={isMiniMenu} /> */}

        {isLogin && <Avatar />}
      </Toolbar>
      <Divider />
    </MuiAppBar>
  );
};

export default AppBar;
