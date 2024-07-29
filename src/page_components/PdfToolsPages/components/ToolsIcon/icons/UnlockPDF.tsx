import { SvgIcon, SvgIconProps } from '@mui/material'
import { FC } from 'react'
import React from 'react'

const UnlockPDF: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24'>
        <rect width='24' height='24' fill='#d4281d' rx='4'></rect>
        <path
          fill='#fff'
          fillRule='evenodd'
          d='M8 8c0-1.875 1.778-4 4-4 1.427 0 2.67.876 3.378 2l.958-.5A5.03 5.03 0 0 0 12 3C9.332 3 7 5.14 7 8v2H4v10h16V10H8zM5 19v-8h14v8zm7-6a1 1 0 0 0-1 1v2a1 1 0 1 0 2 0v-2a1 1 0 0 0-1-1'
          clipRule='evenodd'
        ></path>
      </svg>
    </SvgIcon>
  )
}

export default UnlockPDF
