import CloseIcon from '@mui/icons-material/Close';
import {
  Box,
  Fade,
  IconButton,
  lighten,
  Modal,
  Paper,
  SxProps,
} from '@mui/material';
import React, { FC, useEffect, useState } from 'react';

interface IProps {
  show: boolean;
  onClose?: () => void;
  sx?: SxProps;
  bgTransparent?: boolean;
  maxWidth?: string | number;
  width?: string | number;
  height?: string | number;
  children?: React.ReactNode;
}

const CustomModal: FC<IProps> = ({
  children,
  show = false,
  sx,
  onClose,
  bgTransparent = false,
  maxWidth,
  width,
  height,
}) => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  useEffect(() => {
    setOpen(show);
  }, [show]);

  return (
    <React.Fragment>
      <Modal open={open} onClose={handleClose}>
        <Fade in={open}>
          <Paper
            id='mui-modal'
            sx={[
              {
                width: width ?? '90vw',
                height: height ?? '90vh',
                maxWidth: maxWidth ?? 'lg',
                margin: '5vh auto',
                overflowY: 'auto',
                '&:focus-visible': {
                  outline: 'none',
                },
                bgcolor: (t) =>
                  t.palette.mode === 'dark'
                    ? lighten(t.palette.background.paper, 0.1)
                    : 'pageBackground',
                ...sx,
              },
              // sx Array types
              // @see https://github.com/mui/material-ui/issues/32948
              bgTransparent &&
                ({
                  bgcolor: 'transparent',
                  boxShadow: 'none',
                } as any),
            ]}
          >
            <Box sx={{ position: 'fixed', top: 16, left: 16 }}>
              <IconButton
                onClick={handleClose}
                sx={{
                  color: 'white',
                  bgcolor: '#616161',
                  '&:hover': {
                    bgcolor: '#7e7e7e',
                  },
                }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            {children}
          </Paper>
        </Fade>
      </Modal>
      {/* <Backdrop open={open} sx={{ zIndex: t => t.zIndex.modal - 1 }} /> */}
    </React.Fragment>
  );
};

export default CustomModal;
