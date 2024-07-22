/* eslint-disable no-debugger */
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

import { clientGetMaxAIFileUrlWithFileId } from '../request/file'
import { downloadFileAsBlob } from '../utils/functionalityCommonDownload'
const useFunctionalityCommonUrlParamsUploadFile = (props: {
  onChangeFile?: (file: FileList) => void
}) => {
  const router = useRouter()
  const { file_id, name, ...resetQuery } = router.query //这里是获取url参数,但获取不到，保险也加上一层
  const isHandleParams = useRef(false)
  const [urlFileUploadProgress, setUrlFileUploadProgress] = useState<
    null | number
  >(null)
  const replaceUrl = () => {
    router.replace({
      pathname: router.pathname,
      query: {
        ...resetQuery,
      },
    }) //重置url防止重复触发触发这个hooks
  }
  const errorFile = () => {
    setUrlFileUploadProgress(null)
    replaceUrl()
  }
  useEffect(() => {
    if (isHandleParams.current || !router.isReady) return
    if (file_id as string) {
      isHandleParams.current = true
      setUrlFileUploadProgress(0) //这里是为了显示上传进度条

      clientGetMaxAIFileUrlWithFileId(file_id as string)
        .then((res) => {
          if (res?.file_url) {
            downloadFileAsBlob(
              decodeURIComponent(res?.file_url),
              (progress) => {
                setUrlFileUploadProgress(progress) //更新上传进度条
              },
              name as string,
            )
              .then((file) => {
                props.onChangeFile &&
                  props.onChangeFile([file] as unknown as FileList)
                setUrlFileUploadProgress(100)
                replaceUrl()
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
  }, [router.isReady])
  return {
    urlFileUploadProgress,
    fileName: name as string,
  }
}
export default useFunctionalityCommonUrlParamsUploadFile
