import { Stack } from '@mui/material'
import Head from 'next/head'
import React from 'react'
import { lazy, Suspense, useState } from 'react'

import AppLoadingLayout from '@/features/common/components/AppLoadingLayout'
import FunctionalityCommonUploadButton from '@/features/functionality_common/components/FunctionalityCommonUploadButton'
import useFunctionalityCommonIsMobile from '@/features/functionality_common/hooks/useFunctionalityCommonIsMobile'

const FunctionalityPdfAnnotatorDetail = lazy(
  () =>
    import(
      '@/features/functionality_pdf_annotator/components/FunctionalityPdfAnnotatorDetail'
    ),
)

const FunctionalitySignPdfMain = () => {
  const isMobile = useFunctionalityCommonIsMobile()
  const [fileData, setFileData] = useState<File | null>(null)
  const onChangeFile = (fileList: FileList) => {
    if (fileList?.length > 0) {
      setFileData(fileList[0])
    }
  }
  const onClearFile = () => {
    setFileData(null)
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
      <Head>
        <link rel='preconnect' href='https://fonts.googleapis.com' />
        <link
          rel='preconnect'
          href='https://fonts.gstatic.com'
          crossOrigin=''
        />
        <link
          href='https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Concert+One&family=Courier+Prime:ital,wght@0,400;0,700;1,400;1,700&family=Dancing+Script:wght@400..700&family=EB+Garamond:ital,wght@0,400..800;1,400..800&family=La+Belle+Aurore&family=Lobster&family=Ma+Shan+Zheng&family=Noto+Serif:ital,wght@0,100..900;1,100..900&family=Orbitron:wght@400..900&family=Oswald:wght@200..700&family=Pacifico&family=Permanent+Marker&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Roboto+Slab:wght@100..900&family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Teko:wght@300..700&family=Zeyada&display=swap'
          rel='stylesheet'
        />
        {/* 下面是为了 手机端不让下拉刷新跟事件冲突 */}
        {isMobile && (
          <style>{`
       html, body {
    overscroll-behavior-y: none; /* 保持内容不滚动 */
     overscroll-behavior: contain;
    -webkit-overflow-scrolling: auto;
    -webkit-user-select: none; /* Prevents text selection */
  -webkit-touch-callout: none; /* Prevents callout menu to appear */
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /* Prevents tap highlight color */
}
      `}</style>
        )}
      </Head>
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
          <FunctionalityPdfAnnotatorDetail
            file={fileData}
            onClearFile={onClearFile}
          />
        </Suspense>
      )}
    </Stack>
  )
}
export default FunctionalitySignPdfMain
