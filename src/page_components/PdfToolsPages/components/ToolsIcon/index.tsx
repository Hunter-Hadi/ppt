import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import ComputerOutlinedIcon from '@mui/icons-material/ComputerOutlined'
import CropOriginalIcon from '@mui/icons-material/CropOriginal'
import HistoryEduIcon from '@mui/icons-material/HistoryEdu'
import LightbulbOutlinedIcon from '@mui/icons-material/LightbulbOutlined'
import LocalPoliceOutlinedIcon from '@mui/icons-material/LocalPoliceOutlined'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined'
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined'
import { SvgIconProps } from '@mui/material'
import dynamic from 'next/dynamic'
import React from 'react'
import { FC } from 'react'
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
  | 'CompressPDF'
  | 'UnlockPDF'
  | 'ProtectPDF'
  | 'WaterMarkPDF'
  | 'PDFAnnotator'
  | 'DeletePagePDF'
  | 'DeletePagePDFDetaile'
  | 'ExtractPagePDF'

const IconsMap: {
  [key in ICustomIconType]: React.ComponentType<SvgIconProps>
} = {
  HEICToPDF: dynamic(() => import('./icons/HEICToPDF')),
  MergePDF: dynamic(() => import('./icons/MergePDF')),
  NumberPages: dynamic(() => import('./icons/NumberPages')),
  OcrPDF: dynamic(() => import('./icons/OcrPDF')),
  PDFToHTML: dynamic(() => import('./icons/PDFToHTML')),
  PDFToJPEG: dynamic(() => import('./icons/PDFToJPEG')),
  PDFToPNG: dynamic(() => import('./icons/PDFToPNG')),
  PNGToPDF: dynamic(() => import('./icons/PNGToPDF')),
  RotatePDF: dynamic(() => import('./icons/RotatePDF')),
  SignPDF: dynamic(() => import('./icons/SignPDF')),
  SplitPDF: dynamic(() => import('./icons/SplitPDF')),
  CompressPDF: dynamic(() => import('./icons/CompressPDF')),
  JPEGToPDF: dynamic(() => import('./icons/JPEGToPDF')),
  UnlockPDF: dynamic(() => import('./icons/UnlockPDF')),
  ProtectPDF: dynamic(() => import('./icons/ProtectPDF')),
  WaterMarkPDF: dynamic(() => import('./icons/WaterMarkPDF')),
  PDFAnnotator: dynamic(() => import('./icons/PDFAnnotator')),
  DeletePagePDF: dynamic(() => import('./icons/DeletePagePDF')),
  DeletePagePDFDetaile: dynamic(() => import('./icons/DeletePagePDFDetaile')),
  ExtractPagePDF: dynamic(() => import('./icons/ExtractPagePDF')),
}
const ToolsIcon: FC<{ name: string } & SvgIconProps> = ({
  name,
  ...restProps
}) => {
  const renderIcon = () => {
    switch (name) {
      case 'CropOriginal': {
        return <CropOriginalIcon {...restProps} />
      }
      case 'CheckCircle': {
        return <CheckCircleIcon {...restProps} />
      }
      case 'Lightbulb': {
        return <LightbulbOutlinedIcon {...restProps} />
      }
      case 'WorkspacePremiumOutlined': {
        return <WorkspacePremiumOutlinedIcon {...restProps} />
      }
      case 'ThumbUpAltOutlined': {
        return <ThumbUpAltOutlinedIcon {...restProps} />
      }
      case 'LockOutlined': {
        return <LockOutlinedIcon {...restProps} />
      }
      case 'LocalPoliceOutlined': {
        return <LocalPoliceOutlinedIcon {...restProps} />
      }
      case 'ComputerOutlined': {
        return <ComputerOutlinedIcon {...restProps} />
      }
      case 'HistoryEdu': {
        return <HistoryEduIcon {...restProps} />
      }
      default: {
        if (name in IconsMap) {
          const Icon = IconsMap[name as ICustomIconType]
          return <Icon {...restProps} />
        }
        return null
      }
    }
  }

  return renderIcon()
}
export default ToolsIcon
