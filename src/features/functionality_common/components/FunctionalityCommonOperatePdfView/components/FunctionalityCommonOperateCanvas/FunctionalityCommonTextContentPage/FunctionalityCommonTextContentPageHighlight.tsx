import { Box } from '@mui/material'
import React, { FC } from 'react'

import { ITextContentHighlighterViewportHighlight } from '../../../types/TextContentHighlighter'
interface IFunctionalityCommonTextContentPageHighlight {
  viewHighlights: ITextContentHighlighterViewportHighlight[]
  pdfViewScale: number
}
const FunctionalityCommonTextContentPageHighlight: FC<
  IFunctionalityCommonTextContentPageHighlight
> = ({ viewHighlights, pdfViewScale }) => {
  return (
    <Box className='FunctionalityCommonTextContentPageHighlight'>
      {viewHighlights.map((item) => {
        return (
          <Box key={item.id}>
            {item.position.rects.map((rect, index) => (
              <Box
                key={index}
                sx={{
                  ...rect,
                  left: rect.left * pdfViewScale,
                  top: rect.top * pdfViewScale,
                  width: rect.width * pdfViewScale,
                  height: rect.height * pdfViewScale,
                  backgroundColor: '#b1407f75',
                  position: 'absolute',
                  zIndex: 9999,
                }}
              ></Box>
            ))}
          </Box>
        )
      })}
    </Box>
  )
}
export default FunctionalityCommonTextContentPageHighlight
