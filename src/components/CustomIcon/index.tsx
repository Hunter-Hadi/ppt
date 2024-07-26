import { SxProps } from '@mui/material'
import dynamic from 'next/dynamic'
import React, { FC, useMemo } from 'react'

import AppLoadingLayout from '@/app_layout/AppLoadingLayout'

// import AIPowerSearch from './icons/AIPowerSearch'
// import BardLogo from './icons/BardLogo'
// import BingLogo from './icons/BingLogo'
// import ChatGPTLogo from './icons/ChatGPTLogo'
// import ChatGPTLogoBlack from './icons/ChatGPTLogoBlack'
// import ChatGPTLogoOutLine from './icons/ChatGPTLogoOutLine'
// import ChatWithPDF from './icons/ChatWithPDF'
// import Chrome from './icons/Chrome'
// import ChromeColor from './icons/ChromeColor'
// import ClaudeLogo from './icons/ClaudeLogo'
// import ClaudeLogoBlack from './icons/ClaudeLogoBlack'
// import DALLE from './icons/DALLE'
// import Database from './icons/Database'
// import Done from './icons/Done'
// import Edge from './icons/Edge'
// import EdgeColor from './icons/EdgeColor'
// import Facebook from './icons/Facebook'
// import FacebookAds from './icons/FacebookAds'
// import FirefoxColor from './icons/FirefoxColor'
// import Gemini from './icons/Gemini'
// import GeminiPro from './icons/GeminiPro'
// import Gmail from './icons/Gmail'
// import GoogleAds from './icons/GoogleAds'
// import GPT4o from './icons/GPT4o'
// import Incorrect from './icons/Incorrect'
// import Instagram from './icons/Instagram'
// import LinkedIn from './icons/LinkedIn'
// import Lock from './icons/Lock'
// import MaxAILogo from './icons/MaxAILogo'
// import Outlook from './icons/Outlook'
// import PDF from './icons/PDF'
// import ThumbUp from './icons/ThumbUp'
// import TikTok from './icons/TikTok'
// import TwitterX from './icons/TwitterX'
// import Unhappy from './icons/Unhappy'
// import YouTube from './icons/YouTube'

const CustomIconLoading = () => (
  <AppLoadingLayout
    loading
    loadingText=''
    sx={{
      width: 24,
      height: 24,
      my: 0,
    }}
  />
)

const Claude35Sonnet = dynamic(() => import('./icons/Claude3-5Sonnet'), {
  loading: () => <CustomIconLoading />,
})

const AIPowerSearch = dynamic(() => import('./icons/AIPowerSearch'), {
  loading: () => <CustomIconLoading />,
})
const BardLogo = dynamic(() => import('./icons/BardLogo'), {
  loading: () => <CustomIconLoading />,
})
const BingLogo = dynamic(() => import('./icons/BingLogo'), {
  loading: () => <CustomIconLoading />,
})
const ChatGPTLogo = dynamic(() => import('./icons/ChatGPTLogo'), {
  loading: () => <CustomIconLoading />,
})
const ChatGPTLogoBlack = dynamic(() => import('./icons/ChatGPTLogoBlack'), {
  loading: () => <CustomIconLoading />,
})
const ChatGPTLogoOutLine = dynamic(() => import('./icons/ChatGPTLogoOutLine'), {
  loading: () => <CustomIconLoading />,
})
const ChatWithPDF = dynamic(() => import('./icons/ChatWithPDF'), {
  loading: () => <CustomIconLoading />,
})
const Chrome = dynamic(() => import('./icons/Chrome'), {
  loading: () => <CustomIconLoading />,
})
const ChromeColor = dynamic(() => import('./icons/ChromeColor'), {
  loading: () => <CustomIconLoading />,
})
const ClaudeLogo = dynamic(() => import('./icons/ClaudeLogo'), {
  loading: () => <CustomIconLoading />,
})
const ClaudeLogoBlack = dynamic(() => import('./icons/ClaudeLogoBlack'), {
  loading: () => <CustomIconLoading />,
})
const DALLE = dynamic(() => import('./icons/DALLE'), {
  loading: () => <CustomIconLoading />,
})
const Database = dynamic(() => import('./icons/Database'), {
  loading: () => <CustomIconLoading />,
})
const Done = dynamic(() => import('./icons/Done'), {
  loading: () => <CustomIconLoading />,
})
const Edge = dynamic(() => import('./icons/Edge'), {
  loading: () => <CustomIconLoading />,
})
const EdgeColor = dynamic(() => import('./icons/EdgeColor'), {
  loading: () => <CustomIconLoading />,
})
const Facebook = dynamic(() => import('./icons/Facebook'), {
  loading: () => <CustomIconLoading />,
})
const FacebookAds = dynamic(() => import('./icons/FacebookAds'), {
  loading: () => <CustomIconLoading />,
})
const FirefoxColor = dynamic(() => import('./icons/FirefoxColor'), {
  loading: () => <CustomIconLoading />,
})
const Gemini = dynamic(() => import('./icons/Gemini'), {
  loading: () => <CustomIconLoading />,
})
const GeminiPro = dynamic(() => import('./icons/GeminiPro'), {
  loading: () => <CustomIconLoading />,
})
const Gmail = dynamic(() => import('./icons/Gmail'), {
  loading: () => <CustomIconLoading />,
})
const GoogleAds = dynamic(() => import('./icons/GoogleAds'), {
  loading: () => <CustomIconLoading />,
})
const GPT4o = dynamic(() => import('./icons/GPT4o'), {
  loading: () => <CustomIconLoading />,
})
const Incorrect = dynamic(() => import('./icons/Incorrect'), {
  loading: () => <CustomIconLoading />,
})
const Instagram = dynamic(() => import('./icons/Instagram'), {
  loading: () => <CustomIconLoading />,
})
const LinkedIn = dynamic(() => import('./icons/LinkedIn'), {
  loading: () => <CustomIconLoading />,
})
const Lock = dynamic(() => import('./icons/Lock'), {
  loading: () => <CustomIconLoading />,
})
const MaxAILogo = dynamic(() => import('./icons/MaxAILogo'), {
  loading: () => <CustomIconLoading />,
})
const Outlook = dynamic(() => import('./icons/Outlook'), {
  loading: () => <CustomIconLoading />,
})
const PDF = dynamic(() => import('./icons/PDF'), {
  loading: () => <CustomIconLoading />,
})
const ThumbUp = dynamic(() => import('./icons/ThumbUp'), {
  loading: () => <CustomIconLoading />,
})
const TikTok = dynamic(() => import('./icons/TikTok'), {
  loading: () => <CustomIconLoading />,
})
const TwitterX = dynamic(() => import('./icons/TwitterX'), {
  loading: () => <CustomIconLoading />,
})
const Unhappy = dynamic(() => import('./icons/Unhappy'), {
  loading: () => <CustomIconLoading />,
})
const YouTube = dynamic(() => import('./icons/YouTube'), {
  loading: () => <CustomIconLoading />,
})
const Shopify = dynamic(() => import('./icons/Shopify'), {
  loading: () => <CustomIconLoading />,
})

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
  | 'ThumbUp'
  | 'TikTok'
  | 'TwitterX'
  | 'Unhappy'
  | 'YouTube'
  | 'Claude3-5Sonnet'

