import { API_PROJECT_LINK } from '@/global_constants'

type ClientFetchAPIResponse<T> = {
  success: boolean
  data: T | null
  responseRaw: {
    ok: boolean
    status: number
    statusText: string
    url: string
    redirected: boolean
  } | null
  message: string
  error: string
}
const API_HOST = process.env.NEXT_PUBLIC_BASE_URL
export interface IResponse<T> {
  status: 'OK' | 'ERROR'
  data?: T
  msg?: string
} //有的返回这个格式，有的不返回，所以目前让接口自己选择
export const post = <T, T_MORE = {}>(
  pathname: string,
  data: any,
  options?: RequestInit,
  headers?: HeadersInit,
  isJson = true, //是否是json格式
): Promise<T & T_MORE> => {
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
        Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWJqZWN0Ijp7InVzZXJfaWQiOiIyNzc3OWRmMy0wMWJhLTQxMTMtYTQyNi03ZDAwZjM3MTAyOTgifSwidHlwZSI6ImFjY2VzcyIsImV4cCI6MTcyMDYwODY4MCwiaWF0IjoxNzIwNTIyMjgwLCJqdGkiOiJmMTgzMjNkYS0zODY1LTRhOTktOGIxNi1mY2FkOTJmNmVhMTUifQ.o1AaqnxjT2Ma1UIDJ4f6B6USdMraUjAJJn_NgAg5sb4`,
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
