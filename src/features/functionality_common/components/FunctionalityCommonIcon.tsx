import CloseTwoToneIcon from '@mui/icons-material/CloseTwoTone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ControlPointTwoToneIcon from '@mui/icons-material/ControlPointTwoTone';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import { SvgIconProps } from '@mui/material';
import { FC } from 'react';

/**
 * Functionality公共图标
 * @param name 图标名称
 */
const FunctionalityCommonIcon: FC<{ name: string } & SvgIconProps> = ({
  name,
  ...restProps
}) => {
  const renderIcon = () => {
    switch (name) {
      case 'CloudUploadIcon': {
        return <CloudUploadIcon {...restProps} />;
      }
      case 'ControlPointTwoTone': {
        return <ControlPointTwoToneIcon {...restProps} />;
      }
      case 'RemoveCircleTwoTone': {
        return <RemoveCircleTwoToneIcon {...restProps} />;
      }
      case 'CloseTwoTone':
        return <CloseTwoToneIcon {...restProps} />;
      default: {
        return null;
      }
    }
  };

  return renderIcon();
};
export default FunctionalityCommonIcon;
