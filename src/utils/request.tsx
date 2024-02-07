import { Alert, AlertTitle, Paper } from '@mui/material';
import axios, { AxiosRequestConfig } from 'axios';
import dayjs from 'dayjs';
import getConfig from 'next/config';
import { SnackbarKey, useSnackbar } from 'notistack';
import React from 'react';

import { getFingerPrint } from '@/utils/fingerPrint';
import snackNotifications from '@/utils/globalSnackbar';
import { getLocalStorage, setLocalStorage } from '@/utils/localStorage';
import { api_signature_manager } from '@/utils/utils';

// 扩展AxiosRequestConfig以包含自定义配置
export interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  hideNotifications?: boolean;
}

export const ErrorNetworkTips = (
  title: string,
  msg: string,
  key: SnackbarKey,
): React.ReactNode => {
  const { closeSnackbar } = useSnackbar();
  return (
    <Paper elevation={6}>
      <Alert severity='warning' onClose={() => closeSnackbar(key)}>
        <AlertTitle sx={{ color: (t) => t.palette.warning.light }}>
          {title}
        </AlertTitle>
        {msg}
      </Alert>
    </Paper>
  );
};

console.log('NODE_ENV:', process.env.NODE_ENV);
const GUEST_USER_MODE = 'GUEST_USER_MODE';

export const appAxios = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  timeout: 20000,
});

/**
 * 获取当前页面是不是在显示器的可视区域
 */
export const getCurrentVisibility = () => {
  const config = getConfig();
  if (typeof window === 'undefined') {
    return true;
  } else {
    if (window.location.pathname.includes('crx/')) {
      return (
        window.document.documentElement.offsetWidth > 0 &&
        config?.publicRuntimeConfig?.visibility
      );
    }

    return config?.publicRuntimeConfig?.visibility;
  }
};
/**
 * 获取full referer
 */
export const getCurrentFullReferer = () => {
  const config = getConfig();
  const currentConfig =
    (typeof window === 'undefined'
      ? config.serverRuntimeConfig
      : config.publicRuntimeConfig) || {};
  return currentConfig?.currentRoute?.asPath || '';
};
/**
 * 获取每个路由所在的模块
 */
export const getCurrentPathNameModule = () => {
  const config = getConfig();
  const currentConfig =
    (typeof window === 'undefined'
      ? config.serverRuntimeConfig
      : config.publicRuntimeConfig) || {};
  let routeWithoutQuery: string = currentConfig?.currentRoute?.pathname;
  try {
    const matchText = /[\w|\/]+/.exec(routeWithoutQuery);
    if (matchText && matchText[0]) {
      routeWithoutQuery = matchText[0];
    }
  } catch (e) {
    console.error('match route error :\t', e);
  }
  return routeWithoutQuery;
};

function splice_uri(uri: string, params: { [key: string]: string }) {
  /**
   * 拼接URL链接的方法
   * uri:需要拼接的链接地址
   * params:需要拼接的参数对象
   * return:拼接后的URL
   * **/
  const paramsArray: string[] = [];
  Object.keys(params).forEach(
    (key) => params[key] && paramsArray.push(`${key}=${params[key]}`),
  );
  if (uri.search(/\?/) === -1) {
    uri += `?${paramsArray.join('&')}`;
  } else {
    uri += `&${paramsArray.join('&')}`;
  }
  return uri;
}

appAxios.interceptors.response.use(
  (response) => {
    // removePending(response.config);
    return response;
  },
  (error) => {
    const errorObj = error.response;
    if (error.message === GUEST_USER_MODE) {
      return Promise.resolve({ data: [] });
    }
    const msgTitle = 'Something went wrong';
    const msgBody =
      'Connection with the server is currently unavailable, please try again later.';
    if (errorObj?.status === 401) {
      return Promise.reject(error);
    }
    if (errorObj?.status === 500 || errorObj?.status === 404) {
      const hideNotifications = error.config.hideNotifications;
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
          });
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
        });
      }
    }

    if (
      errorObj?.status === 408 &&
      errorObj?.data?.msg === 'request time invalid'
    ) {
      if (errorObj?.headers?.t) {
        const serverTime = +errorObj.headers.t;
        if (isNaN(serverTime)) return;
        const diff = serverTime - Date.now();
        console.log(diff, 'error request 408');
        setLocalStorage('timediff', diff);
      }
    }

    return Promise.reject(error);
  },
);
appAxios.interceptors.request.use(
  async (config: AxiosRequestConfig) => {
    config.headers = {
      ...config.headers,
      'X-API-MODULE': getCurrentPathNameModule(),
      'X-IS-CRX': 'false',
      'X-IS-FOCUS': getCurrentVisibility() ? 'true' : 'false',
      'X-FULL-REFERER': getCurrentFullReferer(),
      'X-FID': getFingerPrint(),
    };
    // 签名路径添加api版本号
    let api_path =
      config.url?.replace(process.env.NEXT_PUBLIC_BASE_URL || '', '') || '';
    let sign_header_prefix = '';
    let json_data = {};
    const data: { [key: string]: FormDataEntryValue } = {};
    const isForm =
      config.headers?.['Content-Type'] === 'application/x-www-form-urlencoded';
    if (isForm) {
      if (
        config['data'] &&
        ['put', 'post', 'patch'].includes(
          config['method']?.toLocaleLowerCase() || '',
        ) &&
        config['data'] instanceof FormData
      ) {
        config['data'].forEach((value, key) => (data[key] = value));
      }
    } else {
      //这是json数据post的情况，将post,put等的json data数据赋值给待签名变量
      if (config['data']) {
        json_data = config['data'];
      }
    }
    if (config.params) {
      //如果在这个里面存在查询参数，我们应该将查询参数添加到url中，并且将params置为空，这样才能避免有的查询参数漏掉了签名，导致请求失败
      api_path = splice_uri(api_path, config.params);
      config.params = undefined; //必需重置参数，避免最终产生重复参数
      config.url = api_path; //将添加了新参数的链接地址赋值url地址
    }
    const sign_headers = api_signature_manager({
      api_path: `${sign_header_prefix}${api_path.replace(/[?]$/, '')}`,
      authorization: (config.headers?.['Authorization'] || '') as string,
      userAgent:
        typeof window !== 'undefined'
          ? window?.navigator?.userAgent
          : 'unknown',
      data,
      json_data,
      apiTime: (+dayjs() + +(getLocalStorage('timediff') || 0)).toString(),
    });
    config.headers = {
      ...config.headers,
      ...sign_headers,
    };

    return config as any;
  },
  (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

export interface IResponseData<T> {
  data: T;
  status: string;
  msg: string;
}

type ResponseDataType = <T>(
  url: string,
  params?: Record<string, unknown>,
  config?: AxiosRequestConfig,
) => Promise<T>;

export const getBlob = (url: string) => {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url,
      responseType: 'blob',
    })
      .then((data) => {
        resolve(data.data);
      })
      .catch((error) => {
        reject(error.toString());
      });
  });
};

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
        reject(err);
      });
  });
};
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
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const webappPost: ResponseDataType = (
  url: string,
  params?: Record<string, unknown>,
  config?: CustomAxiosRequestConfig,
) => {
  return new Promise((resolve, reject) => {
    appAxios
      .post(url, params, { ...config })
      .then((res) => resolve(res.data))
      .catch((err) => reject(err));
  });
};
