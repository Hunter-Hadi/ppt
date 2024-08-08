import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon'
import React from 'react'
import { FC } from 'react'

const ThumbUp: FC<SvgIconProps> = (props) => {
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
          id='mask0_286_26918'
          maskUnits='userSpaceOnUse'
          x='0'
          y='0'
          width='20'
          height='20'
        >
          <rect width='20' height='20' fill='#D9D9D9' />
        </mask>
        <g mask='url(#mask0_286_26918)'>
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M13.8748 3.04183L13.5145 4.46683L12.9582 6.66683H15.2274H17.4998C17.9443 6.66683 18.3332 6.8335 18.6665 7.16683C18.9998 7.50016 19.1665 7.88905 19.1665 8.3335V10.0002C19.1665 10.0974 19.1561 10.2016 19.1353 10.3127C19.1144 10.4238 19.0832 10.5279 19.0415 10.6252L16.5415 16.5002C16.4165 16.7779 16.2082 17.0141 15.9165 17.2085C15.6248 17.4029 15.3193 17.5002 14.9998 17.5002H8.8665H6.6665V15.3002V6.66683L10.9442 2.38913L12.4998 0.833496L13.5415 1.87516L13.5419 1.87559C13.639 1.97277 13.7187 2.10457 13.7811 2.271C13.821 2.37749 13.8482 2.48116 13.8626 2.58198C13.8708 2.63895 13.8748 2.69501 13.8748 2.75016V3.04183ZM8.8665 15.3002H14.6612L16.9665 9.88279V8.86683H12.9582H10.1326L10.8253 6.12748L10.9973 5.44729L8.8665 7.5781V15.3002ZM4.99984 17.5002V6.66683H1.6665V17.5002H4.99984Z'
            fill='#9065B0'
          />
        </g>
      </svg>
    </SvgIcon>
  )
}
export default ThumbUp
