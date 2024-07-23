import { SxProps } from '@mui/material'
import React, { FC, useMemo } from 'react'

import AIPowerSearch from './icons/AIPowerSearch'
import BardLogo from './icons/BardLogo'
import BingLogo from './icons/BingLogo'
import ChatGPTLogo from './icons/ChatGPTLogo'
import ChatGPTLogoBlack from './icons/ChatGPTLogoBlack'
import ChatGPTLogoOutLine from './icons/ChatGPTLogoOutLine'
import ChatWithPDF from './icons/ChatWithPDF'
import Chrome from './icons/Chrome'
import ChromeColor from './icons/ChromeColor'
import Claude35Sonnet from './icons/Claude3-5Sonnet'
import ClaudeLogo from './icons/ClaudeLogo'
import ClaudeLogoBlack from './icons/ClaudeLogoBlack'
import DALLE from './icons/DALLE'
import Database from './icons/Database'
import Done from './icons/Done'
import Edge from './icons/Edge'
import EdgeColor from './icons/EdgeColor'
import Facebook from './icons/Facebook'
import FacebookAds from './icons/FacebookAds'
import FirefoxColor from './icons/FirefoxColor'
import Gemini from './icons/Gemini'
import GeminiPro from './icons/GeminiPro'
import Gmail from './icons/Gmail'
import GoogleAds from './icons/GoogleAds'
import GPT4o from './icons/GPT4o'
import Incorrect from './icons/Incorrect'
import Instagram from './icons/Instagram'
import LinkedIn from './icons/LinkedIn'
import Lock from './icons/Lock'
import MaxAILogo from './icons/MaxAILogo'
import Outlook from './icons/Outlook'
import PDF from './icons/PDF'
import Shopify from './icons/Shopify'
import SimplyTrends from './icons/SimplyTrends'
import ThumbUp from './icons/ThumbUp'
import TikTok from './icons/TikTok'
import TwitterX from './icons/TwitterX'
import Unhappy from './icons/Unhappy'
import YouTube from './icons/YouTube'

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
      case 'SimplyTrends':
        return <SimplyTrends sx={sxCache} />
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
