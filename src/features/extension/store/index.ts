import { atom } from 'recoil';

export const ExtensionUpdateRemindDialogState = atom<{
  show: boolean;
}>({
  key: 'ExtensionUpdateRemindDialogState',
  default: {
    show: false,
  },
});

export const ExtensionState = atom<{
  loaded: boolean;
  hasExtension: boolean;
}>({
  key: 'ExtensionState',
  default: {
    loaded: false,
    hasExtension: false,
  },
});

export const ChromeExtensionDetectorState = atom<{
  checkIsInstalled: () => boolean;
}>({
  key: 'ChromeExtensionDetectorState',
  default: {
    checkIsInstalled: () => {
      return false;
    },
  },
});
