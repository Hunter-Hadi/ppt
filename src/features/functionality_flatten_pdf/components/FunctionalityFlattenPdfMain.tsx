import Stack from '@mui/material/Stack'
import React, { lazy, Suspense, useState } from 'react'

import AppLoadingLayout from '@/features/common/components/AppLoadingLayout'
import FunctionalityCommonUploadButton from '@/features/functionality_common/components/FunctionalityCommonUploadButton'

const FunctionalityFlattenPdfDetail = lazy(
  () =>
    import(
      '@/features/functionality_flatten_pdf/components/FunctionalityFlattenPdfDetail'
    ),
)

const FunctionalityFlattenPdfMain = () => {
  const [file, setFile] = useState<File | null>(null) //文件
  const onUploadFile = async (fileList: FileList) => {
    //用户上传，读取pdf文件显示的图片列表
    if (fileList && fileList.length > 0) {
      setFile(fileList[0])
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
      {!file && <FunctionalityCommonUploadButton onChange={onUploadFile} />}
      {file && (
        <Suspense fallback={<AppLoadingLayout loading />}>
          <FunctionalityFlattenPdfDetail
            file={file}
            onRemoveFile={() => setFile(null)}
          />
        </Suspense>
      )}
    </Stack>
  )
}
export default FunctionalityFlattenPdfMain
