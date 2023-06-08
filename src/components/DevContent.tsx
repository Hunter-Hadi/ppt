import { Box } from '@mui/material';
// import { Theme } from '@mui/material/styles';
// import { SxProps } from '@mui/system';
import React, { FC, ReactNode } from 'react';

import { getLocalStorage } from '@/utils/localStorage';

// TODO 临时方案
export const isWhiteListUser = (email?: string) => {
  const ALLOW_EMAIL_LIST = [
    // 内部
    'huangsong@simplylab.xyz',
    'chenyang@simplylab.xyz',
    'xiang.xu@simplylab.xyz',
    'zhujing@simplylab.xyz',
    'liuxianhui@simplylab.xyz',
    'test1@simplylab.xyz',
    'z@simplylab.xyz',
    'zhiyang.chen@simplylab.xyz',
    'zhoule.zheng@simplylab.xyz',
    'ruibin@simplylab.xyz',
    'wangxingwang@simplylab.xyz',
    'huang.test@simplylab.xyz',
    'test1.st@simplylab.xyz',
    // 外部
  ];
  const userEmail = email || getLocalStorage('email');
  if (!userEmail) {
    return false;
  }
  return ALLOW_EMAIL_LIST.includes(userEmail.replace(/["']/g, ''));
};

const DevContent: FC<{
  children?: ReactNode;
  // sx?: SxProps<Theme>;
  component?: ReactNode;
  allowEmail?: boolean;
}> = ({ allowEmail, children, component }) => {
  const isDev = process.env.NEXT_PUBLIC_ENV === 'dev';
  const isAllowUser = allowEmail === true && isWhiteListUser();
  const renderNullDom = () => {
    if (component) {
      return <Box>{component}</Box>;
    }
    return null;
  };
  return <>{isAllowUser || isDev ? children : renderNullDom()}</>;
};

export default DevContent;
