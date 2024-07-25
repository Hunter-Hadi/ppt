import AutoStoriesOutlinedIcon from '@mui/icons-material/AutoStoriesOutlined';
import BoltOutlinedIcon from '@mui/icons-material/BoltOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ChatIcon from '@mui/icons-material/Chat';
import CheckCircleOutlineOutlined from '@mui/icons-material/CheckCircleOutlineOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DoneIcon from '@mui/icons-material/Done';
import DriveFileRenameOutlineOutlinedIcon from '@mui/icons-material/DriveFileRenameOutlineOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import FormatListBulletedOutlinedIcon from '@mui/icons-material/FormatListBulletedOutlined';
import LaptopMacOutlinedIcon from '@mui/icons-material/LaptopMacOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import RestartAltOutlined from '@mui/icons-material/RestartAltOutlined';
import SaveAltOutlined from '@mui/icons-material/SaveAltOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SmartToyOutlinedIcon from '@mui/icons-material/SmartToyOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import TipsAndUpdatesOutlinedIcon from '@mui/icons-material/TipsAndUpdatesOutlined';
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import { Box, CircularProgress, SvgIcon, SvgIconProps } from '@mui/material';
import { FC } from 'react';
import React from 'react';

const ReadIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <svg
        viewBox='0 0 24 24'
        fill='CurrentColor'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M3.96429 3.19824H3V5.15421H3.96429H13.6071H14.5714V3.19824H13.6071H3.96429ZM3.96429 8.41415H3V10.3701H3.96429H20.0357H21V8.41415H20.0357H3.96429ZM3 13.6301V15.586H3.96429H13.6071H14.5714V13.6301H13.6071H3.96429H3ZM3.96429 18.846H3V20.8019H3.96429H20.0357H21V18.846H20.0357H3.96429Z'
          fill='CurrentColor'
        />
      </svg>
    </SvgIcon>
  );
};
const CleanChatBoxIcon = (props: SvgIconProps) => {
  return (
    <SvgIcon viewBox='0 0 24 24' sx={props.sx}>
      <path d='M16.9656 16.1407L10.0549 12.633C10.0724 12.5981 10.4827 11.787 10.945 11.4289C12.0451 10.5766 13.4754 11.1671 14.4003 11.5336L19.3215 3L20.5256 3.62824C20.5256 3.62824 15.7615 12.1095 15.7091 12.2142C16.8609 12.9995 17.4368 13.6801 17.4368 14.7271C17.4368 15.2833 17.1698 15.8416 16.9656 16.1407Z' />
      <path d='M6.59963 18.706C5.67821 18.4966 3.98197 17.1877 3.24902 16.5595C5.92951 16.2663 8.01317 15.3554 9.47906 13.5754L16.3897 17.083C15.6742 17.9556 13.971 19.9415 12.882 20.6954C11.6381 21.5566 9.38869 20.188 8.53083 19.6661C8.44994 19.6169 8.38142 19.5752 8.32729 19.5436C8.58906 19.596 9.68847 18.9154 10.6308 18.0777C10.1597 18.4442 7.7514 18.9677 6.59963 18.706Z' />
      <path d='M7.8921 11.4452L8.432 12.633L8.97189 11.4452L10.1597 10.9053L8.97189 10.3655L8.432 9.17769L7.8921 10.3655L6.70434 10.9053L7.8921 11.4452Z' />
      <path d='M13.3008 9.07298L12.9409 8.28114L12.1491 7.92121L12.9409 7.56128L13.3008 6.76944L13.6608 7.56128L14.4526 7.92121L13.6608 8.28114L13.3008 9.07298Z' />
      <path d='M11.7263 12.0089L11.8353 12.2488L11.9444 12.0089L12.1844 11.8998L11.9444 11.7907L11.8353 11.5508L11.7263 11.7907L11.4863 11.8998L11.7263 12.0089Z' />
    </SvgIcon>
  );
};
const CaptivePortalIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'>
        <g mask='url(#mask0_1921_34815)'>
          <path
            d='M7.83335 16.5879C7.58335 16.1296 7.3646 15.6539 7.1771 15.1608C6.9896 14.6678 6.83335 14.1573 6.70835 13.6296H4.25002C4.6528 14.324 5.15627 14.9282 5.76044 15.4421C6.3646 15.9559 7.05558 16.3379 7.83335 16.5879ZM3.54169 11.9629H6.37502C6.33335 11.6851 6.3021 11.4108 6.28127 11.14C6.26044 10.8691 6.25002 10.5879 6.25002 10.2962C6.25002 10.0046 6.26044 9.72331 6.28127 9.45247C6.3021 9.18164 6.33335 8.90733 6.37502 8.62956H3.54169C3.47224 8.90733 3.42016 9.18164 3.38544 9.45247C3.35071 9.72331 3.33335 10.0046 3.33335 10.2962C3.33335 10.5879 3.35071 10.8691 3.38544 11.14C3.42016 11.4108 3.47224 11.6851 3.54169 11.9629ZM4.25002 6.96289H6.70835C6.83335 6.43511 6.9896 5.9247 7.1771 5.43164C7.3646 4.93859 7.58335 4.46289 7.83335 4.00456C7.05558 4.25456 6.3646 4.6365 5.76044 5.15039C5.15627 5.66428 4.6528 6.26845 4.25002 6.96289ZM8.41669 6.96289H11.5834C11.4167 6.35178 11.2014 5.77539 10.9375 5.23372C10.6736 4.69206 10.3611 4.17122 10 3.67122C9.63891 4.17122 9.32641 4.69206 9.06252 5.23372C8.79863 5.77539 8.58335 6.35178 8.41669 6.96289ZM13.2917 6.96289H15.75C15.3472 6.26845 14.8438 5.66428 14.2396 5.15039C13.6354 4.6365 12.9445 4.25456 12.1667 4.00456C12.4167 4.46289 12.6354 4.93859 12.8229 5.43164C13.0104 5.9247 13.1667 6.43511 13.2917 6.96289ZM10 18.6296C8.86113 18.6296 7.78474 18.4108 6.77085 17.9733C5.75696 17.5358 4.87155 16.9386 4.1146 16.1816C3.35766 15.4247 2.76044 14.5393 2.32294 13.5254C1.88544 12.5115 1.66669 11.4351 1.66669 10.2962C1.66669 9.14345 1.88544 8.06359 2.32294 7.05664C2.76044 6.0497 3.35766 5.16775 4.1146 4.41081C4.87155 3.65386 5.75696 3.05664 6.77085 2.61914C7.78474 2.18164 8.86113 1.96289 10 1.96289C11.1528 1.96289 12.2327 2.18164 13.2396 2.61914C14.2465 3.05664 15.1285 3.65386 15.8854 4.41081C16.6424 5.16775 17.2396 6.0497 17.6771 7.05664C18.1146 8.06359 18.3334 9.14345 18.3334 10.2962C18.3334 10.4351 18.3299 10.574 18.3229 10.7129C18.316 10.8518 18.3056 10.9907 18.2917 11.1296H16.6042C16.632 10.9907 16.6493 10.8553 16.6563 10.7233C16.6632 10.5914 16.6667 10.449 16.6667 10.2962C16.6667 10.0046 16.6493 9.72331 16.6146 9.45247C16.5799 9.18164 16.5278 8.90733 16.4584 8.62956H13.625C13.6667 8.90733 13.6979 9.18164 13.7188 9.45247C13.7396 9.72331 13.75 10.0046 13.75 10.2962V10.7233C13.75 10.8553 13.7431 10.9907 13.7292 11.1296H12.0625C12.0764 10.9907 12.0834 10.8553 12.0834 10.7233V10.2962C12.0834 10.0046 12.0729 9.72331 12.0521 9.45247C12.0313 9.18164 12 8.90733 11.9584 8.62956H8.04169C8.00002 8.90733 7.96877 9.18164 7.94794 9.45247C7.9271 9.72331 7.91669 10.0046 7.91669 10.2962C7.91669 10.5879 7.9271 10.8691 7.94794 11.14C7.96877 11.4108 8.00002 11.6851 8.04169 11.9629H10.8334V13.6296H8.41669C8.58335 14.2407 8.79863 14.8171 9.06252 15.3587C9.32641 15.9004 9.63891 16.4212 10 16.9212C10.1528 16.699 10.2986 16.4733 10.4375 16.2441C10.5764 16.015 10.7084 15.7823 10.8334 15.5462V18.5879C10.6945 18.6018 10.559 18.6122 10.4271 18.6191C10.2952 18.6261 10.1528 18.6296 10 18.6296ZM16.625 18.1087L14.1667 15.6504V17.5046H12.5V12.7962H17.2084V14.4629H15.3334L17.7917 16.9212L16.625 18.1087Z'
            fill='CurrentColor'
          />
        </g>
      </svg>
    </SvgIcon>
  );
};
const CopyTextOnlyIcon: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon {...props}>
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <g mask='url(#mask0_6092_33772)'>
          <path
            d='M4.69315 0.90625C4.11904 0.90625 3.62756 1.11067 3.21872 1.51951C2.80989 1.92835 2.60547 2.41982 2.60547 2.99393V17.6077H4.62234V2.99393L16.1754 2.91406V0.90625H4.69315Z'
            fill='currentColor'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M14.9572 9.59569L18.0168 18.5947H16.3421L15.7183 16.6974H12.4692L11.8455 18.5947H10.1708L13.2303 9.59569H14.9572ZM14.0926 11.783L15.2401 15.2451H12.9474L14.0926 11.783Z'
            fill='currentColor'
          />
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M7.39408 5.82767C7.80292 5.41883 8.29439 5.21442 8.8685 5.21442H19.3069C19.881 5.21442 20.3725 5.41883 20.7813 5.82767C21.1902 6.23652 21.3946 6.72799 21.3946 7.3021V20.8721C21.3946 21.4462 21.1902 21.9376 20.7813 22.3465C20.3725 22.7553 19.881 22.9597 19.3069 22.9597H8.8685C8.29439 22.9597 7.80292 22.7553 7.39408 22.3465C6.98525 21.9376 6.78083 21.4462 6.78083 20.8721V7.3021C6.78083 6.72799 6.98525 6.23652 7.39408 5.82767ZM19.3826 7.23739H8.75628V20.9531H19.3826V7.23739Z'
            fill='currentColor'
          />
        </g>
      </svg>
    </SvgIcon>
  );
};
/**
 * ChatConversationsViewIcon图标组件
 * @param name 图标名称
 */
