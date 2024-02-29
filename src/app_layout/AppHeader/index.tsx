import {
  AppBar,
  Box,
  Divider,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { debounce } from 'lodash-es';
import { useRouter } from 'next/router';
import { FC, useEffect } from 'react';

import useAppHeaderState from '@/hooks/useAppHeaderState';
import AppLogo from '@/page_components/AppLogo';

import AppHeaderCTABtn from './AppHeaderCTABtn';
import AppHeaderMenuList from './AppHeaderMenuList';

export const APP_HEADER_ID = 'app-header';

// const NOT_CTA_BUTTON_PATH = ['/chrome-extension'];
const NOT_HEADER_PATH = ['/zmo', '/partners/', '/release-notes', '/share'];

const AppHeader: FC = () => {
  const { pathname } = useRouter();

  const theme = useTheme();
  // const isDownSm = useMediaQuery(theme.breakpoints.down('sm')); // 屏幕宽度小于 768 时为 true

  const isMiniMenu = useMediaQuery('(max-width:1090px)'); // 屏幕宽度小于 1090 时为 true

  const isNotHeader = NOT_HEADER_PATH.some((path) => pathname.startsWith(path));

  const { updateAppHeaderHeight } = useAppHeaderState();

  useEffect(() => {
    // 监听 窗口 变化, 更新 app header height state

    const resizeHandle = () => {
      updateAppHeaderHeight();
    };
    const debouncedHandle = debounce(resizeHandle, 200);

    resizeHandle();

    window.addEventListener('resize', debouncedHandle);

    return () => {
      window.removeEventListener('resize', debouncedHandle);
    };
  }, [isMiniMenu]);

  if (isNotHeader) {
    return null;
  }

  return (
    <AppBar
      id={APP_HEADER_ID}
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
          maxWidth: 1312,
          mx: 'auto',
          px: 2,
          py: {
            xs: 1,
            sm: 2,
          },
        }}
      >
        <AppLogo />

        <Box flex={1} />

        {!isMiniMenu ? <AppHeaderMenuList /> : null}

        <Box pl={2} />

        <AppHeaderCTABtn />

        {isMiniMenu ? <AppHeaderMenuList isSmallScreen /> : null}
      </Toolbar>
      <Divider />
    </AppBar>
  );
};
export default AppHeader;
