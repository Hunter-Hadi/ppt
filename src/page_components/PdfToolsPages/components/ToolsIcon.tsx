import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
import HistoryEduIcon from '@mui/icons-material/HistoryEdu';
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined';
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import { SvgIconProps } from '@mui/material';
import dynamic from 'next/dynamic';
import { FC } from 'react';
export type ICustomIconType =
  | 'HEICToPDF'
  | 'MergePDF'
  | 'NumberPages'
  | 'OcrPDF'
  | 'PDFToHTML'
  | 'PDFToJPEG'
  | 'PDFToPNG'
  | 'PNGToPDF'
  | 'RotatePDF'
  | 'SignPDF'
  | 'SplitPDF'
  | 'JPEGToPDF'
  | 'CompressPDF';

const IconsMap: {
  [key in ICustomIconType]: React.ComponentType<SvgIconProps>;
} = {
  HEICToPDF: dynamic(() => import('./ToolsIcon/icons/HEICToPDF')),
  MergePDF: dynamic(() => import('./ToolsIcon/icons/MergePDF')),
  NumberPages: dynamic(() => import('./ToolsIcon/icons/NumberPages')),
  OcrPDF: dynamic(() => import('./ToolsIcon/icons/OcrPDF')),
  PDFToHTML: dynamic(() => import('./ToolsIcon/icons/PDFToHTML')),
  PDFToJPEG: dynamic(() => import('./ToolsIcon/icons/PDFToJPEG')),
  PDFToPNG: dynamic(() => import('./ToolsIcon/icons/PDFToPNG')),
  PNGToPDF: dynamic(() => import('./ToolsIcon/icons/PNGToPDF')),
  RotatePDF: dynamic(() => import('./ToolsIcon/icons/RotatePDF')),
  SignPDF: dynamic(() => import('./ToolsIcon/icons/SignPDF')),
  SplitPDF: dynamic(() => import('./ToolsIcon/icons/SplitPDF')),
  CompressPDF: dynamic(() => import('./ToolsIcon/icons/CompressPDF')),
  JPEGToPDF: dynamic(() => import('./ToolsIcon/icons/JPEGToPDF')),
};
const ToolsIcon: FC<{ name: string } & SvgIconProps> = ({
  name,
  ...restProps
}) => {
  const renderIcon = () => {
    switch (name) {
      case 'CropOriginal': {
        return <CropOriginalIcon {...restProps} />;
      }
      case 'CheckCircle': {
        return <CheckCircleIcon {...restProps} />;
      }
      case 'Lightbulb': {
        return <LightbulbOutlinedIcon {...restProps} />;
      }
      case 'WorkspacePremiumOutlined': {
        return <WorkspacePremiumOutlinedIcon {...restProps} />;
      }
      case 'ThumbUpAltOutlined': {
        return <ThumbUpAltOutlinedIcon {...restProps} />;
      }
      case 'LockOutlined': {
        return <LockOutlinedIcon {...restProps} />;
      }
      case 'LocalPoliceOutlined': {
        return <LocalPoliceOutlinedIcon {...restProps} />;
      }
      case 'ComputerOutlined': {
        return <ComputerOutlinedIcon {...restProps} />;
      }
      case 'HistoryEdu': {
        return <HistoryEduIcon {...restProps} />;
      }
      default: {
        if (name in IconsMap) {
          const Icon = IconsMap[name as ICustomIconType];
          return <Icon {...restProps} />;
        }
        return null;
      }
    }
  };

  return renderIcon();
};
export default ToolsIcon;
