import { pull } from 'lodash-es';

import { removeLocaleInPathname } from '@/i18n/utils';

export const isTargetTestPathname = (
  pathname: string,
  targetPathname: string | string[],
) => {
  if (Array.isArray(targetPathname)) {
    return targetPathname.some(
      (path) => removeLocaleInPathname(pathname) === path,
    );
  } else {
    return (
      pathname === targetPathname ||
      removeLocaleInPathname(pathname) === targetPathname
    );
  }
};

export const assignVariantGroup = <T = any>(
  userFlag: string,
  variantGroup: T[],
) => {
  function simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
  }
  function assignGroup(userId) {
    const numGroups = variantGroup.length;
    const hash = simpleHash(userId);
    return hash % numGroups;
  }

  const groupIndex = assignGroup(userFlag);

  const variant = variantGroup[groupIndex];

  return variant;
};
export const getFeaturesContentSearchPosition = (searchIndex = 3) => {
  const list = [
    'Summary assistant',
    'Reading assistant',
    'Search assistant',
    'Writing assistant',
    'Drafting assistant',
    'Email assistant',
    'Translation assistant',
    'Browser extension',
  ];

  // 移除 'Search assistant'
  pull(list, 'Search assistant');

  // 在指定位置插入 'Search assistant'
  list.splice(searchIndex - 1, 0, 'Search assistant');

  return list;
};
