import { SvgIconProps, SxProps } from '@mui/material';
import dynamic from 'next/dynamic';
import React, { FC } from 'react';

export type ICustomIconType =
  | 'AIPowerSearch'
  | 'BardLogo'
  | 'BingLogo'
  | 'ChatGPTLogo'
  | 'ChatGPTLogoBlack'
  | 'ChatGPTLogoOutLine'
  | 'ChatWithPDF'
  | 'Chrome'
  | 'ChromeColor'
  | 'ClaudeLogo'
  | 'ClaudeLogoBlack'
  | 'DALLE'
  | 'Database'
  | 'Done'
  | 'Edge'
  | 'EdgeColor'
  | 'Facebook'
  | 'FacebookAds'
  | 'FirefoxColor'
  | 'Gemini'
  | 'Gmail'
  | 'GoogleAds'
  | 'Incorrect'
  | 'Instagram'
  | 'LinkedIn'
  | 'Lock'
  | 'MaxAILogo'
  | 'Outlook'
  | 'PDF'
  | 'Shopify'
  | 'SimplyTrends'
  | 'ThumbUp'
  | 'TikTok'
  | 'TwitterX'
  | 'Unhappy'
  | 'YouTube'


const iconsMap: {
    [key in ICustomIconType]: React.ComponentType<SvgIconProps>;
  } = {
  AIPowerSearch: dynamic(() => import('./icons/AIPowerSearch')),
  BardLogo: dynamic(() => import('./icons/BardLogo')),
  BingLogo: dynamic(() => import('./icons/BingLogo')),
  ChatGPTLogo: dynamic(() => import('./icons/ChatGPTLogo')),
  ChatGPTLogoBlack: dynamic(() => import('./icons/ChatGPTLogoBlack')),
  ChatGPTLogoOutLine: dynamic(() => import('./icons/ChatGPTLogoOutLine')),
  ChatWithPDF: dynamic(() => import('./icons/ChatWithPDF')),
  Chrome: dynamic(() => import('./icons/Chrome')),
  ChromeColor: dynamic(() => import('./icons/ChromeColor')),
  ClaudeLogo: dynamic(() => import('./icons/ClaudeLogo')),
  ClaudeLogoBlack: dynamic(() => import('./icons/ClaudeLogoBlack')),
  DALLE: dynamic(() => import('./icons/DALLE')),
  Database: dynamic(() => import('./icons/Database')),
  Done: dynamic(() => import('./icons/Done')),
  Edge: dynamic(() => import('./icons/Edge')),
  EdgeColor: dynamic(() => import('./icons/EdgeColor')),
  Facebook: dynamic(() => import('./icons/Facebook')),
  FacebookAds: dynamic(() => import('./icons/FacebookAds')),
  FirefoxColor: dynamic(() => import('./icons/FirefoxColor')),
  Gemini: dynamic(() => import('./icons/Gemini')),
  Gmail: dynamic(() => import('./icons/Gmail')),
  GoogleAds: dynamic(() => import('./icons/GoogleAds')),
  Incorrect: dynamic(() => import('./icons/Incorrect')),
  Instagram: dynamic(() => import('./icons/Instagram')),
  LinkedIn: dynamic(() => import('./icons/LinkedIn')),
  Lock: dynamic(() => import('./icons/Lock')),
  MaxAILogo: dynamic(() => import('./icons/MaxAILogo')),
  Outlook: dynamic(() => import('./icons/Outlook')),
  PDF: dynamic(() => import('./icons/PDF')),
  Shopify: dynamic(() => import('./icons/Shopify')),
  SimplyTrends: dynamic(() => import('./icons/SimplyTrends')),
  ThumbUp: dynamic(() => import('./icons/ThumbUp')),
  TikTok: dynamic(() => import('./icons/TikTok')),
  TwitterX: dynamic(() => import('./icons/TwitterX')),
  Unhappy: dynamic(() => import('./icons/Unhappy')),
  YouTube: dynamic(() => import('./icons/YouTube')),
};


interface IconType {
  icon: ICustomIconType;
  sx?: SxProps; // 假设 sx 是可选的对象
}

const CustomIcon: FC<IconType> = ({ icon, sx }) => {
  const IconComponent = iconsMap[icon];
  if (!icon || !IconComponent) {
    return null; // 如果 icon 不存在或没有匹配的组件，返回 null
  }

  return <IconComponent sx={sx} />;
};

export default CustomIcon;
