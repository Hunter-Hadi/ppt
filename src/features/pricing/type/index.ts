import { IResponseData } from '@/utils/request';

// 渲染 plan 的类型
export type RENDER_PLAN_TYPE =
  | 'free'
  | 'pro'
  | 'pro_yearly'
  | 'elite'
  | 'elite_yearly';

// 支付方式
export type IPaymentType = 'yearly' | 'monthly';

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
