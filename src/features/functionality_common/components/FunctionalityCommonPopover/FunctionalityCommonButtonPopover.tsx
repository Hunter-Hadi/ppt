import { Popover } from '@mui/material'
import Button, { ButtonProps } from '@mui/material/Button'
import Paper from '@mui/material/Paper'
import React, { FC, useState } from 'react'

import useFunctionalityCommonIsMobile from '@/features/functionality_common/hooks/useFunctionalityCommonIsMobile'

import FunctionalitySignPdfIcon from './FunctionalitySignPdfIcon'
interface IFunctionalityCommonButtonPopoverProps {
  buttonProps?: ButtonProps
  children?: React.ReactNode
  popoverView?: React.ReactNode
  isShowRightIcon?: boolean
  isClickClose?: boolean // 点击弹窗内部是否关闭
}

// 通用的带弹出式按钮
const FunctionalityCommonButtonPopover: FC<
  IFunctionalityCommonButtonPopoverProps
> = ({
  children,
  popoverView,
  isShowRightIcon = true,
  buttonProps,
  isClickClose = true,
}) => {
  const isMobile = useFunctionalityCommonIsMobile()

  const [popoverAnchorEl, setPopoverAnchorEl] = useState<null | HTMLElement>(
    null,
  )

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    // debugger
    if (isClickClose) {
      setPopoverAnchorEl(popoverAnchorEl ? null : event.currentTarget)
    } else setPopoverAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setPopoverAnchorEl(null)
  }

  const open = Boolean(popoverAnchorEl)
  const id = open ? 'color-popper' : undefined

  return (
    <>
      <Button
        onClick={(e) => {
          e.stopPropagation()
          // e.preventDefault();
          handleClick(e)
        }}
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
          onClose={handleClose}
        >
          {/* <ClickAwayListener onClickAway={handleClose}> */}
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
          {/* </ClickAwayListener> */}
        </Popover>
      </Button>
    </>
  )
}

export default FunctionalityCommonButtonPopover
