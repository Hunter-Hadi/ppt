import { Box, SxProps } from '@mui/material';
import { FC, useCallback, useEffect, useRef, useState } from 'react';

import AppLoadingLayout from '@/app_layout/AppLoadingLayout';
import { WWW_PROJECT_LINK } from '@/global_constants';

interface IProps {
  sx?: SxProps;
  linkRef?: string;
}

// 静态声明 landing page 的高度
// 要随着 https://www.maxai.me/embed/introduction 页面实际高度的修改 去更新
const STATIC_LANDING_HEIGHT = 6600;

const LandingPageEmbedBox: FC<IProps> = ({ sx, linkRef }) => {
  // debugger
  // const landingPageUrl = `http://localhost:3001/embed/introduction`;
  const landingPageUrl = `${WWW_PROJECT_LINK}/embed/introduction${
    linkRef ? `?ref=${linkRef}` : ''
  }`;
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [loading, setLoading] = useState(true);
  const [isMsgHeight, setIsMsgHeight] = useState(false);
  const [height, setHeight] = useState('auto');

  const handleIframeOnload = useCallback(async () => {
    setLoading(false);

    if (!isMsgHeight) {
      setHeight(`${STATIC_LANDING_HEIGHT}px`);
      setIsMsgHeight(false);
    }
  }, [isMsgHeight]);

  useEffect(() => {
    const listener = (e: any) => {
      if (e.data.type !== 'embed') {
        return;
      }
      const messageHeight = e.data.height;
      if (messageHeight && messageHeight > 0) {
        setHeight(`${messageHeight}px`);
        setIsMsgHeight(true);
      }
    };
    window.addEventListener('message', listener);

    return () => {
      window.removeEventListener('message', listener);
    };
  }, []);

  return (
    <Box
      sx={{
        width: '100vw',
        height,
        ...sx,
      }}
      data-msg-height={isMsgHeight}
    >
      <AppLoadingLayout
        loading={loading}
        sx={{
          height: 'auto',
        }}
      />
      <iframe
        ref={iframeRef}
        src={landingPageUrl}
        title='landing page embed'
        width='100%'
        height={loading ? '0px' : '100%'}
        frameBorder='0'
        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
        allowFullScreen
        onLoad={handleIframeOnload}
      />
    </Box>
  );
};

export default LandingPageEmbedBox;
