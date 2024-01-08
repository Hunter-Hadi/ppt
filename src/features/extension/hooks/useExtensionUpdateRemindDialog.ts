import { useCallback } from 'react';
import { useRecoilState } from 'recoil';

import { ExtensionUpdateRemindDialogState } from '@/features/extension/store';

import { getMaxAIExtensionVersion } from '../utils';

const useExtensionUpdateRemindDialogState = () => {
  const [
    extensionUpdateRemindDialogState,
    setExtensionUpdateRemindDialogState,
  ] = useRecoilState(ExtensionUpdateRemindDialogState);

  // 判断当前浏览器安装的插件是否 大于要求的版本号
  const isExtensionVersionGreaterThanRequiredVersion = useCallback(
    (requiredVersion: string) => {
      const currentVersion = getMaxAIExtensionVersion() || '0';
      const currentVersionStr = Number(currentVersion.replace(/\./g, ''));
      const requiredVersionStr = Number(requiredVersion.replace(/\./g, ''));

      return currentVersionStr > requiredVersionStr;
    },
    [],
  );

  const openUpdateRemindDialog = useCallback(() => {
    setExtensionUpdateRemindDialogState({
      show: true,
    });
  }, []);

  return {
    show: extensionUpdateRemindDialogState.show,
    setExtensionUpdateRemindDialogState,
    openUpdateRemindDialog,
    isExtensionVersionGreaterThanRequiredVersion,
  };
};

export default useExtensionUpdateRemindDialogState;
