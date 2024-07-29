import axios from 'axios'

import {
  getBrowserAgent,
  getBrowserVersion,
} from '@/features/common/utils/dataHelper/browserInfoHelper'
import { aesJsonEncrypt } from '@/features/common/utils/dataHelper/encryptionHelper'
import { API_HOST } from '@/global_constants'

export type botUuid =
  | '956022cb-e2e9-42b4-aff2-03bd3edaa8f5' // waitlist survey and get started
  | '5bddd049-128a-497f-a26a-343849140779' // use chatgpt uninstall larkbot
  | 'dd385931-45f4-4de1-8e48-8145561b0f9d' // use chatgpt cmd + j not working larkbot

export const sendLarkBotMessage = (
  title: string,
  message = '',
  attr?: { uuid?: botUuid; [key: string]: any },
) => {
  return axios
    .post(API_HOST + '/app/send_notification', {
      env: process.env.NEXT_PUBLIC_ENV,
      title: `UseChatGPT: ${title}`,
      message,
      ...attr,
    })
    .then()
    .catch()
}

const APP_NOTIFICATION_HOST = 'https://api.extensions-hub.com'

export const sendNotification = (
  type: string,
  data: Record<string, string>,
) => {
  const msg = {
    env: process.env.NEXT_PUBLIC_ENV,
    type: `MAXAI: ${type}`,
    app: 'MAXAI_WWW',
    data,
    // 下面为可选参数
    browser: getBrowserAgent().toLocaleLowerCase(),
    browser_version: getBrowserVersion(),
    platform: navigator.platform,
    languages: navigator.languages,
  }

  console.log(`sendNotification payload`, msg)

  return axios
    .post(APP_NOTIFICATION_HOST + '/extensionhub/send_notification', {
      msg: aesJsonEncrypt(msg),
    })
    .then()
    .catch()
}
