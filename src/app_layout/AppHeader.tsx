import {
  AppBar,
  Box,
  buttonClasses,
  Divider,
  Stack,
  Toolbar,
  Typography,
} from '@mui/material';
import { useRouter } from 'next/router';
import React, { FC } from 'react';

import { CustomImageBox } from '@/components/CustomImage';
import ProLink from '@/components/ProLink';
import LanguageSelect from '@/components/select/LanguageSelect';
import { usePreferredLanguage } from '@/i18n/hooks';
import CTAInstallButton from '@/page_components/CTAInstallButton';

// const NOT_CTA_BUTTON_PATH = ['/chrome-extension'];
const NOT_HEADER_PATH = ['/zmo', '/partners/'];

const AppHeader: FC = () => {
  const { pathname } = useRouter();

  const { currentLanguage, changeLanguage } = usePreferredLanguage();

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
        <Stack direction={'row'} alignItems='center' spacing={1}>
          <LanguageSelect
            sx={{
              // minWidth: 220,
              width: {
                xs: 80,
                sm: 160,
              },
              '& .MuiAutocomplete-popper': {
                bgcolor: 'red',
              },
            }}
            defaultValue={currentLanguage}
            onChange={changeLanguage}
            popperSx={{
              width: '160px !important',
            }}
          />
          <CTAInstallButton
            sx={{
              width: 'max-content',
              height: { xs: 48, sm: 56 },
              fontSize: 18,
              fontWeight: 600,
              [`& .${buttonClasses.startIcon}`]: {
                display: {
                  xs: 'none',
                  sm: 'inherit',
                },
              },
            }}
            trackerLinkProps={{
              queryRefEnable: false,
              pathnameRefEnable: true,
              pathnameRefPrefix: 'topbar',
            }}
            variant={'contained'}
          />
        </Stack>
      </Toolbar>
      <Divider />
    </AppBar>
  );
};
export default AppHeader;
