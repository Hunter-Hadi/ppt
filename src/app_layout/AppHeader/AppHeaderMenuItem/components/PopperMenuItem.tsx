import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import { Drawer, Fade, Paper, Popper, SxProps } from '@mui/material';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import React, { FC, useState } from 'react';

import { APP_HEADER_ID } from '@/app_layout/AppHeader';
import useAppHeaderState from '@/hooks/useAppHeaderState';

interface IProps {
  isSmallScreen?: boolean;
  popperSx?: SxProps;
  paperSx?: SxProps;
  BigScreenContent: React.ReactNode;
  SmallScreenContent: React.ReactNode;
  LabelContent: React.ReactNode;
}

const PopperMenuItem: FC<IProps> = ({
  isSmallScreen,
  popperSx,
  paperSx,
  BigScreenContent,
  SmallScreenContent,
  LabelContent,
}) => {
  const { appHeaderHeight } = useAppHeaderState();

  const [expanded, setExpanded] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const closeTimer = React.useRef<number | null>(null);
  const handleOpenMenu = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }
    const appHeaderElement = document.getElementById(APP_HEADER_ID);
    if (appHeaderElement) {
      setAnchorEl(appHeaderElement);
    }
  };

  const handleCloseMenu = (delay = 0) => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
    }
    if (delay) {
      closeTimer.current = window.setTimeout(() => {
        setAnchorEl(null);
      }, delay);
    } else {
      setAnchorEl(null);
    }
  };

  const open = Boolean(anchorEl);

  const handleExpanded = () => {
    setExpanded(true);
  };

  if (isSmallScreen) {
    // 小屏幕显示的内容
    return (
      <>
        <MenuItem
          onClick={() => {
            handleExpanded();
          }}
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            py: 2,
          }}
        >
          {LabelContent}
          <ChevronRightOutlinedIcon
            sx={{
              width: 24,
              height: 24,
              rotate: expanded ? '90deg' : '-90deg',
              transition: 'all 0.3s ease',
            }}
          />
        </MenuItem>
        <Drawer
          anchor={'right'}
          open={expanded}
          onClose={() => setExpanded(false)}
          PaperProps={{
            sx: {
              width: '100%',
              mt: `${appHeaderHeight}px`,
              py: 1,
            },
          }}
        >
          <MenuItem
            onClick={() => {
              setExpanded(false);
            }}
          >
            <KeyboardArrowLeftOutlinedIcon />
          </MenuItem>
          {SmallScreenContent}
        </Drawer>
      </>
    );
  } else {
    // 大屏幕显示的内容
    return (
      <>
        <Button
          onClick={handleOpenMenu}
          onMouseEnter={handleOpenMenu}
          onMouseLeave={() => {
            handleCloseMenu(0);
          }}
          sx={{
            display: isSmallScreen ? 'none' : 'flex',
            fontSize: 16,
            fontWeight: 500,
            lineHeight: 1.5,
            color: 'text.primary',
            px: 2,
            py: 1.5,
            '&:hover': {
              backgroundColor: '#eee',
            },
            '&:active': {
              backgroundColor: 'rgba(0,0,0,0.08)',
            },
            '& .MuiButton-endIcon': {
              ml: 0.5,
            },
          }}
          endIcon={
            <ChevronRightOutlinedIcon
              sx={{
                width: 24,
                height: 24,
                rotate: open ? '90deg' : '-90deg',
                transition: 'all 0.3s ease',
              }}
            />
          }
        >
          {LabelContent}
        </Button>
        <Popper
          open={open}
          anchorEl={anchorEl}
          sx={{
            zIndex: (t) => t.zIndex.drawer + 10,
            ...popperSx,
          }}
          keepMounted
          onMouseEnter={handleOpenMenu}
          onMouseLeave={() => {
            handleCloseMenu(0);
          }}
          transition
        >
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  width: '100%',
                  ...paperSx,
                }}
              >
                {BigScreenContent}
              </Paper>
            </Fade>
          )}
        </Popper>
      </>
    );
  }
};

export default PopperMenuItem;
