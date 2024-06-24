import { IApiResponseSubscriptionRoleType } from '@/features/auth/types';

export type MaxAIListenConnectAccountType = {
  event: 'MAXAI_LISTEN_CONNECT_ACCOUNT';
  type: 'requestTokens';
  data: any;
};

export type MaxAIConnectAccountType = {
  event: 'MAXAI_LISTEN_CONNECT_ACCOUNT';
  type: 'userTokens' | 'loaded';
  data: any;
};

export type MaxAIListenConnectAccountDataType = {
  event: 'loaded' | 'requestTokensSuccess' | 'requestTokensFailure';
  data: any;
};

export type MaxAIAuthTokensType = {
  email: string;
  accessToken: string;
  refreshToken: string;
  userData: string;
};

/**
 * 后端只有:free,pro
 * 前端通过不同的过期时间来区分: free, new_user, pro, pro_gift, elite
 */
export type IUserRoleType =
  | 'free'
  | 'new_user'
  | 'old_free_user'
  | 'pro_gift'
  | 'basic'
  | 'pro'
  | 'elite';

export interface IUserProfile {
  chatgpt_expires_at: string;
  email: string;
  referral_code: string;
  settings: any;
  total_gift_time_in_sec: number;
  twitter_screen_name: string;
  created_at: string;
  group_id?: string;
  client_user_id?: string;
  subscription_plan_name?: IApiResponseSubscriptionRoleType;
  subscribed_at?: number;
  subscription_cancelled_at?: null | number;
  subscription_payment_failed_at?: null | number;

  // 来自 api /user/get_user_subscription_info 的字段
  subscription_type: 'SUBSCRIPTION' | 'ONE_TIME';
  role: {
    name: IUserRoleType;
    expireTimeStr: string;
  };
}
