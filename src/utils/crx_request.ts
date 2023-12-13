import { AxiosRequestConfig } from 'axios';

import { appAxios } from '@/utils/request';

interface IResponse<T> {
  status: 'OK' | 'ERROR';
  data?: T;
  msg?: string;
}

export const get = <T>(
  url: string,
  params?: Record<string, unknown>,
  config?: AxiosRequestConfig,
): Promise<IResponse<T>> => {
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

export const post = <T>(
  url: string,
  data?: Record<string, unknown>,
  config?: AxiosRequestConfig,
): Promise<IResponse<T>> => {
  return new Promise((resolve, reject) => {
    appAxios
      .post(url, data, config)
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
