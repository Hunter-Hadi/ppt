import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import { Fade, Paper, Popper, SxProps } from '@mui/material';
import Button from '@mui/material/Button';
import React, { FC } from 'react';

interface ILanguageSelectorPopupProps {
  BigScreenContent: React.ReactNode;
  SmallScreenContent: React.ReactNode;
  LabelContent: React.ReactNode;
  PopperSx?: SxProps;
  PaperSx?: SxProps;
  ButtonSx?: SxProps;
}

const LanguageSelectorPopup: FC<ILanguageSelectorPopupProps> = (props) => {
  const { PopperSx, PaperSx, ButtonSx, BigScreenContent, LabelContent } = props;

  const buttonRef = React.useRef<HTMLButtonElement>(null);
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handleOpenMenu = () => {
    setAnchorEl(buttonRef.current);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  // 大屏幕显示的内容
  return (
    <>
      <Button
        ref={buttonRef}
        onClick={handleOpenMenu}
        onMouseEnter={handleOpenMenu}
        onMouseLeave={() => {
          handleCloseMenu();
        }}
        sx={{
          display: 'flex',
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
          ...ButtonSx,
        }}
        endIcon={
          <ChevronRightOutlinedIcon
            sx={{
              width: 24,
              height: 24,
              rotate: open ? '-90deg' : '90deg',
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
          ...PopperSx,
        }}
        keepMounted
        onMouseEnter={handleOpenMenu}
        onMouseLeave={handleCloseMenu}
        transition
        placement='bottom'
      >
        {({ TransitionProps }) => (
          <Fade {...TransitionProps} timeout={350}>
            <Paper
              elevation={2}
              sx={{
                p: 3,
                width: '100%',
                boxSizing: 'border-box',
                ...PaperSx,
              }}
            >
              {BigScreenContent}
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  );
};

export default LanguageSelectorPopup;
