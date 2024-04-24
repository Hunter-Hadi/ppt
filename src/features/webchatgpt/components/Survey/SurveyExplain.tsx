import { Box, Button, Stack, SxProps, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';

import CustomIcon from '@/components/CustomIcon';
import ProLink from '@/components/ProLink';
import Logo from '@/features/webchatgpt/components/Logo';

// import { useInstallChromeExtensionLink } from '@/hooks';
import { WEBCHATGPT_EXTENSION } from '../../constant';

interface IProps {
  surveyName?: string;
  sx?: SxProps;
}

const SurveyExplain: FC<IProps> = (props) => {
  const { sx } = props;
  // const { installChromeExtensionLink } = useInstallChromeExtensionLink();

  const sxCache = useMemo<SxProps>(() => {
    return {
      alignItems: 'center',
      px: 4,
      ...sx,
    };
  }, [sx]);

  return (
    <Stack sx={sxCache} spacing={2}>
      <Box>
        <Logo imageSize={34} />
      </Box>
      <Typography variant={'body2'} textAlign='center'>
        ChatGPT with internet access and one-click prompts.
        <br />A free browser extension that enables web access and one-click
        prompts in ChatGPT for all users (Free and Plus).
      </Typography>
      <ProLink target={'_blank'} href={WEBCHATGPT_EXTENSION}>
        <Button
          startIcon={<CustomIcon icon={'Chrome'} />}
          variant={'contained'}
          sx={{
            width: 340,
            height: { xs: 48, sm: 56 },
            fontSize: 18,
            fontWeight: 600,
            bgcolor: 'rgba(0, 0, 0, 0.87) !important',
            color: '#fff !important',
          }}
        >
          {`Reinstall extension — It's free`}
        </Button>
      </ProLink>
    </Stack>
  );
};

export default SurveyExplain;
