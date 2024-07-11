import { Button, SxProps } from '@mui/material'
import MenuItem from '@mui/material/MenuItem'
import React, { FC } from 'react'

import ProLink from '@/components/ProLink'
import { isInIframe } from '@/utils/utils'

interface IProps {
  isSmallScreen?: boolean
  link?: string
  children: React.ReactNode
  sx?: SxProps
  onClick?: (e: React.MouseEvent<HTMLElement>) => void
}

const MenuLinkItem: FC<IProps> = ({
  isSmallScreen = false,
  children,
  link,
  onClick,
  sx,
}) => {
  if (isSmallScreen) {
    return (
      <MenuItem
        sx={{
          p: 0,
          fontSize: 'unset !important',
          ...sx,
        }}
        onClick={onClick}
      >
        {link ? (
          <ProLink
            href={link}
            hardRefresh
            color='inherit'
            sx={{
              lineHeight: 1.5,
              py: 2,
              px: 2,
              width: '100%',
            }}
            target={isInIframe() ? '_blank' : '_self'}
          >
            {children}
          </ProLink>
        ) : (
          children
        )}
      </MenuItem>
    )
  } else {
    if (link) {
      return (
        <ProLink
          href={link}
          hardRefresh
          // color='inherit'
          target={isInIframe() ? '_blank' : '_self'}
          sx={{
            borderRadius: 2,
            lineHeight: 1.5,
            px: 2,
            py: 1.5,
            '&:hover': {
              backgroundColor: '#eee',
            },
            '&:active': {
              backgroundColor: 'rgba(0,0,0,0.08)',
            },
            ...sx,
          }}
        >
          {children}
        </ProLink>
      )
    } else {
      return (
        <Button
          sx={{
            // display: isSmallScreen ? 'none' : 'flex',
            px: 2,
            py: 1.5,
            '&:hover': {
              backgroundColor: '#eee',
            },
            '&:active': {
              backgroundColor: 'rgba(0,0,0,0.08)',
            },
            ...sx,
          }}
          onClick={onClick}
        >
          {children}
        </Button>
      )
    }
  }
}

export default MenuLinkItem
