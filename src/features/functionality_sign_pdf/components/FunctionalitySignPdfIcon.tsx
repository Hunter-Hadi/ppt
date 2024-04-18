import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import { SvgIconProps } from '@mui/material';
import { FC } from 'react';

/**
 * Functionality公共图标
 * @param name 图标名称
 */
const FunctionalitySignPdfIcon: FC<{ name: string } & SvgIconProps> = ({
  name,
  ...restProps
}) => {
  const renderIcon = () => {
    switch (name) {
      case 'DragIndicator': {
        return <DragIndicatorIcon {...restProps} />;
      }
      default: {
        return null;
      }
    }
  };

  return renderIcon();
};
export default FunctionalitySignPdfIcon;
