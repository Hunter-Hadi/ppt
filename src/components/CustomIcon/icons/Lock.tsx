import { SvgIcon, SvgIconProps } from '@mui/material'
import { FC } from 'react'
import React from 'react'

const Lock: FC<SvgIconProps> = (props) => {
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
          id='mask0_286_26761'
          maskUnits='userSpaceOnUse'
          x='0'
          y='0'
          width='20'
          height='20'
        >
          <rect width='20' height='20' fill='#D9D9D9' />
        </mask>
        <g mask='url(#mask0_286_26761)'>
          <path
            d='M5.00016 18.3335C4.54183 18.3335 4.14947 18.1703 3.82308 17.8439C3.49669 17.5175 3.3335 17.1252 3.3335 16.6668V8.3335C3.3335 7.87516 3.49669 7.4828 3.82308 7.15641C4.14947 6.83002 4.54183 6.66683 5.00016 6.66683H5.8335V5.00016C5.8335 3.84738 6.23975 2.86475 7.05225 2.05225C7.86475 1.23975 8.84738 0.833496 10.0002 0.833496C11.1529 0.833496 12.1356 1.23975 12.9481 2.05225C13.7606 2.86475 14.1668 3.84738 14.1668 5.00016V6.66683H15.0002C15.4585 6.66683 15.8509 6.83002 16.1772 7.15641C16.5036 7.4828 16.6668 7.87516 16.6668 8.3335V16.6668C16.6668 17.1252 16.5036 17.5175 16.1772 17.8439C15.8509 18.1703 15.4585 18.3335 15.0002 18.3335H5.00016ZM10.0002 14.1668C10.4585 14.1668 10.8509 14.0036 11.1772 13.6772C11.5036 13.3509 11.6668 12.9585 11.6668 12.5002C11.6668 12.0418 11.5036 11.6495 11.1772 11.3231C10.8509 10.9967 10.4585 10.8335 10.0002 10.8335C9.54183 10.8335 9.14947 10.9967 8.82308 11.3231C8.49669 11.6495 8.3335 12.0418 8.3335 12.5002C8.3335 12.9585 8.49669 13.3509 8.82308 13.6772C9.14947 14.0036 9.54183 14.1668 10.0002 14.1668ZM7.50016 6.66683H12.5002V5.00016C12.5002 4.30572 12.2571 3.71544 11.771 3.22933C11.2849 2.74322 10.6946 2.50016 10.0002 2.50016C9.30572 2.50016 8.71544 2.74322 8.22933 3.22933C7.74322 3.71544 7.50016 4.30572 7.50016 5.00016V6.66683Z'
            fill='black'
            fillOpacity='0.6'
          />
        </g>
      </svg>
    </SvgIcon>
  )
}
export default Lock
