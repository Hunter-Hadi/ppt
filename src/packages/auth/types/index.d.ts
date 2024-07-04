export type IApiResponseSubscriptionRoleType =
  | 'BASIC_TEAM_MONTHLY'
  | 'BASIC_MONTHLY'
  | 'BASIC_YEARLY'
  | 'BASIC_ONE_YEAR'
  | 'PRO_MONTHLY'
  | 'PRO_YEARLY'
  | 'PRO_TEAM_MONTHLY'
  | 'PRO_ONE_YEAR'
  | 'ELITE_YEARLY'
  | 'ELITE_MONTHLY'
  | 'ELITE_TEAM_MONTHLY'
  | 'ELITE_ONE_YEAR'
  | 'ELITE_TWO_YEAR'
  | 'ELITE_THREE_YEAR';

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

export interface IUserInfoApiResponse {
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
  // 一次性付款的 plan 会有这个字段, 到期时间
  current_period_end: number | null;

  // 来自 api /user/get_user_subscription_info 的字段
  subscription_type: 'SUBSCRIPTION' | 'ONE_TIME';

  roles: {
    name: IUserRoleType;
    exp_time: string;
  }[];

  signup_method?: string;
  subscription_status: 'active' | 'canceled';
}

export interface IUserProfile extends IUserInfoApiResponse {
  role: {
    name: IUserRoleType;
    expireTimeStr: string;
    expireTimeValue: number;
  };
}
