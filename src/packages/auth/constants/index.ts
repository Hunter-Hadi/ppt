import { IUserRoleType } from '@/packages/auth/types';
import {
  COMMON_MAXAI_API_HOST,
  COMMON_MAXAI_APP_PROJECT_HOST,
  COMMON_MAXAI_WWW_PROJECT_HOST,
} from '@/packages/common/constants';

export const SSO_WHITE_LIST_HOSTS = [COMMON_MAXAI_WWW_PROJECT_HOST];
export const SSO_LOGIN_URL = COMMON_MAXAI_APP_PROJECT_HOST + '/connect/account';

// temp variable

export const COMMON_AUTH_API_HOST = COMMON_MAXAI_API_HOST;

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