interface IconType {
  icon: ICustomIconType
  sx?: SxProps // 假设 sx 是可选的对象
  fontSize?: number | string
}
const CustomIcon: FC<IconType> = ({ icon, sx, fontSize }) => {
  const sxCache = useMemo(() => {
    return {
      fontSize,
      ...sx,
    }
  }, [sx, fontSize])

  const renderIcon = () => {
    switch (icon) {
      case 'AIPowerSearch':
        return <AIPowerSearch sx={sxCache} />
      case 'BardLogo':
        return <BardLogo sx={sxCache} />
      case 'BingLogo':
        return <BingLogo sx={sxCache} />
      case 'ChatGPTLogo':
        return <ChatGPTLogo sx={sxCache} />
      case 'ChatGPTLogoBlack':
        return <ChatGPTLogoBlack sx={sxCache} />
      case 'ChatGPTLogoOutLine':
        return <ChatGPTLogoOutLine sx={sxCache} />
      case 'ChatWithPDF':
        return <ChatWithPDF sx={sxCache} />
      case 'Chrome':
        return <Chrome sx={sxCache} />
      case 'ChromeColor':
        return <ChromeColor sx={sxCache} />
      case 'ClaudeLogo':
        return <ClaudeLogo sx={sxCache} />
      case 'ClaudeLogoBlack':
        return <ClaudeLogoBlack sx={sxCache} />
      case 'DALLE':
        return <DALLE sx={sxCache} />
      case 'Database':
        return <Database sx={sxCache} />
      case 'Done':
        return <Done sx={sxCache} />
      case 'Edge':
        return <Edge sx={sxCache} />
      case 'EdgeColor':
        return <EdgeColor sx={sxCache} />
      case 'Facebook':
        return <Facebook sx={sxCache} />
      case 'FacebookAds':
        return <FacebookAds sx={sxCache} />
      case 'FirefoxColor':
        return <FirefoxColor sx={sxCache} />
      case 'GPT4o':
        return <GPT4o sx={sxCache} />
      case 'Gemini':
        return <Gemini sx={sxCache} />
      case 'GeminiPro':
        return <GeminiPro sx={sxCache} />
      case 'Gmail':
        return <Gmail sx={sxCache} />
      case 'GoogleAds':
        return <GoogleAds sx={sxCache} />
      case 'Incorrect':
        return <Incorrect sx={sxCache} />
      case 'Instagram':
        return <Instagram sx={sxCache} />
      case 'LinkedIn':
        return <LinkedIn sx={sxCache} />
      case 'Lock':
        return <Lock sx={sxCache} />
      case 'MaxAILogo':
        return <MaxAILogo sx={sxCache} />
      case 'Outlook':
        return <Outlook sx={sxCache} />
      case 'PDF':
        return <PDF sx={sxCache} />
      case 'Shopify':
        return <Shopify sx={sxCache} />
      case 'ThumbUp':
        return <ThumbUp sx={sxCache} />
      case 'TikTok':
        return <TikTok sx={sxCache} />
      case 'TwitterX':
        return <TwitterX sx={sxCache} />
      case 'Unhappy':
        return <Unhappy sx={sxCache} />
      case 'YouTube':
        return <YouTube sx={sxCache} />
      case 'Claude3-5Sonnet':
        return <Claude35Sonnet sx={sxCache} />

      default:
        return null
    }
  }

  return <React.Fragment>{renderIcon()}</React.Fragment>
}

export default CustomIcon
