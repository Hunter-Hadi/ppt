import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ControlPointTwoToneIcon from '@mui/icons-material/ControlPointTwoTone';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import { SxProps } from '@mui/material';
import { FC } from 'react';

export interface IFunctionalityIconProps {
  sx?: SxProps;
}
/**
 * Functionality公共图标
 * @param name 图标名称
 */
const FunctionalityCommonIcon: FC<
  { name: string } & IFunctionalityIconProps
> = ({ name, ...restProps }) => {
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
      default: {
        return null;
      }
    }
  };

  return renderIcon();
};
export default FunctionalityCommonIcon;
