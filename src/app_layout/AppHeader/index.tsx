import { Box, Divider, Toolbar, useMediaQuery } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useRouter } from 'next/router';
import { FC } from 'react';

import useAppHeaderState from '@/hooks/useAppHeaderState';
import { removeLocaleInPathname } from '@/i18n/utils';
import AppBar from '@/packages/base-ui/components/AppBar';
import AppLogo from '@/page_components/AppLogo';

import AppHeaderCTABtn from './AppHeaderCTABtn';
import AppHeaderMenuList from './AppHeaderMenuList';

export const APP_HEADER_ID = 'app-header';

// const NOT_CTA_BUTTON_PATH = ['/chrome-extension'];
const NOT_HEADER_PATH = ['/zmo', '/partners/', '/release-notes', '/share'];

const AppHeader: FC = () => {
  const { pathname } = useRouter();

  // const theme = useTheme();
  // const isDownSm = useMediaQuery(theme.breakpoints.down('sm')); // 屏幕宽度小于 768 时为 true

  const isMiniMenu = useMediaQuery('(max-width:1090px)'); // 屏幕宽度小于 1090 时为 true

  const isNotHeader = NOT_HEADER_PATH.some((path) =>
    removeLocaleInPathname(pathname).startsWith(path),
  );

  const { setAppHeaderHeight, appHeaderHeight } = useAppHeaderState();

  console.log(`appHeaderHeight`, appHeaderHeight);

  if (isNotHeader) {
    return null;
  }

  return (
    <AppBar
      hidden={isNotHeader}
      MenuListComponents={
        <Stack direction={'row'} alignItems='center' width={'100%'}>
          {!isMiniMenu ? <AppHeaderMenuList /> : null}
          <Box flex={1} />
          <AppHeaderCTABtn isSmallScreen={isMiniMenu} />
          {isMiniMenu ? <AppHeaderMenuList isSmallScreen /> : null}
        </Stack>
      }
      onHeightChange={setAppHeaderHeight}
    />
  );

  return (
    <AppBar
      id={APP_HEADER_ID}
      ref={headerElement}
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
        <AppLogo
          sx={{
            pb: '2px',
          }}
        />

        <Box pl={2.5} />

        {!isMiniMenu ? <AppHeaderMenuList /> : null}

        <Box flex={1} />

        {/* <Box pl={2} /> */}

        <AppHeaderCTABtn isSmallScreen={isMiniMenu} />

        {isMiniMenu ? <AppHeaderMenuList isSmallScreen /> : null}
      </Toolbar>
      <Divider />
    </AppBar>
  );
};
export default AppHeader;
