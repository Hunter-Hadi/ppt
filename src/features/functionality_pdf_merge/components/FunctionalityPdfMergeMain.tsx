import { Stack } from '@mui/material'
import React from 'react'
import { lazy, Suspense, useState } from 'react'

import AppLoadingLayout from '@/features/common/components/AppLoadingLayout'
import FunctionalityCommonUploadButton from '@/features/functionality_common/components/FunctionalityCommonUploadButton'

const FunctionalityPdfMergeDetail = lazy(
  () =>
    import(
      '@/features/functionality_pdf_merge/components/FunctionalityPdfMergeDetail'
    ),
)

const FunctionalityPdfMergeMain = () => {
  const [fileList, setFileList] = useState<FileList | null>(null) //文件
  const onUploadFile = async (fileList: FileList) => {
    //用户上传，读取pdf文件显示的图片列表
    if (fileList && fileList.length > 0) {
      setFileList(fileList)
    }
  }

  return (
    <Stack
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      sx={{
        width: '100%',
      }}
    >
      {!fileList && (
        <FunctionalityCommonUploadButton
          inputProps={{
            multiple: true,
          }}
          onChange={onUploadFile}
        />
      )}
      {fileList && (
        <Suspense fallback={<AppLoadingLayout loading loadingText='test 5' />}>
          <FunctionalityPdfMergeDetail
            fileList={fileList}
            onRemoveFile={() => setFileList(null)}
          />
        </Suspense>
      )}
    </Stack>
  )
}
export default FunctionalityPdfMergeMain
