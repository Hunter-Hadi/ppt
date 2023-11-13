import { atomWithPersistence } from '@/recoil/utils';

export const PreferredLanguageAtom = atomWithPersistence({
  key: 'PreferredLanguageAtom',
  default: 'en',
});
