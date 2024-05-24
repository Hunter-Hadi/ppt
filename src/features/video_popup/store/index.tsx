import { atom } from 'recoil';

interface IVideoPopupAtom {
  open: boolean;
  videoSrc: string;
  autoplay?: boolean;
}

export const VideoPopupAtom = atom<IVideoPopupAtom>({
  key: 'VideoPopupAtom',
  default: {
    open: false,
    videoSrc: '',
  },
});
