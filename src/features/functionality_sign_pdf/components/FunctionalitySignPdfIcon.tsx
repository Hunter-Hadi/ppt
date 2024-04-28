import AbcIcon from '@mui/icons-material/Abc';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import CheckIcon from '@mui/icons-material/Check';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import DragIndicatorIcon from '@mui/icons-material/DragIndicator';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import OpacityRoundedIcon from '@mui/icons-material/OpacityRounded';
import RedoOutlinedIcon from '@mui/icons-material/RedoOutlined';
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import TitleIcon from '@mui/icons-material/Title';
import UndoOutlinedIcon from '@mui/icons-material/UndoOutlined';
import ZoomInMapOutlinedIcon from '@mui/icons-material/ZoomInMapOutlined';
import ZoomOutMapOutlinedIcon from '@mui/icons-material/ZoomOutMapOutlined';
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
      case 'UndoOutlined': {
        return <UndoOutlinedIcon {...restProps} />;
      }
      case 'RedoOutlined': {
        return <RedoOutlinedIcon {...restProps} />;
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
      case 'ContentCopy': {
        return <ContentCopyIcon {...restProps} />;
      }
      case 'Title': {
        return <TitleIcon {...restProps} />;
      }
      case 'CalendarMonthOutlined': {
        return <CalendarMonthOutlinedIcon {...restProps} />;
      }
      case 'Check': {
        return <CheckIcon {...restProps} />;
      }
      case 'ArrowBackIos': {
        return <ArrowBackIosIcon {...restProps} />;
      }
      case 'ArrowForwardIos': {
        return <ArrowForwardIosIcon {...restProps} />;
      }
      case 'ZoomInMapOutlined': {
        return <ZoomInMapOutlinedIcon {...restProps} />;
      }
      case 'ZoomOutMapOutlined': {
        return <ZoomOutMapOutlinedIcon {...restProps} />;
      }

      case 'ZoomInMapOutlined': {
        return <ZoomInMapOutlinedIcon {...restProps} />;
      }
      case 'ZoomOutMapOutlined': {
        return <ZoomOutMapOutlinedIcon {...restProps} />;
      }
      case 'AddCircleOutlineOutlined': {
        return <AddCircleOutlineOutlinedIcon {...restProps} />;
      }
      case 'RemoveCircleOutlineOutlined': {
        return <RemoveCircleOutlineOutlinedIcon {...restProps} />;
      }
      case 'FormatAlignLeft': {
        return <FormatAlignLeftIcon {...restProps} />;
      }
      case 'FormatAlignCenter': {
        return <FormatAlignCenterIcon {...restProps} />;
      }
      case 'FormatAlignRight': {
        return <FormatAlignRightIcon {...restProps} />;
      }
      case 'OpacityRounded': {
        return <OpacityRoundedIcon {...restProps} />;
      }
      default: {
        return null;
      }
    }
  };

  return renderIcon();
};
export default FunctionalitySignPdfIcon;
