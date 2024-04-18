import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import { SvgIconProps } from '@mui/material';
import { FC } from 'react';

const ToolsIcon: FC<{ name: string } & SvgIconProps> = ({
  name,
  ...restProps
}) => {
  const renderIcon = () => {
    switch (name) {
      case 'CropOriginal': {
        return <CropOriginalIcon {...restProps} />;
      }
      case 'CheckCircle': {
        return <CheckCircleIcon {...restProps} />;
      }
      case 'Lightbulb': {
        return <LightbulbOutlinedIcon {...restProps} />;
      }
      case 'WorkspacePremiumOutlined': {
        return <WorkspacePremiumOutlinedIcon {...restProps} />;
      }
      case 'ThumbUpAltOutlined': {
        return <ThumbUpAltOutlinedIcon {...restProps} />;
      }
      case 'LockOutlined': {
        return <LockOutlinedIcon {...restProps} />;
      }
      case 'LocalPoliceOutlined': {
        return <LocalPoliceOutlinedIcon {...restProps} />;
      }
      case 'ComputerOutlined': {
        return <ComputerOutlinedIcon {...restProps} />;
      }
      case 'HistoryEdu': {
        return <HistoryEduIcon {...restProps} />;
      }
      default: {
        return null;
      }
    }
  };

  return renderIcon();
};
export default ToolsIcon;