const ChatContainerIcon: FC<{ icon: string; size?: number } & SvgIconProps> = ({
  icon,
  ...restProps
}) => {
  const renderIcon = () => {
    switch (icon) {
      case 'Chat': {
        return <ChatIcon {...restProps} />;
      }
      case 'Summarize':
        return <SummarizeOutlinedIcon {...restProps} />;
      case 'AutoStoriesOutlined':
        return <AutoStoriesOutlinedIcon {...restProps} />;
      case 'Bulleted':
        return <FormatListBulletedOutlinedIcon {...restProps} />;
      case 'LaptopMac':
        return <LaptopMacOutlinedIcon {...restProps} />;
      case 'SmartToy':
        return <SmartToyOutlinedIcon {...restProps} />;
      case 'Read':
        return <ReadIcon {...restProps} />;
      case 'TipsAndUpdates':
        return <TipsAndUpdatesOutlinedIcon {...restProps} />;
      case 'FileDownload':
        return <FileDownloadOutlinedIcon {...restProps} />;
      case 'CloseCircled':
        return <CancelOutlinedIcon {...restProps} />;
      case 'Loading':
        return <CircularProgress size={24} />;
      case 'Layers':
        return <LayersOutlinedIcon {...restProps} />;
      case 'ShareOutlined':
        return <ShareOutlinedIcon {...restProps} />;
      case 'DriveFileRenameOutlineOutlined':
        return <DriveFileRenameOutlineOutlinedIcon {...restProps} />;
      case 'SaveAltOutlined':
        return <SaveAltOutlined {...restProps} />;
      case 'RestartAltOutlined':
        return <RestartAltOutlined {...restProps} />;
      case 'DeleteOutline':
        return <DeleteOutlineIcon {...restProps} />;
      case 'CleanChatBox':
        return <CleanChatBoxIcon {...restProps} />;
      case 'CaptivePortal':
        return <CaptivePortalIcon {...restProps} />;
      case 'ExpandMore':
        return <ExpandMoreOutlinedIcon {...restProps} />;
      case 'Done':
        return <DoneIcon {...restProps} />;
      case 'Copy':
        return <ContentCopyOutlinedIcon {...restProps} />;
      case 'CopyTextOnly':
        return <CopyTextOnlyIcon {...restProps} />;
      case 'More':
        return <MoreHorizIcon {...restProps} />;
      case 'Check':
        return <CheckOutlinedIcon {...restProps} />;
      case 'Search':
        return <SearchOutlinedIcon {...restProps} />;
      case 'Tune':
        return <TuneOutlinedIcon {...restProps} />;
      case 'Close':
        return <CloseOutlinedIcon {...restProps} />;
      case 'CheckCircle':
        return <CheckCircleOutlineOutlined {...restProps} />;
      case 'Bolt':
        return <BoltOutlinedIcon {...restProps} />;
      case 'Empty':
        return (
          <Box
            sx={{
              display: 'inline-box',
              width: `${restProps.size || 16}px`,
              height: `${restProps.size || 16}px`,
            }}
          ></Box>
        );
      default: {
        return null;
      }
    }
  };

  return renderIcon();
};
export default ChatContainerIcon;
