import {
  AppBar,
  Box,
  Button,
  Divider,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

import CustomIcon from '@/components/CustomIcon';
import { CustomImageBox } from '@/components/CustomImage';
import ProLink from '@/components/ProLink';
import { useInstallChromeExtensionLink } from '@/hooks';

// const NOT_CTA_BUTTON_PATH = ['/chrome-extension'];
const NOT_HEADER_PATH = ['/zmo'];

const AppHeader: FC = () => {
  const { installChromeExtensionLink } = useInstallChromeExtensionLink(true);

  const { pathname } = useRouter();

  const isNotHeader = NOT_HEADER_PATH.some((path) => pathname.startsWith(path));

  if (isNotHeader) {
    return null;
  }

  return (
    <AppBar
      component={'header'}
      position={'sticky'}
      sx={{
        bgcolor: 'background.paper',
        zIndex: (t) => t.zIndex.drawer + 10,
        boxShadow: (t) => (t.palette.mode === 'dark' ? 1 : 'none'),
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          boxSizing: 'border-box',
          color: 'text.primary',
          display: 'flex',
          alignItems: 'center',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          maxWidth: 'lg',
          mx: 'auto',
          px: {
            xs: 2,
            lg: 2,
          },
        }}
      >
        <Box>
          <ProLink
            href={{
              pathname: '/',
            }}
            target={'_self'}
            muiLinkProps={{ title: 'MaxAI.me' }}
          >
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <CustomImageBox width={28} height={28} src={'/logo.svg'} />
              <Typography
                color='text.primary'
                component='h1'
                fontSize={24}
                fontWeight={800}
                sx={{
                  display: {
                    xs: 'none',
                    sm: 'inline',
                  },
                }}
              >
                MaxAI.me
              </Typography>
            </Stack>
          </ProLink>
        </Box>
        <Stack direction={'row'}>
          <ProLink target={'_blank'} href={installChromeExtensionLink}>
            <Button
              startIcon={<CustomIcon icon={'Chrome'} />}
              variant={'contained'}
              sx={{
                width: 300,
                height: { xs: 48, sm: 56 },
                fontSize: 18,
                fontWeight: 600,
              }}
            >
              {`Add to Chrome — It's free`}
            </Button>
          </ProLink>
        </Stack>
      </Toolbar>
      <Divider />
    </AppBar>
  );
};
export default AppHeader;
