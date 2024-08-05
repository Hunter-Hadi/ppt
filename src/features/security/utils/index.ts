import AES from 'crypto-js/aes'
import Utf8 from 'crypto-js/enc-utf8'
import hmac_sha1 from 'crypto-js/hmac-sha1'
import md5 from 'crypto-js/md5'
import { sm3 } from 'sm-crypto'

import { getCurrentDomainHost } from '@/features/common/utils'
import { getBrowserUAInfo } from '@/features/common/utils/dataHelper/browserInfoHelper'
import { getClientUserId } from '@/features/track_user_interactions/utils'
import { APP_VERSION } from '@/global_constants'
import { getAccessToken } from '@/packages/auth'
import { COMMON_MAXAI_API_HOST } from '@/packages/common'

import { APP_AES_ENCRYPTION_KEY, APP_SM3_HASH_KEY } from '../constant'

export const aesJsonEncrypt = (data: any, key = APP_AES_ENCRYPTION_KEY) => {
  return AES.encrypt(JSON.stringify(data), key).toString()
}
export const md5TextEncrypt = (data: string) => {
  console.log('新版Conversation md5TextEncrypt', data)
  return md5(data).toString()
}
export const aesJsonDecrypt = (
  encryptedData: string,
  key = APP_AES_ENCRYPTION_KEY,
) => {
  const decryptedBytes = AES.decrypt(encryptedData, key)
  const decryptedData = decryptedBytes.toString(Utf8)
  try {
    return JSON.parse(decryptedData)
  } catch (e) {
    console.error(e)
    return {}
  }
}

/**
 * 将字符串转换为16进制表示
 * @param inputString - 需要转换的字符串
 * @returns 16进制表示的字符串
 */
export const convertStringToHex = (inputString: string): string => {
  let hexRepresentation = ''
  for (let i = 0; i < inputString.length; i++) {
    hexRepresentation += inputString.charCodeAt(i).toString(16)
  }
  return hexRepresentation
}
/**
 * 将16进制转换为字符串
 * @param hexString - 需要转换的16进制字符串
 * @returns 解码后的字符串
 */
export const convertHexToString = (hexString: string): string => {
  let decodedString = ''
  for (let i = 0; i < hexString.length; i += 2) {
    decodedString += String.fromCharCode(parseInt(hexString.substr(i, 2), 16))
  }
  return decodedString
}
/**
 * MaxAI API请求时间差的Key
 */
const MAXAI_API_FETCH_TIME_DIFF_SAVE_KEY =
  '4d415841495f4150495f46455443485f54494d455f444946465f534156455f4b4559'

/**
 * 获取MaxAI API请求时间差
 */
export const getMaxAIAPIFetchTimeDiff = async () => {
  const data = localStorage.getItem(
    convertHexToString(MAXAI_API_FETCH_TIME_DIFF_SAVE_KEY),
  )
  return Number(data || 0)
}

/**
 * 获取MaxAI API请求时间戳
 */
export const getMaxAIAPIFetchTimestamp = async () => {
  const timeDiff = await getMaxAIAPIFetchTimeDiff()
  return new Date().getTime() + timeDiff
}

/**
 * 设置MaxAI API请求时间差
 * @param timeDiff
 */
export const setMaxAIAPIFetchTimeDiff = async (timeDiff: number) => {
  localStorage.setItem(
    convertHexToString(MAXAI_API_FETCH_TIME_DIFF_SAVE_KEY),
    `${timeDiff}`,
  )
}

/**
 * 处理安全请求的错误
 * @param response
 */
