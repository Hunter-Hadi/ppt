import { Box, Divider, Grid, Paper, Stack, Typography } from '@mui/material'
import isRegExp from 'lodash-es/isRegExp'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import React from 'react'

import FooterList from '@/components/Footerlist'
import ProLink from '@/components/ProLink'
import A16zTop50AppsBadge from '@/features/landing/components/HeroSection/A16zTop50AppsBadge'
import { APP_EXTERNAL_LINKS, APP_PROJECT_LINK } from '@/global_constants'
import AppLogo from '@/page_components/AppLogo'

const footerBlackList = [
  '/terms',
  '/404',
  '/zmo',
  /\/partners\//,
  /\/share/,
  '/release-notes',
]

export const APP_FOOTER_ID = 'app-footer'

const AppFooter = () => {
  const { pathname } = useRouter()

  const { t } = useTranslation()

  const showFooter = useMemo(() => {
    return !footerBlackList.some((rule) => {
      if (isRegExp(rule)) {
        const reg = new RegExp(rule)
        return reg.test(pathname)
      }
      return rule === pathname
    })
  }, [pathname])

  if (!showFooter) {
    return null
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
              <A16zTop50AppsBadge />
            </Stack>

            <Grid container spacing={4}>
              {/* <Grid
                item
                xs={12}
                sm={6}
                lg={3}
                display={'flex'}
                justifyContent={{ xs: 'flex-start', sx: 'center' }}
              >
                <FooterList
                  title={t('modules:footer__products')}
                  data={[
                    {
                      label: 'MaxAI for Chrome',
                      // icon: <CustomIcon icon='Chrome' />,
                      icon: null,
                      target: '_blank',
                      link: APP_EXTERNAL_LINKS.CHROME_EXTENSION,
                    },
                    {
                      label: 'MaxAI for Edge',
                      // icon: <CustomIcon icon='Edge' />,
                      icon: null,
                      target: '_blank',
                      link: APP_EXTERNAL_LINKS.EDGE_EXTENSION,
                    },
                    {
                      label: t('modules:footer__1_click_prompts'),
                      // icon: <CustomIcon icon='PromptLogo' />,
                      icon: null,
                      link: `${PROMPT_LIBRARY_PROXY_BASE_PATH}/library`,
                    },
                  ]}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                lg={3}
                display={'flex'}
                justifyContent={{ xs: 'flex-start', sx: 'center' }}
              >
                <FooterList
                  title={t('modules:footer__resources')}
                  data={[
                    {
                      label: capitalize(t('affiliate:main_keywords')),
                      icon: null,
                      target: '_self',
                      link: '/affiliate',
                    },
                    {
                      label: t('modules:footer__pdf_tools'),
                      icon: null,
                      target: '_self',
                      link: '/pdf-tools',
                    },
                    {
                      label: t('app_footer:resource__learning_center__label'),
                      icon: null,
                      target: '_self',
                      link: '/learning-center/',
                    },
                  ]}
                />
              </Grid> */}
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
                      // icon: <CustomIcon icon='TwitterX' />,
                      icon: null,
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
                      // icon: <HelpOutlineIcon />,
                      icon: null,
                      link: `${APP_PROJECT_LINK}/get-started`,
                    },
                    {
                      label: t('modules:footer__contact_us'),
                      // icon: <MailOutlineIcon />,
                      icon: null,
                      link: '/contact-us',
                    },
                  ]}
                />
              </Grid>
              {/* <Grid
                item
                xs={12}
                sm={6}
                lg={3}
                display={'flex'}
                justifyContent={{ xs: 'flex-start', sx: 'center' }}
              >
                <FooterList
                  title={t('app_footer:use_cases__title')}
                  data={[
                    {
                      label: t('app_footer:use_cases__research__label'),
                      icon: null,
                      link: `/use-cases/research`,
                    },
                    {
                      label: t('app_footer:use_cases__writing__label'),
                      icon: null,
                      link: `/use-cases/writing`,
                    },
                  ]}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                lg={3}
                display={'flex'}
                justifyContent={{ xs: 'flex-start', sx: 'center' }}
              >
                <FooterList
                  title={t('app_footer:features__title')}
                  data={[
                    {
                      label: t('app_footer:features__ai_chat__label'),
                      link: '/features/ai-chat',
                    },
                    {
                      label: t('app_footer:features__ai_summary__label'),
                      link: '/features/ai-summary',
                    },
                    {
                      label: t('app_footer:features__ai_search__label'),
                      link: '/features/ai-search',
                    },
                    {
                      label: t('app_footer:features__ai_rewriter__label'),
                      link: '/features/ai-rewriter',
                    },
                    {
                      label: t(
                        'app_footer:features__ai_reading_assistant__label',
                      ),
                      link: '/features/ai-reader',
                    },
                    {
                      label: t('app_footer:features__ai_translator__label'),
                      link: '/features/ai-translator',
                    },
                    {
                      label: t('app_footer:features__ai_instant_reply__label'),
                      link: '/features/ai-instant-reply',
                    },
                    {
                      label: t('app_footer:features__ai_prompts__label'),
                      link: '/features/ai-prompts',
                    },
                    {
                      label: t('app_footer:features__ai_vision__label'),
                      link: '/features/ai-vision',
                    },
                    {
                      label: t('app_footer:features__ai_art__label'),
                      link: '/features/ai-art',
                    },
                  ]}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                lg={3}
                display={'flex'}
                justifyContent={{ xs: 'flex-start', sx: 'center' }}
              >
                <FooterList
                  title={t('app_footer:industries__title')}
                  data={[
                    {
                      label: t('app_footer:industries__executives__label'),
                      link: `/industries/executives`,
                    },
                    {
                      label: t('app_footer:industries__marketing__label'),
                      link: `/industries/marketing`,
                    },
                    {
                      label: t('app_footer:industries__education__label'),
                      link: `/industries/education`,
                    },
                    {
                      label: t('app_footer:industries__consulting__label'),
                      link: `/industries/consulting`,
                    },
                    {
                      label: t('app_footer:industries__hr__label'),
                      link: `/industries/hr`,
                    },
                    {
                      label: t('app_footer:industries__finance__label'),
                      link: `/industries/finance`,
                    },
                    {
                      label: t('app_footer:industries__real_estate__label'),
                      link: `/industries/real-estate`,
                    },
                    {
                      label: t('app_footer:industries__technical__label'),
                      link: `/industries/tech`,
                    },
                  ]}
                />
              </Grid> */}
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
  )
}

export default AppFooter
