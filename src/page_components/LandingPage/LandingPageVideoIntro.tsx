import DesktopMacIcon from '@mui/icons-material/DesktopMac';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import { Button, Stack, ToggleButtonGroup, useMediaQuery } from '@mui/material';
import { useState } from 'react';

import VideoPlayer from '@/components/VideoPlayer';
import { GaContent, generateGaEvent } from '@/utils/gtag';
const LandingPageVideoIntro = () => {
  const isXsScreen = useMediaQuery('(max-width:422px)');
  const [videoType, setVideoType] = useState<'Mobile' | 'Desktop'>('Mobile');
  return (
    <Stack className='landing-page-video-intro'>
      {videoType === 'Mobile' ? (
        <VideoPlayer
          muted
          width={'195px'}
          height={'422px'}
          autoPlay
          loop
          src={'/assets/landing-page/video-phone.mp4'}
        />
      ) : (
        <VideoPlayer
          muted
          width={isXsScreen ? '280px' : '422px'}
          height={isXsScreen ? '280px' : '422px'}
          autoPlay
          loop
          src={'/assets/landing-page/video-desktop.mp4'}
        />
      )}
      <Stack direction={'row'} justifyContent={'center'} mt={2}>
        <ToggleButtonGroup
          color='primary'
          value={videoType}
          exclusive
          sx={{
            bgcolor: '#fff',
            width: 'unset',
            border: '2px solid #fff',
            borderRadius: 99,
            overflow: 'hidden',
            '.MuiButton-root': {
              borderRadius: '99px!important',
              px: 2,
            },
          }}
        >
          <Button
            startIcon={<PhoneIphoneIcon />}
            value={'Mobile'}
            disableElevation
            variant={videoType === 'Mobile' ? 'contained' : 'text'}
            onClick={() => setVideoType('Mobile')}
          >
            <GaContent
              gaEvent={generateGaEvent('click', 'type', {
                value: 'Mobile',
              })}
            >
              <span>Mobile</span>
            </GaContent>
          </Button>

          <Button
            value={'Desktop'}
            startIcon={<DesktopMacIcon />}
            disableElevation
            variant={videoType === 'Desktop' ? 'contained' : 'text'}
            onClick={() => setVideoType('Desktop')}
            sx={{
              position: 'relative',
            }}
          >
            <GaContent
              gaEvent={generateGaEvent('click', 'type', {
                value: 'Desktop',
              })}
            >
              <span>Desktop</span>
            </GaContent>
          </Button>
        </ToggleButtonGroup>
      </Stack>
    </Stack>
  );
};
export default LandingPageVideoIntro;
