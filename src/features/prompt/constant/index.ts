import { IPromptListType } from '@/features/prompt/types';

export const DEFAULT_PROMPT_AUTHOR = 'MaxAI.me';
export const DEFAULT_PROMPT_AUTHOR_LINK = 'https://www.maxai.me';

export const DETAULT_PROMPT_LIST_TYPE: IPromptListType = 'Own';

export const SAVE_PROMPT_LIST_TYPE = ['Favorites', 'Public', 'Own'];

export const DEFAULT_TEMPLATE_RESERVED_VARIABLE = [
  {
    name: 'TARGET_LANGUAGE',
    title: 'Variable for target language',
    hint: '',
  },
];

export const PROMPT_COLORS = ['#5D5FEF', '#FF6154', '#008000', '#FFA500'];

export const RENDERED_TEMPLATE_PROMPT_DOM_ID =
  'use_chat_gpt_ai_web_prompt_template_text';
