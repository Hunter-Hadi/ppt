import { getAccessToken } from '@/packages/auth'

const API_HOST = process.env.NEXT_PUBLIC_BASE_URL
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
  const token = getAccessToken()
  return new Promise<any>((resolve, reject) => {
    if (isJson) {
      headers = {
        'Content-Type': 'application/json',
        ...headers,
      }
    }
    fetch(API_HOST + pathname, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
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
