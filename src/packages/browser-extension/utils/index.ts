import {
  MAXAI_EXTENSION_ROOT_ID,
  MAXAI_SIDEBAR_WRAPPER_ID,
} from '@/packages/browser-extension/constants'

export const getMaxAIExtensionRoot = () => {
  return document.getElementById(MAXAI_EXTENSION_ROOT_ID)
}

export const getMaxAIExtensionVersion = () => {
  const maxAIExtensionRoot = getMaxAIExtensionRoot()
  return maxAIExtensionRoot?.getAttribute('data-version')
}

export const getMaxAISidebarRootElement = (): HTMLElement | undefined => {
  return getMaxAIExtensionRoot()?.shadowRoot?.querySelector(
    `#${MAXAI_SIDEBAR_WRAPPER_ID}`,
  ) as HTMLElement
}
