import { useRecoilState } from 'recoil';

import { AppHeaderHeightState } from '@/store';

const useAppHeaderState = () => {
  const [appHeaderHeight, setAppHeaderHeight] =
    useRecoilState(AppHeaderHeightState);

  const updateAppHeaderHeight = () => {
    const headerElement = document.getElementById('app-header');
    if (headerElement) {
      setAppHeaderHeight(headerElement.offsetHeight);
    }
  };

  return {
    appHeaderHeight,
    setAppHeaderHeight,
    updateAppHeaderHeight,
  };
};

export default useAppHeaderState;
