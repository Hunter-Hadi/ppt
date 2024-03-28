import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import { SxProps } from '@mui/material';
import { FC } from 'react';
interface IToolBoxIconProps {
  sx?: SxProps;
}
const ToolBoxIcon: FC<{ name: string } & IToolBoxIconProps> = ({
  name,
  ...restProps
}) => {
  const renderIcon = () => {
    switch (name) {
      case 'CropOriginal': {
        return <CropOriginalIcon {...restProps} />;
      }
      case 'CloudUploadIcon': {
        return <CloudUploadIcon {...restProps} />;
      }
      default: {
        return null;
      }
    }
  };

  return renderIcon();
};
export default ToolBoxIcon;
