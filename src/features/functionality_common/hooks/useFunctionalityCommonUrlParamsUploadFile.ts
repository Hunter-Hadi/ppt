import { useRouter } from 'next/router'
import { useEffect, useMemo, useRef, useState } from 'react'

import { clientGetMaxAIFileUrlWithFileId } from '../request/file'
import { downloadFileAsBlob } from '../utils/functionalityCommonDownload'
const useFunctionalityCommonUrlParamsUploadFile = (props: {
  onChangeFile?: (file: FileList) => void
}) => {
  const router = useRouter()
  const { file_id, name } = router.query //这里是获取url参数,但会获取不到，保险也加上一层
  const isHandleParams = useRef(false)
  const [urlFileUploadProgress, setUrlFileUploadProgress] = useState<
    null | number
  >(null)
  const { url, fileId, getName } = useMemo(() => {
    const url = new URL(router.asPath, window.location.origin)
    const fileId = url.searchParams.get('file_id')
    const getName = url.searchParams.get('name')
    return {
      url,
      fileId,
      getName,
    }
  }, [])
  const fileName = name || getName
  const errorFile = () => {
    setUrlFileUploadProgress(null)
    router.replace(url.pathname, undefined, { shallow: false }) //重置url防止触发触发这个hooks
  }
  useEffect(() => {
    if (isHandleParams.current) return

    isHandleParams.current = true

    if ((file_id || fileId) as string) {
      setUrlFileUploadProgress(0) //这里是为了处理上传进度条
      clientGetMaxAIFileUrlWithFileId((file_id || fileId) as string)
        .then((res) => {
          if (res?.file_url) {
            downloadFileAsBlob(
              decodeURIComponent(res?.file_url),
              (progress) => {
                setUrlFileUploadProgress(progress) //更新上传进度条
              },
              fileName as string,
            )
              .then((file) => {
                props.onChangeFile &&
                  props.onChangeFile([file] as unknown as FileList)
                setUrlFileUploadProgress(100)
                router.replace(url.pathname, undefined, { shallow: false }) //重置url防止触发触发这个hooks
              })
              .catch((e) => {
                errorFile()
              })
          } else {
            errorFile()
          }
        })
        .catch((e) => {
          errorFile()
        })
    }
  }, [])
  return {
    urlFileUploadProgress,
    fileName,
  }
}
export default useFunctionalityCommonUrlParamsUploadFile
