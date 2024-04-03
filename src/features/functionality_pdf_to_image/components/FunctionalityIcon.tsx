import ControlPointTwoToneIcon from '@mui/icons-material/ControlPointTwoTone';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
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
export default FunctionalityIcon;
