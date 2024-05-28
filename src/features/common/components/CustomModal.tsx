import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import IconButton from '@mui/material/IconButton';
import Modal, { ModalProps } from '@mui/material/Modal';
import Paper from '@mui/material/Paper';
import { lighten, SxProps } from '@mui/material/styles';
import React, { FC, useEffect, useRef } from 'react';

interface IProps extends Omit<ModalProps, 'children' | 'onClose' | 'open'> {
  show: boolean;
  onClose?: (reason?: string) => void;
  sx?: SxProps;
  bgTransparent?: boolean;
  maxWidth?: string | number;
  width?: string | number;
  height?: string | number;
  children?: JSX.Element;
  isNeedAutoFocus?: boolean;
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
  isNeedAutoFocus,
  ...restProps
}) => {
  const viewRef = useRef<HTMLDivElement>(null);
  const intervalNum = useRef<NodeJS.Timer | null>(null);
  const handleClose = (event: any, reason: string) => {
    if (onClose) onClose(reason);
  };
  useEffect(() => {
    if (show && isNeedAutoFocus) {
      //解决modal 点击视频后无法ESC的问题的问题
      // https://stackoverflow.com/questions/75895916/how-to-make-my-bootstrap-4-popup-close-after-clicking-esc-key-on-keyboard-whi
      intervalNum.current && clearInterval(intervalNum.current);
      intervalNum.current = setInterval(() => {
        if (viewRef.current) {
          viewRef.current.focus();
        }
      }, 100);
      return () => {
        intervalNum.current && clearInterval(intervalNum.current);
      };
    }
  }, [show, isNeedAutoFocus]);
  return (
    <Modal open={show} onClose={handleClose} disablePortal {...restProps}>
      {/* 添加 React.Fragment 为了解决 modal 内部元素 focus 无效的问题 */}
      {/* reference: https://stackoverflow.com/questions/53951479/react-material-ui-modal-causing-an-error-with-the-tabindex */}
      {/* 改成用div包裹，因为React.Fragment会导致ESC无法关闭 */}
      <Box ref={viewRef}>
        <Box sx={{ position: 'fixed', top: 16, left: 16 }}>
          <IconButton
            data-testid='maxai-custom-modal-close-btn'
            onClick={() => {
              onClose && onClose('closeBtn');
            }}
            sx={{
              color: 'white',
              bgcolor: '#616161',
              '&:hover': {
                bgcolor: '#7e7e7e',
              },
            }}
          >
            <CloseOutlinedIcon />
          </IconButton>
        </Box>
        <Fade in={show}>
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
                tabIndex: '100',
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
            {children}
          </Paper>
        </Fade>
      </Box>
    </Modal>
  );
};

export default CustomModal;
