import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon'
import { FC } from 'react'
import React from 'react'

const DALLE: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <svg viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <g clipPath='url(#clip0_10676_149902)'>
          <path
            d='M0 7.16667C0 3.48477 2.98477 0.5 6.66667 0.5H13.3333C17.0152 0.5 20 3.48477 20 7.16667V13.8333C20 17.5152 17.0152 20.5 13.3333 20.5H6.66667C2.98477 20.5 0 17.5152 0 13.8333V7.16667Z'
            fill='black'
          />
          <path d='M5.49805 9H2.49805V12H5.49805V9Z' fill='#FEFF67' />
          <path d='M8.5 9H5.5V12H8.5V9Z' fill='#42FFFF' />
          <path d='M11.498 9H8.49805V12H11.498V9Z' fill='#52DB4C' />
          <path d='M14.499 9H11.499V12H14.499V9Z' fill='#FF6F3E' />
          <path d='M17.4971 9H14.4971V12H17.4971V9Z' fill='#3C46FF' />
        </g>
        <defs>
          <clipPath id='clip0_10676_149902'>
            <rect
              width='20'
              height='20'
              fill='white'
              transform='translate(0 0.5)'
            />
          </clipPath>
        </defs>
      </svg>
    </SvgIcon>
  )
}
export default DALLE
