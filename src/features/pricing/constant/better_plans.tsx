import { TFunction } from 'next-i18next';

import { PLAN_FEATURES_USAGE_CATEGORY_MODEL } from '@/features/pricing/constant';
import { RENDER_PLAN_TYPE } from '@/features/pricing/type';

export interface IBetterPlanDataItem {
  renderPlan: RENDER_PLAN_TYPE;
  displayFeaturesSubTitle: (t: TFunction) => string;
  displayFeatures: IDisplayFeaturesItem[];
}

export interface IDisplayFeaturesItem {
  status: 'checked' | 'unchecked';
  title: React.ReactNode;
  description: React.ReactNode;
  moreDescription?: React.ReactNode;
  divider?: boolean;
  featuresUsageCategory?: 'fast_text' | 'advanced_text' | 'image';
}

export const BETTER_PLANS_DATA: IBetterPlanDataItem[] = [
  // {
  //   renderPlan: 'basic',
  //   displayFeaturesSubTitle: 'pricing:better_plan_display__basic__sub_title',
  //   displayFeatures: [
  //     // Usage start
  //     {
  //       status: 'checked',
  //       title: 'pricing:features__fast_text_queries__month',
  //       description: PLAN_FEATURES_USAGE_CATEGORY_MODEL['fast_text'],
  //       featuresUsageCategory: 'fast_text',
  //       divider: true,
  //     },
  //     // {
  //     //   status: 'checked',
  //     //   title: 'pricing:features__advanced_text_queries__month',
  //     //   description: PLAN_FEATURES_USAGE_CATEGORY_MODEL['advanced_text'],
  //     //   featuresUsageCategory: 'advanced_text',
  //     // },
  //     // {
  //     //   status: 'checked',
  //     //   title: 'pricing:features__image_queries__month',
  //     //   description: PLAN_FEATURES_USAGE_CATEGORY_MODEL['image'],
  //     //   divider: true,
  //     //   featuresUsageCategory: 'image',
  //     // },
  //     // Usage end
  //     {
  //       status: 'checked',
  //       title: 'pricing:features__ai_rewriter__title',
  //       description: 'pricing:features__ai_rewriter__description',
  //     },
  //     {
  //       status: 'checked',
  //       title: 'pricing:features__ai_instant_reply__title',
  //       description: 'pricing:features__ai_instant_reply__description',
  //     },
  //     {
  //       status: 'checked',
  //       title: 'pricing:features__ai_art__title',
  //       description: 'pricing:features__ai_art__description',
  //     },
  //     {
  //       status: 'checked',
  //       title: 'pricing:features__ai_prompt_manager__title',
  //       description: 'pricing:features__ai_prompt_manager__description',
  //     },
  //     {
  //       status: 'checked',
  //       title: 'pricing:features__ai_prompts_library__title',
  //       description: 'pricing:features__ai_prompts_library__description',
  //       divider: true,
  //     },
  //     {
  //       status: 'checked',
  //       title: 'pricing:features__ai_summary_ask__title',
  //       description: 'pricing:features__ai_summary_ask__description',
  //     },
  //     {
  //       status: 'checked',
  //       title: 'pricing:features__ai_reading_assistant__title',
  //       description: 'pricing:features__ai_reading_assistant__description',
  //     },
  //     {
  //       status: 'checked',
  //       title: 'pricing:features__ai_translator__title',
  //       description: 'pricing:features__ai_translator__description',
  //       divider: true,
  //     },
  //     {
  //       status: 'checked',
  //       title: 'pricing:features__ai_chat__title',
  //       description: 'pricing:features__ai_chat__description',
  //     },
  //     {
  //       status: 'checked',
  //       title: 'pricing:features__ai_search__title',
  //       description: 'pricing:features__ai_search__description',
  //     },
  //   ],
  // },
  {
    renderPlan: 'elite',
    displayFeaturesSubTitle: (t) =>
      t('pricing:better_plan_display__everything_in_plan_plus', {
        PLAN: 'Pro',
      }),
    displayFeatures: [
      // Usage start
      {
        status: 'checked',
        title: 'pricing:features__fast_text_queries__month',
        description: PLAN_FEATURES_USAGE_CATEGORY_MODEL['fast_text'],
        featuresUsageCategory: 'fast_text',
      },
      {
        status: 'checked',
        title: 'pricing:features__advanced_text_queries__month',
        description: PLAN_FEATURES_USAGE_CATEGORY_MODEL['advanced_text'],
        moreDescription:
          'pricing:features__advanced_text_queries__elite__more_description',
        featuresUsageCategory: 'advanced_text',
      },
      {
        status: 'checked',
        title: 'pricing:features__image_queries__month',
        description: PLAN_FEATURES_USAGE_CATEGORY_MODEL['image'],
        moreDescription:
          'pricing:features__image_queries__elite__more_description',
        featuresUsageCategory: 'image',
      },
      // Usage end
    ],
  },
  {
    renderPlan: 'pro',
    // displayFeaturesSubTitle: (t) =>
    //   t('pricing:better_plan_display__everything_in_plan_plus', {
    //     PLAN: 'Basic',
    //   }),
    displayFeaturesSubTitle: (t) =>
      t('pricing:better_plan_display__basic__sub_title'),
    displayFeatures: [
      // Usage start
      {
        status: 'checked',
        title: 'pricing:features__fast_text_queries__month',
        description: PLAN_FEATURES_USAGE_CATEGORY_MODEL['fast_text'],
        featuresUsageCategory: 'fast_text',
      },
      {
        status: 'checked',
        title: 'pricing:features__advanced_text_queries__month',
        // description: PLAN_FEATURES_USAGE_CATEGORY_MODEL['advanced_text'],
        description: 'Only GPT-4',
        featuresUsageCategory: 'advanced_text',
        divider: true,
      },
      // {
      //   status: 'checked',
      //   title: 'pricing:features__image_queries__month',
      //   description: PLAN_FEATURES_USAGE_CATEGORY_MODEL['image'],
      //   featuresUsageCategory: 'image',
      // },
      // Usage end
      {
        status: 'checked',
        title: 'pricing:features__ai_rewriter__title',
        description: 'pricing:features__ai_rewriter__description',
      },
      {
        status: 'checked',
        title: 'pricing:features__ai_instant_reply__title',
        description: 'pricing:features__ai_instant_reply__description',
      },
      {
        status: 'checked',
        title: 'pricing:features__ai_art__title',
        description: 'pricing:features__ai_art__description',
      },
      {
        status: 'checked',
        title: 'pricing:features__ai_prompt_manager__title',
        description: 'pricing:features__ai_prompt_manager__description',
      },
      {
        status: 'checked',
        title: 'pricing:features__ai_prompts_library__title',
        description: 'pricing:features__ai_prompts_library__description',
        divider: true,
      },
      {
        status: 'checked',
        title: 'pricing:features__ai_summary_ask__title',
        description: 'pricing:features__ai_summary_ask__description',
      },
      {
        status: 'checked',
        title: 'pricing:features__ai_reading_assistant__title',
        description: 'pricing:features__ai_reading_assistant__description',
      },
      {
        status: 'checked',
        title: 'pricing:features__ai_translator__title',
        description: 'pricing:features__ai_translator__description',
        divider: true,
      },
      {
        status: 'checked',
        title: 'pricing:features__ai_chat__title',
        description: 'pricing:features__ai_chat__description',
      },
      {
        status: 'checked',
        title: 'pricing:features__ai_search__title',
        description: 'pricing:features__ai_search__description',
      },
    ],
  },
];
