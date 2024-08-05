import { Alert, AlertTitle, Paper } from '@mui/material'
import axios, { AxiosRequestConfig } from 'axios'
import isUndefined from 'lodash-es/isUndefined'
import omitBy from 'lodash-es/omitBy'
import { SnackbarKey, useSnackbar } from 'notistack'
import React from 'react'
import { authLogout } from 'src/packages/auth'

import { securityRequestInitHandler } from '@/features/security/utils'
import { API_HOST } from '@/global_constants'
import snackNotifications from '@/utils/globalSnackbar'
import { setLocalStorage } from '@/utils/localStorage'

const ErrorNetworkTips = (
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

const GUEST_USER_MODE = 'GUEST_USER_MODE'

export const appAxios = axios.create({
  baseURL: API_HOST,
  timeout: 20000,
})

/**
 * 获取当前页面是不是在显示器的可视区域
 */
export const getCurrentVisibility = () => {
  let hidden: 'hidden' | 'msHidden' | 'webkitHidden' | undefined = undefined
  if (typeof document.hidden !== 'undefined') {
    // Opera 12.10 and Firefox 18 and later support
    hidden = 'hidden'
    //
  } else if (
    typeof (document as Document & { msHidden?: boolean }).msHidden !==
    'undefined'
  ) {
    hidden = 'msHidden'
  } else if (
    typeof (document as Document & { webkitHidden?: boolean }).webkitHidden !==
    'undefined'
  ) {
    hidden = 'webkitHidden'
  }
  // 如果浏览器不支持addEventListener 或 Page Visibility API 给出警告
  if (
    typeof document.addEventListener === 'undefined' ||
    typeof document[hidden as 'hidden'] === 'undefined'
  ) {
    console.log(
      'This listen requires a browser, such as Google Chrome or Firefox, that supports the Page Visibility API.',
    )
  }
  return !document[hidden as 'hidden']
}
/**
 * 获取full referer
 */
export const getCurrentFullReferer = () => {
  return location.href.split(/[?#]/)[0]
}
/**
 * 获取每个路由所在的模块
 */
export const getCurrentPathNameModule = () => {
  const pathname = location.pathname
  const pathNameArray = pathname.split('/')
  return pathNameArray[1]
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
      authLogout()
      return Promise.reject(error)
    }
    if (errorObj?.status === 500 || errorObj?.status === 404) {
      try {
        const requestData = JSON.parse(errorObj?.config?.data)
        if (!requestData?.hideNotifications) {
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

export const get: ResponseDataType = (
  url: string,
  params?: Record<string, unknown>,
  config?: AxiosRequestConfig,
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

export const post: ResponseDataType = (
  url: string,
  params?: Record<string, unknown>,
  config?: AxiosRequestConfig,
) => {
  return new Promise((resolve, reject) => {
    appAxios
      .post(url, params, { ...config })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err))
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
