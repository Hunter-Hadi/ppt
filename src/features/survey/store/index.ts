import { atom } from 'recoil';

import { IFunnelSurveySceneType } from '@/features/survey/types';

export const FunnelSurveyPopupOpenStateAtom = atom<
  Partial<Record<IFunnelSurveySceneType, boolean>>
>({
  key: 'FunnelSurveyPopupOpenStateAtom',
  default: {},
});

export const FunnelSurveyPopupOpenTimerAtom = atom<
  Partial<Record<IFunnelSurveySceneType, number>>
>({
  key: 'FunnelSurveyPopupOpenTimerAtom',
  default: {},
});
