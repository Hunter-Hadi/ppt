import { MAXAI_EXTENSION_ROOT_ID } from '../constants';

export const getMaxAIExtensionRoot = () => {
  return document.getElementById(MAXAI_EXTENSION_ROOT_ID);
};

export const getMaxAIExtensionVersion = () => {
  const maxAIExtensionRoot = getMaxAIExtensionRoot();
  return maxAIExtensionRoot?.getAttribute('data-version');
};
