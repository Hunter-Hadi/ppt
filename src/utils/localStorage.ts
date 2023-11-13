import { ATOM_PERSIST_CACHE_LOCAL_STORAGE_SAVE_KEY } from '@/recoil/constants';
import { FINGER_PRINT_LOCAL_STORAGE_SAVE_KEY } from '@/utils/fingerPrint';

export type ILocalStorageKeyType =
  | 'newNotificationTime'
  | 'pushBrowserNotifyHours'
  | 'email'
  | 'isLogin'
  | 'GaContent'
  | 'timediff'
  | 'atom_persist_cache'
  | 'GOOGLE_SIGN_UP_DATA'
  | 'TEMP_USER_SUBMIT_COUPON_SURVEY'
  | 'TEMP_CHROME_EXTENSION_INSTALL_DATE'
  | 'CHART_TIME_SELECT_SAVE_DATA'
  | typeof FINGER_PRINT_LOCAL_STORAGE_SAVE_KEY
  //记录是否在插件保存过 useid
  | 'EXTENSION_SAVED_USER_ID_FLAG'
  | typeof ATOM_PERSIST_CACHE_LOCAL_STORAGE_SAVE_KEY;
export const setLocalStorage = (
  key: ILocalStorageKeyType,
  value: unknown,
  isString = false,
): void => {
  const needSaveSessions = ['GOOGLE_SIGN_UP_DATA'].includes(key);
  if (typeof localStorage === 'undefined' || typeof window === 'undefined') {
    return;
  }
  if (isString) {
    localStorage.setItem(key, String(value));
    if (needSaveSessions) {
      sessionStorage.setItem(key, String(value));
    }
  } else {
    localStorage.setItem(key, JSON.stringify(value));
    if (needSaveSessions) {
      sessionStorage.setItem(key, JSON.stringify(value));
    }
  }
};

export const getLocalStorage = (key: ILocalStorageKeyType): string | null => {
  if (typeof localStorage === 'undefined') return null;
  const needSaveSessions = ['GOOGLE_SIGN_UP_DATA'].includes(key);
  if (needSaveSessions && sessionStorage.getItem(key)) {
    return sessionStorage.getItem(key);
  }
  return localStorage.getItem(key);
};

export const removeLocalStorage = (key: ILocalStorageKeyType): void => {
  if (typeof localStorage === 'undefined') return;
  const needSaveSessions = ['GOOGLE_SIGN_UP_DATA'].includes(key);
  if (needSaveSessions && sessionStorage.getItem(key)) {
    sessionStorage.removeItem(key);
  }
  localStorage.removeItem(key);
};
