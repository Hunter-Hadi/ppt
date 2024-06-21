import { SvgIconProps, SxProps } from '@mui/material';
import dynamic from 'next/dynamic';
import React, { FC, useMemo } from 'react';
//！！！该组件由update_icons.js生成，请勿在此修改代码，将会无效改动！！！
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
  | 'GPT4o'
  | 'Gemini'
  | 'GeminiPro'
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
  | 'YouTube';

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
  GPT4o: dynamic(() => import('./icons/GPT4o')),
  Gemini: dynamic(() => import('./icons/Gemini')),
  GeminiPro: dynamic(() => import('./icons/GeminiPro')),
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
  fontSize?: number | string;
}
//！！！该组件由update_icons.js生成，请勿在此修改代码，将会无效改动！！！
const CustomIcon: FC<IconType> = ({ icon, sx, fontSize }) => {
  const IconComponent = iconsMap[icon];
  const sxCache = useMemo(() => {
    return {
      fontSize,
      ...sx,
    };
  }, [sx, fontSize]);

  // const fontSizeCache = useMemo(() => {
  //   const sxFontSize = sxCache?.fontSize;

  //   if (typeof sxFontSize === 'string') {
  //     const newFontSize = parseInt(sxFontSize.match(/\d+/)?.[0] ?? '', 10);
  //     if (isNumber(newFontSize)) {
  //       return newFontSize;
  //     }
  //   }
  //   return (sxCache?.fontSize as number) || 24;
  // }, [sxCache]);

  // if (IconComponent) {
  //   return (
  //     <Suspense
  //       fallback={
  //         <Skeleton
  //           variant='rounded'
  //           width={fontSizeCache ?? 24}
  //           height={fontSizeCache ?? 24}
  //         />
  //       }
  //     >
  //       <IconComponent sx={sxCache} />
  //     </Suspense>
  //   );
  // } else {
  //   return null;
  // }

  return <IconComponent sx={sxCache} />;
};

export default CustomIcon;
