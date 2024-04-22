import {
  PLAN_FEATURES_USAGE_CATEGORY_MODEL,
  PLAN_USAGE_QUERIES,
} from '@/features/pricing/constant';
import { numberWithCommas } from '@/utils/dataHelper/numberHelper';

interface IPlanFeaturesType {
  title: string;
  desc?: string;
  icon?: string;
  planStatus: Record<string, IFeaturesPlanStatus>;
  tooltip?: {
    title?: string;
    desc?: string;
    imageLink?: string;
    videoUrl?: string;
  };
}
interface IFeaturesPlanStatus {
  status: 'checked' | 'none' | 'value';
  statusText?: string;
}

type IPlanFeaturesCategoryType =
  | 'best_ai_models'
  | 'writing_features'
  | 'reading_features'
  | 'research_features'
  | 'webchatgpt_features';

export const PLAN_FEATURES_CATEGORY_V2: {
  name: string;
  categoryKey: IPlanFeaturesCategoryType;
  icon?: string;
  features: IPlanFeaturesType[];
}[] = [
  {
    categoryKey: 'best_ai_models',
    name: 'pricing:features__category__best_ai_models',
    features: [
      {
        title: 'pricing:features__fast_text_queries__month',
        desc: PLAN_FEATURES_USAGE_CATEGORY_MODEL['fast_text'],
        planStatus: {
          free: { status: 'none' },
          basic: {
            status: 'value',
            statusText: numberWithCommas(
              PLAN_USAGE_QUERIES['basic']['fast_text'],
              0,
            ),
          },
          pro: {
            status: 'value',
            statusText: numberWithCommas(
              PLAN_USAGE_QUERIES['pro']['fast_text'],
              0,
            ),
          },
          elite: {
            status: 'value',
            statusText: 'common:unlimited',
          },
        },
        tooltip: {
          desc: 'pricing:features__fast_text_queries__tooltip__description',
          imageLink: '/assets/pricing/fast-text-queries.png',
          // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
        },
      },
      {
        title: 'pricing:features__advanced_text_queries__month',
        desc: PLAN_FEATURES_USAGE_CATEGORY_MODEL['advanced_text'],
        planStatus: {
          free: { status: 'none' },
          basic: {
            status: 'value',
            statusText: numberWithCommas(
              PLAN_USAGE_QUERIES['basic']['advanced_text'],
              0,
            ),
          },
          pro: {
            status: 'value',
            statusText: numberWithCommas(
              PLAN_USAGE_QUERIES['pro']['advanced_text'],
              0,
            ),
          },
          elite: {
            status: 'value',
            statusText: 'common:unlimited',
          },
        },
        tooltip: {
          desc: 'pricing:features__advanced_text_queries__tooltip__description',
          imageLink: '/assets/pricing/advanced-text-queries.png',
          // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
        },
      },
      {
        title: 'pricing:features__image_queries__month',
        desc: PLAN_FEATURES_USAGE_CATEGORY_MODEL['image'],
        planStatus: {
          free: { status: 'none' },
          basic: {
            status: 'value',
            statusText: numberWithCommas(
              PLAN_USAGE_QUERIES['basic']['image'],
              0,
            ),
          },
          pro: {
            status: 'value',
            statusText: numberWithCommas(PLAN_USAGE_QUERIES['pro']['image'], 0),
          },
          elite: {
            status: 'value',
            statusText: 'common:unlimited',
          },
        },
        tooltip: {
          desc: 'pricing:features__image_queries__tooltip__description',
          imageLink: '/assets/pricing/image-queries.png',
          // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
        },
      },
      {
        title: 'pricing:features__free_ai_models',
        planStatus: {
          free: { status: 'checked' },
          basic: { status: 'checked' },
          pro: { status: 'checked' },
          elite: { status: 'checked' },
        },
      },
    ],
  },
  {
    categoryKey: 'writing_features',
    name: 'pricing:features__category__writing_features',
    features: [
      {
        title: 'pricing:features__ai_rewriter__title',
        desc: 'pricing:features__ai_rewriter__description',
        icon: 'NewChat',
        planStatus: {
          free: { status: 'checked' },
          basic: { status: 'checked' },
          pro: { status: 'checked' },
          elite: { status: 'checked' },
        },
        tooltip: {
          desc: 'pricing:features__ai_rewriter__tooltip__description',
          imageLink: '/assets/pricing/ai-rewriter.png',
          // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
        },
      },
      {
        title: 'pricing:features__ai_instant_reply__title',
        desc: 'pricing:features__ai_instant_reply__description',
        icon: 'QuickReplyIcon',
        planStatus: {
          free: { status: 'none' },
          basic: { status: 'checked' },
          pro: { status: 'checked' },
          elite: { status: 'checked' },
        },
        tooltip: {
          desc: 'pricing:features__ai_instant_reply__tooltip__description',
          imageLink: '/assets/pricing/ai-instant-reply.png',
          // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
        },
      },
      {
        title: 'pricing:features__ai_art__title',
        desc: 'pricing:features__ai_art__description',
        icon: 'Art',
        planStatus: {
          free: { status: 'none' },
          basic: { status: 'checked' },
          pro: { status: 'checked' },
          elite: { status: 'checked' },
        },
        tooltip: {
          desc: 'pricing:features__ai_art__tooltip__description',
          imageLink: '/assets/pricing/ai-art.png',
          // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
        },
      },
      {
        title: 'pricing:features__ai_prompt_manager__title',
        desc: 'pricing:features__ai_prompt_manager__description',
        icon: 'PromptManager',
        planStatus: {
          free: { status: 'checked' },
          basic: { status: 'checked' },
          pro: { status: 'checked' },
          elite: { status: 'checked' },
        },
        tooltip: {
          desc: 'pricing:features__ai_prompt_manager__tooltip__description',
          imageLink: '/assets/pricing/ai-prompt-manager.png',
          // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
        },
      },
      {
        title: 'pricing:features__ai_prompts_library__title',
        desc: 'pricing:features__ai_prompts_library__description',
        icon: 'PromptLibrary',
        planStatus: {
          free: { status: 'checked' },
          basic: { status: 'checked' },
          pro: { status: 'checked' },
          elite: { status: 'checked' },
        },
        tooltip: {
          desc: 'pricing:features__ai_prompts_library__tooltip__description',
          imageLink: '/assets/pricing/ai-prompts-library.png',
          // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
        },
      },
    ],
  },
  {
    categoryKey: 'reading_features',
    name: 'pricing:features__category__reading_features',
    features: [
      {
        title: 'pricing:features__ai_summary_ask__title',
        desc: 'pricing:features__ai_summary_ask__description',
        icon: 'SummaryAsk',
        planStatus: {
          free: { status: 'none' },
          basic: { status: 'checked' },
          pro: { status: 'checked' },
          elite: { status: 'checked' },
        },
        tooltip: {
          desc: 'pricing:features__ai_summary_ask__tooltip__description',
          imageLink: '/assets/pricing/ai-summary-ask.png',
          // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
        },
      },
      {
        title: 'pricing:features__ai_reading_assistant__title',
        desc: 'pricing:features__ai_reading_assistant__description',
        icon: 'ReadingAssistant',
        planStatus: {
          free: { status: 'checked' },
          basic: { status: 'checked' },
          pro: { status: 'checked' },
          elite: { status: 'checked' },
        },
        tooltip: {
          desc: 'pricing:features__ai_reading_assistant__tooltip__description',
          imageLink: '/assets/pricing/ai-reading-assistant.png',
          // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
        },
      },
      {
        title: 'pricing:features__ai_translator__title',
        desc: 'pricing:features__ai_translator__description',
        icon: 'Translator',
        planStatus: {
          free: { status: 'checked' },
          basic: { status: 'checked' },
          pro: { status: 'checked' },
          elite: { status: 'checked' },
        },
        tooltip: {
          desc: 'pricing:features__ai_translator__tooltip__description',
          imageLink: '/assets/pricing/ai-translator.png',
          // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
        },
      },
    ],
  },
  {
    categoryKey: 'research_features',
    name: 'pricing:features__category__research_features',
    features: [
      {
        title: 'pricing:features__ai_chat__title',
        desc: 'pricing:features__ai_chat__description',
        icon: 'ChatBubble',
        planStatus: {
          free: { status: 'checked' },
          basic: { status: 'checked' },
          pro: { status: 'checked' },
          elite: { status: 'checked' },
        },
        tooltip: {
          desc: 'pricing:features__ai_chat__tooltip__description',
          imageLink: '/assets/pricing/ai-chat.png',
          // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
        },
      },
      {
        title: 'pricing:features__ai_search__title',
        desc: 'pricing:features__ai_search__description',
        icon: 'Search',
        planStatus: {
          free: { status: 'none' },
          basic: { status: 'checked' },
          pro: { status: 'checked' },
          elite: { status: 'checked' },
        },
        tooltip: {
          desc: 'pricing:features__ai_search__tooltip__description',
          imageLink: '/assets/pricing/ai-search.png',
          // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
        },
      },
    ],
  },
  {
    categoryKey: 'webchatgpt_features',
    name: 'pricing:features__category__webchatgpt_features',
    features: [
      {
        title: 'pricing:features__pro_search__title',
        desc: 'pricing:features__pro_search__description',
        icon: 'ProSearch',
        planStatus: {
          free: { status: 'none' },
          basic: { status: 'checked' },
          pro: { status: 'checked' },
          elite: { status: 'checked' },
        },
        tooltip: {
          desc: 'pricing:features__pro_search__tooltip__description',
          imageLink: '/assets/pricing/webchatgpt-pro-search.png',
          // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
        },
      },
      {
        title: 'pricing:features__advanced_options__title',
        desc: 'pricing:features__advanced_options__description',
        icon: 'AdvancedOption',
        planStatus: {
          free: { status: 'none' },
          basic: { status: 'checked' },
          pro: { status: 'checked' },
          elite: { status: 'checked' },
        },
        tooltip: {
          desc: 'pricing:features__advanced_options__tooltip__description',
          imageLink: '/assets/pricing/webchatgpt-advanced-options.png',
          // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
        },
      },
    ],
  },
];
