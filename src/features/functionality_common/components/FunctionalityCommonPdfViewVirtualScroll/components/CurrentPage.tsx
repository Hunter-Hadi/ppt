import { Box, Stack } from '@mui/material'
import React from 'react'
export const CurrentPage = ({ index, style, data, children }) => {
  const info = data[index]
  return (
    <div style={style} key={index}>
      <Stack alignItems='center'>
        <Box
          sx={{
            height: '100%',
            width: `${100 * (info?.viewScale || 1)}%`,
          }}
        >
          {children &&
            children({
              pdfInfo: info,
              index: index,
            })}
        </Box>
      </Stack>
    </div>
  )
}
