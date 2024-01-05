import { useRecoilState } from 'recoil';

import { APP_HEADER_ID } from '@/app_layout/AppHeader/index';
import { AppHeaderHeightState } from '@/store';

const useAppHeaderState = () => {
  const [appHeaderHeight, setAppHeaderHeight] =
    useRecoilState(AppHeaderHeightState);

  const updateAppHeaderHeight = () => {
    const headerElement = document.getElementById(APP_HEADER_ID);
    if (headerElement) {
      setAppHeaderHeight(headerElement.offsetHeight);
    }
  };

  return {
    appHeaderHeight,
    updateAppHeaderHeight,
  };
};

export default useAppHeaderState;
