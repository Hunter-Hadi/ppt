import { Box } from '@mui/material'
import React, { FC, useCallback } from 'react'

import {
  ITextContentHighlighterAnnotationInfo,
  ITextContentHighlighterViewportHighlight,
} from '../../../types/TextContentHighlighter'
interface IFunctionalityCommonTextContentPageHighlight {
  viewHighlights: ITextContentHighlighterViewportHighlight[]
  pdfViewScale: number
  onEdit: (data: ITextContentHighlighterViewportHighlight) => void
  annotationEditInfo?: ITextContentHighlighterViewportHighlight
}
const FunctionalityCommonTextContentPageHighlight: FC<
  IFunctionalityCommonTextContentPageHighlight
> = ({ viewHighlights, pdfViewScale, onEdit, annotationEditInfo }) => {
  const boxStyle = useCallback(
    (data?: ITextContentHighlighterAnnotationInfo) => {
      if (data) {
        if (data.type === 'highlight') {
          return {
            backgroundColor: data.color,
            opacity: data.transparency || 0.5,
          }
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
        const isDelHeight = annotationInfo?.type === 'underline' ? 0 : 0 //比实际的高了
        const isSelect = annotationEditInfo?.id === viewHighlight.id
        return (
          <Box key={viewHighlight.id}>
            {viewHighlight.position.rects.map((rect, index) => (
              <Box
                key={index}
                onClick={() => {
                  console.log('click--')
                  onEdit(viewHighlight)
                }}
                sx={{
                  ...rect,
                  left: rect.left * pdfViewScale,
                  top: rect.top * pdfViewScale,
                  width: rect.width * pdfViewScale,
                  height: rect.height * pdfViewScale - isDelHeight,
                  border: isSelect ? `1px dashed #9065B0` : 'none',
                  position: 'absolute',
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    cursor: 'pointer',
                    zIndex: 1000,
                    ...boxStyle(annotationInfo),
                  }}
                >
                  {annotationInfo &&
                    annotationInfo.type === 'strikethrough' && (
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
              </Box>
            ))}
          </Box>
        )
      })}
    </Box>
  )
}
export default FunctionalityCommonTextContentPageHighlight
