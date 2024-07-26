import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { SxProps } from '@mui/material/styles'
import React, { FC } from 'react'

const AppContainer: FC<{
  children: React.ReactNode
  sx?: SxProps
  maxWidth?: string | number
}> = ({ children, sx, maxWidth = 'lg' }) => {
  return (
    <Stack
      direction='row'
      sx={{
        width: '100%',
        flex: 1,
        minHeight: `calc(100% - 65px)`,
        bgcolor: 'pageBackground',
        ...sx,
      }}
    >
      <Box
        sx={{
          boxSizing: 'border-box',
          width: '100%',
          mx: 'auto',
          px: 2,
          maxWidth: maxWidth,
        }}
      >
        {children}
      </Box>
    </Stack>
  )
}
export default AppContainer
