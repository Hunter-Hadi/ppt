import { useRouter } from 'next/router';
import { useMemo } from 'react';

import { EXTENSION_SHARE_TRACKER_LINK } from '@/global_constants';

const DEFAULT_APP_HEADER_TOPBAR = 'topbar';

const useInstallChromeExtensionLink = (isTopbar = false) => {
  const { query, pathname, isReady } = useRouter();
  const prefix = EXTENSION_SHARE_TRACKER_LINK;
  const installChromeExtensionLink = useMemo(() => {
    let defaultRef =
      (isTopbar ? DEFAULT_APP_HEADER_TOPBAR : '') +
      pathname.replace(/\//g, '_');

    if (defaultRef[0] === '_') {
      defaultRef = defaultRef.slice(1);
    }

    if (pathname === '/partner-referral') {
      return `${prefix}?ref=${query.ref || defaultRef}`;
    } else if (pathname.startsWith('/prompts')) {
      return `${prefix}?ref=${query.ref || defaultRef}`;
    } else {
      return `${prefix}?ref=${defaultRef}`;
    }
  }, [query.ref, pathname, isTopbar, prefix]);
  return {
    installChromeExtensionLink,
    loading: !isReady,
  };
};

export { useInstallChromeExtensionLink };
