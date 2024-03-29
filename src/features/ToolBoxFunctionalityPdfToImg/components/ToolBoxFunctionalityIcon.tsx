import ControlPointTwoToneIcon from '@mui/icons-material/ControlPointTwoTone';
import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
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
export default ToolBoxFunctionalityIcon;
