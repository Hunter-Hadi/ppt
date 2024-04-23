import { isString } from 'lodash-es';
import { useRouter } from 'next/router';
import { useMemo } from 'react';

const usePartnersInfo = () => {
  const router = useRouter();

  // partners 名称
  const name = useMemo(
    () => router.query?.name as string,
    [router.query?.name],
  );

  // 需要记录的 ref 值，如果没有则使用 name
  const propRef = useMemo(
    () => (router.query?.propRef as string) ?? name,
    [router.query?.propRef, name],
  );

  // changelog 链接
  const changelogLink = useMemo(() => {
    if (router.query?.changelogLink && isString(router.query?.changelogLink)) {
      return decodeURIComponent(
        'https://translate.google.com/?sl=auto&tl=zh-CN&text=Changelogs&op=translate',
      );
    } else {
      return '';
    }
  }, [router.query?.changelogLink]);

  const changelogText = useMemo(() => {
    if (router.query?.changelogText && isString(router.query?.changelogText)) {
      return router.query.changelogText;
    } else {
      return 'Click for Changelogs.';
    }
  }, [router.query?.changelogText]);

  return {
    name,
    propRef,
    changelogLink,
    changelogText,
  };
};

export default usePartnersInfo;
