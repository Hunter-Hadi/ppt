import { atom } from 'recoil';

import {
  IUserProfile,
  MaxAIAuthTokensType,
} from '@/features/common-auth/types';

export const UserProfileState = atom<{
  loading: boolean;
  user: IUserProfile | null;
}>({
  key: 'UserProfileStateKey',
  default: {
    loading: true,
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
