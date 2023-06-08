import { useRouter } from 'next/router';
import { useMemo } from 'react';

const DEFAULT_APP_HEADER_TOPBAR = 'topbar';

const useInstallChromeExtensionLink = (isTopbar = false) => {
  const { query, pathname, isReady } = useRouter();
  const prefix = 'https://api.maxai.me/app';
  const installChromeExtensionLink = useMemo(() => {
    let defaultRef =
      (isTopbar ? DEFAULT_APP_HEADER_TOPBAR : '') +
      pathname.replace(/\//g, '_');

    if (defaultRef[0] === '_') {
      defaultRef = defaultRef.slice(1);
    }

    if (pathname === '/partner-referral') {
      return `${prefix}/install?ref=${query.ref || defaultRef}`;
    } else if (pathname.startsWith('/prompts')) {
      return `${prefix}/install?ref=${query.ref || defaultRef}`;
    } else {
      return `${prefix}/install?ref=${defaultRef}`;
    }
  }, [query.ref, pathname, isTopbar]);
  return {
    installChromeExtensionLink,
    loading: !isReady,
  };
};
export { useInstallChromeExtensionLink };
