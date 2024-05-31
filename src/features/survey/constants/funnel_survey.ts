import { IFunnelSurveySceneType } from '@/features/survey/types';

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
};

export const FUNNEL_SURVEY_MIXPANEL_EVENTNAME: Record<
  IFunnelSurveySceneType,
  string
> = {
  SURVEY_INSTALL_DROPPED: 'survey_install_dropped_backend',
};
