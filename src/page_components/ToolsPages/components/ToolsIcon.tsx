import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import { SxProps } from '@mui/material';
import { FC } from 'react';
interface IToolsIconProps {
  sx?: SxProps;
}
const ToolsIcon: FC<{ name: string } & IToolsIconProps> = ({
  name,
  ...restProps
}) => {
  const renderIcon = () => {
    switch (name) {
      case 'CropOriginal': {
        return <CropOriginalIcon {...restProps} />;
      }

      default: {
        return null;
      }
    }
  };

  return renderIcon();
};
export default ToolsIcon;
