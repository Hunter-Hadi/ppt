import { Box, Divider, Grid, Paper, Stack, Typography } from '@mui/material'
import isRegExp from 'lodash-es/isRegExp'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import React from 'react'

import FooterList from '@/components/Footerlist'
import ProLink from '@/components/ProLink'
import {
  APP_EXTERNAL_LINKS,
  APP_PROJECT_LINK,
  WWW_PROJECT_LINK,
} from '@/global_constants'
import AppLogo from '@/page_components/AppLogo'
import usePdfToolPathname from '@/page_components/PdfToolsPages/hooks/usePdfToolPathname'

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

  const { getPdfToolPathnameWithLocale } = usePdfToolPathname()

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
              lg: 18,
            }}
            mb={{
              xs: 6,
              sm: 10,
            }}
          >
            <Stack
              spacing={1.5}
              sx={{
                maxWidth: {
                  xs: 'max-content',
                  sm: 300,
                },
              }}
            >
              <AppLogo />
              <Stack spacing={1}>
                {/* <Typography
                  variant='body2'
                  fontWeight={700}
                  color='primary.main'
                >
                  #1 {t('modules:footer__title')}
                </Typography> */}
                <Typography variant='custom' fontSize={14} lineHeight={1.5}>
                  {t('modules:footer__desc')}
                </Typography>
              </Stack>
              {/* <A16zTop50AppsBadge /> */}
            </Stack>

            <Grid container spacing={4}>
              <Grid
                item
                xs={6}
                sm={4}
                lg={3}
                display={'flex'}
                justifyContent={{ xs: 'flex-start', sx: 'center' }}
              >
                <FooterList
                  title={t('app_footer:download__title')}
                  data={[
                    {
                      label: 'MaxAI for Chrome',
                      // icon: <CustomIcon icon='Chrome' />,
                      target: '_blank',
                      link: APP_EXTERNAL_LINKS.CHROME_EXTENSION,
                    },
                    {
                      label: 'MaxAI for Edge',
                      // icon: <CustomIcon icon='Edge' />,
                      target: '_blank',
                      link: APP_EXTERNAL_LINKS.EDGE_EXTENSION,
                    },
                  ]}
                />
              </Grid>
              <Grid
                item
                xs={6}
                sm={4}
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
                    {
                      label: t('app_footer:use_cases__ai_prompt__label'),
                      icon: null,
                      link: `/prompt/library`,
                    },
                  ]}
                />
              </Grid>
              <Grid
                item
                xs={6}
                sm={4}
                lg={3}
                display={'flex'}
                justifyContent={{ xs: 'flex-start', sx: 'center' }}
              >
                <FooterList
                  title={t('app_footer:resource__title')}
                  data={[
                    {
                      label: t('app_footer:resource__affiliate__label'),
                      icon: null,
                      link: `/affiliate`,
                    },
                    {
                      label: t('app_footer:resource__learning_center__label'),
                      icon: null,
                      link: `${WWW_PROJECT_LINK}/docs/help/`,
                    },
                    {
                      label: t('modules:footer__how_to_use'),
                      // icon: <HelpOutlineIcon />,
                      icon: null,
                      link: `${APP_PROJECT_LINK}/get-started`,
                    },
                  ]}
                />
              </Grid>
              <Grid
                item
                xs={6}
                sm={4}
                lg={3}
                display={'flex'}
                justifyContent={{ xs: 'flex-start', sx: 'center' }}
                order={{
                  xs: 'unset',
                  sm: '10',
                  lg: 'unset',
                }}
              >
                <FooterList
                  title={t('app_footer:company__title')}
                  data={[
                    {
                      label: t('modules:footer__contact_us'),
                      // icon: <MailOutlineIcon />,
                      icon: null,
                      link: '/contact-us',
                    },
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
                xs={6}
                sm={4}
                lg={3}
                display={'flex'}
                justifyContent={{ xs: 'flex-start', sx: 'center' }}
              >
                <FooterList
                  title={t('modules:header__menu__products__features')}
                  data={[
                    {
                      link: '/features/ai-summary',
                      label: t(
                        'modules:header__menu__products__features__ai_summary__label',
                      ),
                    },
                    {
                      link: '/features/ai-reader',
                      label: t(
                        'modules:header__menu__products__features__ai_reading_assistant__label',
                      ),
                    },
                    {
                      link: '/features/ai-vision',
                      label: t(
                        'modules:header__menu__products__features__ai_vision__label',
                      ),
                    },
                    {
                      link: '/features/ai-rewriter',
                      label: t(
                        'modules:header__menu__products__features__ai_rewriter__label',
                      ),
                    },
                    {
                      link: '/features/ai-instant-reply',
                      label: t(
                        'modules:header__menu__products__features__ai_instant_reply__label',
                      ),
                    },
                    {
                      link: '/features/ai-chat',
                      label: t(
                        'modules:header__menu__products__features__ai_chat__label',
                      ),
                    },
                    {
                      link: '/features/ai-search',
                      label: t(
                        'modules:header__menu__products__features__ai_search__label',
                      ),
                    },
                    {
                      link: '/features/ai-translator',
                      label: t(
                        'modules:header__menu__products__features__ai_translator__label',
                      ),
                    },
                    {
                      link: '/features/ai-prompts',
                      label: t(
                        'modules:header__menu__products__features__ai_prompts__label',
                      ),
                    },
                    {
                      link: '/features/ai-art',
                      label: t(
                        'modules:header__menu__products__features__ai_art__label',
                      ),
                    },
                  ]}
                />
              </Grid>
              <Grid
                item
                xs={6}
                sm={4}
                lg={3}
                display={'flex'}
                justifyContent={{ xs: 'flex-start', sx: 'center' }}
              >
                <FooterList
                  title={t('modules:header__menu__products__industries')}
                  data={[
                    {
                      link: `/industries/executives`,
                      label: t(
                        'modules:header__menu__products__industries__executives__label',
                      ),
                    },
                    {
                      link: `/industries/marketing`,
                      label: t(
                        'modules:header__menu__products__industries__marketing__label',
                      ),
                    },
                    {
                      link: `/industries/education`,
                      label: t(
                        'modules:header__menu__products__industries__education__label',
                      ),
                    },
                    {
                      link: `/industries/consulting`,
                      label: t(
                        'modules:header__menu__products__industries__consulting__label',
                      ),
                    },
                    {
                      link: `/industries/hr`,
                      label: t(
                        'modules:header__menu__products__industries__hr__label',
                      ),
                    },
                    {
                      link: `/industries/finance`,
                      label: t(
                        'modules:header__menu__products__industries__finance__label',
                      ),
                    },
                    {
                      link: `/industries/real-estate`,
                      label: t(
                        'modules:header__menu__products__industries__real_estate__label',
                      ),
                    },
                    {
                      link: `/industries/tech`,
                      label: t(
                        'modules:header__menu__products__industries__technical__label',
                      ),
                    },
                  ]}
                />
              </Grid>
              <Grid
                item
                xs={6}
                sm={4}
                lg={3}
                display={'flex'}
                justifyContent={{ xs: 'flex-start', sx: 'center' }}
              >
                <FooterList
                  title={t('modules:footer__pdf_tools')}
                  data={[
                    {
                      adaptiveLocale: false,
                      link: getPdfToolPathnameWithLocale('merge-pdf'),
                      label: t(
                        'pages:tools__index_page__constant_obj__merge_pdf__title',
                      ),
                    },
                    {
                      adaptiveLocale: false,
                      link: getPdfToolPathnameWithLocale('split-pdf'),
                      label: t(
                        'pages:tools__index_page__constant_obj__split_a_pdf__title',
                      ),
                    },
                    {
                      adaptiveLocale: false,
                      link: getPdfToolPathnameWithLocale('pdf-to-png'),
                      label: t(
                        'pages:tools__index_page__constant_obj__pdf_to_png__title',
                      ),
                    },
                    {
                      adaptiveLocale: false,
                      link: getPdfToolPathnameWithLocale('pdf-to-jpeg'),
                      label: t(
                        'pages:tools__index_page__constant_obj__pdf_to_jpeg__title',
                      ),
                    },
                    {
                      adaptiveLocale: false,
                      link: getPdfToolPathnameWithLocale('png-to-pdf'),
                      label: t(
                        'pages:tools__index_page__constant_obj__png_to_pdf__title',
                      ),
                    },
                    {
                      adaptiveLocale: false,
                      link: getPdfToolPathnameWithLocale('jpeg-to-pdf'),
                      label: t(
                        'pages:tools__index_page__constant_obj__jpeg_to_pdf__title',
                      ),
                    },
                    {
                      adaptiveLocale: false,
                      link: getPdfToolPathnameWithLocale('heic-to-pdf'),
                      label: t(
                        'pages:tools__index_page__constant_obj__heic_to_pdf__title',
                      ),
                    },
                    {
                      adaptiveLocale: false,
                      link: getPdfToolPathnameWithLocale('pdf-to-html'),
                      label: t(
                        'pages:tools__index_page__constant_obj__pdf_to_html__title',
                      ),
                    },
                    {
                      adaptiveLocale: false,
                      link: getPdfToolPathnameWithLocale('sign-pdf'),
                      label: t(
                        'pages:tools__index_page__constant_obj__sign_pdf__title',
                      ),
                    },
                    {
                      adaptiveLocale: false,
                      link: getPdfToolPathnameWithLocale('compress-pdf'),
                      label: t(
                        'pages:tools__index_page__constant_obj__compress_pdf__title',
                      ),
                    },
                    {
                      adaptiveLocale: false,
                      link: getPdfToolPathnameWithLocale('ocr-pdf'),
                      label: t(
                        'pages:tools__index_page__constant_obj__ocr_pdf__title',
                      ),
                    },
                    {
                      adaptiveLocale: false,
                      link: getPdfToolPathnameWithLocale('rotate-pdf'),
                      label: t(
                        'pages:tools__index_page__constant_obj__rotate_pdf__title',
                      ),
                    },
                    {
                      adaptiveLocale: false,
                      link: getPdfToolPathnameWithLocale('number-pages'),
                      label: t(
                        'pages:tools__index_page__constant_obj__pdf_page_numbers__title',
                      ),
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
  )
}

export default AppFooter
