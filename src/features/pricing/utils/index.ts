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
