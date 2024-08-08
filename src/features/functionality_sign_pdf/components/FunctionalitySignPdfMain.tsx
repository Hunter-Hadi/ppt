import Stack from '@mui/material/Stack'
import React, { useContext, useEffect } from 'react'
import { lazy, Suspense, useState } from 'react'
import { useRecoilState } from 'recoil'

import AppLoadingLayout from '@/features/common/components/AppLoadingLayout'
import {
  FunctionalitySignPdfOperationOBjectAtom,
  functionalitySignPdfOperationOBjectDefault,
} from '@/features/functionality_common/components/FunctionalityCommonOperatePdfView/store/setOperateFabricCanvas'
import FunctionalityCommonUploadButton from '@/features/functionality_common/components/FunctionalityCommonUploadButton'
import useFunctionalityCommonIsMobile from '@/features/functionality_common/hooks/useFunctionalityCommonIsMobile'
import { TopToolsDetailView } from '@/page_components/PdfToolsPages/components/ToolsDetail'

const FunctionalitySignPdfDetail = lazy(
  () =>
    import(
      '@/features/functionality_sign_pdf/components/FunctionalitySignPdfDetail'
    ),
)

const FunctionalitySignPdfMain = () => {
  const isMobile = useFunctionalityCommonIsMobile()
  const { setIsSimplicityView } = useContext(TopToolsDetailView) //是否显示简单视图,不需要可以删除
  const [, setPdfOperationOBject] = useRecoilState(
    FunctionalitySignPdfOperationOBjectAtom,
  )
  const [fileData, setFileData] = useState<File | null>(null)
  const onChangeFile = (fileList: FileList) => {
    if (fileList?.length > 0) {
      setFileData(fileList[0])
    }
  }
  const onClearReturn = () => {
    setFileData(null)
    // 清空Atom的值
    setPdfOperationOBject(functionalitySignPdfOperationOBjectDefault)
  }
  useEffect(() => {
    setIsSimplicityView(isMobile && !!fileData)
  }, [isMobile, fileData])
  return (
    <Stack
      flexDirection='column'
      alignItems='center'
      justifyContent='center'
      sx={{
        width: '100%',
      }}
    >
      {!fileData && (
        <FunctionalityCommonUploadButton
          inputProps={{
            accept: 'application/pdf',
            multiple: false,
          }}
          onChange={onChangeFile}
        />
      )}
      {fileData && (
        <Suspense fallback={<AppLoadingLayout loading />}>
          <FunctionalitySignPdfDetail
            file={fileData}
            onClearReturn={onClearReturn}
          />
        </Suspense>
      )}
    </Stack>
  )
}
export default FunctionalitySignPdfMain
