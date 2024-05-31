import { useEffect } from 'react';

import useFunnelSurveyController from '@/features/survey/hooks/useFunnelSurveyController';
import { IFunnelSurveySceneType } from '@/features/survey/types';

const useFunnelSurveyOpenTimer = (
  enabled: boolean,
  sceneType: IFunnelSurveySceneType,
) => {
  const { openPopup } = useFunnelSurveyController(sceneType);

  // 不同 funnel survey 的弹出时机
  useEffect(() => {
    if (!enabled) {
      return;
    }

    if (sceneType === 'SURVEY_INSTALL_DROPPED') {
      setTimeout(openPopup, 3000);
    }
  }, [enabled, sceneType, openPopup]);

  return null;
};

export default useFunnelSurveyOpenTimer;
