import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'
import { PaperProps } from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import React, { FC, useMemo } from 'react'

type IPaperLayoutProps = PaperProps & {
  title?: string
  bordered?: boolean
}

const AppPaperCardLayout: FC<IPaperLayoutProps> = (props) => {
  const { title, sx, children, bordered, ...paperProps } = props
  const renderTitle = useMemo(() => {
    if (typeof title === 'string') {
      return (
        <>
          <Typography
            fontSize={24}
            component={'h2'}
            fontWeight={700}
            display={'flex'}
          >
            {title}
          </Typography>
          <Divider sx={{ my: 2 }} />
        </>
      )
    }
    return title
  }, [title])
  return (
    <Paper
      className={'app-paper-card-layout'}
      sx={{
        p: '12px 16px',
        height: '100%',
        border: bordered ? '1px solid rgba(0, 0, 0, 0.08)' : 'unset',
        ...sx,
      }}
      elevation={0}
      {...paperProps}
    >
      {renderTitle}
      {children}
    </Paper>
  )
}

export default AppPaperCardLayout
