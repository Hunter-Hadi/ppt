import { Box, Button, ButtonGroup } from '@mui/material'
import React, { FC, useMemo, useRef } from 'react'

import FunctionalityCommonColorButtonPopover from '@/features/functionality_common/components/FunctionalityCommonPopover/FunctionalityCommonColorButtonPopover'
import { useFunctionalityCommonElementSize } from '@/features/functionality_common/hooks/useFunctionalityCommonElementSize'
import useFunctionalityCommonIsMobile from '@/features/functionality_common/hooks/useFunctionalityCommonIsMobile'

import {
  ITextContentHighlighterAnnotationInfo,
  ITextContentHighlighterViewportHighlight,
} from '../../../types/TextContentHighlighter'
import FunctionalityCommonOperateIcon from '../../FunctionalityCommonOperateIcon'
interface IFunctionalityCommonTextContentPageEditTipProps {
  annotationEditInfo: ITextContentHighlighterViewportHighlight
  onChange: (data: ITextContentHighlighterAnnotationInfo) => void
  deleteSelected: () => void
  pdfViewScale: number
}

const FunctionalityCommonTextContentPageEditTip: FC<
  IFunctionalityCommonTextContentPageEditTipProps
> = ({ annotationEditInfo, onChange, pdfViewScale, deleteSelected }) => {
  const viewRef = useRef<HTMLDivElement>(null)
  const { height: viewWrapHeight, width: viewWrapWidth } =
    useFunctionalityCommonElementSize(viewRef)
  const isMobile = useFunctionalityCommonIsMobile()
  const left = useMemo(() => {
    const currentLeft =
      annotationEditInfo.position.boundingRect.left +
      annotationEditInfo.position.boundingRect.width
    if (currentLeft + 150 * 1.5 > viewWrapWidth) {
      return viewWrapWidth - 150 * 1.5
    }
    return currentLeft
  }, [
    annotationEditInfo.position.boundingRect.left,
    annotationEditInfo.position.boundingRect.width,
    viewWrapWidth,
  ])

  const top = useMemo(() => {
    const currentTop =
      annotationEditInfo.position.boundingRect.top +
      annotationEditInfo.position.boundingRect.height
    const viewHeight = viewWrapHeight || 500
    if (currentTop + 150 > viewHeight) {
      return currentTop - 80
    }
    return currentTop - 50
  }, [
    annotationEditInfo.position.boundingRect.height,
    annotationEditInfo.position.boundingRect.top,
    viewWrapHeight,
  ])
  const onChangeHighlight = (type: string, val: string) => {
    onChange({
      type: type as 'highlight' | 'underline' | 'strikethrough',
      color: val,
      transparency: 0.5,
    })
  }
  const annotationInfo = annotationEditInfo.annotation?.[0]
  return (
    <Box
      className='functionality-common-text-content-page-edit-tip'
      ref={viewRef}
      sx={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          left: left * pdfViewScale,
          top: top * pdfViewScale,
          zIndex: 9999,
        }}
      >
        <Box>
          {annotationInfo && (
            <ButtonGroup
              variant='outlined'
              sx={{
                borderRadius: 2,
                bgcolor: isMobile ? '#fff' : '#fafafa',
                height: isMobile ? 60 : 40,
              }}
            >
              <FunctionalityCommonColorButtonPopover
                isShowRightIcon={false}
                isClickClose={true}
                currentColor={annotationInfo.color}
                buttonProps={{
                  variant: 'outlined',
                }}
                colorList={[
                  'black',
                  'blue',
                  'red',
                  'green',
                  'yellow',
                  'orange',
                  'purple',
                  'pink',
                  'brown',
                  'gray',
                ]}
                onSelectedColor={(val) =>
                  onChangeHighlight(annotationInfo.type, val)
                }
                showColorPicker={true}
              ></FunctionalityCommonColorButtonPopover>
              <Button onClick={() => deleteSelected()} size='small'>
                <FunctionalityCommonOperateIcon name='DeleteForeverOutlined' />
              </Button>
            </ButtonGroup>
          )}
        </Box>
      </Box>
    </Box>
  )
}
export default FunctionalityCommonTextContentPageEditTip
