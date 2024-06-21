import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { Box, Drawer, IconButton, MenuList, Stack } from '@mui/material';
import React, { FC } from 'react';

import useAppHeaderState from '@/hooks/useAppHeaderState';

import AppHeaderMenuItem from './AppHeaderMenuItem';

const APP_HEADER_MENU_LIST = ['Language', 'Products', 'Pricing', 'Resources'];

interface IProps {
  isSmallScreen?: boolean;
}

const AppHeaderMenuList: FC<IProps> = ({ isSmallScreen = false }) => {
  const [open, setOpen] = React.useState(false);

  const { appHeaderHeight } = useAppHeaderState();

  if (isSmallScreen) {
    // 小屏幕
    return (
      <Box ml={2}>
        <IconButton onClick={() => setOpen((pre) => !pre)}>
          {open ? <CloseOutlinedIcon /> : <MenuOutlinedIcon />}
        </IconButton>

        <Drawer
          anchor={'right'}
          open={open}
          onClose={() => setOpen(false)}
          PaperProps={{
            sx: {
              width: '100%',
              mt: `${appHeaderHeight}px`,
            },
          }}
        >
          <MenuList>
            {APP_HEADER_MENU_LIST.map((item) => (
              <AppHeaderMenuItem key={item} menuKey={item} isSmallScreen />
            ))}
          </MenuList>
        </Drawer>
      </Box>
    );
  } else {
    // 大屏幕
    return (
      <Stack direction={'row'} spacing={1.5} alignItems='center'>
        {APP_HEADER_MENU_LIST.map((item) => (
          <AppHeaderMenuItem key={item} menuKey={item} />
        ))}
      </Stack>
    );
  }
};

export default AppHeaderMenuList;
