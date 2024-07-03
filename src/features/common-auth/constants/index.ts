import { IUserRoleType } from '@/features/common-auth/types';

export const SSO_WHITE_LIST_HOSTS = ['https://www.maxai.me'];
export const SSO_LOGIN_URL = 'https://app.maxai.me/connect/account';

// temp variable

export const COMMON_AUTH_API_HOST = `https://api.maxai.me`;

export const MAXAI_AUTH_LOCAL_STORAGE_KEY_PREFIX =
  'UseChatGPTAuthServiceProvider';

// 角色优先级值
export const USER_ROLE_PRIORITY: Record<IUserRoleType, number> = {
  new_user: 0,
  old_free_user: 0,
  pro_gift: 0,
  free: 0,
  basic: 1,
  pro: 2,
  elite: 3,
};
