import { useSetRecoilState } from 'recoil';

import { AppState } from '@/store';

export const intervalFindHtmlElement = (
  root: HTMLElement | ShadowRoot,
  selection: string,
  interval: number,
  timeout: number,
) => {
  return new Promise<HTMLElement | undefined>((resolve) => {
    let isTimeout = false;
    const timeoutId = setTimeout(() => {
      isTimeout = true;
      resolve(undefined);
    }, timeout);
    const intervalId = setInterval(() => {
      if (!isTimeout) {
        const selectionElement = root.querySelector(selection) as HTMLElement;
        if (selectionElement) {
          clearInterval(intervalId);
          clearTimeout(timeoutId);
          resolve(selectionElement as HTMLElement);
        }
      }
    }, interval);
  });
};
export const intervalFindAllHtmlElement = (
  root: HTMLElement | ShadowRoot,
  selection: string,
  interval: number,
  timeout: number,
  filterElements?: (elements: HTMLElement[]) => HTMLElement | undefined,
) => {
  return new Promise<HTMLElement | undefined>((resolve) => {
    let isTimeout = false;
    const timeoutId = setTimeout(() => {
      isTimeout = true;
      resolve(undefined);
    }, timeout);
    const intervalId = setInterval(() => {
      if (!isTimeout) {
        const selectionElements = Array.from(
          root.querySelectorAll(selection),
        ) as HTMLElement[];
        if (filterElements) {
          const findElement = filterElements(selectionElements);
          if (findElement) {
            clearInterval(intervalId);
            clearTimeout(timeoutId);
            resolve(findElement);
          }
        } else if (selectionElements.length > 0) {
          clearInterval(intervalId);
          clearTimeout(timeoutId);
          resolve(selectionElements[0]);
        }
      }
    }, interval);
  });
};

export const useRunThisPrompt = () => {
  const setAppState = useSetRecoilState(AppState);
  const runThisPrompt = (selection: string) => {
    return new Promise(async (resolve) => {
      // setTimeOut: 5000ms
      let isTimeout = false;
      const timeout = setTimeout(() => {
        resolve({
          success: false,
          error: 'timeout',
        });
        setAppState((prev) => ({
          ...prev,
          globalLoading: false,
        }));
      }, 5000);
      const resolveValue = (value: { success: boolean; error: string }) => {
        if (!isTimeout) {
          clearTimeout(timeout);
          resolve(value);
          setAppState((prev) => ({
            ...prev,
            globalLoading: false,
          }));
        }
      };
      // find selection element
      const selectionElement = await intervalFindHtmlElement(
        document.body,
        selection,
        50,
        1000,
      );
      // 确保内部有值
      if (selectionElement && selectionElement.innerText.trim()) {
        setAppState((prev) => ({
          ...prev,
          globalLoading: true,
        }));
        try {
          // set selection
          const selection = window.getSelection();
          const range = document.createRange();
          range.selectNodeContents(selectionElement);
          selection?.removeAllRanges();
          selection?.addRange(range);
          const shadowRoot = document.getElementById(
            'USE_CHAT_GPT_AI_ROOT_Context_Menu',
          )?.shadowRoot;
          // find contextMenu click button in 2000ms
          if (shadowRoot) {
            // TODO: 现在是找button和p，后续应该直接找className
            const contextMenuButton = await Promise.race([
              intervalFindAllHtmlElement(
                shadowRoot,
                '.usechatgpt-ai__context-menu--handle-button',
                200,
                2000,
                (elements) => {
                  // 判断找到的元素是否是隐藏的
                  return elements.find((element) => {
                    return window.getComputedStyle(element).opacity !== '0';
                  });
                },
              ),
              intervalFindAllHtmlElement(
                shadowRoot,
                'button',
                50,
                2000,
                (elements) => {
                  const button = elements.find((element) =>
                    (element as HTMLButtonElement).innerText.startsWith(
                      'Use ChatGPT',
                    ),
                  );
                  if (button) {
                    if (
                      window.getComputedStyle(
                        button?.parentElement?.parentElement || button,
                      ).opacity === '0'
                    ) {
                      return undefined;
                    }
                    return button as HTMLButtonElement;
                  }
                  return undefined;
                },
              ),
              intervalFindAllHtmlElement(
                shadowRoot,
                'p',
                200,
                2000,
                (elements) => {
                  return elements.find(
                    (p) =>
                      window.getComputedStyle(p?.parentElement || p)
                        .position === 'fixed' &&
                      window.getComputedStyle(p?.parentElement || p).zIndex !==
                        '-1',
                  )?.parentElement as HTMLButtonElement;
                },
              ),
            ]);
            console.log('contextMenuButton', contextMenuButton);
            if (contextMenuButton) {
              setTimeout(() => {
                (contextMenuButton as HTMLButtonElement).click();
              }, 100);
              const contextMenuItem = await intervalFindAllHtmlElement(
                shadowRoot,
                '.floating-context-menu-item',
                50,
                2000,
                (elements) =>
                  elements.find((menuItem) =>
                    (menuItem as HTMLDivElement).innerText.startsWith(
                      'Run this prompt',
                    ),
                  ),
              );
              if (contextMenuItem) {
                (contextMenuItem as HTMLDivElement).click();
                resolveValue({
                  success: true,
                  error: '',
                });
                return;
              }
            }
          }
          resolveValue({
            success: false,
            error: 'no context menu',
          });
        } catch (e) {
          console.log('error', e);
          resolveValue({
            success: false,
            error: e?.toString() || '',
          });
        }
      } else {
        console.log('no inner text');
        resolveValue({
          success: false,
          error: 'no inner text',
        });
      }
    });
  };
  return {
    runThisPrompt,
  };
};
