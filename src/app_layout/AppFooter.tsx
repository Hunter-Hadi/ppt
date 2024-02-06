import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import { Box, Divider, Grid, Paper, Stack, Typography } from '@mui/material';
import isRegExp from 'lodash-es/isRegExp';
import { useRouter } from 'next/router';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import CustomIcon from '@/components/CustomIcon';
import FooterList from '@/components/Footerlist';
import ProLink from '@/components/ProLink';
import { APP_EXTERNAL_LINKS, APP_PROJECT_LINK } from '@/global_constants';
import AppLogo from '@/page_components/AppLogo';
import ProducthuntHonor from '@/page_components/ProducthuntHonor';

const footerBlackList = [
  '/terms',
  '/404',
  '/zmo',
  /\/partners\//,
  /\/share\//,
  '/release-notes',
];

export const APP_FOOTER_ID = 'app-footer';

const AppFooter = () => {
  const { pathname } = useRouter();

  const { t } = useTranslation();

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
    <footer className='app_footer' id={APP_FOOTER_ID}>
      <Paper
        sx={{
          position: 'relative',
          zIndex: (t) => t.zIndex.drawer,
          backgroundColor: (t) =>
            t.palette.mode === 'dark' ? t.palette.common.black : '#ffffff',
          borderRadius: 0,
          boxShadow: (t) => (t.palette.mode === 'dark' ? 1 : 'none'),
          borderTop: '1px solid rgba(0, 0, 0, 0.08)',
        }}
        elevation={0}
      >
        <Box
          sx={{
            boxSizing: 'border-box',
            py: {
              xs: 6,
              sm: 10,
            },
            px: 2,
            mx: 'auto',
            maxWidth: 1312,
          }}
        >
          <Box
            display={'flex'}
            flexDirection={{
              xs: 'column',
              sm: 'row',
            }}
            justifyContent={'center'}
            gap={{
              xs: 6,
              sm: 10,
            }}
            mb={{
              xs: 6,
              sm: 10,
            }}
          >
            <Stack
              spacing={3}
              sx={{
                maxWidth: {
                  xs: 'max-content',
                  sm: 300,
                },
              }}
            >
              <AppLogo />
              <Stack spacing={1}>
                <Typography
                  variant='body2'
                  fontWeight={700}
                  color='primary.main'
                >
                  #1 {t('modules:footer__title')}
                </Typography>
                <Typography variant='custom' fontSize={12} lineHeight={1.5}>
                  {t('modules:footer__desc')}
                </Typography>
              </Stack>
              <ProducthuntHonor
                sx={{
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  gap: 1,
                }}
              />
            </Stack>

            <Grid container spacing={4}>
              <Grid
                item
                xs={12}
                sm={6}
                lg={4}
                display={'flex'}
                justifyContent={{ xs: 'flex-start', sx: 'center' }}
              >
                <FooterList
                  title={t('modules:footer__products')}
                  data={[
                    {
                      label: 'MaxAI for Chrome',
                      icon: <CustomIcon icon='Chrome' />,
                      link: '/',
                    },
                    {
                      label: 'MaxAI for Edge',
                      icon: <CustomIcon icon='Edge' />,
                      link: `/`,
                    },
                    {
                      label: t('modules:footer__1_click_prompts'),
                      icon: <CustomIcon icon='PromptLogo' />,
                      link: '/prompts',
                    },
                  ]}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                lg={4}
                display={'flex'}
                justifyContent={{ xs: 'flex-start', sx: 'center' }}
              >
                <FooterList
                  title={t('modules:footer__follow_us')}
                  data={[
                    {
                      label: 'X/Twitter',
                      target: '_blank',
                      icon: <CustomIcon icon='TwitterX' />,
                      link: APP_EXTERNAL_LINKS.TWITTER_FOLLOW_UP_LINK,
                    },
                  ]}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                lg={4}
                display={'flex'}
                justifyContent={{ xs: 'flex-start', sx: 'center' }}
              >
                <FooterList
                  title={t('modules:footer__help')}
                  data={[
                    {
                      label: t('modules:footer__how_to_use'),
                      icon: <HelpOutlineIcon />,
                      link: `${APP_PROJECT_LINK}/get-started`,
                    },
                    {
                      label: t('modules:footer__contact_us'),
                      icon: <MailOutlineIcon />,
                      link: '/contact-us',
                    },
                  ]}
                />
              </Grid>
            </Grid>
          </Box>

          <Box>
            <Divider
              sx={{
                mb: 4,
              }}
            />

            <Stack direction={'row'} alignItems='center' spacing={3}>
              <Typography variant='caption'>© 2024 MaxAI.me</Typography>

              <ProLink
                href={'/privacy'}
                underline='always'
                sx={{
                  fontSize: 14,
                  color: 'inherit',
                  textDecorationColor: 'inherit',
                  ml: 'auto !important',
                }}
              >
                {t('modules:footer__privacy_policy')}
              </ProLink>
              <ProLink
                href={'/terms'}
                underline='always'
                sx={{
                  fontSize: 14,
                  color: 'inherit',
                  textDecorationColor: 'inherit',
                }}
              >
                {t('modules:footer__terms_of_service')}
              </ProLink>
            </Stack>
          </Box>
        </Box>
      </Paper>
    </footer>
  );
};

export default AppFooter;
