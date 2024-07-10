import React, { FC } from 'react';

import useMaxAIExtensionState from '@/packages/browser-extension/hooks/useMaxAIExtensionState';

interface IMaxAIExtensionWrapperProps {
  feedback?: React.ReactNode | null | ((loading: boolean) => React.ReactNode);
  children?: React.ReactNode;
}

const MaxAIExtensionWrapper: FC<IMaxAIExtensionWrapperProps> = ({
  feedback,
  children,
}) => {
  const { hasExtension, loaded } = useMaxAIExtensionState();

  if (!hasExtension) {
    if (typeof feedback === 'function') {
      return <>{feedback(!loaded)}</>;
    }

    return feedback ? <>{feedback}</> : null;
  }

  return <>{children}</>;
};

export default MaxAIExtensionWrapper;
