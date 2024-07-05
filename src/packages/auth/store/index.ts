import { atom } from 'recoil';

import { IUserProfile, MaxAIAuthTokensType } from '@/packages/auth/types';

export const UserProfileState = atom<{
  loading: boolean;
  user: IUserProfile | null;
}>({
  key: 'UserProfileStateKey',
  default: {
    loading: false,
    user: null,
  },
});

export const ConnectMaxAIAccountState = atom<{
  isLogin: boolean;
  loading: boolean;
  error: string | null;
  tokens: MaxAIAuthTokensType | null;
}>({
  key: 'ConnectMaxAIAccountStateKey',
  default: {
    isLogin: false,
    loading: false,
    error: null,
    tokens: null,
  },
});
