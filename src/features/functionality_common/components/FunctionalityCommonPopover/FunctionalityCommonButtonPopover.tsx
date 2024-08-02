import { Popover } from '@mui/material'
import Button, { ButtonProps } from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import React, { FC, useState } from 'react'

import useFunctionalityCommonIsMobile from '@/features/functionality_common/hooks/useFunctionalityCommonIsMobile'

import FunctionalitySignPdfIcon from './FunctionalitySignPdfIcon'
interface IFunctionalitySignPdfCommonButtonPopoverProps {
  buttonProps?: ButtonProps
  children?: React.ReactNode
  popoverView?: React.ReactNode
  isShowRightIcon?: boolean
}

// 通用的带弹出式按钮
const FunctionalitySignPdfCommonButtonPopover: FC<
  IFunctionalitySignPdfCommonButtonPopoverProps
> = ({ children, popoverView, isShowRightIcon = true, buttonProps }) => {
  const isMobile = useFunctionalityCommonIsMobile()

  const [popoverAnchorEl, setPopoverAnchorEl] = useState(null)

  const handleClick = (event) => {
    setPopoverAnchorEl(popoverAnchorEl ? null : event.currentTarget)
  }
  const open = Boolean(popoverAnchorEl)
  const id = open ? 'color-popper' : undefined

  return (
    <Button
      onClick={handleClick}
      variant='text'
      size='small'
      aria-describedby={id}
      sx={{
        p: 1,
        '.MuiButton-endIcon': {
          ml: isMobile ? 0 : 1,
        },
      }}
      endIcon={
        isShowRightIcon && <FunctionalitySignPdfIcon name='ArrowDropDown' />
      }
      {...buttonProps}
    >
      {children}
      <Popover
        id={id}
        open={open}
        anchorEl={popoverAnchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Paper
          sx={{
            p: 1,
            display: 'flex',
            justifyContent: 'space-around',
            ' button': {
              border: '1px solid transparent!important',
            },
          }}
        >
          {popoverView}
        </Paper>
      </Popover>
    </Button>
  )
}
export default FunctionalitySignPdfCommonButtonPopover
