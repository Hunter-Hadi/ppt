import React, { FC } from 'react'

import SnackbarProvider from '@/packages/base-ui/components/Snackbar/SnackbarProvider'
import ExtensionDetectionAlert from '@/packages/browser-extension/components/ExtensionDetectionAlert'
import MaxAIAlertModals from '@/packages/common/components/MaxAIAlertModals'
import MaxAICommonInit from '@/packages/common/components/MaxAICommonInit'

interface IMaxAICommonRootProps {
  children?: React.ReactNode | undefined
}

const MaxAICommonRoot: FC<IMaxAICommonRootProps> = ({ children }) => {
  return (
    <>
      <SnackbarProvider>
        <MaxAICommonInit />
        {children}
        <MaxAIAlertModals />
        <ExtensionDetectionAlert />
      </SnackbarProvider>
    </>
  )
}

export default MaxAICommonRoot
