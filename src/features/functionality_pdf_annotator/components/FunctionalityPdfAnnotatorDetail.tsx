import { Box } from '@mui/material'
import React, { FC } from 'react'

import FunctionalityCommonOperatePdfToolViewMain from '@/features/functionality_common/components/FunctionalityCommonOperatePdfToolView/components/FunctionalityCommonOperatePdfToolViewMain'

interface IFunctionalityPdfAnnotatorDetailProps {
  file: File
  onClearFile: () => void
}
const FunctionalityPdfAnnotatorDetail: FC<
  IFunctionalityPdfAnnotatorDetailProps
> = ({ file, onClearFile }) => {
  return (
    <Box
      sx={{
        width: 1000,
        height: 600,
      }}
    >
      <FunctionalityCommonOperatePdfToolViewMain
        file={file}
        isShowBottomOperation={true}
      />
    </Box>
  )
}
export default FunctionalityPdfAnnotatorDetail
