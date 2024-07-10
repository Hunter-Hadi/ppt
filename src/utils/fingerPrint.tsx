import FingerprintJS from '@fingerprintjs/fingerprintjs'

import { getLocalStorage, setLocalStorage } from '@/utils/localStorage'

export const FINGER_PRINT_LOCAL_STORAGE_SAVE_KEY = 'x_fid'

export const initFingerPrint = (): Promise<string | undefined> => {
  return new Promise((resolve) => {
    if (typeof window !== 'undefined') {
      try {
        const fpPromise = FingerprintJS.load()
        fpPromise.then((fp) => {
          fp.get().then((result) => {
            setLocalStorage(
              FINGER_PRINT_LOCAL_STORAGE_SAVE_KEY,
              result.visitorId,
            )
            resolve(result.visitorId)
          })
        })
      } catch (e) {
        console.log('initFingerPrint error: \t', e)
        resolve(undefined)
      }
    }
  })
}
export const getFingerPrint = () => {
  const fingerPrint = getLocalStorage(FINGER_PRINT_LOCAL_STORAGE_SAVE_KEY)
  if (!fingerPrint) {
    initFingerPrint()
    return ''
  }
  return fingerPrint.replace(/"/g, '')
}
export const getFingerPrintAsync = async () => {
  const fingerPrint = getLocalStorage(FINGER_PRINT_LOCAL_STORAGE_SAVE_KEY)
  if (!fingerPrint) {
    return await initFingerPrint()
  }
  return fingerPrint.replace(/"/g, '')
}
