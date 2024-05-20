import { SvgIcon, SvgIconProps } from '@mui/material';
import { FC } from 'react';

const NumberPages: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <svg viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <g clip-path='url(#clip0_11516_92161)'>
          <path
            d='M7.68 0H40.32C42.96 0 43.968 0.288 44.928 0.816C45.888 1.344 46.656 2.112 47.184 3.072C47.712 4.032 48 5.04 48 7.68V40.32C48 42.96 47.712 43.968 47.184 44.928C46.656 45.888 45.888 46.656 44.928 47.184C43.968 47.712 42.96 48 40.32 48H7.68C5.04 48 4.032 47.712 3.072 47.184C2.112 46.656 1.344 45.888 0.816 44.928C0.288 43.968 0 42.96 0 40.32V7.68C0 5.04 0.288 4.032 0.816 3.072C1.344 2.112 2.112 1.344 3.072 0.816C4.032 0.288 5.04 0 7.68 0Z'
            fill='#4A8DFF'
          />
          <path
            fill-rule='evenodd'
            clip-rule='evenodd'
            d='M20 28H9C7.34315 28 6 26.6569 6 25V9C6 7.34315 7.34315 6 9 6H25C26.6569 6 28 7.34315 28 9V20H39C40.6569 20 42 21.3431 42 23V39C42 40.6569 40.6569 42 39 42H23C21.3431 42 20 40.6569 20 39V28ZM9 8H25C25.5523 8 26 8.44772 26 9V20H23C21.3431 20 20 21.3431 20 23V26H9C8.44772 26 8 25.5523 8 25V9C8 8.44772 8.44772 8 9 8ZM23 22H39C39.5523 22 40 22.4477 40 23V39C40 39.5523 39.5523 40 39 40H23C22.4477 40 22 39.5523 22 39V23C22 22.4477 22.4477 22 23 22ZM10.6214 19.1785V20.8405H18.3984V18.9548H13.8174V18.8802L15.4101 17.3195C16.1594 16.6377 16.74 16.0535 17.152 15.567C17.5639 15.077 17.8498 14.6313 18.0096 14.23C18.1729 13.8287 18.2546 13.4221 18.2546 13.0102C18.2546 12.3817 18.093 11.8241 17.7699 11.3376C17.4467 10.8511 16.9939 10.4711 16.4116 10.1977C15.8327 9.92072 15.1527 9.78223 14.3714 9.78223C13.6115 9.78223 12.9403 9.92605 12.3579 10.2137C11.7755 10.5013 11.3228 10.9079 10.9996 11.4335C10.6765 11.9591 10.5149 12.5787 10.5149 13.2925H12.7042C12.7042 12.9445 12.7716 12.6444 12.9066 12.3923C13.0415 12.1402 13.2333 11.9466 13.4819 11.8117C13.7304 11.6768 14.0216 11.6093 14.3554 11.6093C14.675 11.6093 14.9609 11.6732 15.213 11.801C15.4652 11.9253 15.664 12.1047 15.8096 12.339C15.9552 12.5699 16.028 12.8451 16.028 13.1647C16.028 13.4523 15.9694 13.7204 15.8523 13.969C15.7351 14.214 15.5628 14.4644 15.3356 14.7201C15.1118 14.9758 14.8349 15.2634 14.5046 15.583L10.6214 19.1785ZM35.9166 37.9996V27.0906H33.7486L31.0479 28.8004V30.8459L33.5462 29.2798H33.6101V37.9996H35.9166Z'
            fill='white'
          />
        </g>
        <defs>
          <clipPath id='clip0_11516_92161'>
            <rect width='48' height='48' fill='white' />
          </clipPath>
        </defs>
      </svg>
    </SvgIcon>
  );
};

export default NumberPages;
