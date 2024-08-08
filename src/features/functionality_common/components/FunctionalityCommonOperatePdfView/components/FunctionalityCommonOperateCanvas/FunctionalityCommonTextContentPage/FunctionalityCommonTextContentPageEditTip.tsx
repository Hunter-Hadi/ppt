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
  const selectWidth = 80
  const selectHeight = 60

  const left = useMemo(() => {
    const currentLeft =
      annotationEditInfo.position.boundingRect.left * pdfViewScale +
      annotationEditInfo.position.boundingRect.width * pdfViewScale
    if (currentLeft + selectWidth > viewWrapWidth) {
      return viewWrapWidth - selectWidth
    }
    return currentLeft
  }, [
    pdfViewScale,
    annotationEditInfo.position.boundingRect.left,
    annotationEditInfo.position.boundingRect.width,
    selectWidth,
    viewWrapWidth,
  ])

  const top = useMemo(() => {
    const currentTop =
      annotationEditInfo.position.boundingRect.top * pdfViewScale +
      annotationEditInfo.position.boundingRect.height * pdfViewScale -
      selectHeight
    if (currentTop < 0) {
      return selectHeight
    }
    return currentTop
  }, [
    pdfViewScale,
    selectHeight,
    annotationEditInfo.position.boundingRect.height,
    annotationEditInfo.position.boundingRect.top,
  ])
  const annotationInfo = annotationEditInfo.annotation?.[0]

  const onChangeHighlight = (type: string, val: string) => {
    onChange({
      type: type as 'highlight' | 'underline' | 'strikethrough',
      color: val,
      transparency: annotationInfo?.transparency,
    })
  }
  const onChangeTransparency = (transparency: number) => {
    // TODO
    if (annotationInfo) {
      onChange({
        type: annotationInfo?.type,
        color: annotationInfo.color,
        transparency: transparency / 100,
      })
    }
  }
  const currentTransparency =
    annotationInfo?.type === 'highlight'
      ? (annotationInfo?.transparency || 1) * 100
      : undefined
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
          left: left,
          top: top,
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
                currentTransparency={currentTransparency}
                currentColor={annotationInfo.color}
                onChangeTransparency={onChangeTransparency}
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
