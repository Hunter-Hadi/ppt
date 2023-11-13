import { atom, AtomOptions } from 'recoil';

import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';

import { ATOM_PERSIST_CACHE_LOCAL_STORAGE_SAVE_KEY } from './constants';

export type atomPersistCacheMap<T> = {
  [key: string]: T;
};
const getAtomPersistState = <T = any>(): atomPersistCacheMap<T> => {
  const atomPersistCacheString = getLocalStorage(
    ATOM_PERSIST_CACHE_LOCAL_STORAGE_SAVE_KEY,
  );
  if (atomPersistCacheString) {
    try {
      const atomLocalStorageCache: atomPersistCacheMap<T> = JSON.parse(
        atomPersistCacheString,
      );
      return atomLocalStorageCache || {};
    } catch (e) {
      console.error('parse atom persist cache error :\t', e);
      return {};
    }
  }
  return {};
};
const getAtomPersistStateByKey = <T = any>(key: string): T | undefined => {
  return getAtomPersistState<T>()[key];
};

const setAtomPersistState = <T = any>(key: string, data: T) => {
  const newState = getAtomPersistState();
  newState[key] = data;
  setLocalStorage(ATOM_PERSIST_CACHE_LOCAL_STORAGE_SAVE_KEY, newState);
};

export const atomWithPersistence = <T>(
  options: AtomOptions<T> & { default: T },
) => {
  options.default = getAtomPersistStateByKey(options.key) || options.default;

  const atomEffect = [
    ({ onSet }) => {
      onSet((newValue) => {
        console.log(` atomWithPersistence onSet`, options, newValue);
        setAtomPersistState(options.key, newValue);
      });
    },
    ...(options?.effects || []),
  ];

  const atomInstance = atom<T>({
    ...options,
    effects: atomEffect,
  });

  return atomInstance;
};
