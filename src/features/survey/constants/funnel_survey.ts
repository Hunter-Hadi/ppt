import { IFunnelSurveySceneType } from '@/features/survey/types';

export const DEFAULT_FUNNEL_SURVEY_POPUP_DELAY = 40 * 1000; // 默认 funnel survey 出现的延迟都是 40s

export const FUNNEL_SURVEY_CONFIG: Record<
  IFunnelSurveySceneType,
  {
    popupTitle: string;
    questionSetting: {
      type: 'input';
      name: string;
      label: string;
      meta?: {
        placeholder?: string;
      };
    }[];
  }
> = {
  SURVEY_INSTALL_DROPPED: {
    popupTitle: 'survey:funnel_survey__SURVEY_INSTALL_DROPPED__title',
    questionSetting: [
      {
        type: 'input',
        name: 'What concerns are keeping you from installing the extension?',
        label:
          'survey:funnel_survey__SURVEY_INSTALL_DROPPED__question1__options1',
        meta: {
          placeholder:
            'survey:funnel_survey__SURVEY_INSTALL_DROPPED__question1__options1__placeholder',
        },
      },
    ],
  },
  SURVEY_UNINSTALL_COMPLETED: {
    popupTitle: 'survey:funnel_survey__SURVEY_UNINSTALL_COMPLETED__title',
    questionSetting: [
      {
        type: 'input',
        name: 'What made you decide to uninstall the MaxAI.me browser extension?',
        label:
          'survey:funnel_survey__SURVEY_UNINSTALL_COMPLETED__question1__options1',
        meta: {
          placeholder:
            'survey:funnel_survey__SURVEY_UNINSTALL_COMPLETED__question1__options1__placeholder',
        },
      },
    ],
  },
};

export const FUNNEL_SURVEY_MIXPANEL_EVENTNAME: Record<
  IFunnelSurveySceneType,
  string
> = {
  SURVEY_INSTALL_DROPPED: 'survey_install_dropped_backend',
  SURVEY_UNINSTALL_COMPLETED: 'survey_uninstall_completed_backend',
};
