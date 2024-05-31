import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { IconButton, SxProps } from '@mui/material';
import Box from '@mui/material/Box';
import Slide from '@mui/material/Slide';
import React, { FC, useEffect } from 'react';
import { createPortal } from 'react-dom';

import FunnelSurveyContentRenderer from '@/features/survey/components/FunnelSurveyContentRenderer';
import useFunnelSurveyController from '@/features/survey/hooks/useFunnelSurveyController';
import useFunnelSurveyOpenTimer from '@/features/survey/hooks/useFunnelSurveyOpenTimer';
import { IFunnelSurveySceneType } from '@/features/survey/types';

interface IFunnelSurveyPopupProps {
  sceneType: IFunnelSurveySceneType;
  sx?: SxProps;
}

const FunnelSurveyPopup: FC<IFunnelSurveyPopupProps> = ({ sceneType, sx }) => {
  const { open, closePopup } = useFunnelSurveyController(sceneType);
  const [loaded, setLoaded] = React.useState(false);

  useFunnelSurveyOpenTimer(loaded, sceneType);

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect;

  if (!loaded) {
    return null;
  }

  return (
    <>
      {createPortal(
        <Slide in={open} direction='up' mountOnEnter unmountOnExit>
          <Box
            id={`funnel_survey__${sceneType}`}
            sx={{
              position: 'fixed ',
              bottom: 32,
              right: 32,
              zIndex: 1300,
            }}
          >
            <IconButton
              data-testid='maxai-custom-modal-close-btn'
              onClick={closePopup}
              size='small'
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                color: 'customText.tertiary',
                zIndex: 1,
              }}
            >
              <CloseOutlinedIcon />
            </IconButton>
            <FunnelSurveyContentRenderer sx={sx} sceneType={sceneType} />
          </Box>
        </Slide>,
        document.body,
      )}
    </>
  );
};

export default FunnelSurveyPopup;
