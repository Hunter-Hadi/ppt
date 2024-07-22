import { Stack } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { FC, lazy, Suspense, useState } from 'react'

import AppLoadingLayout from '@/features/common/components/AppLoadingLayout'
import FunctionalityCommonUploadButton from '@/features/functionality_common/components/FunctionalityCommonUploadButton'
import { functionalityCommonSnackNotifications } from '@/features/functionality_common/utils/functionalityCommonNotificationTool'

const FunctionalityImageToPdfDetail = lazy(
  () =>
    import(
      '@/features/functionality_image_to_pdf/components/FunctionalityImageToPdfDetail'
    ),
)
interface IFunctionalityImageToPdfMainProps {
  accept?: string
}
const FunctionalityImageToPdfMain: FC<IFunctionalityImageToPdfMainProps> = ({
  accept,
}) => {
  const { t } = useTranslation()
  const [fileList, setFileList] = useState<FileList | null>(null) //文件
  const onUploadFile = async (fileList: FileList) => {
    //用户上传，读取pdf文件显示的图片列表
    if (fileList && fileList.length > 0) {
      setFileList(fileList)
    }
  }
  const handleUnsupportedFileTypeTip = () => {
    functionalityCommonSnackNotifications(
      t(
        'functionality__image_to_pdf:components__image_to_pdf__error_uploaded__tips',
      ),
    )
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
            accept: accept,
          }}
          onChange={onUploadFile}
          handleUnsupportedFileType={handleUnsupportedFileTypeTip}
        />
      )}
      {fileList && (
        <Suspense fallback={<AppLoadingLayout loading loadingText='test 2' />}>
          <FunctionalityImageToPdfDetail
            fileList={fileList}
            accept={accept}
            onRemoveFileList={() => setFileList(null)}
          />
        </Suspense>
      )}
    </Stack>
  )
}
export default FunctionalityImageToPdfMain
