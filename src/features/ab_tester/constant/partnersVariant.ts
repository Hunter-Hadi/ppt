export type IPartnerVariantType =
  | 'partners_content_home'
  | 'partners_content_ai_chat'
  | 'partners_content_ai_rewriter'
  | 'partners_content_ai_summary'
  | 'partners_content_ai_instant_reply'
  | 'partners_content_ai_reader'
  | 'partners_content_ai_prompts'
  | 'partners_content_ai_search'
  | 'partners_content_ai_art'
  | 'partners_content_ai_translator'
  | 'partners_content_ai_vision'
  | 'partners_content_youtubesummary'
  | 'partners_content_chatpdf'
  | 'partners_content_translate'
  | 'partners_content_vision';

export const TESTER_PARTNERS_CONTENT_PATH_TARGET_PATHNAME = [
  '/partners/updated',
];

export const PARTNERS_VARIANT: IPartnerVariantType[] = [
  'partners_content_home',
  'partners_content_ai_chat',
  'partners_content_ai_rewriter',
  'partners_content_ai_summary',
  'partners_content_ai_instant_reply',
  'partners_content_ai_reader',
  'partners_content_ai_prompts',
  'partners_content_ai_search',
  'partners_content_ai_art',
  'partners_content_ai_translator',
  'partners_content_ai_vision',
  'partners_content_youtubesummary',
  'partners_content_chatpdf',
  'partners_content_translate',
  'partners_content_vision',
];

export const PARTNERS_VARIANT_TO_VERSION_MAP: Record<
  IPartnerVariantType,
  string
> = {
  partners_content_home: '1-home',
  partners_content_ai_chat: '1-AI-chat',
  partners_content_ai_rewriter: '1-AI-rewriter',
  partners_content_ai_summary: '1-AI-summary',
  partners_content_ai_instant_reply: '1-AI-instant-reply',
  partners_content_ai_reader: '1-AI-ai-reader',
  partners_content_ai_prompts: '1-AI-prompts',
  partners_content_ai_search: '1-AI-search',
  partners_content_ai_art: '1-AI-art',
  partners_content_ai_translator: '1-AI-translator',
  partners_content_ai_vision: '1-AI-vision',
  partners_content_youtubesummary: '1-youtubesummary',
  partners_content_chatpdf: '1-chatpdf',
  partners_content_translate: '1-translate',
  partners_content_vision: '1-vision',
};
