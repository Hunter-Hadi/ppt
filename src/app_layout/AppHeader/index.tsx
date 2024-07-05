import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useRouter } from 'next/router';
import { FC } from 'react';

import useAppHeaderState from '@/hooks/useAppHeaderState';
import { removeLocaleInPathname } from '@/i18n/utils';
import AppBar from '@/packages/base-ui/components/AppBar';

import AppHeaderCTABtn from './AppHeaderCTABtn';
import AppHeaderMenuList from './AppHeaderMenuList';

export const APP_HEADER_ID = 'app-header';

// const NOT_CTA_BUTTON_PATH = ['/chrome-extension'];
const NOT_HEADER_PATH = [
  '/zmo',
  '/partners/',
  '/release-notes',
  '/share',
  '/embed',
];

const AppHeader: FC = () => {
  const { pathname } = useRouter();

  // const theme = useTheme();
  // const isDownSm = useMediaQuery(theme.breakpoints.down('sm')); // 屏幕宽度小于 768 时为 true

  const isMiniMenu = useMediaQuery('(max-width:1090px)'); // 屏幕宽度小于 1090 时为 true

  const isNotHeader = NOT_HEADER_PATH.some((path) =>
    removeLocaleInPathname(pathname).startsWith(path),
  );

  const { setAppHeaderHeight } = useAppHeaderState();

  if (isNotHeader) {
    return null;
  }

  return (
    <AppBar
      hiddenAvatar
      hiddenSignInButton
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
};
export default AppHeader;
