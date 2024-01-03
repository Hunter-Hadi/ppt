import { MAXAI_EXTENSION_ROOT_ID } from '../constant';

export const getMaxAIExtensionVersion = () => {
  const shadowElement = document.getElementById(MAXAI_EXTENSION_ROOT_ID);
  return shadowElement?.dataset?.version;
};
