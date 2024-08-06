import { Box, Button } from '@mui/material'
import React, { FC } from 'react'

import { ITextContentHighlighterPosition } from '../../../types/TextContentHighlighter'
interface IFunctionalityCommonTextContentPageTip {
  selectPosition: ITextContentHighlighterPosition
  onAdd: () => void
  pdfViewScale: number
}
const FunctionalityCommonTextContentPageTip: FC<
  IFunctionalityCommonTextContentPageTip
> = ({ selectPosition, onAdd, pdfViewScale }) => {
  const left = selectPosition.boundingRect.left
  const top = selectPosition.boundingRect.top - 30
  return (
    <Box
      sx={{
        position: 'absolute',
        left: left * pdfViewScale,
        top: top * pdfViewScale,
        zIndex: 9999,
      }}
    >
      <Button onClick={onAdd}>ADD </Button>
    </Box>
  )
}
export default FunctionalityCommonTextContentPageTip
