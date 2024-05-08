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
        imageLink: '/assets/pricing/fast-text-queries.png',
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
      icon: 'ChatGPTIcon',
      video: {
        link: 'https://www.youtube.com/embed/QA4gxm3xtLE',
        time: '0:55',
      },
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
      icon: 'Claude3Haiku',
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
      icon: 'GeminiIcon',
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
        imageLink: '/assets/pricing/advanced-text-queries.png',
        // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
        moreDescription:
          'pricing:features__advanced_text_queries__elite__more_description',
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
      icon: 'ChatGPT4Vision',
      video: {
        link: 'https://www.youtube.com/embed/mAi1D9cbGos',
        time: '0:55',
      },
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
      icon: 'Claude3Opus',
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
      icon: 'ClaudeIcon',
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
      icon: 'GeminiPro',
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
        imageLink: '/assets/pricing/image-queries.png',
        // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
        moreDescription:
          'pricing:features__image_queries__elite__more_description',
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
      icon: 'DALLE',
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
      // icon: 'NewChat',
      tooltip: {
        desc: 'pricing:features__ai_rewriter__tooltip__description',
        imageLink: '/assets/pricing/ai-rewriter.png',
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
      // desc: 'pricing:features__ai_instant_reply__description',
      // icon: 'QuickReplyIcon',
      tooltip: {
        desc: 'pricing:features__ai_instant_reply__tooltip__description',
        imageLink: '/assets/pricing/ai-instant-reply.png',
        // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
      },
    },
    free: { status: 'none' },
    basic: { status: 'checked' },
    pro: { status: 'checked' },
    elite: { status: 'checked' },
    meta: {
      type: 'deepen',
    },
  },
  {
    features: {
      title: 'pricing:features__gmail_instant_reply',
      icon: 'Gmail',
      video: {
        link: 'https://www.youtube.com/embed/fwaqJyTwefI',
        time: '1:20',
      },
    },
    free: { status: 'none-color' },
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
      title: 'pricing:features__outlook_instant_reply',
      icon: 'Outlook',
      video: {
        link: 'https://www.youtube.com/embed/Y2yZ4wWQDno?start=14',
        time: '1:15',
      },
    },
    free: { status: 'none-color' },
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
      title: 'pricing:features__facebook_instant_reply',
      icon: 'Facebook',
      video: {
        link: 'https://www.youtube.com/embed/zmNGKFyw3pU',
        time: '1:19',
      },
    },
    free: { status: 'none-color' },
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
      title: 'pricing:features__linkedin_instant_reply',
      icon: 'LinkedIn',
      video: {
        link: 'https://www.youtube.com/embed/55IqqmQIBw0?start=26',
        time: '1:27',
      },
    },
    free: { status: 'none-color' },
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
      title: 'pricing:features__xtwitter_instant_reply',
      icon: 'TwitterX',
      video: {
        link: 'https://www.youtube.com/embed/3UQaOm8sWVI',
        time: '1:06',
      },
    },
    free: { status: 'none-color' },
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
      title: 'pricing:features__YouTube_instant_reply',
      icon: 'YouTube',
      video: {
        link: 'https://www.youtube.com/embed/D4Acc0rpR3o?start=11',
        time: '1:38',
      },
    },
    free: { status: 'none-color' },
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
      title: 'pricing:features__instagram_instant_reply',
      icon: 'Instagram',
      video: {
        link: 'https://www.youtube.com/embed/OnRPaGn_4Ds?start=14',
        time: '1:33',
      },
    },
    free: { status: 'none-color' },
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
  // {
  //   features: {
  //     title: 'pricing:features__reddit_instant_reply',
  //     icon: 'Reddit',
  //   },
  //   free: { status: 'none-color' },
  //   basic: {
  //     status: 'checked-color',
  //   },
  //   pro: {
  //     status: 'checked-color',
  //   },
  //   elite: {
  //     status: 'checked-color',
  //   },
  //   meta: {
  //     type: 'secondary',
  //   },
  // },
  {
    features: {
      title: 'pricing:features__whatsapp_instant_reply',
      icon: 'WhatsApp',
    },
    free: { status: 'none-color' },
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
      title: 'pricing:features__discord_instant_reply',
      icon: 'Discord',
    },
    free: { status: 'none-color' },
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
      title: 'pricing:features__telegram_instant_reply',
      icon: 'Telegram',
    },
    free: { status: 'none-color' },
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
      title: 'pricing:features__messenger_instant_reply',
      icon: 'Messenger',
    },
    free: { status: 'none-color' },
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
      title: 'pricing:features__slack_instant_reply',
      icon: 'Slack',
    },
    free: { status: 'none-color' },
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
      title: 'pricing:features__ai_art__title',
      desc: 'pricing:features__ai_art__description',
      // icon: 'Art',
      tooltip: {
        desc: 'pricing:features__ai_art__tooltip__description',
        imageLink: '/assets/pricing/ai-art.png',
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
      // icon: 'PromptManager',
      tooltip: {
        desc: 'pricing:features__ai_prompt_manager__tooltip__description',
        imageLink: '/assets/pricing/ai-prompt-manager.png',
        // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
      },
      video: {
        link: 'https://www.youtube.com/embed/CkFKtcZw5xY',
        time: '0:47',
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
      // icon: 'PromptLibrary',
      tooltip: {
        desc: 'pricing:features__ai_prompts_library__tooltip__description',
        imageLink: '/assets/pricing/ai-prompts-library.png',
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
      // desc: 'pricing:features__ai_summary_ask__description',
      // icon: 'SummaryAsk',
      tooltip: {
        desc: 'pricing:features__ai_summary_ask__tooltip__description',
        imageLink: '/assets/pricing/ai-summary-ask.png',
        // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
      },
    },
    free: { status: 'none' },
    basic: { status: 'checked' },
    pro: { status: 'checked' },
    elite: { status: 'checked' },
    meta: {
      type: 'deepen',
    },
  },
  {
    features: {
      title: 'pricing:features__summarize_ask_pdf',
      icon: 'PDFViewerIcon',
      video: {
        link: 'https://www.youtube.com/embed/72UM1jMaJhY',
        time: '0:43',
      },
    },
    free: { status: 'none-color' },
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
      title: 'pricing:features__summarize_ask_youTube_video',
      icon: 'YouTube',
      video: {
        link: 'https://www.youtube.com/embed/P60_lPz5yIU',
        time: '0:15',
      },
    },
    free: { status: 'none-color' },
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
      title: 'pricing:features__summarize_ask_email',
      icon: 'EmailIcon',
    },
    free: { status: 'none-color' },
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
      title: 'pricing:features__summarize_ask_any_webpage',
      icon: 'LanguageIcon',
      video: {
        link: 'https://www.youtube.com/embed/72UM1jMaJhY',
        time: '0:43',
      },
    },
    free: { status: 'none-color' },
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
      title: 'pricing:features__ai_reading_assistant__title',
      desc: 'pricing:features__ai_reading_assistant__description',
      // icon: 'ReadingAssistant',
      tooltip: {
        desc: 'pricing:features__ai_reading_assistant__tooltip__description',
        imageLink: '/assets/pricing/ai-reading-assistant.png',
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
      // icon: 'Translator',
      tooltip: {
        desc: 'pricing:features__ai_translator__tooltip__description',
        imageLink: '/assets/pricing/ai-translator.png',
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
      // icon: 'ChatBubble',
      tooltip: {
        desc: 'pricing:features__ai_chat__tooltip__description',
        imageLink: '/assets/pricing/ai-chat.png',
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
      // icon: 'Search',
      tooltip: {
        desc: 'pricing:features__ai_search__tooltip__description',
        imageLink: '/assets/pricing/ai-search.png',
        // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
      },
      video: {
        link: 'https://www.youtube.com/embed/1uZuyqqySO0?start=17',
        time: '1:29',
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
      // icon: 'ProSearch',
      tooltip: {
        desc: 'pricing:features__pro_search__tooltip__description',
        imageLink: '/assets/pricing/webchatgpt-pro-search.png',
        // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
      },
      video: {
        link: 'https://www.youtube.com/embed/uDMJNf841dc',
        time: '1:04',
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
      // icon: 'AdvancedOption',
      tooltip: {
        desc: 'pricing:features__advanced_options__tooltip__description',
        imageLink: '/assets/pricing/webchatgpt-advanced-options.png',
        // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
      },
    },
    free: { status: 'none' },
    basic: { status: 'checked' },
    pro: { status: 'checked' },
    elite: { status: 'checked' },
  },
];
