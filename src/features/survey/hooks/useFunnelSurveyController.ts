import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import {
  FunnelSurveyPopupOpenStateAtom,
  FunnelSurveyPopupOpenTimerAtom,
} from '@/features/survey/store';
import { IFunnelSurveySceneType } from '@/features/survey/types';

const useFunnelSurveyController = (sceneType: IFunnelSurveySceneType) => {
  const [funnelSurveyPopupOpenState, setFunnelSurveyPopupOpenState] =
    useRecoilState(FunnelSurveyPopupOpenStateAtom);
  const [funnelSurveyPopupOpenTimer, setFunnelSurveyPopupOpenTimer] =
    useRecoilState(FunnelSurveyPopupOpenTimerAtom);

  const openPopup = useCallback(
    (delay = 0) => {
      const timer = window.setTimeout(() => {
        setFunnelSurveyPopupOpenState((prevState) => ({
          ...prevState,
          [sceneType]: true,
        }));
      }, delay);
      setFunnelSurveyPopupOpenTimer((prevState) => ({
        ...prevState,
        [sceneType]: timer,
      }));
    },
    [sceneType, setFunnelSurveyPopupOpenState, setFunnelSurveyPopupOpenTimer],
  );

  const closePopup = useCallback(() => {
    const timer = funnelSurveyPopupOpenTimer[sceneType];
    if (timer) {
      clearTimeout(timer);
      setFunnelSurveyPopupOpenTimer((prevState) => ({
        ...prevState,
        [sceneType]: -1,
      }));
    }

    setFunnelSurveyPopupOpenState((prevState) => ({
      ...prevState,
      [sceneType]: false,
    }));
  }, [
    sceneType,
    funnelSurveyPopupOpenTimer,
    setFunnelSurveyPopupOpenState,
    setFunnelSurveyPopupOpenTimer,
  ]);

  return {
    open: funnelSurveyPopupOpenState[sceneType] || false,
    openPopup,
    closePopup,
  };
};

export default useFunnelSurveyController;
