import { useCallback, useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';

import {
  CHECKED_EXTENSION_TIME_LIMIT,
  MAXAI_EXTENSION_ROOT_ID,
} from '@/features/extension/constant';
import { ExtensionState } from '@/features/extension/store';

const useInitExtensionStatus = () => {
  const timer = useRef<number | null>(null);
  const now = useRef(Date.now());
  const setExtensionState = useSetRecoilState(ExtensionState);

  const getExtensionRoot = useCallback(() => {
    return document.getElementById(MAXAI_EXTENSION_ROOT_ID);
  }, []);

  const pollingChecked = useCallback(() => {
    const hasExtension = !!getExtensionRoot();

    if (hasExtension) {
      setExtensionState({
        loaded: true,
        hasExtension: true,
      });
    } else {
      if (Date.now() - now.current > CHECKED_EXTENSION_TIME_LIMIT) {
        setExtensionState({
          loaded: true,
          hasExtension: false,
        });
      } else {
        timer.current = window.setTimeout(pollingChecked, 500);
      }
    }
  }, []);

  useEffect(() => {
    pollingChecked();

    return () => {
      timer.current && window.clearTimeout(timer.current);
    };
  }, []);
};

export default useInitExtensionStatus;
