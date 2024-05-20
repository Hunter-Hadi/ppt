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
  HEICToPDF: dynamic(() => import('./Icons/HEICToPDF')),
  MergePDF: dynamic(() => import('./Icons/MergePDF')),
  NumberPages: dynamic(() => import('./Icons/NumberPages')),
  OcrPDF: dynamic(() => import('./Icons/OcrPDF')),
  PDFToHTML: dynamic(() => import('./Icons/PDFToHTML')),
  PDFToJPEG: dynamic(() => import('./Icons/PDFToJPEG')),
  PDFToPNG: dynamic(() => import('./Icons/PDFToPNG')),
  PNGToPDF: dynamic(() => import('./Icons/PNGToPDF')),
  RotatePDF: dynamic(() => import('./Icons/RotatePDF')),
  SignPDF: dynamic(() => import('./Icons/SignPDF')),
  SplitPDF: dynamic(() => import('./Icons/SplitPDF')),
  CompressPDF: dynamic(() => import('./Icons/CompressPDF')),
  JPEGToPDF: dynamic(() => import('./Icons/JPEGToPDF')),
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
