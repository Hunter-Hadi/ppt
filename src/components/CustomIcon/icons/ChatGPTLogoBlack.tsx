import { SvgIcon, SvgIconProps } from '@mui/material';
import { FC } from 'react';

const ChatGPTLogoBlack: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon sx={props.sx}>
      <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <g clipPath='url(#clip0_4133_35972)'>
          <path
            d='M20 0H4C1.79086 0 0 1.79086 0 4V20C0 22.2091 1.79086 24 4 24H20C22.2091 24 24 22.2091 24 20V4C24 1.79086 22.2091 0 20 0Z'
            fill='black'
          />
          <path
            d='M19.8134 10.3669C20.0179 9.76086 20.0888 9.11884 20.0215 8.48367C19.9541 7.8485 19.75 7.23485 19.4228 6.68381C18.9378 5.85033 18.197 5.19043 17.3073 4.79933C16.4175 4.40824 15.4248 4.30617 14.4724 4.50786C14.0428 4.03019 13.5148 3.64857 12.9236 3.38854C12.3325 3.12851 11.6919 2.99607 11.0447 3.00009C10.0709 2.99778 9.12167 3.30061 8.33362 3.86497C7.54557 4.42931 6.95954 5.22601 6.65998 6.14017C6.02565 6.2683 5.42637 6.52864 4.90228 6.90378C4.37818 7.27893 3.94135 7.7602 3.62103 8.31541C3.13216 9.14661 2.92348 10.1094 3.02509 11.0653C3.1267 12.021 3.53334 12.9202 4.18638 13.6332C3.9819 14.2391 3.91098 14.8812 3.97833 15.5164C4.04569 16.1515 4.24978 16.7652 4.57695 17.3162C5.062 18.1497 5.80283 18.8095 6.69259 19.2007C7.58234 19.5917 8.57502 19.6938 9.52738 19.4922C9.95701 19.9698 10.485 20.3515 11.0761 20.6115C11.6673 20.8715 12.3079 21.0039 12.955 20.9999C13.9293 21.0024 14.8791 20.6995 15.6674 20.1348C16.4558 19.5701 17.042 18.7728 17.3412 17.8581C17.9756 17.73 18.5748 17.4696 19.099 17.0945C19.623 16.7193 20.0598 16.238 20.3801 15.6829C20.8685 14.8518 21.0766 13.8891 20.9748 12.9336C20.8729 11.9783 20.4663 11.0795 19.8134 10.3669ZM12.9566 19.8233C12.1568 19.8244 11.3822 19.548 10.7681 19.0426C10.7959 19.0277 10.8444 19.0015 10.876 18.9823L14.5084 16.9121C14.5996 16.8609 14.6753 16.7866 14.7277 16.697C14.7802 16.6074 14.8075 16.5056 14.8069 16.4022V11.3494L16.3422 12.2241C16.3502 12.2281 16.3571 12.2339 16.3624 12.2412C16.3676 12.2485 16.3708 12.2568 16.372 12.2656V16.45C16.3708 17.3438 16.0107 18.2006 15.3706 18.8328C14.7304 19.4651 13.8623 19.8213 12.9566 19.8233ZM5.61127 16.7279C5.2107 16.0449 5.06633 15.2448 5.20344 14.4675C5.23041 14.4834 5.27753 14.5118 5.31133 14.531L8.94366 16.6012C9.03419 16.6533 9.13717 16.6809 9.24202 16.6809C9.34683 16.6809 9.44981 16.6533 9.54034 16.6012L13.975 14.0746V15.8241C13.9755 15.833 13.9738 15.8419 13.97 15.8501C13.9661 15.8582 13.9604 15.8652 13.9531 15.8706L10.2812 17.9624C9.49578 18.4088 8.56298 18.5294 7.6875 18.298C6.81201 18.0665 6.06532 17.5019 5.61127 16.7279ZM4.65571 8.90375C5.05454 8.21992 5.68448 7.69639 6.4352 7.42473C6.4352 7.4556 6.4334 7.51027 6.4334 7.5482V11.6886C6.43277 11.792 6.46006 11.8937 6.51245 11.9834C6.56484 12.0729 6.64047 12.147 6.73155 12.1982L11.1663 14.7244L9.63096 15.5991C9.62339 15.6041 9.61468 15.607 9.60565 15.6078C9.59662 15.6086 9.5875 15.6072 9.57915 15.6038L5.90689 13.51C5.12286 13.0621 4.55086 12.3255 4.31631 11.462C4.08177 10.5986 4.20382 9.6786 4.65571 8.90375ZM17.2697 11.8L12.835 9.27351L14.3703 8.39916C14.3779 8.39426 14.3865 8.39124 14.3955 8.39043C14.4047 8.38962 14.4137 8.39106 14.422 8.39457L18.0944 10.4864C18.657 10.807 19.1152 11.2792 19.4158 11.8476C19.7163 12.416 19.8464 13.0571 19.791 13.6958C19.7355 14.3345 19.4968 14.9445 19.1028 15.4542C18.7087 15.9639 18.1757 16.3523 17.566 16.5738C17.566 16.5426 17.566 16.4881 17.566 16.45V12.3096C17.5668 12.2064 17.5398 12.1048 17.4878 12.0152C17.4357 11.9256 17.3604 11.8515 17.2697 11.8ZM18.7978 9.53077C18.7708 9.51445 18.7237 9.4864 18.6899 9.46728L15.0576 7.39705C14.9669 7.34494 14.8641 7.31745 14.7592 7.31745C14.6544 7.31745 14.5514 7.34494 14.4609 7.39705L10.0261 9.92365V8.17421C10.0257 8.16525 10.0274 8.15634 10.0313 8.14823C10.035 8.14014 10.0409 8.13308 10.0481 8.12772L13.72 6.03762C14.2825 5.71758 14.9258 5.5622 15.5747 5.58968C16.2234 5.61716 16.8507 5.82636 17.3835 6.1928C17.9161 6.55924 18.332 7.06776 18.5825 7.6589C18.833 8.25003 18.9076 8.89929 18.7978 9.53077ZM9.19149 12.6489L7.65581 11.7742C7.64778 11.7702 7.64081 11.7644 7.6356 11.7571C7.6304 11.7498 7.62707 11.7415 7.62598 11.7326V7.5482C7.62639 6.90734 7.81183 6.27983 8.16054 5.73914C8.5093 5.19846 9.00692 4.76697 9.59516 4.49519C10.1834 4.22342 10.8379 4.12259 11.4821 4.20452C12.1263 4.28645 12.7336 4.54774 13.2327 4.95781C13.2051 4.97271 13.1568 4.99898 13.1248 5.01814L9.4925 7.08834C9.40133 7.13946 9.32567 7.21361 9.27317 7.30318C9.22073 7.39273 9.19341 7.49448 9.194 7.59788L9.19149 12.6489ZM10.0254 10.8746L12.0006 9.74903L13.9757 10.8739V13.1244L12.0006 14.2492L10.0254 13.1244V10.8746Z'
            fill='white'
          />
        </g>
        <defs>
          <clipPath id='clip0_4133_35972'>
            <rect width='24' height='24' fill='white' />
          </clipPath>
        </defs>
      </svg>
    </SvgIcon>
  );
};
export default ChatGPTLogoBlack;