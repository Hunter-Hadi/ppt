import { post } from '.'

/**
 * 通过fileId获取MaxAI的附件
 * @param fileId
 * @param config
 */
export const clientGetMaxAIFileUrlWithFileId = async (
  fileId: string,
  config?: {
    message_id?: string
    conversation_id?: string
  },
): Promise<{ file_id: string; file_url: string } | null> => {
  const result = await post<{
    file_id: string
    file_url: string
  }>('/app/get_file', {
    file_id: fileId,
    ...config,
  })
  if (result) {
    return {
      ...result,
    }
  }
  return null
}
