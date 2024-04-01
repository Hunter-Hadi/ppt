import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { Box, Drawer, IconButton, MenuList, Stack } from '@mui/material';
import React, { FC } from 'react';

import useAppHeaderState from '@/hooks/useAppHeaderState';

import AppHeaderMenuItem from './AppHeaderMenuItem';

const APP_HEADER_MENU_LIST = [
  {
    key: 'Industries',
    label: 'Industries',
  },
  {
    key: 'Features',
    label: 'Features',
  },
  {
    key: 'Pricing',
    label: 'Pricing',
  },
  {
    key: 'Learning-center',
    label: 'Learning-center',
  },
  {
    key: 'Language',
    label: 'language',
  },
];

interface IProps {
  isSmallScreen?: boolean;
}

const AppHeaderMenuList: FC<IProps> = ({ isSmallScreen = false }) => {
  const [open, setOpen] = React.useState(false);

  const { appHeaderHeight } = useAppHeaderState();

  if (isSmallScreen) {
    return (
      <Box ml={2}>
        <IconButton onClick={() => setOpen((pre) => !pre)}>
          {open ? <CloseOutlinedIcon /> : <MenuOutlinedIcon />}
        </IconButton>

        <Drawer
          anchor={'top'}
          open={open}
          onClose={() => setOpen(false)}
          PaperProps={{
            sx: {
              mt: `${appHeaderHeight}px`,
            },
          }}
        >
          <MenuList>
            {APP_HEADER_MENU_LIST.map((item) => (
              <AppHeaderMenuItem
                key={item.key}
                menuKey={item.key}
                isSmallScreen
              />
            ))}
          </MenuList>
        </Drawer>
      </Box>
    );
  }

  return (
    <Stack direction={'row'} spacing={2} alignItems='center'>
      {APP_HEADER_MENU_LIST.map((item) => (
        <AppHeaderMenuItem key={item.key} menuKey={item.key} />
      ))}
    </Stack>
  );
};

export default AppHeaderMenuList;
