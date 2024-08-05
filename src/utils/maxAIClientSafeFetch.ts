// eslint-disable-next-line @typescript-eslint/ban-ts-comment

import {
  securityHandleFetchErrorResponse,
  securityRequestInitHandler,
} from '@/features/security'

/**
 * 封装的安全的fetch函数，可以在此处添加一些全局的安全处理
 * @param input 请求的URL或Request对象
 * @param init 可选的请求配置参数
 * @param formUrl 请求的来源URL
 * @returns 返回一个Promise，解析为Response对象
 */
const maxAIClientSafeFetch = async (
  input: RequestInfo,
  init?: RequestInit,
  formUrl?: string,
): Promise<Response> => {
  // 创建一个新的RequestInit对象，并深拷贝init中的属性
  const modifiedInit = await securityRequestInitHandler(input, init, formUrl)

  // 调用原生fetch，并传入修改后的RequestInfo和RequestInit
  return fetch(input, modifiedInit).then(securityHandleFetchErrorResponse)
}

export default maxAIClientSafeFetch
