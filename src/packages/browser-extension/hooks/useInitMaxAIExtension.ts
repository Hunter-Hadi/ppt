import { useCallback, useEffect, useRef } from 'react';
import { useSetRecoilState } from 'recoil';

import { CHECKED_MAXAI_EXTENSION_TIME_LIMIT } from '../constants';
import { MaxAIBrowserExtensionAtom } from '../store';
import { getMaxAIExtensionRoot } from '../utils';

/**
 * 初始化 项目中 插件相关的状态
 */
const useInitMaxAIExtension = () => {
  const timer = useRef<number | null>(null);
  const now = useRef(Date.now());
  const setExtensionState = useSetRecoilState(MaxAIBrowserExtensionAtom);

  const pollingChecked = useCallback(() => {
    const maxAIExtensionRoot = getMaxAIExtensionRoot();

    if (maxAIExtensionRoot) {
      const extensionVersion = maxAIExtensionRoot.getAttribute('data-version');
      setExtensionState({
        loaded: true,
        hasExtension: true,
        extensionVersion,
      });
    } else {
      if (Date.now() - now.current > CHECKED_MAXAI_EXTENSION_TIME_LIMIT) {
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

export default useInitMaxAIExtension;
