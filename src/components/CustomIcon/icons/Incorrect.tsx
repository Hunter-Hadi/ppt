import { SvgIcon, SvgIconProps } from '@mui/material'
import { FC } from 'react'
import React from 'react'

const Incorrect: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon viewBox='0 0 20 20' sx={props.sx}>
      <svg
        width='20'
        height='20'
        viewBox='0 0 20 20'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <mask
          id='mask0_286_26993'
          maskUnits='userSpaceOnUse'
          x='0'
          y='0'
          width='20'
          height='20'
        >
          <rect width='20' height='20' fill='#D9D9D9' />
        </mask>
        <g mask='url(#mask0_286_26993)'>
          <path
            d='M5.33317 15.8332L4.1665 14.6665L8.83317 9.99984L4.1665 5.33317L5.33317 4.1665L9.99984 8.83317L14.6665 4.1665L15.8332 5.33317L11.1665 9.99984L15.8332 14.6665L14.6665 15.8332L9.99984 11.1665L5.33317 15.8332Z'
            fill='#F80000'
          />
        </g>
      </svg>
    </SvgIcon>
  )
}
export default Incorrect
