import { useState } from 'react';

import { IPromptVariable } from '../types';

async function postMessagePromise<T>(
  win,
  message,
  targetOrigin,
  timeOut = 5000,
) {
  return new Promise<T>((resolve, reject) => {
    const taskId = Math.random().toString(36).slice(2);
    // 添加消息监听器
    const listener = (event) => {
      if (
        event.data.id === 'USECHATGPT_WEB_INJECT_RESPONSE' &&
        event.data.taskId === taskId
      ) {
        // 解除消息监听器
        win.removeEventListener('message', listener);
        console.log('useInjectShortCutsRunTime RESPONSE', event.data?.data);
        resolve(event.data?.data || event.data);
      }
    };
    // 添加消息监听器
    win.addEventListener('message', listener);
    // 发送消息
    win.postMessage(
      {
        ...message,
        taskId,
        id: 'USECHATGPT_WEB_INJECT',
      },
      targetOrigin,
    );
    // 处理发送超时
    setTimeout(() => {
      win.removeEventListener('message', listener);
      reject(new Error('post message timeout!'));
    }, timeOut);
  });
}

export const useRunThisPromptV2 = () => {
  const [running, setRunning] = useState(false);
  const ping = async () => {
    const result = await postMessagePromise<{ success?: boolean }>(
      window,
      { type: 'ping' },
      '*',
    );
    return result?.success === true;
  };
  const sendShortCuts = async (actions: any[]) => {
    const result = await postMessagePromise<{ success?: boolean }>(
      window,
      { type: 'runShortCutActions', data: { actions } },
      '*',
      5 * 60 * 1000,
    );
    return result?.success === true;
  };
  const runShortCuts = async (actions: any[]) => {
    try {
      if (await ping()) {
        // hacker fix
        // remove when release extension v1.0.3
        const sidebarEl = document.querySelector('#USE_CHAT_GPT_AI_ROOT');
        if (sidebarEl && !sidebarEl.classList.contains('open')) {
          // add class open
          sidebarEl.classList.remove('close');
          sidebarEl.classList.add('open');
        }

        setRunning(true);
        await sendShortCuts(actions);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setRunning(false);
    }
  };
  const runThisPrompt = async (
    template: string,
    parameters: any,
    liveCrawlingVariable?: IPromptVariable,
  ) => {
    // 判断是否需要联网
    let actions: any[] = [];
    let needBrowsing = false;
    if (liveCrawlingVariable) {
      needBrowsing = true;
      // 替换参数
      template = template.replaceAll(
        `{{${liveCrawlingVariable.name}}}`,
        '{{PAGE_CONTENT}}',
      );
    }
    if (needBrowsing) {
      actions = [
        {
          type: 'URL',
          parameters: {
            URLActionURL: parameters.PROMPT,
          },
        },
        {
          type: 'GET_CONTENTS_OF_URL',
          parameters: {},
        },
        {
          type: 'SET_VARIABLE',
          parameters: {
            VariableName: 'PAGE_CONTENT',
          },
        },
        {
          type: 'RENDER_CHATGPT_PROMPT',
          parameters: {
            template: template,
          },
        },
        {
          type: 'ASK_CHATGPT',
          parameters: {},
        },
      ];
    } else {
      actions = [
        {
          type: 'RENDER_CHATGPT_PROMPT',
          parameters: {
            template: template,
          },
        },
        {
          type: 'ASK_CHATGPT',
          parameters: {},
        },
      ];
    }
    await runShortCuts(actions);
  };
  return {
    runThisPrompt,
    running,
  };
};
