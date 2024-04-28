import { IPlanFeaturesV3DataRowType } from '@/features/pricing/components/PlanFeaturesTableV3/type';
import { PLAN_USAGE_QUERIES } from '@/features/pricing/constant';
import { numberWithCommas } from '@/utils/dataHelper/numberHelper';

export const PLAN_FEATURES_V3_DATA_ROWS: IPlanFeaturesV3DataRowType[] = [
  {
    features: {
      categoryTitle: 'pricing:features__category__best_ai_models',
    },
    free: null,
    basic: null,
    pro: null,
    elite: null,
  },
  {
    features: {
      title: 'pricing:features__fast_text_queries__month',
      // desc: PLAN_FEATURES_USAGE_CATEGORY_MODEL['fast_text'],
      tooltip: {
        desc: 'pricing:features__fast_text_queries__tooltip__description',
        imageLink: '/assets/images/pricing/fast-text-queries.png',
        // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
      },
    },
    free: { status: 'none' },
    basic: {
      status: 'value',
      statusText: numberWithCommas(PLAN_USAGE_QUERIES['basic']['fast_text'], 0),
    },
    pro: {
      status: 'value',
      statusText: numberWithCommas(PLAN_USAGE_QUERIES['pro']['fast_text'], 0),
    },
    elite: {
      status: 'value',
      statusText: 'common:unlimited',
    },
    meta: {
      type: 'deepen',
    },
  },
  {
    features: {
      title: 'GPT-3.5',
    },
    free: { status: 'limit-color' },
    basic: {
      status: 'checked-color',
    },
    pro: {
      status: 'checked-color',
    },
    elite: {
      status: 'checked-color',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title: 'Claude-3-haiku',
    },
    free: { status: 'limit-color' },
    basic: {
      status: 'checked-color',
    },
    pro: {
      status: 'checked-color',
    },
    elite: {
      status: 'checked-color',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title: 'Gemini-pro',
    },
    free: { status: 'limit-color' },
    basic: {
      status: 'checked-color',
    },
    pro: {
      status: 'checked-color',
    },
    elite: {
      status: 'checked-color',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title: 'pricing:features__advanced_text_queries__month',
      // desc: PLAN_FEATURES_USAGE_CATEGORY_MODEL['advanced_text'],
      tooltip: {
        desc: 'pricing:features__advanced_text_queries__tooltip__description',
        imageLink: '/assets/images/pricing/advanced-text-queries.png',
        // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
      },
    },
    free: { status: 'none' },
    basic: {
      status: 'none',
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
    meta: {
      type: 'deepen',
    },
  },
  {
    features: {
      title: 'GPT-4',
    },
    free: { status: 'none-color' },
    basic: {
      status: 'none-color',
    },
    pro: {
      status: 'checked-color',
    },
    elite: {
      status: 'checked-color',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title: 'Claude-3-opus',
    },
    free: { status: 'none-color' },
    basic: {
      status: 'none-color',
    },
    pro: {
      status: 'none-color',
    },
    elite: {
      status: 'checked-color',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title: 'Claude-3-sonnet',
    },
    free: { status: 'none-color' },
    basic: {
      status: 'none-color',
    },
    pro: {
      status: 'none-color',
    },
    elite: {
      status: 'checked-color',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title: 'Gemini-1.5-pro',
    },
    free: { status: 'none-color' },
    basic: {
      status: 'none-color',
    },
    pro: {
      status: 'none-color',
    },
    elite: {
      status: 'checked-color',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title: 'pricing:features__image_queries__month',
      // desc: PLAN_FEATURES_USAGE_CATEGORY_MODEL['image'],
      tooltip: {
        desc: 'pricing:features__image_queries__tooltip__description',
        imageLink: '/assets/images/pricing/image-queries.png',
        // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
      },
    },
    free: { status: 'none' },
    basic: {
      status: 'none',
      statusText: numberWithCommas(PLAN_USAGE_QUERIES['basic']['image'], 0),
    },
    pro: {
      status: 'none',
      statusText: numberWithCommas(PLAN_USAGE_QUERIES['pro']['image'], 0),
    },
    elite: {
      status: 'value',
      statusText: 'common:unlimited',
    },
    meta: {
      type: 'deepen',
    },
  },
  {
    features: {
      title: 'DALL·E 3',
    },
    free: { status: 'none-color' },
    basic: {
      status: 'none-color',
    },
    pro: {
      status: 'none-color',
    },
    elite: {
      status: 'checked-color',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title: 'pricing:features__free_ai_models',
    },
    free: { status: 'checked' },
    basic: { status: 'checked' },
    pro: { status: 'checked' },
    elite: { status: 'checked' },
  },
  {
    features: {
      categoryTitle: 'pricing:features__category__writing_features',
    },
    free: null,
    basic: null,
    pro: null,
    elite: null,
  },
  {
    features: {
      title: 'pricing:features__ai_rewriter__title',
      desc: 'pricing:features__ai_rewriter__description',
      icon: 'NewChat',
      tooltip: {
        desc: 'pricing:features__ai_rewriter__tooltip__description',
        imageLink: '/assets/images/pricing/ai-rewriter.png',
        // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
      },
    },
    free: { status: 'checked' },
    basic: { status: 'checked' },
    pro: { status: 'checked' },
    elite: { status: 'checked' },
  },
  {
    features: {
      title: 'pricing:features__ai_instant_reply__title',
      desc: 'pricing:features__ai_instant_reply__description',
      icon: 'QuickReplyIcon',
      tooltip: {
        desc: 'pricing:features__ai_instant_reply__tooltip__description',
        imageLink: '/assets/images/pricing/ai-instant-reply.png',
        // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
      },
    },
    free: { status: 'none' },
    basic: { status: 'checked' },
    pro: { status: 'checked' },
    elite: { status: 'checked' },
  },
  {
    features: {
      title: 'pricing:features__ai_art__title',
      desc: 'pricing:features__ai_art__description',
      icon: 'Art',
      tooltip: {
        desc: 'pricing:features__ai_art__tooltip__description',
        imageLink: '/assets/images/pricing/ai-art.png',
        // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
      },
    },
    free: { status: 'none' },
    basic: { status: 'checked' },
    pro: { status: 'checked' },
    elite: { status: 'checked' },
  },
  {
    features: {
      title: 'pricing:features__ai_prompt_manager__title',
      desc: 'pricing:features__ai_prompt_manager__description',
      icon: 'PromptManager',
      tooltip: {
        desc: 'pricing:features__ai_prompt_manager__tooltip__description',
        imageLink: '/assets/images/pricing/ai-prompt-manager.png',
        // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
      },
    },
    free: { status: 'checked' },
    basic: { status: 'checked' },
    pro: { status: 'checked' },
    elite: { status: 'checked' },
  },
  {
    features: {
      title: 'pricing:features__ai_prompts_library__title',
      desc: 'pricing:features__ai_prompts_library__description',
      icon: 'PromptLibrary',
      tooltip: {
        desc: 'pricing:features__ai_prompts_library__tooltip__description',
        imageLink: '/assets/images/pricing/ai-prompts-library.png',
        // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
      },
    },
    free: { status: 'checked' },
    basic: { status: 'checked' },
    pro: { status: 'checked' },
    elite: { status: 'checked' },
  },
  {
    features: {
      categoryTitle: 'pricing:features__category__reading_features',
    },
    free: null,
    basic: null,
    pro: null,
    elite: null,
  },
  {
    features: {
      title: 'pricing:features__ai_summary_ask__title',
      desc: 'pricing:features__ai_summary_ask__description',
      icon: 'SummaryAsk',
      tooltip: {
        desc: 'pricing:features__ai_summary_ask__tooltip__description',
        imageLink: '/assets/images/pricing/ai-summary-ask.png',
        // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
      },
    },
    free: { status: 'none' },
    basic: { status: 'checked' },
    pro: { status: 'checked' },
    elite: { status: 'checked' },
  },
  {
    features: {
      title: 'pricing:features__ai_reading_assistant__title',
      desc: 'pricing:features__ai_reading_assistant__description',
      icon: 'ReadingAssistant',
      tooltip: {
        desc: 'pricing:features__ai_reading_assistant__tooltip__description',
        imageLink: '/assets/images/pricing/ai-reading-assistant.png',
        // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
      },
    },
    free: { status: 'checked' },
    basic: { status: 'checked' },
    pro: { status: 'checked' },
    elite: { status: 'checked' },
  },
  {
    features: {
      title: 'pricing:features__ai_translator__title',
      desc: 'pricing:features__ai_translator__description',
      icon: 'Translator',
      tooltip: {
        desc: 'pricing:features__ai_translator__tooltip__description',
        imageLink: '/assets/images/pricing/ai-translator.png',
        // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
      },
    },
    free: { status: 'checked' },
    basic: { status: 'checked' },
    pro: { status: 'checked' },
    elite: { status: 'checked' },
  },
  {
    features: {
      categoryTitle: 'pricing:features__category__research_features',
    },
    free: null,
    basic: null,
    pro: null,
    elite: null,
  },
  {
    features: {
      title: 'pricing:features__ai_chat__title',
      desc: 'pricing:features__ai_chat__description',
      icon: 'ChatBubble',
      tooltip: {
        desc: 'pricing:features__ai_chat__tooltip__description',
        imageLink: '/assets/images/pricing/ai-chat.png',
        // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
      },
    },
    free: { status: 'checked' },
    basic: { status: 'checked' },
    pro: { status: 'checked' },
    elite: { status: 'checked' },
  },
  {
    features: {
      title: 'pricing:features__ai_search__title',
      desc: 'pricing:features__ai_search__description',
      icon: 'Search',
      tooltip: {
        desc: 'pricing:features__ai_search__tooltip__description',
        imageLink: '/assets/images/pricing/ai-search.png',
        // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
      },
    },
    free: { status: 'none' },
    basic: { status: 'checked' },
    pro: { status: 'checked' },
    elite: { status: 'checked' },
  },
  {
    features: {
      categoryTitle: 'pricing:features__category__webchatgpt_features',
    },
    free: null,
    basic: null,
    pro: null,
    elite: null,
  },
  {
    features: {
      title: 'pricing:features__pro_search__title',
      desc: 'pricing:features__pro_search__description',
      icon: 'ProSearch',
      tooltip: {
        desc: 'pricing:features__pro_search__tooltip__description',
        imageLink: '/assets/images/pricing/webchatgpt-pro-search.png',
        // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
      },
    },
    free: { status: 'none' },
    basic: { status: 'checked' },
    pro: { status: 'checked' },
    elite: { status: 'checked' },
  },
  {
    features: {
      title: 'pricing:features__advanced_options__title',
      desc: 'pricing:features__advanced_options__description',
      icon: 'AdvancedOption',
      tooltip: {
        desc: 'pricing:features__advanced_options__tooltip__description',
        imageLink: '/assets/images/pricing/webchatgpt-advanced-options.png',
        // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
      },
    },
    free: { status: 'none' },
    basic: { status: 'checked' },
    pro: { status: 'checked' },
    elite: { status: 'checked' },
  },
];
