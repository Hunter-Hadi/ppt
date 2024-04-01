import { useRouter } from 'next/router';
import { useCallback } from 'react';
import { UrlObject } from 'url';

import { fixHrefWithLocale } from '@/i18n/utils';

// copy from next.js
interface TransitionOptions {
  shallow?: boolean;
  locale?: string | false;
  scroll?: boolean;
  unstable_skipClientCache?: boolean;
}

// copy from next.js
type Url = UrlObject | string;

const useRouterToWithLocale = () => {
  const router = useRouter();
  const query = router.query;

  const routerToWithLocale = useCallback(
    (url: Url, asParams?: Url, options?: TransitionOptions) => {
      const locale = query.locale as string;

      let coverOptions = { ...options };

      const urlIsString = typeof url === 'string';

      let fixedUrl = urlIsString ? url : url.pathname;
      if (urlIsString) {
        if (fixedUrl && fixedUrl.startsWith('/')) {
          fixedUrl = fixHrefWithLocale(fixedUrl, locale);
        }
      } else {
        let fixedUrl = url.pathname;

        if (fixedUrl && fixedUrl.startsWith('/')) {
          fixedUrl = fixHrefWithLocale(fixedUrl, locale);
        }
      }

      const fixedUrlObject = urlIsString
        ? (fixedUrl as string)
        : { ...url, pathname: fixedUrl };

      if (
        typeof asParams === 'object' &&
        asParams.query &&
        Object.keys(asParams).length > 0
      ) {
        coverOptions = {
          ...asParams,
          ...coverOptions,
        };
      }

      router.push(fixedUrlObject, fixedUrlObject, coverOptions);
    },
    [query],
  );

  return routerToWithLocale;
};

export default useRouterToWithLocale;
