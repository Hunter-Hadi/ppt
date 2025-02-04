import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { EXTENSION_SHARE_TRACKER_LINK } from '@/global_constants';

const DEFAULT_APP_HEADER_TOPBAR = 'topbar';

const useInstallChromeExtensionLink = (isTopbar = false) => {
  const { query, pathname, isReady } = useRouter();

  const ref = useMemo(() => {
    let defaultRef =
      (isTopbar ? DEFAULT_APP_HEADER_TOPBAR : '') +
      pathname.replace(/\//g, '_');

    if (defaultRef[0] === '_') {
      defaultRef = defaultRef.slice(1);
    }

    return query.ref ?? defaultRef;
  }, [query.ref, isTopbar, pathname]);

  const installChromeExtensionLink = useMemo(() => {
    // 由于 install Link 都改为 chrome store 的链接了，所以不需要加 ref

    return `${EXTENSION_SHARE_TRACKER_LINK}`;
    // return `${EXTENSION_SHARE_TRACKER_LINK}?ref=${ref}`;
  }, []);
  return {
    ref,
    installChromeExtensionLink,
    loading: !isReady,
  };
};

export { useInstallChromeExtensionLink };
