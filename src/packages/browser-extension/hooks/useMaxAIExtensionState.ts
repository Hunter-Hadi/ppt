import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { useExtensionDetectionAlert } from '../components/ExtensionDetectionAlert'
import { MaxAIBrowserExtensionAtom } from '../store'
import { getMaxAIExtensionRoot } from '../utils'

const useMaxAIExtensionState = (autoCheck = false) => {
  const [maxAIBrowserExtension, setMaxAIBrowserExtension] = useRecoilState(
    MaxAIBrowserExtensionAtom,
  )
  const { openExtensionInstallAlert } = useExtensionDetectionAlert()

  const check = (openAlertWhenNotExtension = false) => {
    const maxAIExtensionRoot = getMaxAIExtensionRoot()
    if (maxAIExtensionRoot) {
      const extensionVersion = maxAIExtensionRoot.getAttribute('data-version')
      setMaxAIBrowserExtension({
        loaded: true,
        hasExtension: true,
        extensionVersion,
      })
    } else {
      if (openAlertWhenNotExtension) {
        openExtensionInstallAlert()
      }
    }
    return !!maxAIExtensionRoot
  }

  useEffect(() => {
    autoCheck && check()
  }, [autoCheck])

  return {
    ...maxAIBrowserExtension,
    check,
  }
}

export default useMaxAIExtensionState
