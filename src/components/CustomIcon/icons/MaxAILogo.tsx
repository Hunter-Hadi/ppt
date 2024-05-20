import { SvgIcon, SvgIconProps } from '@mui/material';
import { FC } from 'react';

const MaxAILogo: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon viewBox='0 0 20 20' sx={props.sx}>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none'>
        <mask
          id='mask0_702_29429'
          style={{
            maskType: 'alpha',
          }}
          maskUnits='userSpaceOnUse'
          x='0'
          y='0'
          width='24'
          height='24'
        >
          <rect width='24' height='24' fill='#D9D9D9' />
        </mask>
        <g mask='url(#mask0_702_29429)'>
          <path
            d='M19.0002 9L17.7502 6.25L15.0002 5L17.7502 3.75L19.0002 1L20.2502 3.75L23.0002 5L20.2502 6.25L19.0002 9ZM19.0002 23L17.7502 20.25L15.0002 19L17.7502 17.75L19.0002 15L20.2502 17.75L23.0002 19L20.2502 20.25L19.0002 23ZM9.00024 20L6.50024 14.5L1.00024 12L6.50024 9.5L9.00024 4L11.5002 9.5L17.0002 12L11.5002 14.5L9.00024 20Z'
            fill='#9065B0'
          />
        </g>
      </svg>
    </SvgIcon>
  );
};
export default MaxAILogo;