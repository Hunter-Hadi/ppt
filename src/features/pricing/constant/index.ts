import { RENDER_PLAN_TYPE } from '@/features/pricing/type';
// 点击 plan button 时把 plan type 存到 localStorage
export const TEMPORARY_PAYMENT_PLAN_TYPE = 'TEMPORARY_PAYMENT_PLAN_TYPE';

// plan price per month
export const PLAN_PRICE_MAP: Record<RENDER_PLAN_TYPE, number> = {
  free: 0,
  pro: 19,
  pro_yearly: 12,
  elite: 39,
  elite_yearly: 18,
};

export * from './features';
