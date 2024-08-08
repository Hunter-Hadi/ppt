import { Box, Slider, Stack, Typography } from '@mui/material'
import React, { FC, useState } from 'react'

import FunctionalityCommonIcon from './FunctionalityCommonIcon'
interface IFunctionalityCommonSliderView {
  defaultValue?: number
  onChangeTransparency: (value: number) => void
}
export const FunctionalityCommonSliderView: FC<
  IFunctionalityCommonSliderView
> = ({ onChangeTransparency, defaultValue }) => {
  const [transparencyNumber, setTransparencyNumber] = useState(
    defaultValue || 100,
  )

  const handleSliderChange = (event, number) => {
    setTransparencyNumber(number)
    onChangeTransparency && onChangeTransparency(number)
  }
  return (
    <Stack
      direction='row'
      alignItems='center'
      gap={1}
      borderBottom='1px solid #e8e8e8'
    >
      <FunctionalityCommonIcon name='OpacityRounded' />
      <Slider
        aria-label='Temperature'
        value={transparencyNumber}
        defaultValue={defaultValue || 100}
        onClick={(e) => {
          e.stopPropagation()
        }}
        onChange={handleSliderChange}
      />
      <Box width={90}>
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
