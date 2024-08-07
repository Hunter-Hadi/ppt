import { Box, Button, ButtonGroup, Stack } from '@mui/material'
import React, { FC, useMemo, useRef } from 'react'
import { useRecoilState } from 'recoil'

import FunctionalitySignPdfColorButtonPopover from '@/features/functionality_common/components/FunctionalityCommonPopover/FunctionalityCommonColorButtonPopover'
import { useFunctionalityCommonElementSize } from '@/features/functionality_common/hooks/useFunctionalityCommonElementSize'
import useFunctionalityCommonIsMobile from '@/features/functionality_common/hooks/useFunctionalityCommonIsMobile'

import {
  highlightColorState,
  strikethroughColorState,
  underlineColorState,
} from '../../../store/setTextContentAnnotator'
import {
  ITextContentHighlighterAnnotationInfo,
  ITextContentHighlighterPosition,
} from '../../../types/TextContentHighlighter'
import FunctionalityCommonOperateIcon from '../../FunctionalityCommonOperateIcon'
interface IFunctionalityCommonTextContentPageTip {
  selectPosition: ITextContentHighlighterPosition
  onChange: (data: ITextContentHighlighterAnnotationInfo) => void
  pdfViewScale: number
}

const FunctionalityCommonTextContentPageTip: FC<
  IFunctionalityCommonTextContentPageTip
> = ({ selectPosition, onChange, pdfViewScale }) => {
  const viewRef = useRef<HTMLDivElement>(null)
  const { height: viewWrapHeight, width: viewWrapWidth } =
    useFunctionalityCommonElementSize(viewRef)
  const [highlightColor, setHighlightColor] =
    useRecoilState(highlightColorState) // highlightColorState is a Recoil atom
  const [underlineColor, setUnderlineColor] =
    useRecoilState(underlineColorState) // underlineColorState is a Recoil atom
  const [strikethroughColor, setStrikethroughColor] = useRecoilState(
    strikethroughColorState,
  ) // strikethroughColorState is a Recoil atom

  const isMobile = useFunctionalityCommonIsMobile()
  const left = useMemo(() => {
    const currentLeft =
      selectPosition.boundingRect.left + selectPosition.boundingRect.width
    if (currentLeft + 184 * 1.5 > viewWrapWidth) {
      return viewWrapWidth - 184 * 1.5
    }
    return currentLeft
  }, [
    selectPosition.boundingRect.left,
    selectPosition.boundingRect.width,
    viewWrapWidth,
  ])

  const top = useMemo(() => {
    const currentTop =
      selectPosition.boundingRect.top + selectPosition.boundingRect.height
    const viewHeight = viewWrapHeight || 500
    if (currentTop + 150 > viewHeight) {
      return currentTop - 80
    }
    return currentTop - 50
  }, [
    selectPosition.boundingRect.height,
    selectPosition.boundingRect.top,
    viewWrapHeight,
  ])
  const onAddHighlight = (type: string, val: string) => {
    switch (type) {
      case 'highlight':
        setHighlightColor(val)
        break
      case 'underline':
        setUnderlineColor(val)
        break
      case 'strikethrough':
        setStrikethroughColor(val)
        break
    }
    onChange({
      type: type as 'highlight' | 'underline' | 'strikethrough',
      color: val,
      transparency: 0.5,
    })
  }

  const toolsList = [
    {
      key: 'highlight',
      icon: 'ModeEditIcon',
      value: highlightColor,
    },
    {
      key: 'underline',
      icon: 'FormatUnderlinedIcon',
      value: underlineColor,
    },
    {
      key: 'strikethrough',
      icon: 'StrikethroughSIcon',
      value: strikethroughColor,
    },
  ]
  return (
    <Box
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
          <ButtonGroup
            variant='outlined'
            sx={{
              borderRadius: 2,
              bgcolor: isMobile ? '#fff' : '#fafafa',
              height: isMobile ? 60 : 40,
              // transform: 'translateX(-180px)',
            }}
          >
            {toolsList.map((tool) => (
              <FunctionalitySignPdfColorButtonPopover
                key={tool.key}
                isShowRightIcon={false}
                isClickClose={true}
                currentColor={tool.value}
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
                onSelectedColor={(val) => onAddHighlight(tool.key, val)}
                showColorPicker={true}
              >
                {(props) => (
                  <ButtonGroup
                    sx={{
                      borderRadius: 2,
                      bgcolor: isMobile ? '#fff' : '#fafafa',
                    }}
                  >
                    <Stack
                      flexDirection='row'
                      alignItems='center'
                      justifyContent='center'
                    >
                      <Button
                        variant='text'
                        sx={{
                          padding: '0px!important',
                          minWidth: '24px!important',
                        }}
                        onClick={(e) => {
                          onAddHighlight(tool.key, props.color)
                          e.stopPropagation()
                        }}
                      >
                        <Box>
                          <Box
                            sx={{
                              height: '20px',
                            }}
                          >
                            <FunctionalityCommonOperateIcon
                              name={tool.icon}
                              fontSize='small'
                            />
                          </Box>
                          <Box
                            sx={{
                              width: '100%',
                              bgcolor: props.color,
                              height: '3px',
                              borderRadius: '2px',
                              border: '1px solid #000',
                            }}
                          ></Box>
                        </Box>
                      </Button>
                      <FunctionalityCommonOperateIcon
                        name='ArrowDropDown'
                        fontSize='small'
                      />
                    </Stack>
                  </ButtonGroup>
                )}
              </FunctionalitySignPdfColorButtonPopover>
            ))}
          </ButtonGroup>
        </Box>
      </Box>
    </Box>
  )
}
export default FunctionalityCommonTextContentPageTip
