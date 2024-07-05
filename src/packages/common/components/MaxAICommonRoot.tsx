import React, { FC } from 'react';

import ExtensionDetectionAlert from '@/packages/browser-extension/components/ExtensionDetectionAlert';
import MaxAICommonInit from '@/packages/common/components/MaxAICommonInit';

interface IMaxAICommonRootProps {
  children?: React.ReactNode | undefined;
}

const MaxAICommonRoot: FC<IMaxAICommonRootProps> = ({ children }) => {
  return (
    <>
      <MaxAICommonInit />
      {children}
      <ExtensionDetectionAlert />
    </>
  );
};

export default MaxAICommonRoot;
