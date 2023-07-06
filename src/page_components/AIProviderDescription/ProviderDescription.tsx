import { Stack, StackProps, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';

import CopyTypography from '@/components/CopyTypography';
import CustomIcon, { ICustomIconType } from '@/components/CustomIcon';
import ProLink from '@/components/ProLink';

// import { routerToSettingPage } from '@/features/extension/utils';
import { IAIProviderTabType } from '.';

interface IProps {
  type: IAIProviderTabType;
}

interface IDescListItem {
  icon: ICustomIconType;
  text: string | React.ReactNode;
}

const ProviderDescription: FC<IProps> = ({ type }) => {
  if (type === 'chatgpt') {
    return <ChatGPT />;
  }

  if (type === 'free-ai') {
    return <FreeAI />;
  }

  if (type === 'openai-api') {
    return <OpenAI />;
  }

  if (type === 'bing') {
    return <Bing />;
  }

  if (type === 'bard') {
    return <Bard />;
  }
  if (type === 'claude') {
    return <Claude />;
  }

  // default
  return <></>;
};

const ChatGPT = () => {
  const liSx = useMemo(
    () => ({
      position: 'relative',
      pl: 3,
      ':before': {
        position: 'absolute',
        content: '""',
        width: 4,
        height: 4,
        top: 12,
        borderRadius: '50%',
        bgcolor: '#000',
        left: '10px',
      },
    }),
    [],
  );

  return (
    <Stack p={2}>
      <Typography variant='h6' mb={1}>
        Use your own ChatGPT web app to power the extension.
      </Typography>
      <Typography variant='body2' mb={3}>
        You need to log into your own ChatGPT account, and keep the pinned
        ChatGPT website tab open to power the extension.
      </Typography>
      <Stack p={2} bgcolor={'#0000000A'} borderRadius={1}>
        <Stack
          direction='row'
          rowGap={1}
          flexWrap='wrap'
          pb={1}
          mb={1}
          borderBottom='1px solid rgba(0, 0, 0, 0.08)'
        >
          <CenterTypography width={'50%'}>
            <CustomIcon icon='Lock' />
            <Typography variant='body2'>OpenAI account required</Typography>
          </CenterTypography>
          <CenterTypography width={'50%'}>
            <CustomIcon icon='Unhappy' />
            <Typography variant='body2'>ChatGPT interruptions</Typography>
          </CenterTypography>
          <CenterTypography width={'50%'}>
            <CustomIcon icon='Lock' />
            <Typography variant='body2'>Country restrictions apply</Typography>
          </CenterTypography>
        </Stack>
        <Stack direction='row'>
          <Stack width={'50%'} spacing={1.5}>
            <Typography variant='body2'>For ChatGPT free plan:</Typography>
            <Stack spacing={1}>
              <CenterTypography sx={liSx}>
                <CustomIcon icon='ThumbUp' />
                <Typography variant='body2'>Free to use</Typography>
              </CenterTypography>
              <CenterTypography sx={liSx}>
                <CustomIcon icon='Incorrect' />
                <Typography variant='body2'>Not always available</Typography>
              </CenterTypography>
              <CenterTypography sx={liSx}>
                <CustomIcon icon='Unhappy' />
                <Typography variant='body2'>Standard response speed</Typography>
              </CenterTypography>
              <CenterTypography sx={liSx}>
                <CustomIcon icon='Incorrect' />
                <Typography variant='body2'>GPT-4 unavailable</Typography>
              </CenterTypography>
              <CenterTypography sx={liSx}>
                <CustomIcon icon='Incorrect' />
                <Typography variant='body2'>Plugins unavailable</Typography>
              </CenterTypography>
            </Stack>
          </Stack>
          <Stack width={'50%'} spacing={1.5}>
            <Typography variant='body2'>For ChatGPT Plus:</Typography>
            <Stack spacing={1}>
              <CenterTypography sx={liSx}>
                <CustomIcon icon='Database' />
                <Typography variant='body2'>Pay $20/mo to OpenAI </Typography>
              </CenterTypography>
              <CenterTypography sx={liSx}>
                <CustomIcon icon='Done' />
                <Typography variant='body2'>Always available </Typography>
              </CenterTypography>
              <CenterTypography sx={liSx}>
                <CustomIcon icon='Done' />
                <Typography variant='body2'>Fast response speed </Typography>
              </CenterTypography>
              <CenterTypography sx={liSx}>
                <CustomIcon icon='Done' />
                <Typography variant='body2'>GPT-4 available</Typography>
              </CenterTypography>
              <CenterTypography sx={liSx}>
                <CustomIcon icon='Done' />
                <Typography variant='body2'>Plugins available</Typography>
              </CenterTypography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
};
const FreeAI = () => {
  return (
    <Stack p={2}>
      <Typography variant='h6' mb={1}>
        Use ChatGPT to power the extension.
      </Typography>
      <Typography variant='body2' mb={3}>
        As fast as ChatGPT Plus. No country restrictions. Powered by
        gpt-3.5-turbo.
      </Typography>

      <Stack p={2} bgcolor={'#0000000A'} borderRadius={1}>
        <Stack direction='row' rowGap={1.5} flexWrap='wrap' pb={1} mb={1}>
          <CenterTypography width={'50%'}>
            <CustomIcon icon='ThumbUp' />
            <Typography variant='body2'>Free to use</Typography>
          </CenterTypography>
          <CenterTypography width={'50%'}>
            <CustomIcon icon='Done' />
            <Typography variant='body2'>Always available</Typography>
          </CenterTypography>
          <CenterTypography width={'50%'}>
            <CustomIcon icon='Done' />
            <Typography variant='body2'>No OpenAI account required</Typography>
          </CenterTypography>
          <CenterTypography width={'50%'}>
            <CustomIcon icon='Done' />
            <Typography variant='body2'>Fast response speed</Typography>
          </CenterTypography>
          <CenterTypography width={'50%'}>
            <CustomIcon icon='Done' />
            <Typography variant='body2'>No country restrictions</Typography>
          </CenterTypography>
          <CenterTypography width={'50%'}>
            <CustomIcon icon='Incorrect' />
            <Typography variant='body2'> GPT-4 unavailable</Typography>
          </CenterTypography>
          <CenterTypography width={'50%'}>
            <CustomIcon icon='Done' />
            <Typography variant='body2'>No ChatGPT interruptions</Typography>
          </CenterTypography>
        </Stack>
      </Stack>
    </Stack>
  );
};
const OpenAI = () => {
  return (
    <Stack p={2}>
      <Typography variant='h6' mb={1}>
        Use your own OpenAI API key to power the extension.
      </Typography>
      <Typography variant='body2' mb={3}>
        Most are unaware that all ChatGPT users can easily obtain their own API
        key for free trial usage from OpenAI. To create your OpenAI API key,
        refer to the instructions provided on our{' '}
        <CopyTypography
          wrapperMode
          text='chrome-extension://mhnlakgilnojmhinhkckjpncpbhabphi/pages/options/index.html#chatgpt-api-settings'
        >
          <Typography
            variant='body2'
            component={'span'}
            sx={{
              textDecorationLine: 'underline',
              cursor: 'pointer',
              color: 'primary.main',
            }}
            // onClick={routerToSettingPage}
          >
            Settings page
          </Typography>
        </CopyTypography>
        .
      </Typography>

      <Stack p={2} bgcolor={'#0000000A'} borderRadius={1}>
        <Stack direction='row' rowGap={1.5} flexWrap='wrap' pb={1} mb={1}>
          <CenterTypography width={'50%'}>
            <CustomIcon icon='Database' />
            <Typography variant='body2'>Pay $ as you go to OpenAI</Typography>
          </CenterTypography>
          <CenterTypography width={'50%'}>
            <CustomIcon icon='Done' />
            <Typography variant='body2'>No ChatGPT interruptions</Typography>
          </CenterTypography>
          <CenterTypography width={'50%'}>
            <CustomIcon icon='Lock' />
            <Typography variant='body2'>OpenAI account required</Typography>
          </CenterTypography>
          <CenterTypography width={'50%'}>
            <CustomIcon icon='Done' />
            <Typography variant='body2'>Always available</Typography>
          </CenterTypography>
          <CenterTypography width={'50%'}>
            <CustomIcon icon='Lock' />
            <Typography variant='body2'>Country restrictions apply</Typography>
          </CenterTypography>
          <CenterTypography width={'50%'}>
            <CustomIcon icon='Done' />
            <Typography variant='body2'>Fast response speed</Typography>
          </CenterTypography>
          <CenterTypography width={'50%'}></CenterTypography>
          <CenterTypography width={'50%'}>
            <CustomIcon icon='Done' />
            <Typography variant='body2'>
              GPT-4 availability depends on your account
            </Typography>
          </CenterTypography>
        </Stack>
      </Stack>
    </Stack>
  );
};
const Bing = () => {
  const descList: IDescListItem[] = [
    {
      icon: 'ThumbUp',
      text: 'Free to use',
    },
    {
      icon: 'Done',
      text: 'Always available',
    },
    {
      icon: 'Lock',
      text: 'New Bing Chat access required',
    },
    {
      icon: 'Unhappy',
      text: 'Standard response speed',
    },
    {
      icon: 'Done',
      text: 'No country restrictions',
    },
    {
      icon: 'Done',
      text: 'Internet access and GPT-4 available',
    },
  ];
  return (
    <Stack p={2}>
      <Typography variant='h6' mb={1}>
        Use your own Bing AI to power the extension.
      </Typography>
      <Typography variant='body2' mb={3}>
        You need to log into your own Microsoft account that has access to the
        New Bing Chat. If your Microsoft account does not have access to the New
        Bing Chat, you can join the waitlist at{' '}
        <ProLink
          href='https://bing.com/chat'
          target='_blank'
          underline='always'
        >
          bing.com/chat
        </ProLink>
        .
      </Typography>

      <Stack p={2} bgcolor={'#0000000A'} borderRadius={1}>
        <Stack direction='row' rowGap={1.5} flexWrap='wrap' pb={1} mb={1}>
          {descList.map((item, index) => (
            <CenterTypography width={'50%'} key={index}>
              <CustomIcon icon={item.icon} />
              <Typography variant='body2'>{item.text}</Typography>
            </CenterTypography>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};
const Bard = () => {
  const descList: IDescListItem[] = [
    {
      icon: 'ThumbUp',
      text: 'Free to use',
    },
    {
      icon: 'Done',
      text: 'Always available',
    },
    {
      icon: 'Lock',
      text: 'Bard access required',
    },
    {
      icon: 'Unhappy',
      text: 'Standard response speed',
    },
    {
      icon: 'Lock',
      text: 'Country restrictions apply',
    },
    {
      icon: 'Done',
      text: 'Internet access and Bard AI & tools available',
    },
  ];
  return (
    <Stack p={2}>
      <Typography variant='h6' mb={1}>
        Use your own Bard to power the extension.
      </Typography>
      <Typography variant='body2' mb={3}>
        You need to log into your own Google account that has access to Bard. If
        your Google account does not have access to Bard, you can join the
        waitlist at{' '}
        <ProLink
          href='https://bard.google.com'
          target='_blank'
          underline='always'
        >
          bard.google.com
        </ProLink>
        .
      </Typography>

      <Stack p={2} bgcolor={'#0000000A'} borderRadius={1}>
        <Stack direction='row' rowGap={1.5} flexWrap='wrap' pb={1} mb={1}>
          {descList.map((item, index) => (
            <CenterTypography width={'50%'} key={index}>
              <CustomIcon icon={item.icon} />
              <Typography variant='body2'>{item.text}</Typography>
            </CenterTypography>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};
const Claude = () => {
  const descList: IDescListItem[] = [
    {
      icon: 'ThumbUp',
      text: 'Free to use',
    },
    {
      icon: 'Done',
      text: 'Always available',
    },
    {
      icon: 'Lock',
      text: 'Poe access required',
    },
    {
      icon: 'Unhappy',
      text: 'Standard response speed',
    },

    {
      icon: 'Lock',
      text: 'Country restrictions apply',
    },
    {
      icon: 'Done',
      text: <>Limited access to Claude-instant-100k and Claude+</>,
    },
  ];

  return (
    <Stack p={2}>
      <Typography variant='h6' mb={1}>
        Use your own Claude (operated by Poe) to power the extension.
      </Typography>
      <Typography variant='body2' mb={3}>
        {`You need to log into your own Poe account that has access to
        Claude-instant, Claude-instant-100k, Claude+. If you don't have a Poe
        account yet, you can easily get one for free on `}
        <ProLink href='https://poe.com/' target='_blank' underline='always'>
          poe.com
        </ProLink>
        {`.`}
      </Typography>

      <Stack p={2} bgcolor={'#0000000A'} borderRadius={1}>
        <Stack direction='row' rowGap={1.5} flexWrap='wrap' pb={1} mb={1}>
          {descList.map((item, index) => (
            <CenterTypography width={'50%'} key={index}>
              <CustomIcon icon={item.icon} />
              <Typography variant='body2'>{item.text}</Typography>
            </CenterTypography>
          ))}
        </Stack>
      </Stack>
    </Stack>
  );
};

interface ICenterTypographyProps extends StackProps {
  children?: React.ReactNode;
}

const CenterTypography: FC<ICenterTypographyProps> = ({
  children,
  ...restProps
}) => (
  <Stack direction='row' spacing={1} {...restProps}>
    {children}
  </Stack>
);

export default ProviderDescription;
