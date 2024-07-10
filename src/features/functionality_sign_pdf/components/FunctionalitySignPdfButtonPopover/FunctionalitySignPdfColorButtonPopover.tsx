import {
  Box,
  Button,
  ButtonProps,
  Slider,
  Stack,
  Typography,
} from '@mui/material'
import React, { FC, useEffect, useState } from 'react'

import FunctionalitySignPdfIcon from '../FunctionalitySignPdfIcon'
import FunctionalitySignPdfCommonButtonPopover from './FunctionalitySignPdfCommonButtonPopover'
interface IFunctionalitySignPdfColorButtonPopoverProps {
  colorList?: string[]
  onSelectedColor: (color: string) => void
  currentColor?: string
  currentTransparency?: number
  onChangeTransparency?: (transparency: number) => void
  buttonProps?: ButtonProps
  isShowRightIcon?: boolean
  titleText?: string
}
/**
 * 签名颜色选择按钮
 */
const FunctionalitySignPdfColorButtonPopover: FC<
  IFunctionalitySignPdfColorButtonPopoverProps
> = ({
  colorList,
  onSelectedColor,
  currentColor,
  currentTransparency,
  onChangeTransparency,
  buttonProps,
  isShowRightIcon = true,
  titleText,
}) => {
  const [currentShowColor, setShowCurrentColor] = useState('black')
  const [transparencyNumber, setTransparencyNumber] = useState(100)
  useEffect(() => {
    if (currentTransparency) {
      setTransparencyNumber(currentTransparency)
    }
  }, [currentTransparency])
  useEffect(() => {
    if (currentColor) {
      setShowCurrentColor(currentColor)
    }
  }, [currentColor])
  const handleColorSelect = (color) => {
    onSelectedColor(color)
    setShowCurrentColor(color)
  }
  const handleSliderChange = (event, number) => {
    setTransparencyNumber(number)
    onChangeTransparency && onChangeTransparency(number)
  }
  return (
    <FunctionalitySignPdfCommonButtonPopover
      isShowRightIcon={isShowRightIcon}
      buttonProps={{
        variant: 'outlined',
        ...buttonProps,
      }}
      popoverView={
        <Box sx={{ maxWidth: 260 }}>
          {currentTransparency !== undefined && (
            <Stack
              direction='row'
              alignItems='center'
              gap={1}
              paddingBottom={1}
              marginBottom={2}
              borderBottom='1px solid #e8e8e8'
            >
              <FunctionalitySignPdfIcon name='OpacityRounded' />
              <Slider
                aria-label='Temperature'
                value={transparencyNumber}
                defaultValue={currentTransparency || 100}
                onClick={(e) => {
                  e.stopPropagation()
                }}
                onChange={handleSliderChange}
              />
              <Box width={80} ml={1}>
                <Typography
                  sx={{
                    fontSize: {
                      lg: 14,
                    },
                  }}
                >
                  {transparencyNumber || '0'}%
                </Typography>
              </Box>
            </Stack>
          )}
          {(colorList || ['black', 'blue', 'red']).map((color) => (
            <Button
              onClick={(e) => {
                handleColorSelect(color)
              }}
              key={color}
              sx={{
                bgcolor: color === currentShowColor ? '#64467b52' : '',
                '&:hover': {
                  bgcolor: color === currentShowColor ? '#64467b52' : '',
                },
              }}
            >
              <Box
                sx={{
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  border: '1px solid #e8e8e8',
                  position: 'relative',
                  backgroundColor: color,
                  '&:hover': {
                    backgroundColor: color,
                  },
                  '&:before':
                    color === 'transparent'
                      ? {
                          content: '" "',
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          transform:
                            'translateX(-90%) translateY(-50%) rotate(45deg)',
                          width: '1px',
                          height: 20,
                          backgroundColor: 'red',
                        }
                      : '',
                }}
              ></Box>
            </Button>
          ))}
        </Box>
      }
    >
      {titleText && (
        <Stack
          sx={{
            width: '100%',
          }}
          direction='column'
          alignItems='center'
        >
          <Typography
            sx={{
              lineHeight: 1,
              textAlign: 'center',
            }}
          >
            {titleText}
          </Typography>
          <Box
            sx={{
              width: '100%',
              height: 3,
              border: '1px solid #e8e8e8',
              bgcolor: currentShowColor,
              borderRadius: 1,
            }}
          />
        </Stack>
      )}
      {!titleText && (
        <Box
          sx={{
            width: 20,
            height: 20,
            border: '1px solid #e8e8e8',
            bgcolor: currentShowColor,
            borderRadius: '50%',
          }}
        />
      )}
    </FunctionalitySignPdfCommonButtonPopover>
  )
}
export default FunctionalitySignPdfColorButtonPopover
