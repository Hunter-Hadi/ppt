import { SvgIconProps, SxProps } from '@mui/material';
import dynamic from 'next/dynamic';
import React, { FC } from 'react';

const iconsMap: {
  [key in ICustomIconType]: React.ComponentType<SvgIconProps>;
} = {
  Shopify: dynamic(() => import('./icons/Shopify')),
  Chrome: dynamic(() => import('./icons/Chrome')),
  FacebookAds: dynamic(() => import('./icons/FacebookAds')),
  Facebook: dynamic(() => import('./icons/Facebook')),
  SimplyTrends: dynamic(() => import('./icons/SimplyTrends')),
  TikTok: dynamic(() => import('./icons/TikTok')),
  Lock: dynamic(() => import('./icons/Lock')),
  Done: dynamic(() => import('./icons/Done')),
  Unhappy: dynamic(() => import('./icons/Unhappy')),
  Incorrect: dynamic(() => import('./icons/Incorrect')),
  Database: dynamic(() => import('./icons/Database')),
  ThumbUp: dynamic(() => import('./icons/ThumbUp')),
  ChatGPTLogo: dynamic(() => import('./icons/ChatGPTLogo')),
  ChatGPTLogoOutLine: dynamic(() => import('./icons/ChatGPTLogoOutLine')),
  ChatGPTLogoBlack: dynamic(() => import('./icons/ChatGPTLogoBlack')),
  BingLogo: dynamic(() => import('./icons/BingLogo')),
  BardLogo: dynamic(() => import('./icons/BardLogo')),
  ClaudeLogo: dynamic(() => import('./icons/ClaudeLogo')),
  ClaudeLogoBlack: dynamic(() => import('./icons/ClaudeLogoBlack')),
  ChromeColor: dynamic(() => import('./icons/ChromeColor')),
  EdgeColor: dynamic(() => import('./icons/EdgeColor')),
  Edge: dynamic(() => import('./icons/Edge')),
  Gemini: dynamic(() => import('./icons/Gemini')),
  TwitterX: dynamic(() => import('./icons/TwitterX')),
  PDF: dynamic(() => import('./icons/PDF')),
  YouTube: dynamic(() => import('./icons/YouTube')),
  AIPowerSearch: dynamic(() => import('./icons/AIPowerSearch')),
  Gmail: dynamic(() => import('./icons/Gmail')),
  LinkedIn: dynamic(() => import('./icons/LinkedIn')),
  Outlook: dynamic(() => import('./icons/Outlook')),
  GoogleAds: dynamic(() => import('./icons/GoogleAds')),
  MaxAILogo: dynamic(() => import('./icons/MaxAILogo')),
  Instagram: dynamic(() => import('./icons/Instagram')),
  DALLE: dynamic(() => import('./icons/DALLE')),
  ChatWithPDF: dynamic(() => import('./icons/ChatWithPDF')),
  FirefoxColor: dynamic(() => import('./icons/FirefoxColor')),
};
export type ICustomIconType =
  | 'Shopify'
  | 'Chrome'
  | 'SimplyTrends'
  | 'TwitterX'
  | 'Instagram'
  | 'FacebookAds'
  | 'Facebook'
  | 'TikTok'
  | 'ChatGPTLogo'
  | 'ChatGPTLogoOutLine'
  | 'ChatGPTLogoBlack'
  | 'BingLogo'
  | 'BardLogo'
  | 'ClaudeLogo'
  | 'ClaudeLogoBlack'
  | 'Lock'
  | 'Done'
  | 'Unhappy'
  | 'Incorrect'
  | 'Database'
  | 'ThumbUp'
  | 'ChromeColor'
  | 'EdgeColor'
  | 'Edge'
  | 'Gemini'
  | 'PDF'
  | 'YouTube'
  | 'AIPowerSearch'
  | 'Gmail'
  | 'LinkedIn'
  | 'Outlook'
  | 'GoogleAds'
  | 'MaxAILogo'
  | 'DALLE'
  | 'ChatWithPDF'
  | 'FirefoxColor';
interface IconType {
  icon: ICustomIconType;
  sx?: SxProps; // 假设 sx 是可选的对象
}

const CustomIcon: FC<IconType> = ({ icon, sx }) => {
  if (!icon || !iconsMap[icon]) {
    return null; // 如果 icon 不存在或没有匹配的组件，返回 null
  }

  const IconComponent = iconsMap[icon];
  return <IconComponent sx={sx} />;
};

export default CustomIcon;
