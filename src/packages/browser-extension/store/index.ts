import { atom } from 'recoil';

export const MaxAIBrowserExtensionAtom = atom<{
  loaded: boolean;
  hasExtension: boolean;
  extensionVersion?: string | null;
}>({
  key: 'MaxAIBrowserExtensionAtom',
  default: {
    loaded: false,
    hasExtension: false,
    extensionVersion: null,
  },
});
