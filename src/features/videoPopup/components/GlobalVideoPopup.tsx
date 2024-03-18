import { Box, Stack, SxProps } from '@mui/material';
import React, { FC } from 'react';

import CustomModal from '@/components/CustomModal';
import YoutubePlayerBox from '@/components/YoutubePlayerBox';

import useVideoPopupController from '../hooks/useVideoPopupController';

interface IVideoPopupProps {
  videoWidth?: string | number;
  videoHeight?: string | number;
  onClose?: () => void;
  sx?: SxProps;
}

const VIDEO_POPUP_CONTAINER_ID = 'video-popup-container';

const GlobalVideoPopup: FC<IVideoPopupProps> = (props) => {
  const { videoWidth, videoHeight, onClose, sx } = props;
  const { open, videoSrc, closeVideoPopup } = useVideoPopupController();

  const onModalClose = () => {
    closeVideoPopup();
    onClose && onClose();
  };

  return (
    <CustomModal
      show={open}
      onClose={onModalClose}
      width={videoWidth}
      height={'auto'}
      sx={{
        my: 0,
        height: '100vh',
        bgcolor: 'transparent',
        maxWidth: 'calc(80vh * 16 / 9)',
        ...sx,
      }}
    >
      <Stack height={'100%'} justifyContent='center'>
        <Box
          id={VIDEO_POPUP_CONTAINER_ID}
          width={videoWidth}
          height={videoHeight}
        >
          <YoutubePlayerBox borderRadius={4} youtubeLink={videoSrc} />
        </Box>
      </Stack>
    </CustomModal>
  );
};

export default GlobalVideoPopup;
