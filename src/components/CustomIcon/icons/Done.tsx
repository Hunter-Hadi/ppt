import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon'
import { FC } from 'react'
import React from 'react'

const Done: FC<SvgIconProps> = (props) => {
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
          id='mask0_286_27243'
          maskUnits='userSpaceOnUse'
          x='0'
          y='0'
          width='20'
          height='20'
        >
          <rect width='20' height='20' fill='#D9D9D9' />
        </mask>
        <g mask='url(#mask0_286_27243)'>
          <path
            d='M8.83333 13.5L14.7083 7.625L13.5417 6.45833L8.83333 11.1667L6.45833 8.79167L5.29167 9.95833L8.83333 13.5ZM4.16667 17.5C3.70833 17.5 3.31597 17.3368 2.98958 17.0104C2.66319 16.684 2.5 16.2917 2.5 15.8333V4.16667C2.5 3.70833 2.66319 3.31597 2.98958 2.98958C3.31597 2.66319 3.70833 2.5 4.16667 2.5H15.8333C16.2917 2.5 16.684 2.66319 17.0104 2.98958C17.3368 3.31597 17.5 3.70833 17.5 4.16667V15.8333C17.5 16.2917 17.3368 16.684 17.0104 17.0104C16.684 17.3368 16.2917 17.5 15.8333 17.5H4.16667Z'
            fill='#34A853'
          />
        </g>
      </svg>
    </SvgIcon>
  )
}
export default Done
