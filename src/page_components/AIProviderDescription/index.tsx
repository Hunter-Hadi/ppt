import { Box, Stack, Tab, Tabs, Typography } from '@mui/material';
import React, { FC, useMemo, useState } from 'react';

import CustomIcon from '@/components/CustomIcon';

import ProviderDescription from './ProviderDescription';

export type IAIProviderTabType =
  | 'chatgpt'
  | 'free-ai'
  | 'openai-api'
  | 'bing'
  | 'bard'
  | 'claude';

const AIProviderList: IAIProviderTabType[] = [
  'chatgpt',
  'openai-api',
  'free-ai',
  'bard',
  'bing',
  'claude',
];

// const BATA_TYPE: IAIProviderTabType[] = ['bing', 'bard'];

const AIProviderDescription = () => {
  const [tabActive, setTabActive] = useState<IAIProviderTabType>('chatgpt');

  return (
    <Box
      sx={{
        border: '1px solid rgba(0, 0, 0, 0.08)',
        bgcolor: 'background.paper',
        p: 1,
        width: '100%',
      }}
    >
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={tabActive}
          onChange={(e, newValue) => setTabActive(newValue)}
          variant='scrollable'
          scrollButtons
          allowScrollButtonsMobile
        >
          {AIProviderList.map((providerType) => (
            <Tab
              key={providerType}
              value={providerType}
              label={
                <ProviderTabLabel
                  type={providerType}
                  isActive={providerType === tabActive}
                />
              }
            />
          ))}
        </Tabs>
      </Box>
      <ProviderDescription type={tabActive} />
    </Box>
  );
};

const ProviderTabLabel: FC<{ type: IAIProviderTabType; isActive: boolean }> = ({
  type,
  isActive,
}) => {
  const icon = useMemo(() => {
    if (type === 'chatgpt') {
      return 'ChatGPTLogo';
    }

    if (type === 'free-ai') {
      return 'AILogo';
    }

    if (type === 'openai-api') {
      return 'ChatGPTLogoOutLine';
    }

    if (type === 'bing') {
      return 'BingLogo';
    }

    if (type === 'claude') {
      return 'ClaudeLogo';
    }

    return 'BardLogo';
  }, [type]);

  const label = useMemo(() => {
    if (type === 'chatgpt') {
      return 'ChatGPT';
    }

    if (type === 'free-ai') {
      return 'Free AI';
    }

    if (type === 'openai-api') {
      return 'OpenAI API';
    }

    if (type === 'bing') {
      return 'Bing';
    }

    if (type === 'bard') {
      return 'Bard';
    }
    if (type === 'claude') {
      return 'Claude';
    }
  }, [type]);

  // default
  return (
    <Stack direction='row' alignItems='center' spacing={1}>
      <CustomIcon
        icon={icon}
        sx={{
          fontSize: 20,
          filter: isActive ? 'grayscale(0)' : 'grayscale(1)',
        }}
      />
      <Typography variant='body2' whiteSpace='nowrap'>
        {label}
      </Typography>
    </Stack>
  );
};

export default AIProviderDescription;
