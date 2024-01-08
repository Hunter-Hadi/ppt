import { atom } from 'recoil';

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

export const AppState = atom<{
  globalLoading: boolean;
}>({
  key: 'AppState',
  default: {
    globalLoading: false,
  },
});

export const AppHeaderHeightState = atom<number>({
  key: 'AppHeaderHeightState',
  default: 0,
});
