import { PLAN_PRICE_MAP } from '@/features/pricing/constant';
import { RENDER_PLAN_TYPE } from '@/features/pricing/type';

export function calcPlanPrice(type: RENDER_PLAN_TYPE) {
  return type.includes('yearly')
    ? PLAN_PRICE_MAP[type] * 12
    : PLAN_PRICE_MAP[type];
}

export function renderTypeToName(renderType: RENDER_PLAN_TYPE) {
  if (renderType !== 'free') {
    const renderTypeName = renderType.split('_')[0];
    return renderTypeName;
  }

  // free
  return 'free';
}

// 获取 plan 月付价格相对于年费价格节省了多少百分比
// 公式：(1 - 年付价格 / 12 / 月付价格 ) * 100
export const getMonthlyPriceOfYearlyPriceDiscount = (
  plan: RENDER_PLAN_TYPE,
) => {
  const monthlyPrice =
    PLAN_PRICE_MAP[transformRenderTypeToPlanType(plan, 'monthly')];
  const yearlyPrice =
    PLAN_PRICE_MAP[transformRenderTypeToPlanType(plan, 'yearly')];
  return Math.ceil((1 - yearlyPrice / 12 / monthlyPrice) * 100);
};

// 获取 plan 年付价格 相对于 月付价格 每年节省多少钱
// 公式: 月付价格 * 12 - 年付价格
export const getYearlyPriceOfMonthlyPriceHowMuchSaveUpEachYear = (
  plan: RENDER_PLAN_TYPE,
) => {
  const monthlyPrice =
    PLAN_PRICE_MAP[transformRenderTypeToPlanType(plan, 'monthly')];
  const yearlyPrice =
    PLAN_PRICE_MAP[transformRenderTypeToPlanType(plan, 'yearly')];
  return Math.ceil(monthlyPrice * 12 - yearlyPrice);
};

// 把当前 RENDER_PLAN_TYPE 转换成指定的 plan type
export const transformRenderTypeToPlanType = (
  plan: RENDER_PLAN_TYPE,
  targetPlanType: 'monthly' | 'yearly' | 'team_monthly' | 'team_yearly',
) => {
  const planText = plan.split('_')[0] as RENDER_PLAN_TYPE;

  if (targetPlanType === 'monthly') {
    return planText;
  }

  if (targetPlanType === 'yearly') {
    return `${planText}_yearly` as RENDER_PLAN_TYPE;
  }

  if (targetPlanType === 'team_monthly') {
    return `${planText}_team` as RENDER_PLAN_TYPE;
  }

  if (targetPlanType === 'team_yearly') {
    // 暂时没有 team yearly 的 plan
    // return `${planText}_team_yearly` as RENDER_PLAN_TYPE;
    return planText;
  }

  return planText;
};
