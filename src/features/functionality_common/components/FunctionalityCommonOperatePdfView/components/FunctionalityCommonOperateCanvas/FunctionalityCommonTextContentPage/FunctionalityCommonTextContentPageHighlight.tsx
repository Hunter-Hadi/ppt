import { Box } from '@mui/material'
import React, { FC, useCallback } from 'react'

import {
  ITextContentHighlighterAnnotationInfo,
  ITextContentHighlighterViewportHighlight,
} from '../../../types/TextContentHighlighter'
interface IFunctionalityCommonTextContentPageHighlight {
  viewHighlights: ITextContentHighlighterViewportHighlight[]
  pdfViewScale: number
}
const FunctionalityCommonTextContentPageHighlight: FC<
  IFunctionalityCommonTextContentPageHighlight
> = ({ viewHighlights, pdfViewScale }) => {
  const boxStyle = useCallback(
    (data?: ITextContentHighlighterAnnotationInfo) => {
      if (data) {
        if (data.type === 'highlight') {
          return { backgroundColor: data.color, opacity: 0.5 }
        } else if (data.type === 'underline') {
          return {
            borderBottom: `2px solid ${data.color}`,
          }
        } else if (data.type === 'strikethrough') {
          return null
        }
      }
      return undefined
    },
    [],
  )
  return (
    <Box className='FunctionalityCommonTextContentPageHighlight'>
      {viewHighlights.map((viewHighlight) => {
        const annotationInfo = viewHighlight?.annotation?.[0]
        return (
          <Box key={viewHighlight.id}>
            {viewHighlight.position.rects.map((rect, index) => (
              <Box
                key={index}
                sx={{
                  ...rect,
                  left: rect.left * pdfViewScale,
                  top: rect.top * pdfViewScale,
                  width: rect.width * pdfViewScale,
                  height: rect.height * pdfViewScale,
                  position: 'absolute',
                  zIndex: 1000,
                  ...boxStyle(annotationInfo),
                }}
              >
                {annotationInfo && annotationInfo.type === 'strikethrough' && (
                  <Box
                    sx={{
                      position: 'absolute',
                      left: 0,
                      top: 'calc(50% - 2px)',
                      width: '100%',
                      height: '2px',
                      backgroundColor: annotationInfo.color,
                    }}
                  ></Box>
                )}
              </Box>
            ))}
          </Box>
        )
      })}
    </Box>
  )
}
export default FunctionalityCommonTextContentPageHighlight
