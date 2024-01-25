import { atom } from 'recoil';

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
