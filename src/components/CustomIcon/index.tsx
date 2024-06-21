import { SvgIconProps, SxProps } from '@mui/material';
import React, { FC, lazy, useMemo } from 'react';
//！！！该组件由 update_icons.js 生成，请勿在此修改代码，将会无效改动！！！
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
  AIPowerSearch: lazy(() => import('./icons/AIPowerSearch')),
  BardLogo: lazy(() => import('./icons/BardLogo')),
  BingLogo: lazy(() => import('./icons/BingLogo')),
  ChatGPTLogo: lazy(() => import('./icons/ChatGPTLogo')),
  ChatGPTLogoBlack: lazy(() => import('./icons/ChatGPTLogoBlack')),
  ChatGPTLogoOutLine: lazy(() => import('./icons/ChatGPTLogoOutLine')),
  ChatWithPDF: lazy(() => import('./icons/ChatWithPDF')),
  Chrome: lazy(() => import('./icons/Chrome')),
  ChromeColor: lazy(() => import('./icons/ChromeColor')),
  ClaudeLogo: lazy(() => import('./icons/ClaudeLogo')),
  ClaudeLogoBlack: lazy(() => import('./icons/ClaudeLogoBlack')),
  DALLE: lazy(() => import('./icons/DALLE')),
  Database: lazy(() => import('./icons/Database')),
  Done: lazy(() => import('./icons/Done')),
  Edge: lazy(() => import('./icons/Edge')),
  EdgeColor: lazy(() => import('./icons/EdgeColor')),
  Facebook: lazy(() => import('./icons/Facebook')),
  FacebookAds: lazy(() => import('./icons/FacebookAds')),
  FirefoxColor: lazy(() => import('./icons/FirefoxColor')),
  GPT4o: lazy(() => import('./icons/GPT4o')),
  Gemini: lazy(() => import('./icons/Gemini')),
  GeminiPro: lazy(() => import('./icons/GeminiPro')),
  Gmail: lazy(() => import('./icons/Gmail')),
  GoogleAds: lazy(() => import('./icons/GoogleAds')),
  Incorrect: lazy(() => import('./icons/Incorrect')),
  Instagram: lazy(() => import('./icons/Instagram')),
  LinkedIn: lazy(() => import('./icons/LinkedIn')),
  Lock: lazy(() => import('./icons/Lock')),
  MaxAILogo: lazy(() => import('./icons/MaxAILogo')),
  Outlook: lazy(() => import('./icons/Outlook')),
  PDF: lazy(() => import('./icons/PDF')),
  Shopify: lazy(() => import('./icons/Shopify')),
  SimplyTrends: lazy(() => import('./icons/SimplyTrends')),
  ThumbUp: lazy(() => import('./icons/ThumbUp')),
  TikTok: lazy(() => import('./icons/TikTok')),
  TwitterX: lazy(() => import('./icons/TwitterX')),
  Unhappy: lazy(() => import('./icons/Unhappy')),
  YouTube: lazy(() => import('./icons/YouTube')),
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
