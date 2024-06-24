import { atom } from 'recoil';

import { IUserProfile } from '@/features/common-auth/types';

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
