import { RENDER_PLAN_TYPE } from '@/features/pricing/type';
// 点击 plan button 时把 plan type 存到 localStorage
export const TEMPORARY_PAYMENT_PLAN_TYPE = 'TEMPORARY_PAYMENT_PLAN_TYPE';

// plan price per month
export const PLAN_PRICE_MAP: Record<RENDER_PLAN_TYPE, number> = {
  free: 0,

  basic: 9.99,
  basic_yearly: 99.99,
  basic_team: 9.99,

  pro: 19.99,
  pro_yearly: 199.99,
  pro_team: 19.99,

  elite: 39.99,
  elite_yearly: 299.99,
  elite_team: 39.99,
};

// 不同 plan 对应的 productivity 价值
export const PLAN_PRODUCTIVITY_VALUES: Record<RENDER_PLAN_TYPE, number> = {
  free: 0,

  basic: 1,
  basic_yearly: 1,
  basic_team: 1,

  pro: 3,
  pro_yearly: 3,
  pro_team: 3,

  elite: 5,
  elite_yearly: 5,
  elite_team: 5,
};

// plan 不同功能的类型
export type IPlanFeaturesUsageCategory =
  | 'fast_text'
  | 'advanced_text'
  | 'image';

export const PLAN_FEATURES_USAGE_CATEGORY_MODEL: Record<
  IPlanFeaturesUsageCategory,
  string
> = {
  fast_text: 'GPT-3.5 & Claude-3-haiku & Gemini-pro',
  advanced_text: 'GPT-4 & Claude-3-opus/sonnet & Gemini-1.5-pro',
  image: 'DALL·E 3',
};

// 不同 plan 针对不同功能的使用量限制
export const PLAN_USAGE_QUERIES: Record<
  RENDER_PLAN_TYPE,
  Record<IPlanFeaturesUsageCategory, number>
> = {
  free: {
    fast_text: 0,
    advanced_text: 0,
    image: 0,
  },
  basic: {
    fast_text: 3000,
    advanced_text: 100,
    image: 200,
  },
  basic_team: {
    fast_text: 3000,
    advanced_text: 100,
    image: 200,
  },
  basic_yearly: {
    fast_text: 3000,
    advanced_text: 100,
    image: 200,
  },
  pro: {
    fast_text: 10000,
    advanced_text: 300,
    image: 400,
  },
  pro_team: {
    fast_text: 10000,
    advanced_text: 300,
    image: 400,
  },
  pro_yearly: {
    fast_text: 10000,
    advanced_text: 300,
    image: 400,
  },
  elite: {
    fast_text: -1,
    advanced_text: -1,
    image: -1,
  },
  elite_team: {
    fast_text: -1,
    advanced_text: -1,
    image: -1,
  },
  elite_yearly: {
    fast_text: -1,
    advanced_text: -1,
    image: -1,
  },
};
export * from './features';
