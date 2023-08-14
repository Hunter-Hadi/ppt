import { IPromptListType, IPromptVariable } from '@/features/prompt/types';

export const DEFAULT_PROMPT_AUTHOR = 'MaxAI.me';
export const DEFAULT_PROMPT_AUTHOR_LINK = 'https://www.maxai.me';

export const DETAULT_PROMPT_LIST_TYPE: IPromptListType = 'Own';

export const SAVE_PROMPT_LIST_TYPE = ['Favorites', 'Public', 'Own'];

export const DEFAULT_TEMPLATE_RESERVED_VARIABLE = [
  {
    name: 'TARGET_LANGUAGE',
    title: 'Variable for target language',
    hint: '',
    type: 'text',
  },
] as const;

export const PROMPT_COLORS = ['#5D5FEF', '#FF6154', '#008000', '#FFA500'];

export const RENDERED_TEMPLATE_PROMPT_DOM_ID =
  'use_chat_gpt_ai_web_prompt_template_text';

export const DEFAULT_PROMPT_VARIABLE: IPromptVariable[] = [
  // type livecrawling
  {
    name: 'Live Crawling Target URL',
    hint: 'Enter the URL you wish to extract text from',
    type: 'livecrawling',
    isSystemVariable: true,
  },
  {
    name: 'Live Crawling Crawled Text',
    hint: 'This variable will be automatically updated with text extracted from the target URL',
    type: 'livecrawling',
    isSystemVariable: true,
  },
  // {
  //   name: 'Live Crawling Crawled Html',
  //   hint: 'This variable will be automatically updated with Html extracted from the target URL',
  //   type: 'livecrawling',
  //   isSystemVariable: true,
  // },
  // type webaccess
  {
    name: 'Web Search Query',
    hint: 'Enter your search term',
    type: 'websearch',
    isSystemVariable: true,
  },
  {
    name: 'Web Search Results',
    hint: 'This variable will be automatically updated with the search results',
    type: 'websearch',
    isSystemVariable: true,
  },

  // type system
  {
    name: 'System Current Date',
    hint: 'This variable will be automatically updated with the current date',
    type: 'system',
    isSystemVariable: true,
  },
];

export const VARIABLE_TYPE_LABEL_MAP: Record<IPromptVariable['type'], string> =
  {
    livecrawling: 'Live Crawling',
    websearch: 'Web Search',
    system: 'System',
    text: 'Text',
  };
