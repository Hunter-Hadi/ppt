import { atom } from 'recoil';

export const userInviteState = atom({
  key: 'userInviteState',
  default: {
    inviteCode: '',
  },
});
