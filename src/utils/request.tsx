import { Alert, AlertTitle, Paper } from '@mui/material'
import axios, { AxiosRequestConfig } from 'axios'
import isUndefined from 'lodash-es/isUndefined'
import omitBy from 'lodash-es/omitBy'
import getConfig from 'next/config'
import { SnackbarKey, useSnackbar } from 'notistack'
import React from 'react'

import { securityRequestInitHandler } from '@/features/security/utils'
import { API_HOST } from '@/global_constants'
import snackNotifications from '@/utils/globalSnackbar'
import { setLocalStorage } from '@/utils/localStorage'

// 扩展AxiosRequestConfig以包含自定义配置
export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  hideNotifications?: boolean
}

export const ErrorNetworkTips = (
  title: string,
  msg: string,
  key: SnackbarKey,
): React.ReactNode => {
  const { closeSnackbar } = useSnackbar()
  return (
    <Paper elevation={6}>
      <Alert severity='warning' onClose={() => closeSnackbar(key)}>
        <AlertTitle sx={{ color: (t) => t.palette.warning.light }}>
          {title}
        </AlertTitle>
        {msg}
      </Alert>
    </Paper>
  )
}

console.log('NODE_ENV:', process.env.NODE_ENV)
const GUEST_USER_MODE = 'GUEST_USER_MODE'

export const appAxios = axios.create({
  baseURL: API_HOST,
  timeout: 20000,
})

/**
 * 获取当前页面是不是在显示器的可视区域
 */
export const getCurrentVisibility = () => {
  const config = getConfig()
  if (typeof window === 'undefined') {
    return true
  } else {
    if (window.location.pathname.includes('crx/')) {
      return (
        window.document.documentElement.offsetWidth > 0 &&
        config?.publicRuntimeConfig?.visibility
      )
    }

    return config?.publicRuntimeConfig?.visibility
  }
}
/**
 * 获取full referer
 */
export const getCurrentFullReferer = () => {
  const config = getConfig()
  const currentConfig =
    (typeof window === 'undefined'
      ? config.serverRuntimeConfig
      : config.publicRuntimeConfig) || {}
  return currentConfig?.currentRoute?.asPath || ''
}
/**
 * 获取每个路由所在的模块
 */
export const getCurrentPathNameModule = () => {
  const config = getConfig()
  const currentConfig =
    (typeof window === 'undefined'
      ? config.serverRuntimeConfig
      : config.publicRuntimeConfig) || {}
  let routeWithoutQuery: string = currentConfig?.currentRoute?.pathname
  try {
    const matchText = /[\w|/]+/.exec(routeWithoutQuery)
    if (matchText && matchText[0]) {
      routeWithoutQuery = matchText[0]
    }
  } catch (e) {
    console.error('match route error :\t', e)
  }
  return routeWithoutQuery
}

function splice_uri(uri: string, params: { [key: string]: string }) {
  /**
   * 拼接URL链接的方法
   * uri:需要拼接的链接地址
   * params:需要拼接的参数对象
   * return:拼接后的URL
   * **/
  const paramsArray: string[] = []
  Object.keys(params).forEach(
    (key) => params[key] && paramsArray.push(`${key}=${params[key]}`),
  )
  if (uri.search(/\?/) === -1) {
    uri += `?${paramsArray.join('&')}`
  } else {
    uri += `&${paramsArray.join('&')}`
  }
  return uri
}

appAxios.interceptors.response.use(
  (response) => {
    // removePending(response.config);
    return response
  },
  (error) => {
    const errorObj = error.response
    if (error.message === GUEST_USER_MODE) {
      return Promise.resolve({ data: [] })
    }
    const msgTitle = 'Something went wrong'
    const msgBody =
      'Connection with the server is currently unavailable, please try again later.'
    if (errorObj?.status === 401) {
      return Promise.reject(error)
    }
    if (errorObj?.status === 500 || errorObj?.status === 404) {
      const hideNotifications = error.config.hideNotifications
      try {
        if (!hideNotifications) {
          snackNotifications.error(msgBody, {
            variant: 'warning',
            persist: true,
            anchorOrigin: {
              vertical: 'bottom',
              horizontal: 'center',
            },
            content: ((key: string) =>
              ErrorNetworkTips(msgTitle, msgBody, key)) as any,
          })
        }
      } catch (e) {
        // 解析失败报错显示错误提示
        snackNotifications.error(msgBody, {
          variant: 'warning',
          persist: true,
          anchorOrigin: {
            vertical: 'bottom',
            horizontal: 'center',
          },
          content: ((key: string) =>
            ErrorNetworkTips(msgTitle, msgBody, key)) as any,
        })
      }
    }

    if (
      errorObj?.status === 408 &&
      errorObj?.data?.msg === 'request time invalid'
    ) {
      if (errorObj?.headers?.t) {
        const serverTime = +errorObj.headers.t
        if (isNaN(serverTime)) return
        const diff = serverTime - Date.now()
        console.log(diff, 'error request 408')
        setLocalStorage('timediff', diff)
      }
    }

    return Promise.reject(error)
  },
)
appAxios.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    // const accessToken = getAccessToken()
    // const fp = await getFingerPrintAsync()
    let securityHeaders: Record<string, string> = {}
    try {
      const newSecurityRequestConfig = await securityRequestInitHandler(
        `${config?.baseURL}${config?.url}`,
        {
          ...config,
          headers: omitBy({ ...config.headers }, isUndefined),
          // 模拟 RequestInit 中的 body
          body: JSON.stringify(config?.data ?? {}),
        } as RequestInit,
      )

      if (newSecurityRequestConfig.headers) {
        securityHeaders = Object.fromEntries(
          newSecurityRequestConfig.headers as any,
        )
      }
    } catch (error) {
      securityHeaders = {}
    }

    config.headers = {
      ...config.headers,
      ...securityHeaders,
    }
    return config as any
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error)
  },
)

export interface IResponseData<T> {
  data: T
  status: string
  msg: string
}

type ResponseDataType = <T>(
  url: string,
  params?: Record<string, unknown>,
  config?: AxiosRequestConfig,
) => Promise<T>

export const getBlob = (url: string) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url,
      responseType: 'blob',
    })
      .then((data) => {
        resolve(data.data)
      })
      .catch((error) => {
        reject(error.toString())
      })
  })
}

export const qspost: ResponseDataType = (
  url: string,
  params?: Record<string, unknown>,
  config?: AxiosRequestConfig,
) => {
  return new Promise((resolve, reject) => {
    appAxios
      .post(url, JSON.stringify({ ...params }), {
        ...config,
      })
      .then((res) => resolve(res.data))
      .catch((err) => {
        reject(err)
      })
  })
}
export const webappGet: ResponseDataType = (
  url: string,
  params?: Record<string, unknown>,
  config?: CustomAxiosRequestConfig,
) => {
  return new Promise((resolve, reject) => {
    appAxios
      .get(url, {
        params: {
          ...params,
          ...config,
        },
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

export const webappPost: ResponseDataType = (
  url: string,
  params?: Record<string, unknown>,
  config?: CustomAxiosRequestConfig,
) => {
  return new Promise((resolve, reject) => {
    appAxios
      .post(url, params, { ...config })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
  })
}
