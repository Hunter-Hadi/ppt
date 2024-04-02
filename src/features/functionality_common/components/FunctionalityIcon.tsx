import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { SxProps } from '@mui/material';
import { FC } from 'react';

interface IFunctionalityIconProps {
  sx?: SxProps;
}
const FunctionalityIcon: FC<{ name: string } & IFunctionalityIconProps> = ({
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
export default FunctionalityIcon;
