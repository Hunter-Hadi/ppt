import { useEffect } from 'react';

import useCheckExtension from '@/features/extension/hooks/useCheckExtension';
import useFunnelSurveyController from '@/features/survey/hooks/useFunnelSurveyController';
import { IFunnelSurveySceneType } from '@/features/survey/types';

const useFunnelSurveyOpenTimer = (
  enabled: boolean,
  sceneType: IFunnelSurveySceneType,
) => {
  const { openPopup } = useFunnelSurveyController(sceneType);

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
      openPopup(5000);
    }
  }, [enabled, sceneType, checkExtensionLoaded, hasExtension, openPopup]);

  return null;
};

export default useFunnelSurveyOpenTimer;
