import { API_HOST } from '@/global_constants'
import { getAccessToken } from '@/packages/auth'

export interface IResponse<T> {
  status: 'OK' | 'ERROR'
  data?: T
  msg?: string
} //有的返回这个格式，有的不返回，所以目前让接口自己选择
export const post = <T, T_MORE = object>(
  pathname: string,
  data: any,
  options?: RequestInit,
  headers?: HeadersInit,
  isJson = true, //是否是json格式
): Promise<T & T_MORE> => {
  return new Promise<any>((resolve, reject) => {
    const accessToken = getAccessToken()
    if (!accessToken) {
      reject(new Error('no accessToken'))
      return
    }
    if (isJson) {
      headers = {
        'Content-Type': 'application/json',
        ...headers,
      }
    }
    fetch(API_HOST + pathname, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        ...headers,
      },
      body: isJson ? JSON.stringify(data) : data,
      ...options,
    })
      .then((response) => {
        if (response.ok) {
          resolve(response.json())
        } else {
          reject(response)
        }
        return undefined
      })
      .catch((e) => {
        reject(e)
        return undefined
      })
  })
}
