import { IResponseData } from '@/utils/request';

// pricing 支持购买的 plan 类型
export type RENDER_PLAN_TYPE =
  | 'free' // 免费版
  | 'basic' // basic 月付 个人版
  | 'basic_yearly' // basic 年付 个人版
  | 'basic_team' // basic 月付 团队版
  | 'pro' // pro 月付 个人版
  | 'pro_yearly' // pro 年付 个人版
  | 'pro_team' // pro 月付 团队版
  | 'elite' // elite 月付 个人版
  | 'elite_yearly' // elite 年付 个人版
  | 'elite_team'; // elite 月付 team 版本

// 支付方式
export type IPaymentType = 'yearly' | 'monthly';

export type IPricingPlanCategory = 'individual' | 'team';

interface IGetUserSubscriptionInfoResponseData {
  chatgpt_expires_at: string;
  roles: Array<{
    name: 'free' | 'pro';
    exp_time: string;
  }>;
  has_reached_limit: boolean;
  next_reset_timestamp: number;
  usage: number;
  limit_value: number;
  subscription_type: string;
  current_period_end: number;
}

export type IGetUserSubscriptionInfoResponse =
  IResponseData<IGetUserSubscriptionInfoResponseData>;
