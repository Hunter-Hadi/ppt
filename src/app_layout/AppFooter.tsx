import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Box, Grid, Paper, SxProps } from '@mui/material';
import isRegExp from 'lodash/isRegExp';
import { useRouter } from 'next/router';
import React, { FC, useMemo } from 'react';

import FooterList from '@/components/Footerlist';

const footerBlackList = ['/terms', '/privacy', '/404', '/zmo'];

import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';

import CustomIcon from '@/components/CustomIcon';
import { APP_EXTERNAL_LINKS } from '@/global_constants';
interface IProps {
  title?: React.ReactNode | string;
  hideTitle?: boolean;
  sx?: SxProps;
}

const AppFooterLayout: FC<IProps> = ({ sx }) => {
  const { pathname } = useRouter();

  const showFooter = useMemo(() => {
    return !footerBlackList.some((rule) => {
      if (isRegExp(rule)) {
        const reg = new RegExp(rule);
        return reg.test(pathname);
      }
      return rule === pathname;
    });
  }, [pathname]);

  if (!showFooter) {
    return null;
  }

  return (
    <footer className='app_footer'>
      <Paper
        sx={{
          position: 'relative',
          zIndex: (t) => t.zIndex.drawer,
          backgroundColor: (t) =>
            t.palette.mode === 'dark' ? t.palette.common.black : '#ffffff',
          borderRadius: 0,
          boxShadow: (t) => (t.palette.mode === 'dark' ? 1 : 'none'),
          borderTop: '1px solid rgba(0, 0, 0, 0.08)',
          ...sx,
        }}
        elevation={0}
      >
        <Box
          maxWidth={'lg'}
          sx={{
            mx: 'auto',
            flexGrow: 1,
            px: {
              lg: 10,
              md: 8,
              sm: 6,
              xs: 2,
            },
            pt: 4,
            pb: 5,
          }}
        >
          <Grid container spacing={3}>
            <Grid
              item
              xs={12}
              sm={3}
              display={'flex'}
              justifyContent={{ xs: 'flex-start', sx: 'center' }}
            >
              <FooterList
                title={'Products'}
                data={[
                  {
                    label: 'Free Chrome extension',
                    icon: <CustomIcon icon='Chrome' />,
                    link: '/',
                  },
                  {
                    label: 'One-Click ChatGPT Prompts',
                    icon: <ChatOutlinedIcon />,
                    link: '/prompts',
                  },
                ]}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              display={'flex'}
              justifyContent={{ xs: 'flex-start', sx: 'center' }}
            >
              <FooterList
                title={'Follow Us'}
                data={[
                  {
                    label: 'Twitter',
                    target: '_blank',
                    icon: <TwitterIcon />,
                    link: APP_EXTERNAL_LINKS.TWITTER_FOLLOW_UP_LINK,
                  },
                ]}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              display={'flex'}
              justifyContent={{ xs: 'flex-start', sx: 'center' }}
            >
              <FooterList
                title={'Help'}
                data={[
                  {
                    label: 'How to use',
                    icon: <HelpOutlineIcon />,
                    link: '/extension-installed',
                  },
                  {
                    label: 'Contact Us',
                    icon: <MailOutlineIcon />,
                    link: '/contact-us',
                  },
                ]}
              />
            </Grid>
            <Grid
              item
              xs={12}
              sm={3}
              display={'flex'}
              justifyContent={{ xs: 'flex-start', sx: 'center' }}
            >
              <FooterList
                title={'Legal'}
                data={[
                  {
                    label: 'Privacy Policy',
                    icon: <LockOutlinedIcon />,
                    link: `/privacy`,
                    target: '_self',
                  },
                  {
                    label: 'Terms of Service',
                    icon: <ArticleOutlinedIcon />,
                    link: `/terms`,
                    target: '_self',
                  },
                  {
                    label: '© 2023 MaxAI.me',
                    link: `/`,
                    target: '_self',
                    icon: <></>,
                  },
                ]}
              />
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </footer>
  );
};

export default AppFooterLayout;
