import AbcIcon from '@mui/icons-material/Abc';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import RefreshIcon from '@mui/icons-material/Refresh';
import ReplayIcon from '@mui/icons-material/Replay';
import TextFieldsIcon from '@mui/icons-material/TextFields';
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
      case 'ArrowDropDown': {
        return <ArrowDropDownIcon {...restProps} />;
      }
      case 'Replay': {
        return <ReplayIcon {...restProps} />;
      }
      case 'Refresh': {
        return <RefreshIcon {...restProps} />;
      }
      case 'KeyboardArrowDown': {
        return <KeyboardArrowDownIcon {...restProps} />;
      }
      case 'DeleteForeverOutlined': {
        return <DeleteForeverOutlinedIcon {...restProps} />;
      }
      case 'Abc': {
        return <AbcIcon {...restProps} />;
      }
      case 'TextFields': {
        return <TextFieldsIcon {...restProps} />;
      }
      default: {
        return null;
      }
    }
  };

  return renderIcon();
};
export default FunctionalitySignPdfIcon;
