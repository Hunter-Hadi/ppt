import { RENDER_PLAN_TYPE } from '@/features/pricing/type';

export const DISCOUNT_VALUE: Record<RENDER_PLAN_TYPE, number> = {
  free: 0,

  basic: 0,
  basic_yearly: 0,
  basic_team: 0,

  pro: 0,
  pro_yearly: 0,
  pro_team: 0,

  elite: 0,
  elite_yearly: 0.76,
  elite_team: 0,
};

export const PROMOTION_CODE_MAP: Partial<
  Record<RENDER_PLAN_TYPE, string | null>
> = {
  pro_yearly: null,
  elite_yearly: 'ELITESPECIAL',
};

export const CURRENT_PROMOTION_PATHNAME = '/special';