export const securityHandleFetchErrorResponse = async (response: Response) => {
  if (response.status === 418) {
    // 如果返回401，说明token过期，可以在此处处理token过期的逻辑
    const data = await response.json()
    // 6a61335f746c735f636f6465 -> j3_tls_code
    // 313031303130313031 -> 101010101
    if (
      String(data?.data?.[convertHexToString('6a61335f746c735f636f6465')]) ===
      convertHexToString('313031303130313031')
    ) {
      const serverDate = response.headers.get('Date')
      // 超时纠正时间
      if (serverDate) {
        const systemTime = new Date().getTime()
        const serverTime = new Date(serverDate).getTime()
        const diff = serverTime - systemTime
        await setMaxAIAPIFetchTimeDiff(diff)
      }
    }
    // 101010100:   解码 headers 中的 X-Authorization失败
    // 101010101： 请求时间不在规定时间内
    // 101010102： 当前请求已经请求过一次，第二次重放请求时会触发
    // 101010103： headers 中存在必传的参数没有传递，或者参数格式错误
    // 101010104： 请求签名校验错误
    // 101010105： 请求的 headers 中的 x-app-version 校验失败，是不符合要求的 app-version
  }
  return response
}

export const securityRequestInitHandler = async (
  input: RequestInfo,
  init?: RequestInit,
  formUrl?: string,
) => {
  // 创建一个新的headers对象，并拷贝init中的headers
  const headers = new Headers({
    Authorization: `Bearer ${(await getAccessToken()) ?? ''}`,
    ...(init?.body instanceof FormData
      ? {}
      : { 'Content-Type': 'application/json' }),
    ...init?.headers,
  })
  if (typeof input === 'string' && input.startsWith(COMMON_MAXAI_API_HOST)) {
    try {
      const body = init?.body || ''
      // sm3(hmac_sha1(payload, secret_key)secret_key)
      // api_full_path: 请求的完全路径，包含查询参数，不携带fragment ，注意需要对 URL 做解码
      //             - 例: `http://127.0.0.1:8001/tt?a=b&a=c&a=d&b=%E8%A7%A3#htest` => `/tt?a=b&a=c&a=d&b=解`
      //             -  `/tt?` 问号后面没有查询参数需要删除问号 -> `/tt`
      const apiURL = new URL(input)
      let api_full_path = apiURL.pathname + apiURL.search
      if (api_full_path.endsWith('?')) {
        api_full_path = api_full_path.slice(0, -1)
      }
      // req_json: 请求的 json 体，如果为空则当`{}`处理
      //          - 例: `{"a":1,"b":2}` => `{"a":1,"b":2}`
      //          - 例: `""` => `{}`
      //          - 例: `null` => `{}`
      //          - 例: `undefined` => `{}`
      let req_json = '{}'
      if (
        headers.has('Content-Type') &&
        headers.get('Content-Type') === 'application/json'
      ) {
        if (typeof body === 'string') {
          try {
            req_json = JSON.stringify(JSON.parse(body))
          } catch (e) {
            req_json = '{}'
          }
        }
      }
      // req_data: 请求的 form 表单，如果为空则当`{}`处理
      //          - 例: `{"a":1,"b":2}` => `{"a":1,"b":2}`
      //          - 例: `""` => `{}`
      //          - 例: `null` => `{}`
      //          - 例: `undefined` => `{}`
      let req_data = '{}'
      if (body instanceof FormData) {
        const jsonData: Record<string, any> = {}
        body.forEach((value, key) => {
          if (!(value instanceof File)) {
            // 后端接收到的\n都变成了\r\n编码问题，前端统一转换为\r\n，否则会出现签名报错
            jsonData[key] = String(value)
              .replace(/\r\n/g, '\n')
              .replace(/\n/g, '\r\n')
          }
        })
        req_data = JSON.stringify(jsonData)
      }
      // req_time: 请求的时间，精确到千分之秒
      //          - 例: `1634021280000` => `1634021280000`
      const req_time = await getMaxAIAPIFetchTimestamp()
      const app_version = `webpage_${APP_VERSION}`
      const user_agent = navigator.userAgent
      const user_token = (headers.get('Authorization') || '').replace(
        'Bearer ',
        '',
      )
      const sign_str = `${app_version}:${req_time}:${api_full_path}:${user_agent}:${req_json}:${req_data}:${user_token}`
      const sha1_secret_key = `${req_time}:${APP_SM3_HASH_KEY}`
      const sha1_hash = hmac_sha1(sign_str, sha1_secret_key).toString()
      const sm3_sign = sm3(`${req_time}:${sha1_hash}:${APP_SM3_HASH_KEY}`)
      console.log(
        `
MAXAI_API_FETCH_LOG:\n
body:\n,
`,
        typeof body === 'string' ? body : body,
        `
\napi_full_path: ${api_full_path}\n
req_json: ${req_json}\n
req_data: ${req_data}\n
req_time: ${req_time}\n
app_version: ${app_version}\n
user_agent: ${user_agent}\n
user_token: ${user_token}\n
sign_str: ${sign_str}\n
sha1_secret_key: ${sha1_secret_key}\n
sha1_hash: ${sha1_hash}\n
sm3_sign: ${sm3_sign}\n
    `,
      )
      const payloadHash = sm3_sign
      const uaInfo = await getBrowserUAInfo()
      const senderUrl =
        formUrl || (typeof window !== 'undefined' ? window.location.href : '')
      const domain = getCurrentDomainHost(senderUrl)
      const path = senderUrl
      // 稍微添加一下逆向的难度
      // X-Browser-Name
      headers.set(
        convertHexToString('582d42726f777365722d4e616d65'),
        uaInfo?.browser?.name || convertHexToString('554e4b4e4f574e'),
      )
      // X-Browser-Version
      headers.set(
        convertHexToString('582d42726f777365722d56657273696f6e'),
        uaInfo?.browser?.version || convertHexToString('554e4b4e4f574e'),
      )
      // X-Browser-Major
      headers.set(
        convertHexToString('582d42726f777365722d4d616a6f72'),
        uaInfo?.browser?.major || convertHexToString('554e4b4e4f574e'),
      )
      // X-App-Version
      headers.set(convertHexToString(`582d4170702d56657273696f6e`), app_version)
      // X-App-Env - MaxAI-Browser-Extension
      headers.set(
        convertHexToString(`582d4170702d456e76`),
        convertHexToString(`4d617841492d42726f777365722d457874656e73696f6e`),
      )
      // X-Authorization
      headers.set(
        convertHexToString(`582d417574686f72697a6174696f6e`),
        aesJsonEncrypt(
          {
            // X-Client-Domain
            [convertHexToString(`582d436c69656e742d446f6d61696e`)]: domain,
            // X-Client-Path
            [convertHexToString(`582d436c69656e742d50617468`)]: path,
            // t
            [convertHexToString(`74`)]: req_time,
            // p
            [convertHexToString(`70`)]: payloadHash,
            // D
            [convertHexToString(`64`)]:
              // 插件这里传递的是插件的ID
              // 网页这里用 client user id 代替
              getClientUserId(),
            // await getMaxAIChromeExtensionInstalledDeviceId(),
          },
          APP_AES_ENCRYPTION_KEY,
        ),
      )

      console.log(
        `zztest`,
        {
          // X-Client-Domain
          [convertHexToString(`582d436c69656e742d446f6d61696e`)]: domain,
          // X-Client-Path
          [convertHexToString(`582d436c69656e742d50617468`)]: path,
          // t
          [convertHexToString(`74`)]: req_time,
          // p
          [convertHexToString(`70`)]: payloadHash,
          // D
          [convertHexToString(`64`)]:
            // 插件这里传递的是插件的ID
            // 网页这里用 client user id 代替
            getClientUserId(),
          // await getMaxAIChromeExtensionInstalledDeviceId(),
        },
        APP_AES_ENCRYPTION_KEY,
      )
    } catch (e) {
      console.error(e)
    }
  }

  // 创建一个新的RequestInit对象，并深拷贝init中的属性
  const modifiedInit: RequestInit = {
    ...init,
    headers, // 使用修改后的headers
  }

  return modifiedInit
}
