import { Box, MenuItem, MenuList, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import useAppHeaderState from '@/hooks/useAppHeaderState';

const MENU_LIST = [
  {
    label: 'MaxAI 101: Introduction',
    id: 'introduction',
  },
  {
    label: 'Basic Usage',
    id: 'basic-usage',
  },
];

const LearningCenterSideMenu = () => {
  const { appHeaderHeight } = useAppHeaderState();

  const { isReady, asPath } = useRouter();

  const scrollIntoElement = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  };

  useEffect(() => {
    if (isReady && asPath) {
      const hash = asPath.split('#')[1];
      scrollIntoElement(hash);
    }
  }, [isReady, asPath]);

  return (
    <Box
      flexShrink={0}
      sx={{
        position: 'sticky',
        top: appHeaderHeight + 16,
        minWidth: 260,
        flexDirection: 'column',
        maxHeight: 480,
        mr: 8,

        display: {
          xs: 'none',
          sm: 'none',
          md: 'flex',
        },
      }}
    >
      <MenuList
        sx={{
          py: 0,
        }}
      >
        {MENU_LIST.map((menuItem) => (
          <MenuItem
            key={menuItem.id}
            sx={{
              px: 2,
              py: 1.5,
            }}
            onClick={() => {
              scrollIntoElement(menuItem.id);
            }}
          >
            <Typography variant='body2' color='inherit'>
              {menuItem.label}
            </Typography>
          </MenuItem>
        ))}
      </MenuList>
    </Box>
  );
};

export default LearningCenterSideMenu;
