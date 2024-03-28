interface IPlanFeaturesType {
  title: string;
  desc?: string;
  planStatus: Record<string, IFeaturesPlanStatus>;
  icon?: string;
  tooltip?: {
    title?: string;
    desc?: string;
    imageLink?: string;
    videoUrl?: string;
  };
  youtube?: {
    time: string;
    link: string;
  };
}
interface IFeaturesPlanStatus {
  status: 'all' | 'limit' | 'none';
  statusText: string;
}

export const PLAN_FEATURES_CATEGORY: {
  name: string;
  icon?: string;
  features: IPlanFeaturesType[];
}[] = [
  // Use 1-click AI anywhere
  {
    name: 'modules:plan_features_table__use_one_click_ai_anywhere',
    icon: '1ClickAIIcon',
    features: [
      {
        title: 'modules:plan_features_table__mini_menu_on_text_selection',
        icon: 'MiniMenuIcon',
        planStatus: {
          free: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
          pro: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
        },

        tooltip: {
          // videoUrl: 'https://www.youtube.com/embed/CkFKtcZw5xY',
          imageLink: `/assets/chrome-extension/upgrade/use-one-click-ai-anywhere.png`,
        },

        // tooltip: {
        //   videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
        //   imageLink: `/assets/chrome-extension/upgrade/chatgpt.png`,
        //   desc: 'As fast as ChatGPT Plus. No country restrictions. Powered by gpt-3.5-turbo.',
        // },
        // youtube: {
        //   link: 'https://www.youtube.com/embed/zgq2DKlwEYk',
        //   time: '0:29',
        // },
      },
      {
        title: 'modules:plan_features_table__set_up_your_own_prompts',
        icon: 'MyOwnPromptIcon',
        planStatus: {
          free: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
          pro: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
        },
        tooltip: {
          videoUrl: 'https://www.youtube.com/embed/CkFKtcZw5xY',
          imageLink: `/assets/chrome-extension/upgrade/custom-prompt.png`,
          desc: 'modules:plan_features_table__set_up_your_own_prompts__tooltip_desc',
        },
        youtube: {
          link: 'https://www.youtube.com/embed/CkFKtcZw5xY',
          time: '0:47',
        },
      },
    ],
  },
  // AI providers
  {
    name: 'modules:plan_features_table__all_the_best_ai_models',
    icon: 'Providers',
    features: [
      {
        title: 'ChatGPT',
        icon: 'ChatGPTIcon',
        planStatus: {
          free: {
            status: 'limit',
            statusText: 'modules:plan_features_table__daily_limit_applies',
          },
          pro: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_queries',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_queries',
          },
        },
        tooltip: {
          videoUrl: 'https://www.youtube.com/embed/zgq2DKlwEYk',
          imageLink: `/assets/chrome-extension/upgrade/chatgpt.png`,
          desc: 'modules:plan_features_table__chatgpt__tooltip_desc',
        },
        youtube: {
          link: 'https://www.youtube.com/embed/zgq2DKlwEYk',
          time: '0:29',
        },
      },
      {
        title: 'GPT-4-turbo vision',
        icon: 'ChatGPTBlackIcon',
        planStatus: {
          free: {
            status: 'none',
            statusText: 'modules:plan_features_table__not_available',
          },
          pro: {
            status: 'limit',
            statusText: 'modules:plan_features_table__600_queries_month',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_queries',
          },
        },
        tooltip: {
          videoUrl: 'https://www.youtube.com/embed/mAi1D9cbGos',
          imageLink: `/assets/chrome-extension/upgrade/max-ai-paid-model-gpt4.png`,
          desc: 'modules:plan_features_table__chatgpt_4__tooltip_desc',
        },
        youtube: {
          link: 'https://www.youtube.com/embed/mAi1D9cbGos',
          time: '0:56',
        },
      },
      {
        title: 'ChatGPT-16k',
        icon: 'ChatGPTIcon',
        planStatus: {
          free: {
            status: 'none',
            statusText: 'modules:plan_features_table__not_available',
          },
          pro: {
            status: 'limit',
            statusText: 'modules:plan_features_table__600_queries_month',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_queries',
          },
        },
        tooltip: {
          videoUrl: 'https://www.youtube.com/embed/QA4gxm3xtLE',
          imageLink: `/assets/chrome-extension/upgrade/max-ai-paid-model-gpt3-5-16k.png`,
          desc: 'modules:plan_features_table__chatgpt_16k__tooltip_desc',
        },
        youtube: {
          link: 'https://www.youtube.com/embed/QA4gxm3xtLE',
          time: '0:56',
        },
      },
      {
        title: 'Claude-3-opus',
        icon: 'ClaudeIcon',
        planStatus: {
          free: {
            status: 'none',
            statusText: 'modules:plan_features_table__not_available',
          },
          pro: {
            status: 'none',
            statusText: 'modules:plan_features_table__not_available',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_queries',
          },
        },
      },
      {
        title: 'Claude-3-sonnet',
        icon: 'ClaudeIcon',
        planStatus: {
          free: {
            status: 'none',
            statusText: 'modules:plan_features_table__not_available',
          },
          pro: {
            status: 'none',
            statusText: 'modules:plan_features_table__not_available',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_queries',
          },
        },
      },
      {
        title: 'Claude-3-haiku',
        icon: 'ClaudeIcon',
        planStatus: {
          free: {
            status: 'none',
            statusText: 'modules:plan_features_table__not_available',
          },
          pro: {
            status: 'none',
            statusText: 'modules:plan_features_table__not_available',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_queries',
          },
        },
      },
      {
        title: 'Claude-2.1-200k',
        icon: 'ClaudeIcon',
        planStatus: {
          free: {
            status: 'none',
            statusText: 'modules:plan_features_table__not_available',
          },
          pro: {
            status: 'none',
            statusText: 'modules:plan_features_table__not_available',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_queries',
          },
        },
      },
      {
        title: 'Claude-2-100k',
        icon: 'ClaudeBlackIcon',
        planStatus: {
          free: {
            status: 'none',
            statusText: 'modules:plan_features_table__not_available',
          },
          pro: {
            status: 'limit',
            statusText: 'modules:plan_features_table__600_queries_month',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_queries',
          },
        },
        tooltip: {
          videoUrl: 'https://www.youtube.com/embed/3hHrqmIU284',
          imageLink: `/assets/chrome-extension/upgrade/claude-2-100k.png`,
          desc: 'modules:plan_features_table__claude_2__tooltip_desc',
        },
        youtube: {
          link: 'https://www.youtube.com/embed/3hHrqmIU284',
          time: '0:52',
        },
      },
      {
        title: 'Claude-instant-100k',
        icon: 'ClaudeIcon',
        planStatus: {
          free: {
            status: 'none',
            statusText: 'modules:plan_features_table__not_available',
          },
          pro: {
            status: 'limit',
            statusText: 'modules:plan_features_table__600_queries_month',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_queries',
          },
        },
        tooltip: {
          videoUrl: 'https://www.youtube.com/embed/qwFVrq3Epcs',
          imageLink: `/assets/chrome-extension/upgrade/claude-instant-100k.png`,
          desc: 'modules:plan_features_table__claude__tooltip_desc',
        },
        youtube: {
          link: 'https://www.youtube.com/embed/qwFVrq3Epcs',
          time: '0:52',
        },
      },
      {
        title: 'Gemini-pro',
        icon: 'GeminiIcon',
        planStatus: {
          free: {
            status: 'none',
            statusText: 'modules:plan_features_table__not_available',
          },
          pro: {
            status: 'none',
            statusText: 'modules:plan_features_table__not_available',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_queries',
          },
        },
        tooltip: {
          imageLink: `/assets/chrome-extension/upgrade/gemini.png`,
          desc: 'modules:plan_features_table__gemini_tooltip_desc',
        },
      },
      {
        title: 'DALL·E 3',
        icon: 'DALLE',
        planStatus: {
          free: {
            status: 'none',
            statusText: 'modules:plan_features_table__not_available',
          },
          pro: {
            status: 'none',
            statusText: 'modules:plan_features_table__not_available',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_queries',
          },
        },
      },
      {
        title: 'modules:plan_features_table__more_ai_providers',
        icon: 'MoreAIProvidersIcon',
        planStatus: {
          free: {
            status: 'limit',
            statusText: 'modules:plan_features_table__daily_limit_applies',
          },
          pro: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_queries',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_queries',
          },
        },

        tooltip: {
          imageLink: `/assets/chrome-extension/upgrade/more-ai-provider.png`,
        },
      },
    ],
  },
  // Summarize & Research & WebAccess
  {
    name: 'modules:plan_features_table__summarize_research_web_access',
    icon: 'Research',
    features: [
      {
        title: 'modules:plan_features_table__summarize_chat_with_any_webpage',
        icon: 'SummaryChatIcon',
        planStatus: {
          free: {
            status: 'none',
            statusText: 'modules:plan_features_table__not_available',
          },
          pro: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
        },
        tooltip: {
          videoUrl: 'https://www.youtube.com/embed/72UM1jMaJhY',
          imageLink: `/assets/chrome-extension/upgrade/page-summary.png`,
          desc: 'modules:plan_features_table__summarize_chat_with_any_webpage__tooltip_desc',
        },
        youtube: {
          link: 'https://www.youtube.com/embed/72UM1jMaJhY',
          time: '0:43',
        },
      },
      {
        title: 'modules:plan_features_table__summarize_chat_with_youTube',
        icon: 'YouTube',
        planStatus: {
          free: {
            status: 'none',
            statusText: 'modules:plan_features_table__not_available',
          },
          pro: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
        },
        tooltip: {
          videoUrl: 'https://www.youtube.com/embed/P60_lPz5yIU',
          imageLink: `/assets/chrome-extension/upgrade/page-summary.png`,
          desc: 'modules:plan_features_table__summarize_chat_with_youTube__tooltip_desc',
        },
        youtube: {
          link: 'https://www.youtube.com/embed/P60_lPz5yIU',
          time: '0:14',
        },
      },
      {
        title: 'modules:plan_features_table__ai_powered_search',
        icon: 'AIPowerSearchIcon',
        planStatus: {
          free: {
            status: 'none',
            statusText: 'modules:plan_features_table__not_available',
          },
          pro: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
        },
        tooltip: {
          videoUrl: 'https://www.youtube.com/embed/1uZuyqqySO0',
          imageLink: `/assets/chrome-extension/upgrade/ai-powered-search.png`,
          desc: 'modules:plan_features_table__ai_powered_search__tooltip_desc',
        },
        youtube: {
          link: 'https://www.youtube.com/embed/1uZuyqqySO0',
          time: '1:30',
        },
      },
      {
        title: 'modules:plan_features_table__search_with_AI',
        icon: 'SearchWithAIIcon',
        planStatus: {
          free: {
            status: 'limit',
            statusText: 'modules:plan_features_table__limited_access',
          },
          pro: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
        },
        tooltip: {
          videoUrl: 'https://www.youtube.com/embed/kgO6OnurRpQ',
          imageLink: `/assets/chrome-extension/upgrade/search-with-ai.png`,
          desc: 'modules:plan_features_table__search_with_AI__tooltip_desc',
        },
        youtube: {
          link: 'https://www.youtube.com/embed/kgO6OnurRpQ',
          time: '0:58',
        },
      },

      {
        title: 'modules:plan_features_table__summarize_chat_with_pdf',
        icon: 'PDFViewerIcon',
        planStatus: {
          free: {
            status: 'none',
            statusText: 'modules:plan_features_table__not_available',
          },
          pro: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
        },
        tooltip: {
          videoUrl: 'https://www.youtube.com/embed/72UM1jMaJhY',
          imageLink: `/assets/chrome-extension/upgrade/page-summary.png`,
          desc: 'modules:plan_features_table__summarize_chat_with_pdf__tooltip_desc',
        },
        youtube: {
          link: 'https://www.youtube.com/embed/72UM1jMaJhY',
          time: '0:44',
        },
      },
      {
        title: 'modules:plan_features_table__summarize_chat_with_email',
        icon: 'EmailIcon',
        planStatus: {
          free: {
            status: 'none',
            statusText: 'modules:plan_features_table__not_available',
          },
          pro: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
        },
        tooltip: {
          videoUrl: 'https://www.youtube.com/embed/fwaqJyTwefI',
          imageLink: `/assets/chrome-extension/upgrade/input-assistant-email.png`,
          desc: 'modules:plan_features_table__summarize_chat_with_email__tooltip_desc',
        },
        youtube: {
          link: 'https://www.youtube.com/embed/fwaqJyTwefI',
          time: '1:20',
        },
      },

      {
        title: 'modules:plan_features_table__pdf_ai_viewer',
        icon: 'PDFViewerIcon',
        planStatus: {
          free: {
            status: 'limit',
            statusText: 'modules:plan_features_table__limited_access',
          },
          pro: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
        },
        tooltip: {
          videoUrl: 'https://www.youtube.com/embed/eYO5Dh6Ruic',
          imageLink: `/assets/chrome-extension/upgrade/pdf.png`,
          desc: 'modules:plan_features_table__pdf_ai_viewer__tooltip_desc',
        },
        youtube: {
          link: 'https://www.youtube.com/embed/eYO5Dh6Ruic',
          time: '0:54',
        },
      },
    ],
  },

  // Help me write
  {
    name: 'modules:plan_features_table__help_me_write_everywhere',
    icon: 'Help me write',
    features: [
      {
        title: 'modules:plan_features_table__gmail_writing_assistant',
        icon: 'Gmail',
        planStatus: {
          free: {
            status: 'none',
            statusText: 'modules:plan_features_table__not_available',
          },
          pro: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
        },
        tooltip: {
          videoUrl: 'https://www.youtube.com/embed/fwaqJyTwefI',
          imageLink: `/assets/chrome-extension/upgrade/input-assistant-email.png`,
          desc: 'modules:plan_features_table__gmail_writing_assistant__tooltip_desc',
        },
        youtube: {
          link: 'https://www.youtube.com/embed/fwaqJyTwefI',
          time: '1:20',
        },
      },
      {
        title: 'modules:plan_features_table__facebook_writing_assistant',
        icon: 'Facebook',
        planStatus: {
          free: {
            status: 'none',
            statusText: 'modules:plan_features_table__not_available',
          },
          pro: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
        },
        tooltip: {
          videoUrl: 'https://www.youtube.com/embed/zmNGKFyw3pU',
          imageLink: `/assets/chrome-extension/upgrade/social-media-posts.png`,
          desc: 'modules:plan_features_table__facebook_writing_assistant__tooltip_desc',
        },
        youtube: {
          link: 'https://www.youtube.com/embed/zmNGKFyw3pU',
          time: '1:19',
        },
      },
      {
        title: 'modules:plan_features_table__linkedIn_writing_assistant',
        icon: 'LinkedIn',
        planStatus: {
          free: {
            status: 'none',
            statusText: 'modules:plan_features_table__not_available',
          },
          pro: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
        },
        tooltip: {
          videoUrl: 'https://www.youtube.com/embed/55IqqmQIBw0',
          imageLink: `/assets/chrome-extension/upgrade/social-media-posts.png`,
          desc: 'modules:plan_features_table__linkedIn_writing_assistant__tooltip_desc',
        },
        youtube: {
          link: 'https://www.youtube.com/embed/55IqqmQIBw0',
          time: '1:28',
        },
      },
      {
        title: 'modules:plan_features_table__xtwitter_writing_assistant',
        icon: 'TwitterX',
        planStatus: {
          free: {
            status: 'none',
            statusText: 'modules:plan_features_table__not_available',
          },
          pro: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
        },
        tooltip: {
          videoUrl: 'https://www.youtube.com/embed/3UQaOm8sWVI',
          imageLink: `/assets/chrome-extension/upgrade/social-media-posts.png`,
          desc: 'modules:plan_features_table__xtwitter_writing_assistant__tooltip_desc',
        },
        youtube: {
          link: 'https://www.youtube.com/embed/3UQaOm8sWVI',
          time: '1:06',
        },
      },
      {
        title: 'modules:plan_features_table__youtube_writing_assistant',
        icon: 'YouTube',
        planStatus: {
          free: {
            status: 'none',
            statusText: 'modules:plan_features_table__not_available',
          },
          pro: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
        },
        tooltip: {
          videoUrl: 'https://www.youtube.com/embed/D4Acc0rpR3o',
          imageLink: `/assets/chrome-extension/upgrade/social-media-posts.png`,
          desc: 'modules:plan_features_table__youtube_writing_assistant__tooltip_desc',
        },
        youtube: {
          link: 'https://www.youtube.com/embed/D4Acc0rpR3o',
          time: '1:39',
        },
      },
      {
        title: 'modules:plan_features_table__outlook_writing_assistant',
        icon: 'Outlook',
        planStatus: {
          free: {
            status: 'none',
            statusText: 'modules:plan_features_table__not_available',
          },
          pro: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
        },
        tooltip: {
          videoUrl: 'https://www.youtube.com/embed/Y2yZ4wWQDno',
          imageLink: `/assets/chrome-extension/upgrade/input-assistant-email.png`,
          desc: 'modules:plan_features_table__outlook_writing_assistant__tooltip_desc',
        },
        youtube: {
          link: 'https://www.youtube.com/embed/Y2yZ4wWQDno',
          time: '1:16',
        },
      },
      {
        title: 'modules:plan_features_table__instagram_writing_assistant',
        icon: 'Instagram',
        planStatus: {
          free: {
            status: 'none',
            statusText: 'modules:plan_features_table__not_available',
          },
          pro: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
        },
        tooltip: {
          videoUrl: 'https://www.youtube.com/embed/OnRPaGn_4Ds',
          imageLink: `/assets/chrome-extension/upgrade/social-media-posts.png`,
          desc: 'modules:plan_features_table__instagram_writing_assistant__tooltip_desc',
        },
        youtube: {
          link: 'https://www.youtube.com/embed/OnRPaGn_4Ds',
          time: '1:33',
        },
      },
    ],
  },

  // Personalized AI
  {
    name: 'modules:plan_features_table__truly_personalized_ai',
    icon: 'Personalized',
    features: [
      {
        title: 'modules:plan_features_table__one_click_prompts',
        icon: 'OneClickPromptIcon',
        planStatus: {
          free: {
            status: 'limit',
            statusText: 'modules:plan_features_table__limited_access',
          },
          pro: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
        },
        tooltip: {
          imageLink: `/assets/chrome-extension/upgrade/one-click-prompt.png`,
          desc: 'modules:plan_features_table__one_click_prompts__tooltip_desc',
        },
      },
      {
        title: 'modules:plan_features_table__ai_response_language',
        icon: 'LanguageIcon',
        planStatus: {
          free: {
            status: 'limit',
            statusText: 'modules:plan_features_table__english_only',
          },
          pro: {
            status: 'all',
            statusText: 'modules:plan_features_table__any_language',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__any_language',
          },
        },
        tooltip: {
          imageLink: `/assets/chrome-extension/upgrade/preferred-language.png`,
          title: 'Upgrade to change AI response language',
          desc: 'modules:plan_features_table__ai_response_language__tooltip_desc',
        },
      },

      {
        title: 'modules:plan_features_table__chatgpt_temperature',
        icon: 'ChatGPTTemperatureIcon',
        planStatus: {
          free: {
            status: 'none',
            statusText: 'modules:plan_features_table__not_available',
          },
          pro: {
            status: 'all',
            statusText: 'modules:plan_features_table__full_control',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__full_control',
          },
        },
        tooltip: {
          imageLink: `/assets/chrome-extension/upgrade/max-ai-temperature.png`,
          desc: 'modules:plan_features_table__chatgpt_temperature__tooltip_desc',
        },
      },
    ],
  },
  // ChatGPT enhanced with WebChatGPT
  {
    name: 'modules:plan_features_table__chatgpt_enhanced_with_webchatgpt',
    icon: 'ChatGPTEnhancedIcon',
    features: [
      {
        title: 'modules:plan_features_table__web_access_copilot',
        desc: 'modules:plan_features_table__web_access_copilot__desc',
        icon: 'WebAccessCopilotIcon',
        planStatus: {
          free: {
            status: 'none',
            statusText: 'modules:plan_features_table__not_available',
          },
          pro: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
        },
        tooltip: {
          videoUrl: 'https://www.youtube.com/embed/uDMJNf841dc',
          imageLink: `/assets/chrome-extension/upgrade/web-access-full-insights.png`,
          desc: 'modules:plan_features_table__web_access_copilot__tooltip_desc',
        },
        youtube: {
          link: 'https://www.youtube.com/embed/uDMJNf841dc',
          time: '1:03',
        },
      },
      {
        title: 'modules:plan_features_table__web_access_advanced',
        icon: 'WebAccessAdvancedIcon',
        planStatus: {
          free: {
            status: 'limit',
            statusText: 'modules:plan_features_table__limited_access',
          },
          pro: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__unlimited_access',
          },
        },
        tooltip: {
          imageLink: `/assets/chrome-extension/upgrade/advanced-options.png`,
          title: 'Upgrade to access all advanced options',
          desc: 'modules:plan_features_table__web_access_advanced__tooltip_desc',
        },
      },
    ],
  },
  // New features
  {
    name: 'modules:plan_features_table__new_and_upcoming_features',
    icon: 'MaxAILogo',
    features: [
      {
        title: 'modules:plan_features_table__tiktok_writing_assistant',
        icon: 'TikTok',
        planStatus: {
          free: {
            status: 'none',
            statusText: 'modules:plan_features_table__not_available',
          },
          pro: {
            status: 'all',
            statusText: 'modules:plan_features_table__available_soon',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__available_soon',
          },
        },
        tooltip: {
          imageLink: `/assets/chrome-extension/upgrade/tiktok-writing.png`,
        },
      },
      {
        title: 'modules:plan_features_table__google_ads_assistant',
        icon: 'GoogleAds',
        planStatus: {
          free: {
            status: 'none',
            statusText: 'modules:plan_features_table__not_available',
          },
          pro: {
            status: 'all',
            statusText: 'modules:plan_features_table__available_soon',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__available_soon',
          },
        },
        tooltip: {
          imageLink: `/assets/chrome-extension/upgrade/google-ads.png`,
        },
      },
      {
        title: 'modules:plan_features_table__facebook_ads_assistant',
        icon: 'FacebookAds',
        planStatus: {
          free: {
            status: 'none',
            statusText: 'modules:plan_features_table__not_available',
          },
          pro: {
            status: 'all',
            statusText: 'modules:plan_features_table__available_soon',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__available_soon',
          },
        },
        tooltip: {
          imageLink: `/assets/chrome-extension/upgrade/facebook-ads.png`,
        },
      },
      {
        title: 'modules:plan_features_table__shopify_assistant',
        icon: 'Shopify',
        planStatus: {
          free: {
            status: 'none',
            statusText: 'modules:plan_features_table__not_available',
          },
          pro: {
            status: 'all',
            statusText: 'modules:plan_features_table__available_soon',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__available_soon',
          },
        },
        tooltip: {
          imageLink: `/assets/chrome-extension/upgrade/shopify-assistant.png`,
        },
      },
      {
        title: 'modules:plan_features_table__other_new_features',
        icon: 'NewFeaturesIcon',
        planStatus: {
          free: {
            status: 'none',
            statusText: 'modules:plan_features_table__not_available',
          },
          pro: {
            status: 'all',
            statusText: 'modules:plan_features_table__priority_access',
          },
          elite: {
            status: 'all',
            statusText: 'modules:plan_features_table__priority_access',
          },
        },
        tooltip: {
          imageLink: `/assets/chrome-extension/upgrade/other-new-features.png`,
        },
      },
    ],
  },
];
