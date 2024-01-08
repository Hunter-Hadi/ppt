import { atom } from 'recoil';

export const ExtensionUpdateRemindDialogState = atom<{
  show: boolean;
}>({
  key: 'ExtensionUpdateRemindDialogState',
  default: {
    show: false,
  },
});
