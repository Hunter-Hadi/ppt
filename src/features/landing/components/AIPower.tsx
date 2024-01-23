import { Box, Grid, Stack, SvgIcon, Typography } from '@mui/material';
import React, { FC } from 'react';

import CustomIcon from '@/components/CustomIcon';

const AI_POWER_LIST = [
  {
    label: 'ChatGPT',
    icon: 'ChatGPT',
  },
  {
    label: 'Claude',
    icon: 'Claude',
  },
  {
    label: 'Gemini',
    icon: 'Gemini',
  },
  {
    label: 'OpenAI API',
    icon: 'OpenAI API',
  },
];

const AIPower = () => {
  return (
    <Box bgcolor='white' py={5} id='homepage-ai-power'>
      <Box maxWidth={1312} mx='auto'>
        <Box width='100%' textAlign='center' mb={4}>
          <Typography variant='custom' fontSize={24}>
            Powered by
          </Typography>
        </Box>
        <Grid
          container
          px={{
            xs: 2,
            sm: 3,
          }}
          justifyContent='space-between'
          alignItems='center'
          spacing={3}
        >
          {AI_POWER_LIST.map((aiPowerItem) => (
            <Grid
              item
              key={aiPowerItem.label}
              justifyItems='center'
              xs={6}
              sm={3}
            >
              <Stack direction={'row'} spacing={1.5} alignItems='center'>
                <AILogoGray type={aiPowerItem.icon} />
                <Typography
                  variant='custom'
                  fontSize={{
                    xs: 20,
                    sm: 32,
                  }}
                  fontWeight={500}
                  lineHeight={1.4}
                  color='text.secondary'
                >
                  {aiPowerItem.label}
                </Typography>
              </Stack>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

const AILogoGray: FC<{ type: string }> = ({ type }) => {
  const renderIcon = () => {
    if (type === 'ChatGPT') {
      return <CustomIcon icon='ChatGPTLogo' />;
    }
    if (type === 'Claude') {
      return <CustomIcon icon='ClaudeLogo' />;
    }
    if (type === 'Gemini') {
      return <CustomIcon icon='Gemini' />;
    }
    if (type === 'OpenAI API') {
      return <CustomIcon icon='ChatGPTLogoOutLine' />;
    }

    return null;
  };

  return (
    <SvgIcon
      sx={{
        fontSize: {
          xs: 32,
          sm: 48,
        },
      }}
    >
      {renderIcon()}
    </SvgIcon>
  );
};

export default AIPower;
