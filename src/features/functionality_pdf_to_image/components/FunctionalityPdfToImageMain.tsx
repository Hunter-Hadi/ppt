import React from 'react'
import { FC } from 'react'

// const FunctionalityPdfToImageDetail = lazy(
//   () =>
//     import(
//       '@/features/functionality_pdf_to_image/components/FunctionalityPdfToImageDetail'
//     ),
// )

interface IFunctionalityPdfToImageProps {
  toType: 'pdf-to-jpeg' | 'pdf-to-png'
}

const FunctionalityPdfToImageMain: FC<IFunctionalityPdfToImageProps> = ({
  toType,
}) => {
  return (
    <>
      <h1>toType: {toType}</h1>
    </>
  )
  // const [file, setFile] = useState<File | null>(null)
  // const onChangeFile = (fileList: FileList) => {
  //   if (fileList?.length > 0) {
  //     setFile(fileList[0])
  //   }
  // }
  // const toImageType = useMemo(() => {
  //   switch (toType) {
  //     case 'pdf-to-jpeg':
  //       return 'jpeg'
  //     case 'pdf-to-png':
  //       return 'png'
  //   }
  // }, [toType])

  // return (
  //   <Stack
  //     flexDirection='column'
  //     alignItems='center'
  //     justifyContent='center'
  //     sx={{
  //       width: '100%',
  //     }}
  //   >
  //     {!file && (
  //       <FunctionalityCommonUploadButton
  //         inputProps={{
  //           accept: 'application/pdf',
  //           multiple: false,
  //         }}
  //         onChange={onChangeFile}
  //       />
  //     )}
  //     {file && toImageType && (
  //       <Suspense fallback={<AppLoadingLayout loading />}>
  //         <FunctionalityPdfToImageDetail
  //           file={file}
  //           toType={toImageType}
  //           onRemoveFile={() => setFile(null)}
  //         />
  //       </Suspense>
  //     )}
  //   </Stack>
  // )
}
export default FunctionalityPdfToImageMain
