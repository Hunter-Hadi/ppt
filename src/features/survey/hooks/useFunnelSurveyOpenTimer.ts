import { useEffect } from 'react';

import useCheckExtension from '@/features/extension/hooks/useCheckExtension';
import { DEFAULT_FUNNEL_SURVEY_POPUP_DELAY } from '@/features/survey/constants/funnel_survey';
import useFunnelSurveyController from '@/features/survey/hooks/useFunnelSurveyController';
import { IFunnelSurveySceneType } from '@/features/survey/types';

const useFunnelSurveyOpenTimer = (
  enabled: boolean,
  sceneType: IFunnelSurveySceneType,
) => {
  const { openPopup, closePopup } = useFunnelSurveyController(sceneType);

  const { loaded: checkExtensionLoaded, hasExtension } = useCheckExtension();

  // 不同 funnel survey 的弹出时机
  useEffect(() => {
    if (sceneType !== 'SURVEY_INSTALL_DROPPED') {
      return;
    }

    if (!enabled || !checkExtensionLoaded) {
      return;
    }

    if (!hasExtension) {
      openPopup(DEFAULT_FUNNEL_SURVEY_POPUP_DELAY);
    } else {
      closePopup();
    }
  }, [enabled, sceneType, checkExtensionLoaded, hasExtension]);

  return null;
};

export default useFunnelSurveyOpenTimer;
