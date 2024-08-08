import { useCallback, useEffect, useRef } from 'react'
import { useRecoilState } from 'recoil'

import { MAXAI_EXTENSION_ROOT_ID } from '@/features/extension/constant'
import { ExtensionState } from '@/features/extension/store'

const useCheckExtension = (autoCheck = false) => {
  const timer = useRef<number | null>(null)
  const [extensionState, setExtensionState] = useRecoilState(ExtensionState)

  const getExtensionRoot = useCallback(() => {
    return document.getElementById(MAXAI_EXTENSION_ROOT_ID)
  }, [])

  const check = () => {
    const hasExtension = !!getExtensionRoot()
    if (hasExtension) {
      setExtensionState({ loaded: true, hasExtension })
    }
    return hasExtension
  }

  const pollingCheck = useCallback(() => {
    if (timer.current) window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => {
      if (!check()) {
        pollingCheck()
      }
    }, 1000)
  }, [])

  useEffect(() => {
    autoCheck && check()
  }, [autoCheck])

  return {
    loaded: extensionState.loaded,
    hasExtension: extensionState.hasExtension,
    extensionState,
    check,
    pollingCheck,
  }
}

export default useCheckExtension
