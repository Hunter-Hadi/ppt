import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon'
import { FC } from 'react'
import React from 'react'

const GoogleAds: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon viewBox='0 0 20 20' sx={props.sx}>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 25 25' fill='none'>
        <path
          d='M2.14844 17.4307L9.33888 4.97559L15.5695 8.57302L8.37997 21.0281L2.14844 17.4307Z'
          fill='#FBBC04'
        />
        <path
          d='M22.8202 17.3872L15.6253 4.92769C14.6965 3.17103 12.5201 2.49989 10.7635 3.42868C9.00682 4.35748 8.33656 6.53383 9.26448 8.29049C9.3052 8.36752 9.34859 8.44278 9.39463 8.51715L16.5895 20.9767C17.5599 22.7103 19.7522 23.3292 21.4858 22.3588C23.2195 21.3884 23.8384 19.1961 22.868 17.4625C22.852 17.4341 22.8361 17.4067 22.8202 17.3793V17.3872Z'
          fill='#4285F4'
        />
        <path
          d='M5.29983 22.7994C7.28663 22.7994 8.89726 21.1887 8.89726 19.2019C8.89726 17.2151 7.28663 15.6045 5.29983 15.6045C3.31302 15.6045 1.70239 17.2151 1.70239 19.2019C1.70239 21.1887 3.31302 22.7994 5.29983 22.7994Z'
          fill='#34A853'
        />
      </svg>
    </SvgIcon>
  )
}
export default GoogleAds
