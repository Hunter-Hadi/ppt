import {
  Box,
  Slider,
  Stack,
  Typography,
} from '@mui/material'
import React, { FC, useEffect, useState } from 'react'

import FunctionalitySignPdfIcon from './FunctionalitySignPdfIcon'
interface IFunctionalityCommonColorTransparencyPopover {
  currentTransparency: number
  onChangeTransparency: (transparency: number) => void
  sx?: any
}
/**
 * 签名颜色选择按钮
 */
const FunctionalityCommonColorTransparencyPopover: FC<
  IFunctionalityCommonColorTransparencyPopover
> = ({
  currentTransparency,
  onChangeTransparency,
  sx
}) => {
  const [transparencyNumber, setTransparencyNumber] = useState(100)
  useEffect(() => {
    if (currentTransparency) {
      setTransparencyNumber(currentTransparency)
    }
  }, [currentTransparency])
  const handleSliderChange = (event, number) => {
    setTransparencyNumber(number)
    onChangeTransparency && onChangeTransparency(number)
  }
  return (
    <Stack
      direction='row'
      alignItems='center'
      gap={1}
      sx={{...sx}}
    //   paddingBottom={1}
    //   marginBottom={2}
    //   borderBottom='1px solid #e8e8e8'
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
  )
}
export default FunctionalityCommonColorTransparencyPopover
