import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import TranslateOutlinedIcon from '@mui/icons-material/TranslateOutlined';
import { Stack, SvgIcon } from '@mui/material';
import React, { FC } from 'react';
interface IProps {
  icon: string;
  size?: number;
}

const FeaturesCarouselIcons: FC<IProps> = ({ icon, size = 48 }) => {
  if (icon === 'chat') {
    return (
      <Stack
        justifyContent={'center'}
        alignItems={'center'}
        spacing={2}
        sx={{
          borderRadius: 2,
          bgcolor: '#F4EBFF',
          color: '#9065B0',
          width: size,
          height: size,
          fontSize: size * 0.5,
        }}
      >
        <SvgIcon
          sx={{
            fontSize: 'inherit',
          }}
        >
          <svg
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M6.09436 11.7288C6.03221 11.3282 5.99996 10.9179 5.99996 10.5C5.99996 6.08172 9.60525 2.5 14.0526 2.5C18.4999 2.5 22.1052 6.08172 22.1052 10.5C22.1052 11.4981 21.9213 12.4535 21.5852 13.3345C21.5154 13.5175 21.4804 13.609 21.4646 13.6804C21.4489 13.7512 21.4428 13.801 21.4411 13.8735C21.4394 13.9466 21.4493 14.0272 21.4692 14.1883L21.8717 17.4585C21.9153 17.8125 21.9371 17.9895 21.8782 18.1182C21.8266 18.231 21.735 18.3205 21.6211 18.3695C21.4911 18.4254 21.3146 18.3995 20.9617 18.3478L17.7765 17.8809C17.6101 17.8565 17.527 17.8443 17.4512 17.8448C17.3763 17.8452 17.3245 17.8507 17.2511 17.8661C17.177 17.8817 17.0823 17.9172 16.893 17.9881C16.0097 18.319 15.0524 18.5 14.0526 18.5C13.6344 18.5 13.2237 18.4683 12.8227 18.4073M7.63158 22.5C10.5965 22.5 13 20.0376 13 17C13 13.9624 10.5965 11.5 7.63158 11.5C4.66668 11.5 2.26316 13.9624 2.26316 17C2.26316 17.6106 2.36028 18.1979 2.53955 18.7467C2.61533 18.9787 2.65322 19.0947 2.66566 19.1739C2.67864 19.2567 2.68091 19.3031 2.67608 19.3867C2.67145 19.4668 2.65141 19.5573 2.61134 19.7383L2 22.5L4.9948 22.091C5.15827 22.0687 5.24 22.0575 5.31137 22.058C5.38652 22.0585 5.42641 22.0626 5.50011 22.0773C5.5701 22.0912 5.67416 22.1279 5.88227 22.2014C6.43059 22.3949 7.01911 22.5 7.63158 22.5Z'
              stroke='#9065B0'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </SvgIcon>
      </Stack>
    );
  }
  if (icon === 'rewriter') {
    return (
      <Stack
        justifyContent={'center'}
        alignItems={'center'}
        spacing={2}
        sx={{
          borderRadius: 2,
          bgcolor: '#D3F8DF',
          color: '#16B364',
          width: size,
          height: size,
          fontSize: size * 0.5,
        }}
      >
        <SvgIcon
          sx={{
            fontSize: 'inherit',
          }}
        >
          <svg
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M8.99962 14.5C8.99962 14.5 10.3121 16 12.4996 16C14.6871 16 15.9996 14.5 15.9996 14.5M15.2496 9.5H15.2596M9.74962 9.5H9.75962M12.4996 20.5C17.194 20.5 20.9996 16.6944 20.9996 12C20.9996 7.30558 17.194 3.5 12.4996 3.5C7.8052 3.5 3.99962 7.30558 3.99962 12C3.99962 12.95 4.15547 13.8636 4.443 14.7166C4.55119 15.0376 4.60529 15.1981 4.61505 15.3214C4.62469 15.4432 4.6174 15.5286 4.58728 15.6469C4.55677 15.7668 4.48942 15.8915 4.35472 16.1408L2.71906 19.1684C2.48575 19.6002 2.36909 19.8161 2.3952 19.9828C2.41794 20.1279 2.50337 20.2557 2.6288 20.3322C2.7728 20.4201 3.01692 20.3948 3.50517 20.3444L8.62619 19.815C8.78127 19.799 8.85881 19.791 8.92949 19.7937C8.999 19.7963 9.04807 19.8029 9.11586 19.8185C9.18478 19.8344 9.27145 19.8678 9.44478 19.9345C10.3928 20.2998 11.4228 20.5 12.4996 20.5ZM15.7496 9.5C15.7496 9.77614 15.5258 10 15.2496 10C14.9735 10 14.7496 9.77614 14.7496 9.5C14.7496 9.22386 14.9735 9 15.2496 9C15.5258 9 15.7496 9.22386 15.7496 9.5ZM10.2496 9.5C10.2496 9.77614 10.0258 10 9.74962 10C9.47348 10 9.24962 9.77614 9.24962 9.5C9.24962 9.22386 9.47348 9 9.74962 9C10.0258 9 10.2496 9.22386 10.2496 9.5Z'
              stroke='#16B364'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            />
          </svg>
        </SvgIcon>
      </Stack>
    );
  }
  if (icon === 'quick-reply') {
    return (
      <Stack
        justifyContent={'center'}
        alignItems={'center'}
        spacing={2}
        sx={{
          borderRadius: 2,
          bgcolor: '#E6F0FF',
          color: '#2080F1',
          width: size,
          height: size,
          fontSize: size * 0.5,
        }}
      >
        <SvgIcon
          sx={{
            fontSize: 'inherit',
          }}
        >
          <svg
            viewBox='0 0 24 24'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M11.5001 8.18521C17.5751 8.18521 22.5001 13.1812 22.5001 19.3442C22.5001 19.7272 22.4586 20.2417 22.3761 20.8882C22.3696 20.9394 22.3474 20.9873 22.3126 21.0254C22.2778 21.0634 22.232 21.0898 22.1817 21.1009C22.1313 21.1119 22.0787 21.1071 22.0312 21.0872C21.9836 21.0672 21.9434 21.0329 21.9161 20.9892C21.6961 20.6392 21.5101 20.3667 21.3586 20.1712C19.5271 17.8142 16.5096 16.5037 12.5261 16.5037H11.5001V20.9912C11.5001 21.2722 11.2701 21.5002 10.9856 21.5002C10.8496 21.5002 10.7186 21.4467 10.6221 21.3512L2.22606 13.0402C2.15446 12.9697 2.0976 12.8856 2.05879 12.7929C2.01999 12.7002 2 12.6007 2 12.5002C2 12.3997 2.01999 12.3002 2.05879 12.2075C2.0976 12.1148 2.15446 12.0307 2.22606 11.9602L10.6221 3.6492C10.719 3.5536 10.8497 3.5 10.9858 3.5C11.122 3.5 11.2526 3.5536 11.3496 3.6492C11.4461 3.7447 11.5001 3.8742 11.5001 4.0092V8.18521ZM11.5001 10.1852H9.50006V7.57421L4.52356 12.5002L9.50006 17.4262V14.5037H12.5261C15.4286 14.5037 17.9671 15.1352 20.0121 16.3607C18.7951 12.7642 15.4401 10.1852 11.5001 10.1852Z'
              fill='#2080F1'
            />
          </svg>
        </SvgIcon>
      </Stack>
    );
  }
  if (icon === 'summary') {
    return (
      <Stack
        justifyContent={'center'}
        alignItems={'center'}
        spacing={2}
        sx={{
          borderRadius: 2,
          bgcolor: '#FFEBEB',
          color: '#DB4437',
          width: size,
          height: size,
          fontSize: size * 0.5,
        }}
      >
        <SummarizeOutlinedIcon
          sx={{
            fontSize: 'inherit',
          }}
        />
      </Stack>
    );
  }
  if (icon === 'search') {
    return (
      <Stack
        justifyContent={'center'}
        alignItems={'center'}
        spacing={2}
        sx={{
          borderRadius: 2,
          bgcolor: '#FFF6D6',
          color: '#FAA700',
          width: size,
          height: size,
          fontSize: size * 0.5,
        }}
      >
        <SearchOutlinedIcon
          sx={{
            fontSize: 'inherit',
          }}
        />
      </Stack>
    );
  }
  if (icon === 'art') {
    return (
      <Stack
        justifyContent={'center'}
        alignItems={'center'}
        spacing={2}
        sx={{
          borderRadius: 2,
          bgcolor: '#E0F2FE',
          color: '#0BA5EC',
          width: size,
          height: size,
          fontSize: size * 0.5,
        }}
      >
        <ColorLensOutlinedIcon
          sx={{
            fontSize: 'inherit',
          }}
        />
      </Stack>
    );
  }
  if (icon === 'translator') {
    return (
      <Stack
        justifyContent={'center'}
        alignItems={'center'}
        spacing={2}
        sx={{
          borderRadius: 2,
          bgcolor: '#EAEAEA',
          color: '#202124',
          width: size,
          height: size,
          fontSize: size * 0.5,
        }}
      >
        <TranslateOutlinedIcon
          sx={{
            fontSize: 'inherit',
          }}
        />
      </Stack>
    );
  }
  if (icon === 'reader') {
    return (
      <Stack
        justifyContent={'center'}
        alignItems={'center'}
        spacing={2}
        sx={{
          borderRadius: 2,
          bgcolor: '#E6FFE7',
          color: '#0FA47F',
          width: size,
          height: size,
          fontSize: size * 0.5,
        }}
      >
        <LocalLibraryOutlinedIcon
          sx={{
            fontSize: 'inherit',
          }}
        />
      </Stack>
    );
  }
  if (icon === 'prompts') {
    return (
      <Stack
        justifyContent={'center'}
        alignItems={'center'}
        spacing={2}
        sx={{
          borderRadius: 2,
          bgcolor: '#F4EBFF',
          color: '#9065B0',
          width: size,
          height: size,
          fontSize: size * 0.5,
        }}
      >
        <AutoAwesomeIcon
          sx={{
            fontSize: 'inherit',
          }}
        />
      </Stack>
    );
  }

  return (
    <Stack
      justifyContent={'center'}
      alignItems={'center'}
      spacing={2}
      sx={{
        borderRadius: 2,
        bgcolor: '#F4EBFF',
        color: '#9065B0',
        width: size,
        height: size,
        fontSize: size * 0.5,
      }}
    >
      <ChatBubbleOutlineOutlinedIcon
        sx={{
          fontSize: 'inherit',
        }}
      />
    </Stack>
  );
};

export default FeaturesCarouselIcons;
