import { removeLocaleInPathname } from '@/i18n/utils';

export const isTargetTestPathname = (
  pathname: string,
  targetPathname: string,
) => {
  return (
    pathname === targetPathname ||
    removeLocaleInPathname(pathname) === targetPathname
  );
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
