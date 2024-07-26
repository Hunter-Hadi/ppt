import { Box, CircularProgress, SxProps, Typography } from '@mui/material'
import React, { FC } from 'react'

const AppLoadingLayout: FC<{
  loading: boolean
  loadingText?: string
  size?: number
  children?: React.ReactNode
  sx?: SxProps
}> = ({ loading, loadingText = 'Loading...', size = 16, sx, children }) => {
  return (
    <React.Fragment>
      {loading ? (
        <Box
          sx={{
            display: 'flex',
            alignContent: 'center',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            flexDirection: 'column',
            my: 2,
            ...sx,
          }}
        >
          <CircularProgress size={size} sx={{ m: '0 auto' }} />
          {loadingText === '' ? null : (
            <Typography
              mt={1.5}
              variant='body2'
              fontWeight={400}
              fontSize={16}
              lineHeight={1.25}
            >
              {loadingText}
            </Typography>
          )}
        </Box>
      ) : (
        children
      )}
    </React.Fragment>
  )
}
export default AppLoadingLayout
