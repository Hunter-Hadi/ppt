import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon'
import { FC } from 'react'
import React from 'react'

const Gmail: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon viewBox='0 0 20 20' sx={props.sx}>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36' fill='none'>
        <g clipPath='url(#clip0_702_27780)'>
          <path
            d='M3.12136 32.0425H8.84859V18.1335L0.666748 11.9971V29.5881C0.666748 30.9442 1.76517 32.0427 3.12136 32.0427V32.0425Z'
            fill='#4285F4'
          />
          <path
            d='M28.4849 32.0425H34.2122C35.5683 32.0425 36.6667 30.9441 36.6667 29.588V11.9971L28.4849 18.1335V32.0425Z'
            fill='#34A853'
          />
          <path
            d='M28.4849 7.49727V18.1337L36.6667 11.9973V8.72457C36.6667 5.69115 33.2038 3.95865 30.7758 5.77911L28.4849 7.49727Z'
            fill='#FBBC04'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M8.84863 18.1335V7.49707L18.6668 14.8608L28.4849 7.49707V18.1335L18.6668 25.4971L8.84863 18.1335Z'
            fill='#EA4335'
          />
          <path
            d='M0.666748 8.72458V11.9973L8.84859 18.1337V7.49727L6.55767 5.77912C4.12964 3.95866 0.666748 5.69116 0.666748 8.72444V8.72458Z'
            fill='#C5221F'
          />
        </g>
        <defs>
          <clipPath id='clip0_702_27780'>
            <rect
              width='36'
              height='36'
              fill='white'
              transform='translate(0.666748)'
            />
          </clipPath>
        </defs>
      </svg>
    </SvgIcon>
  )
}
export default Gmail
