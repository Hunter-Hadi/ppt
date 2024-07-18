import { useCallback } from 'react'
import { atom, useRecoilState } from 'recoil'

const ExtensionInstallAlertOpenAtom = atom({
  key: 'ExtensionInstallAlertOpenAtom',
  default: false,
})

const ExtensionUpgradeAlertOpenAtom = atom({
  key: 'ExtensionUpgradeAlertOpenAtom',
  default: false,
})

const useExtensionDetectionAlert = () => {
  const [installAlertOpen, setInstallAlertOpen] = useRecoilState(
    ExtensionInstallAlertOpenAtom,
  )
  const [upgradeAlertOpen, setUpgradeAlertOpen] = useRecoilState(
    ExtensionUpgradeAlertOpenAtom,
  )

  const openExtensionInstallAlert = useCallback(() => {
    setInstallAlertOpen(true)
  }, [])

  const closeExtensionInstallAlert = useCallback(() => {
    setInstallAlertOpen(false)
  }, [])

  const openExtensionUpgradeAlert = useCallback(() => {
    setUpgradeAlertOpen(true)
  }, [])

  const closeExtensionUpgradeAlert = useCallback(() => {
    setUpgradeAlertOpen(false)
  }, [])

  return {
    // 安装插件的 alert
    installAlertOpen,
    openExtensionInstallAlert,
    closeExtensionInstallAlert,

    // 升级插件的 alert
    upgradeAlertOpen,
    openExtensionUpgradeAlert,
    closeExtensionUpgradeAlert,
  }
}

export default useExtensionDetectionAlert
