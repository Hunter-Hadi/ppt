import { SvgIcon, SvgIconProps } from '@mui/material';
import { FC } from 'react';

const TwitterX: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 25 25' fill='none'>
        <path
          d='M17.8426 5.01953H20.6027L14.5726 11.7969L21.6665 21.0195H16.1121L11.7616 15.4261L6.78373 21.0195H4.02194L10.4717 13.7703L3.6665 5.01953H9.36195L13.2944 10.1322L17.8426 5.01953ZM16.8738 19.3949H18.4033L8.53091 6.55881H6.8897L16.8738 19.3949Z'
          fill='black'
        />
      </svg>
    </SvgIcon>
  );
};
export default TwitterX;