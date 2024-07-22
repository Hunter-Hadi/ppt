import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

const DesktopBrowsersAlertOpenAtom = atom({
  key: 'DesktopBrowsersAlertOpenAtom',
  default: false,
})

const useMaxAIAlertModals = () => {
  const [useDesktopBrowsersAlertOpen, setUseDesktopBrowsersAlertOpen] =
    useRecoilState(DesktopBrowsersAlertOpenAtom)

  const openDesktopBrowsersAlert = useCallback(() => {
    setUseDesktopBrowsersAlertOpen(true)
  }, [])

  const closeDesktopBrowsersAlert = useCallback(() => {
    setUseDesktopBrowsersAlertOpen(false)
  }, [])

  return {
    // 提示使用pc端的 alert
    useDesktopBrowsersAlertOpen,
    openDesktopBrowsersAlert,
    closeDesktopBrowsersAlert,
  }
}

export default useMaxAIAlertModals
