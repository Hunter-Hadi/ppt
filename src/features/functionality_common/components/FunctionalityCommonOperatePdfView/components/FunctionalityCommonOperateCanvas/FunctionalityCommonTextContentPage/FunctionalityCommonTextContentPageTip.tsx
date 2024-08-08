import { Box, Button, ButtonGroup, Stack } from '@mui/material'
import React, { FC, useEffect, useMemo, useRef } from 'react'
import { useRecoilState } from 'recoil'

import FunctionalityCommonColorButtonPopover from '@/features/functionality_common/components/FunctionalityCommonPopover/FunctionalityCommonColorButtonPopover'
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
  const selectWidth = 200
  const selectHeight = 60

  const left = useMemo(() => {
    const currentLeft =
      selectPosition.boundingRect.left * pdfViewScale +
      selectPosition.boundingRect.width * pdfViewScale
    if (currentLeft + selectWidth > viewWrapWidth) {
      return viewWrapWidth - selectWidth
    }
    return currentLeft
  }, [
    pdfViewScale,
    selectPosition.boundingRect.left,
    selectPosition.boundingRect.width,
    selectWidth,
    viewWrapWidth,
  ])

  const top = useMemo(() => {
    const currentTop =
      selectPosition.boundingRect.top * pdfViewScale +
      selectPosition.boundingRect.height * pdfViewScale -
      selectHeight
    if (currentTop < 0) {
      return selectHeight
    }
    return currentTop
  }, [
    pdfViewScale,
    selectHeight,
    selectPosition.boundingRect.height,
    selectPosition.boundingRect.top,
  ])
  useEffect(() => {
    console.log('top:', top)
  }, [left, top])
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
          left: left,
          top: top,
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
              <FunctionalityCommonColorButtonPopover
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
              </FunctionalityCommonColorButtonPopover>
            ))}
          </ButtonGroup>
        </Box>
      </Box>
    </Box>
  )
}
export default FunctionalityCommonTextContentPageTip
