import { IPlanFeaturesV3DataRowType } from '@/features/pricing/components/PlanFeaturesTableV3/type'
import { PLAN_USAGE_QUERIES } from '@/features/pricing/constant'
import { numberWithCommas } from '@/utils/dataHelper/numberHelper'

export const PLAN_FEATURES_V3_DATA_ROWS: IPlanFeaturesV3DataRowType[] = [
  {
    features: {
      categoryTitle: 'pricing:ab_test_v5__features_data__ai_usage',
    },
    free: null,
    basic: null,
    pro: null,
    elite: null,
  },
  {
    features: {
      title: 'pricing:ab_test_v5__features_data__fast_ai_queries',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__fast_ai_queries__tooltip',
      },
    },
    free: {
      status: 'value',
      statusText: 'pricing:ab_test_v5__features_data__daily_limited',
    },
    basic: {
      status: 'value',
      statusText: numberWithCommas(PLAN_USAGE_QUERIES['basic']['fast_text'], 0),
    },
    pro: {
      status: 'value',
      statusText: numberWithCommas(PLAN_USAGE_QUERIES['pro']['fast_text'], 0),
      meta: {
        perInfo: 'pricing:payment_info__per_month',
      },
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
      title: 'GPT-4o-mini',
      icon: 'GPT-4o',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__gpt4o_mini__tooltip',
      },
    },
    free: { status: 'checked' },
    basic: {
      status: 'checked',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title: 'Claude-3-haiku',
      icon: 'Claude3Haiku',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__claude_3_haiku__tooltip',
      },
    },
    free: { status: 'checked' },
    basic: {
      status: 'checked',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title: 'Gemini-1.5-Flash',
      icon: 'GeminiIcon',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__gemini_1_5_flash__tooltip',
      },
    },
    free: { status: 'checked' },
    basic: {
      status: 'checked',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },

  {
    features: {
      title: 'pricing:ab_test_v5__features_data__smart_ai_queries',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__smart_ai_queries__tooltip',
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
      meta: {
        perInfo: 'pricing:payment_info__per_month',
      },
    },
    elite: {
      status: 'value',
      statusText: 'common:unlimited',
      tooltip: {
        desc: 'pricing:features__advanced_text_queries__elite__more_description',
      },
    },
    meta: {
      type: 'deepen',
    },
  },
  {
    features: {
      title: 'GPT-4o',
      icon: 'GPT-4o',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__gpt4o__tooltip',
      },
    },
    free: { status: 'none' },
    basic: {
      status: 'none',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title: 'Claude-3.5-sonnet',
      icon: 'Claude3_5Icon',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__claude_3_5_sonnet__tooltip',
      },
    },
    free: { status: 'none' },
    basic: {
      status: 'none',
    },
    pro: {
      status: 'none',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title: 'Gemini-1.5-pro',
      icon: 'GeminiPro',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__gemini_1_5_pro__tooltip',
      },
    },
    free: { status: 'none' },
    basic: {
      status: 'none',
    },
    pro: {
      status: 'none',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title: 'pricing:ab_test_v5__features_data__image_ai_queries',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__image_ai_queries__tooltip',
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
      tooltip: {
        desc: 'pricing:features__image_queries__elite__more_description',
      },
    },
    meta: {
      type: 'deepen',
    },
  },
  {
    features: {
      title: 'DALL·E 3',
      icon: 'DALLE',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__dall_e_3__tooltip',
      },
    },
    free: { status: 'none' },
    basic: {
      status: 'none',
    },
    pro: {
      status: 'none',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },

  {
    features: {
      categoryTitle: 'pricing:ab_test_v5__features_data__search_faster',
    },
    free: null,
    basic: null,
    pro: null,
    elite: null,
  },
  {
    features: {
      title: 'pricing:ab_test_v5__features_data__search_faster__ask_ai__title',
      desc: 'pricing:ab_test_v5__features_data__search_faster__ask_ai__desc',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__ask_ai__tooltip',
      },
    },
    free: { status: 'checked' },
    basic: { status: 'checked' },
    pro: { status: 'checked' },
    elite: { status: 'checked' },
  },
  {
    features: {
      title:
        'pricing:ab_test_v5__features_data__search_faster__search_with_ai__title',
      desc: 'pricing:ab_test_v5__features_data__search_faster__search_with_ai__desc',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__search_with_ai__tooltip',
      },
    },
    free: { status: 'none' },
    basic: { status: 'checked' },
    pro: { status: 'checked' },
    elite: { status: 'checked' },
  },

  {
    features: {
      categoryTitle: 'pricing:ab_test_v5__features_data__read_faster',
    },
    free: null,
    basic: null,
    pro: null,
    elite: null,
  },
  {
    features: {
      title: 'pricing:ab_test_v5__features_data__read_faster__summary_page',
    },
    free: null,
    basic: null,
    pro: null,
    elite: null,
    meta: {
      type: 'deepen',
    },
  },
  {
    features: {
      title:
        'pricing:ab_test_v5__features_data__read_faster__summary_page__summarize_pdf',
      icon: 'PDFViewerIcon',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__summarize_pdf__tooltip',
      },
    },
    free: { status: 'none' },
    basic: {
      status: 'none',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title:
        'pricing:ab_test_v5__features_data__read_faster__summary_page__summarize_video',
      icon: 'YouTube',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__summarize_video__tooltip',
      },
    },
    free: { status: 'none' },
    basic: {
      status: 'none',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title:
        'pricing:ab_test_v5__features_data__read_faster__summary_page__summarize_article',
      icon: 'Article',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__summarize_article__tooltip',
      },
    },
    free: { status: 'none' },
    basic: {
      status: 'none',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title:
        'pricing:ab_test_v5__features_data__read_faster__summary_page__summarize_email',
      icon: 'EmailIcon',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__summarize_email__tooltip',
      },
    },
    free: { status: 'none' },
    basic: {
      status: 'none',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title: 'pricing:ab_test_v5__features_data__create_your_own_prompts',
      icon: 'Add',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__read_faster__summary_page__create_own_prompts',
      },
    },
    free: { status: 'none' },
    basic: {
      status: 'none',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },

  {
    features: {
      title: 'pricing:ab_test_v5__features_data__read_faster__chat_with_page',
    },
    free: null,
    basic: null,
    pro: null,
    elite: null,
    meta: {
      type: 'deepen',
    },
  },
  {
    features: {
      title:
        'pricing:ab_test_v5__features_data__read_faster__chat_with_page__chat_with_pdf',
      icon: 'PDFViewerIcon',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__chat_with_pdf__tooltip',
      },
    },
    free: { status: 'none' },
    basic: {
      status: 'none',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title:
        'pricing:ab_test_v5__features_data__read_faster__chat_with_page__chat_with_video',
      icon: 'YouTube',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__chat_with_video__tooltip',
      },
    },
    free: { status: 'none' },
    basic: {
      status: 'none',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title:
        'pricing:ab_test_v5__features_data__read_faster__chat_with_page__chat_with_article',
      icon: 'Article',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__chat_with_article__tooltip',
      },
    },
    free: { status: 'none' },
    basic: {
      status: 'none',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title:
        'pricing:ab_test_v5__features_data__read_faster__chat_with_page__chat_with_email',
      icon: 'EmailIcon',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__chat_with_email__tooltip',
      },
    },
    free: { status: 'none' },
    basic: {
      status: 'none',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title:
        'pricing:ab_test_v5__features_data__read_faster__chat_with_page__chat_with_screenshot',
      icon: 'Screenshot',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__chat_with_screenshot__tooltip',
      },
    },
    free: { status: 'checked' },
    basic: {
      status: 'none',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },

  {
    features: {
      title:
        'pricing:ab_test_v5__features_data__read_faster__reading_assistant',
    },
    free: null,
    basic: null,
    pro: null,
    elite: null,
    meta: {
      type: 'deepen',
    },
  },
  {
    features: {
      title:
        'pricing:ab_test_v5__features_data__read_faster__reading_assistant__summarize',
      icon: 'SummaryAsk',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__summarize__tooltip',
      },
    },
    free: { status: 'checked' },
    basic: {
      status: 'none',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title:
        'pricing:ab_test_v5__features_data__read_faster__reading_assistant__explain',
      icon: 'QuestionMark',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__explain__tooltip',
      },
    },
    free: { status: 'checked' },
    basic: {
      status: 'none',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title:
        'pricing:ab_test_v5__features_data__read_faster__reading_assistant__translate',
      icon: 'Translator',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__translate__tooltip',
      },
    },
    free: { status: 'checked' },
    basic: {
      status: 'none',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title:
        'pricing:ab_test_v5__features_data__read_faster__reading_assistant__bilingual',
      icon: 'Translator',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__bilingual__tooltip',
      },
    },
    free: { status: 'checked' },
    basic: {
      status: 'none',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title: 'pricing:ab_test_v5__features_data__create_your_own_prompts',
      icon: 'Add',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__read_faster__reading_assistant__create_own_prompts',
      },
    },
    free: { status: 'checked' },
    basic: {
      status: 'none',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },

  {
    features: {
      categoryTitle: 'pricing:ab_test_v5__features_data__write_faster',
    },
    free: null,
    basic: null,
    pro: null,
    elite: null,
  },
  {
    features: {
      title: 'pricing:ab_test_v5__features_data__write_faster__ai_rewriter',
    },
    free: null,
    basic: null,
    pro: null,
    elite: null,
    meta: {
      type: 'deepen',
    },
  },
  {
    features: {
      title:
        'pricing:ab_test_v5__features_data__write_faster__ai_rewriter__improve_writing',
      icon: 'Magic',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__improve_writing__tooltip',
      },
    },
    free: { status: 'checked' },
    basic: {
      status: 'none',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title:
        'pricing:ab_test_v5__features_data__write_faster__ai_rewriter__proofread',
      icon: 'Done',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__proofread__tooltip',
      },
    },
    free: { status: 'checked' },
    basic: {
      status: 'checked',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title:
        'pricing:ab_test_v5__features_data__write_faster__ai_rewriter__translate',
      icon: 'Translator',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__ai_rewriter__translate__tooltip',
      },
    },
    free: { status: 'checked' },
    basic: {
      status: 'none',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title:
        'pricing:ab_test_v5__features_data__write_faster__ai_rewriter__paraphrase',
      icon: 'AutoRenew',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__paraphrase__tooltip',
      },
    },
    free: { status: 'checked' },
    basic: {
      status: 'none',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title:
        'pricing:ab_test_v5__features_data__write_faster__ai_rewriter__change_tone_and_style',
      icon: 'Voice',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__change_tone_and_style__tooltip',
      },
    },
    free: { status: 'checked' },
    basic: {
      status: 'none',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title:
        'pricing:ab_test_v5__features_data__write_faster__ai_rewriter__simplify_language',
      icon: 'SimplifyLanguage',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__simplify_language__tooltip',
      },
    },
    free: { status: 'checked' },
    basic: {
      status: 'none',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title: 'pricing:ab_test_v5__features_data__create_your_own_prompts',
      icon: 'Add',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__write_faster__ai_rewriter__create_own_prompts',
      },
    },
    free: { status: 'checked' },
    basic: {
      status: 'none',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title:
        'pricing:ab_test_v5__features_data__write_faster__ai_rewriter__create_ai_art__title',
      desc: 'pricing:ab_test_v5__features_data__write_faster__ai_rewriter__create_ai_art__desc',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__write_faster__ai_rewriter__create_ai_art__tooltip',
      },
    },
    free: { status: 'none' },
    basic: { status: 'none' },
    pro: { status: 'none' },
    elite: { status: 'checked' },
  },

  {
    features: {
      title: 'pricing:ab_test_v5__features_data__write_faster__create_draft',
    },
    free: null,
    basic: null,
    pro: null,
    elite: null,
    meta: {
      type: 'deepen',
    },
  },
  {
    features: {
      title:
        'pricing:ab_test_v5__features_data__write_faster__create_draft_ai_prompt_library',
      icon: 'OneClickPromptIcon',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__write_faster__create_draft_ai_prompt_library__tooltip',
      },
    },
    free: { status: 'checked' },
    basic: {
      status: 'none',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title: 'pricing:ab_test_v5__features_data__create_your_own_prompts',
      icon: 'Add',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__write_faster__create_draft__create_own_prompts',
      },
    },
    free: { status: 'checked' },
    basic: {
      status: 'none',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },

  {
    features: {
      title:
        'pricing:ab_test_v5__features_data__write_faster__email_instant_reply',
    },
    free: null,
    basic: null,
    pro: null,
    elite: null,
    meta: {
      type: 'deepen',
    },
  },
  {
    features: {
      title: 'Gmail',
      icon: 'Gmail',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__gmail__tooltip',
      },
    },
    free: { status: 'none' },
    basic: {
      status: 'checked',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title: 'Outlook',
      icon: 'Outlook',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__outlook__tooltip',
      },
    },
    free: { status: 'none' },
    basic: {
      status: 'checked',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title: 'pricing:ab_test_v5__features_data__create_your_own_prompts',
      icon: 'Add',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__write_faster__email_instant_reply__create_own_prompts',
      },
    },
    free: { status: 'none' },
    basic: {
      status: 'none',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },

  {
    features: {
      title:
        'pricing:ab_test_v5__features_data__write_faster__social_media_instant_reply',
    },
    free: null,
    basic: null,
    pro: null,
    elite: null,
    meta: {
      type: 'deepen',
    },
  },
  {
    features: {
      title: 'LinkedIn',
      icon: 'LinkedIn',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__linkedin__tooltip',
      },
    },
    free: { status: 'none' },
    basic: {
      status: 'checked',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title: 'Facebook',
      icon: 'Facebook',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__facebook__tooltip',
      },
    },
    free: { status: 'none' },
    basic: {
      status: 'checked',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title: 'YouTube',
      icon: 'YouTube',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__youtube__tooltip',
      },
    },
    free: { status: 'none' },
    basic: {
      status: 'checked',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title: 'X/Twitter',
      icon: 'TwitterX',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__x_twitter__tooltip',
      },
    },
    free: { status: 'none' },
    basic: {
      status: 'checked',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },

  {
    features: {
      title: 'Instagram',
      icon: 'Instagram',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__instagram__tooltip',
      },
    },
    free: { status: 'none' },
    basic: {
      status: 'checked',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title: 'pricing:ab_test_v5__features_data__create_your_own_prompts',
      icon: 'Add',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__write_faster__social_media_instant_reply__create_own_prompts',
      },
    },
    free: { status: 'none' },
    basic: {
      status: 'none',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },

  {
    features: {
      title:
        'pricing:ab_test_v5__features_data__write_faster__messaging_instant_reply',
    },
    free: null,
    basic: null,
    pro: null,
    elite: null,
    meta: {
      type: 'deepen',
    },
  },
  {
    features: {
      title: 'WhatsApp',
      icon: 'WhatsApp',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__whatsapp__tooltip',
      },
    },
    free: { status: 'none' },
    basic: {
      status: 'checked',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title: 'Slack',
      icon: 'Slack',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__slack__tooltip',
      },
    },
    free: { status: 'none' },
    basic: {
      status: 'checked',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title: 'Discord',
      icon: 'Discord',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__discord__tooltip',
      },
    },
    free: { status: 'none' },
    basic: {
      status: 'checked',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title: 'Messenger',
      icon: 'Messenger',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__messenger__tooltip',
      },
    },
    free: { status: 'none' },
    basic: {
      status: 'checked',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title: 'Telegram',
      icon: 'Telegram',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__telegram__tooltip',
      },
    },
    free: { status: 'none' },
    basic: {
      status: 'checked',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
  },
  {
    features: {
      title: 'pricing:ab_test_v5__features_data__create_your_own_prompts',
      icon: 'Add',
      tooltip: {
        desc: 'pricing:ab_test_v5__features_data__write_faster__messaging_instant_reply__create_own_prompts',
      },
    },
    free: { status: 'none' },
    basic: {
      status: 'none',
    },
    pro: {
      status: 'checked',
    },
    elite: {
      status: 'checked',
    },
    meta: {
      type: 'secondary',
    },
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
        // imageLink: '/assets/images/pricing/webchatgpt-pro-search.png',
        // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
      },
      // video: {
      //   link: 'https://www.youtube.com/embed/uDMJNf841dc',
      //   time: '1:04',
      // },
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
        // imageLink: '/assets/images/pricing/webchatgpt-advanced-options.png',
        // videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
      },
    },
    free: { status: 'none' },
    basic: { status: 'checked' },
    pro: { status: 'checked' },
    elite: { status: 'checked' },
  },
]
