// 固定几个日期时间点，如果当前时间超过了就使用下一个时间点
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { PLAN_PRICE_MAP } from '@/features/pricing/constant';
import { RENDER_PLAN_TYPE } from '@/features/pricing/type';
import { transformRenderTypeToPlanType } from '@/features/pricing/utils';
import { DISCOUNT_VALUE } from '@/features/promotion/constants';
dayjs.extend(utc);

export const getPromotionTimeWithCycle = () => {
  // 结束时间
  // return '2024-03-31 23:59:59';

  const timeCycle = [
    '2024-04-02 23:59:59',
    '2024-04-05 23:59:59',
    '2024-04-08 23:59:59',
    '2024-04-11 23:59:59',
    '2024-04-14 23:59:59',
    '2024-04-17 23:59:59',
    '2024-04-20 23:59:59',
    '2024-04-23 23:59:59',
    '2024-04-26 23:59:59',
    '2024-04-29 23:59:59',
    '2024-05-02 23:59:59',
    '2024-05-09 23:59:59',
    '2024-05-16 23:59:59',
    '2024-05-23 23:59:59',
    '2024-05-30 23:59:59',
    '2024-06-06 23:59:59',
    '2024-06-13 23:59:59',
    '2024-06-20 23:59:59',
    '2024-06-27 23:59:59',
    '2024-07-04 23:59:59',
    '2024-07-11 23:59:59',
    '2024-07-18 23:59:59',
    '2024-07-25 23:59:59',
    '2024-08-01 23:59:59',
    '2024-08-08 23:59:59',
    '2024-08-15 23:59:59',
    '2024-08-22 23:59:59',
    '2024-08-29 23:59:59',
    '2024-09-05 23:59:59',
    '2024-09-12 23:59:59',
  ];

  let targetTime = '';
  const currentTime = dayjs().utc();
  for (let i = 0; i < timeCycle.length; i++) {
    const time = dayjs(timeCycle[i]).utc();
    // 判断当前时间是否超过 time
    // diff > 0 代表 time > currentTime
    if (time.diff(currentTime) > 0) {
      targetTime = timeCycle[i];
      break;
    }
  }

  // 循环结束后都没有存在 有效的时间，则直接使用 cycle 最后一个
  if (targetTime === '') {
    return timeCycle[timeCycle.length - 1];
  }

  return targetTime;
};

// 获取 目标plan 的折扣后的价格 相比于 目标plan monthly价格的 优惠力度
// 公式： ((目标plan 的折扣后的价格 / (目标plan monthly价格 * 12)) - 1) * 100
export const getTargetPlanDiscount = (plan: RENDER_PLAN_TYPE) => {
  const targetPlanMonthlyType = transformRenderTypeToPlanType(plan, 'monthly');
  return Math.round(
    Math.abs(
      ((DISCOUNT_VALUE[plan] * PLAN_PRICE_MAP[plan]) /
        (PLAN_PRICE_MAP[targetPlanMonthlyType] * 12) -
        1) *
        100,
    ),
  );
};

// 获取 目标plan 的折扣后的价格
export const getTargetPlanDiscountedPrice = (plan: RENDER_PLAN_TYPE) => {
  const discount = DISCOUNT_VALUE[plan];
  const price = PLAN_PRICE_MAP[plan];
  return price * discount;
};
