import { SvgIcon, SvgIconProps } from '@mui/material'
import { FC } from 'react'
import React from 'react'

const ClaudeLogoBlack: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon viewBox='0 0 20 20' sx={props.sx}>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 36 36' fill='none'>
        <g clipPath='url(#clip0_695_10301)'>
          <path
            d='M30.6665 0H6.6665C3.3528 0 0.666504 2.68629 0.666504 6V30C0.666504 33.3137 3.3528 36 6.6665 36H30.6665C33.9802 36 36.6665 33.3137 36.6665 30V6C36.6665 2.68629 33.9802 0 30.6665 0Z'
            fill='#FAFAF7'
          />
          <path
            d='M24.1396 9.07324H20.2331L27.3571 27.0732H31.2637L24.1396 9.07324ZM12.8531 9.07324L5.729 27.0732H9.71263L11.1695 23.2932H18.6226L20.0795 27.0732H24.0631L16.9391 9.07324H12.8531ZM12.4582 19.9503L14.8961 13.6244L17.3339 19.9503H12.4582Z'
            fill='#1F1F1F'
          />
        </g>
        <defs>
          <clipPath id='clip0_695_10301'>
            <rect
              width='36'
              height='36'
              fill='white'
              transform='translate(0.666504)'
            />
          </clipPath>
        </defs>
      </svg>
    </SvgIcon>
  )
}
export default ClaudeLogoBlack
