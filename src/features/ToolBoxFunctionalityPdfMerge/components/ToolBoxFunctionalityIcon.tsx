import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { SxProps } from '@mui/material';
import { FC } from 'react';
interface IToolBoxIconProps {
  sx?: SxProps;
}
const ToolBoxFunctionalityIcon: FC<{ name: string } & IToolBoxIconProps> = ({
  name,
  ...restProps
}) => {
  const renderIcon = () => {
    switch (name) {
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
export default ToolBoxFunctionalityIcon;
