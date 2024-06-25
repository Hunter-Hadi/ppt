import { MAXAI_AUTH_LOCAL_STORAGE_KEY_PREFIX } from '@/features/common-auth/constants';
import {
  IUserRoleType,
  MaxAIAuthTokensType,
} from '@/features/common-auth/types';

/**
 * 获取当前用户的 token 信息
 */
export const getCurrentUserTokens = (): MaxAIAuthTokensType | null => {
  const email = localStorage.getItem(
    `${MAXAI_AUTH_LOCAL_STORAGE_KEY_PREFIX}.email`,
  );
  if (!email) {
    return null;
  }
  const localStoreKeyPrefix = `${MAXAI_AUTH_LOCAL_STORAGE_KEY_PREFIX}.${email}`;
  const userData = localStorage.getItem(localStoreKeyPrefix + '.userData');
  const accessToken = localStorage.getItem(
    localStoreKeyPrefix + '.accessToken',
  );
  const refreshToken = localStorage.getItem(
    localStoreKeyPrefix + '.refreshToken',
  );
  if (!userData || !accessToken || !refreshToken) {
    return null;
  }
  return {
    userData,
    accessToken,
    refreshToken,
    email,
  };
};

export const saveCurrentUserTokens = (tokens: MaxAIAuthTokensType) => {
  if (
    !tokens.email ||
    !tokens.userData ||
    !tokens.accessToken ||
    !tokens.refreshToken
  ) {
    return false;
  }
  const localStoreKeyPrefix = `${MAXAI_AUTH_LOCAL_STORAGE_KEY_PREFIX}.${tokens.email}`;
  localStorage.setItem(localStoreKeyPrefix + '.userData', tokens.userData);
  localStorage.setItem(
    localStoreKeyPrefix + '.accessToken',
    tokens.accessToken,
  );
  localStorage.setItem(
    localStoreKeyPrefix + '.refreshToken',
    tokens.refreshToken,
  );
  localStorage.setItem(
    `${MAXAI_AUTH_LOCAL_STORAGE_KEY_PREFIX}.email`,
    tokens.email,
  );
  return true;
};

/**
 * 渲染用户角色名称
 * @param roleName
 */
export const renderRoleName = (roleName: IUserRoleType) => {
  switch (roleName) {
    case 'free':
    case 'new_user':
    case 'old_free_user':
    case 'pro_gift':
      return 'Free';

    case 'basic':
      return 'Basic';

    case 'pro':
      return 'Pro';

    case 'elite':
      return 'Elite';

    default:
      return 'Free';
  }
};

/**
 * 检查是否是付费用户
 * @param roleName
 */
export const checkPayingUser = (roleName: IUserRoleType): boolean => {
  return !!(roleName === 'pro' || roleName === 'elite' || roleName === 'basic');
};

/**
 * 获取当前用户的 token 信息
 */
export const getAccessToken = () => {
  if (typeof window === 'undefined') {
    return null;
  }
  const email = localStorage.getItem('UseChatGPTAuthServiceProvider.email');
  if (email) {
    return localStorage.getItem(
      `UseChatGPTAuthServiceProvider.${email}.accessToken`,
    );
  }
  return null;
};
/**
 * 解析 jwt token
 * @param token
 */
export const parseJwt = (token: string) => {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split('')
      .map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join(''),
  );
  return JSON.parse(jsonPayload);
};

/**
 *  登出账号
 */
export const authLogout = () => {
  if (typeof window === 'undefined') {
    return;
  }
  const email = localStorage.getItem(
    `${MAXAI_AUTH_LOCAL_STORAGE_KEY_PREFIX}.email`,
  );
  if (email) {
    localStorage.removeItem(
      `${MAXAI_AUTH_LOCAL_STORAGE_KEY_PREFIX}.${email}.accessToken`,
    );
    localStorage.removeItem(
      `${MAXAI_AUTH_LOCAL_STORAGE_KEY_PREFIX}.${email}.refreshToken`,
    );
    localStorage.removeItem(
      `${MAXAI_AUTH_LOCAL_STORAGE_KEY_PREFIX}.${email}.userData`,
    );
    localStorage.removeItem(
      `${MAXAI_AUTH_LOCAL_STORAGE_KEY_PREFIX}.${email}.roles`,
    );
    localStorage.removeItem('${PREF}.email');
  }

  window.dispatchEvent(new CustomEvent('signOut'));
};
