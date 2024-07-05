import React, { FC } from 'react';

import ExtensionDetectionAlert from '@/packages/browser-extension/components/ExtensionDetectionAlert';
import useInitMaxAIExtension from '@/packages/browser-extension/hooks/useInitMaxAIExtension';

interface IMaxAICommonRootProps {
  children?: React.ReactNode | undefined;
}

const MaxAICommonRoot: FC<IMaxAICommonRootProps> = ({ children }) => {
  useInitMaxAIExtension();
  return (
    <>
      {children}
      <ExtensionDetectionAlert />
    </>
  );
};

export default MaxAICommonRoot;
