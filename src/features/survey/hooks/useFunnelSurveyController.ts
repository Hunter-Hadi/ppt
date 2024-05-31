import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { FunnelSurveyPopupOpenStateAtom } from '@/features/survey/store';
import { IFunnelSurveySceneType } from '@/features/survey/types';

const useFunnelSurveyController = (sceneType: IFunnelSurveySceneType) => {
  const [funnelSurveyPopupOpenState, setFunnelSurveyPopupOpenState] =
    useRecoilState(FunnelSurveyPopupOpenStateAtom);

  const openPopup = useCallback(() => {
    setFunnelSurveyPopupOpenState((prevState) => ({
      ...prevState,
      [sceneType]: true,
    }));
  }, [sceneType, setFunnelSurveyPopupOpenState]);

  const closePopup = useCallback(() => {
    setFunnelSurveyPopupOpenState((prevState) => ({
      ...prevState,
      [sceneType]: false,
    }));
  }, [sceneType, setFunnelSurveyPopupOpenState]);

  return {
    open: funnelSurveyPopupOpenState[sceneType] || false,
    openPopup,
    closePopup,
  };
};

export default useFunnelSurveyController;
