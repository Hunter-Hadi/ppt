import { useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { MaxAIBrowserExtensionAtom } from '../store';
import { getMaxAIExtensionRoot } from '../utils';

const useCheckMaxAIExtension = (autoCheck = false) => {
  const [maxAIBrowserExtension, setMaxAIBrowserExtension] = useRecoilState(
    MaxAIBrowserExtensionAtom,
  );

  const check = () => {
    const maxAIExtensionRoot = getMaxAIExtensionRoot();
    if (maxAIExtensionRoot) {
      const extensionVersion = maxAIExtensionRoot.getAttribute('data-version');
      setMaxAIBrowserExtension({
        loaded: true,
        hasExtension: true,
        extensionVersion,
      });
    }
    return !!maxAIExtensionRoot;
  };

  useEffect(() => {
    autoCheck && check();
  }, [autoCheck]);

  return {
    ...maxAIBrowserExtension,
    check,
  };
};

export default useCheckMaxAIExtension;
