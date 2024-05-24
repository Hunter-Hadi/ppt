import { useRecoilState } from 'recoil';

import { VideoPopupAtom } from '../store';

const useVideoPopupController = () => {
  const [videoPopupState, setVideoPopupState] = useRecoilState(VideoPopupAtom);

  const openVideoPopup = (videoSrc: string, autoplay = false) => {
    setVideoPopupState((preState) => ({
      ...preState,
      videoSrc: videoSrc,
      open: true,
      autoplay,
    }));
  };

  const closeVideoPopup = () => {
    setVideoPopupState({
      videoSrc: '',
      open: false,
    });
  };

  return {
    popupState: videoPopupState,
    open: videoPopupState.open,
    videoSrc: videoPopupState.videoSrc,
    openVideoPopup,
    closeVideoPopup,
  };
};

export default useVideoPopupController;
