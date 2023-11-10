import CheckIcon from '@mui/icons-material/Check';
import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import CustomIcon, { ICustomIconType } from '@/components/CustomIcon';
import { CustomImageBox } from '@/components/CustomImage';
import ProLink from '@/components/ProLink';
import ResponsiveImage from '@/components/ResponsiveImage';
import YoutubePlayerBox from '@/components/YoutubePlayerBox';
import {
  LOVED_BY_NUM,
  MAXAI_WWW_PROMPT_SHARE_TRACKER_LINK,
  PRIMARY_YOUTUBE_VIDEO_EMBED_URL,
} from '@/global_constants';
import useBrowserAgent from '@/hooks/useBrowserAgent';
import useShareTrackerLink from '@/hooks/useShareTrackerLink';
import ProducthuntHonor from '@/page_components/LandingPage/ProducthuntHonor';

import CTAInstallButton from '../CTAInstallButton';
/**
 * NOTE:
 * 修改这个组件时需要注意渲染后的 body 高度 (获取高度的方式可以访问当前项目的路由 /embed/introduction)
 * 是否和 maxai_app LandingPageEmbedBox 组件中声明的 STATIC_LANDING_HEIGHT 是否一致
 * @links:
 *  1. https://github.com/simplyfuture/maxai_app/blob/prod/src/components/LandingPageEmbedBox.tsx
 *  2. https://github.com/simplyfuture/usechatgpt_www/blob/prod-zmo-tool/src/page_components/landing_page/LandingPageEmbedBox.tsx
 */

const SocialProof = () => {
  const { t } = useTranslation('pages');

  const count = 5;
  return (
    <Stack
      direction={{
        xs: 'column',
        sm: 'row',
      }}
      alignItems='center'
      justifyContent={'center'}
      mt={'64px !important'}
    >
      <Stack direction={'row'} alignItems='center'>
        {Array.from({ length: count }).map((_, index) => (
          <GradeRoundedIcon
            key={index}
            sx={{
              color: '#F5A523',
              fontSize: 40,
            }}
          />
        ))}
      </Stack>

      <Typography
        variant={'custom'}
        fontSize={{
          xs: 36,
          sm: 48,
        }}
        color='rgba(0, 0, 0, 0.60)'
        fontWeight={700}
        textAlign='center'
        pl={0.8}
      >
        {t('home_page__loved_by_users', { num: LOVED_BY_NUM })}
      </Typography>
    </Stack>
  );
};

const AIPowerPanel = () => {
  const { t } = useTranslation('pages');

  const providersList = [
    {
      icon: 'ClaudeLogo',
      text: 'Claude',
    },
    {
      icon: 'BardLogo',
      text: 'Bard',
    },
    {
      icon: 'BingLogo',
      text: 'Bing AI',
    },
    {
      icon: 'ChatGPTLogoOutLine',
      text: 'OpenAI API',
    },
  ];
  return (
    <Stack
      p={2}
      bgcolor='#F5F6F7'
      spacing={2}
      alignItems='center'
      width={'100%'}
      boxSizing='border-box'
      borderRadius={1}
    >
      <Typography variant={'h5'} flexShrink={0}>
        {t('home_page__powered_by')}
      </Typography>
      <Box bgcolor='white' width='100%' boxSizing={'border-box'} p={2}>
        <Stack
          direction='row'
          spacing={1.5}
          alignItems='center'
          mb={3}
          justifyContent='center'
        >
          <CustomIcon
            icon='AILogo'
            sx={{
              fontSize: {
                xs: 32,
                sm: 52,
              },
            }}
          />
          <Typography
            variant={'custom'}
            fontSize={{
              xs: 28,
              sm: 40,
            }}
            fontWeight={700}
          >
            ChatGPT
          </Typography>
        </Stack>
        <Stack
          direction={'row'}
          justifyContent={'center'}
          flexWrap={'wrap'}
          spacing={{
            xs: null,
            sm: 4,
          }}
        >
          {providersList.map((provider, index) => (
            <Stack
              key={`provider${index}`}
              direction='row'
              spacing={1}
              alignItems='center'
              sx={{
                justifyContent: 'center',
                width: {
                  xs: '50%',
                  sm: 'auto',
                },
                mb: {
                  xs: index < 2 ? 2 : 0,
                  sm: 0,
                },
                // ml: {
                //   xs: 0,
                //   sm: 4,
                // },
              }}
            >
              <CustomIcon
                icon={provider.icon as ICustomIconType}
                sx={{
                  fontSize: {
                    xs: 24,
                    sm: 32,
                  },
                }}
              />
              <Typography
                variant={'caption'}
                fontSize={{
                  xs: 18,
                  sm: 24,
                }}
              >
                {provider.text}
              </Typography>
              {index !== providersList.length - 1 && (
                <Divider
                  orientation='vertical'
                  flexItem
                  sx={{
                    pl: 3,
                    display: {
                      xs: 'none',
                      sm: 'block',
                    },
                  }}
                />
              )}
            </Stack>
          ))}
        </Stack>
      </Box>
    </Stack>
  );
};

interface IProps {
  showLogo?: boolean;

  iniFrame?: boolean;

  // 临时的参数，主要是为了在 每个板块下面都有一个 cta button
  annoyingButton?: boolean;
}
const HomePageContent: FC<IProps> = ({
  showLogo = true,
  annoyingButton,
  iniFrame,
}) => {
  const { t } = useTranslation('pages');
  const { extensionLink, maxaiWebLink, ref } = useShareTrackerLink({
    queryRefEnable: true,
    pathnameRefEnable: false,
    defaultRef: 'homepage',
  });

  const { browserAgent: agent } = useBrowserAgent();

  const CtaBtn = () => (
    <Box textAlign='center' pt={2}>
      <CTAInstallButton
        trackerLinkProps={{
          queryRefEnable: true,
          pathnameRefEnable: false,
          defaultRef: 'homepage',
        }}
        variant={'contained'}
      />
    </Box>
  );

  return (
    <Stack spacing={2} mx={'auto'} maxWidth={800} mb={{ xs: 4, sm: 7 }} pt={6}>
      <Box
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          zIndex: 1201,
        }}
      >
        <ProducthuntHonor noDay sx={{ mb: { xs: 4, sm: 0 } }} />
      </Box>
      <Stack alignItems='center' spacing={4} pb={6}>
        {showLogo && (
          <ProLink
            href={maxaiWebLink}
            target={iniFrame ? '_blank' : '_self'}
            muiLinkProps={{ title: 'MaxAI.me' }}
          >
            <Stack direction={'row'} alignItems={'center'} gap={1}>
              <CustomImageBox width={64} height={64} src={'/logo.svg'} />
              <Typography
                color='text.primary'
                variant='caption'
                component='h1'
                fontSize={48}
                fontWeight={700}
                pr={0.5}
              >
                MaxAI.me
              </Typography>
            </Stack>
          </ProLink>
        )}
        <Typography
          variant={'custom'}
          fontSize={64}
          fontWeight={900}
          textAlign='center'
        >
          {t('home_page__title')}
        </Typography>
        <AIPowerPanel />
        <SocialProof />

        <Stack
          direction={{
            xs: 'column',
            sm: 'row',
          }}
          spacing={2}
          alignItems={'center'}
          justifyContent={'center'}
        >
          <CTAInstallButton
            showAgent='Chrome'
            variant={agent === 'Chrome' ? 'contained' : 'outlined'}
            trackerLinkProps={{
              defaultRef: 'homepage',
              queryRefEnable: true,
              pathnameRefEnable: false,
            }}
          />
          <CTAInstallButton
            showAgent='Edge'
            variant={agent === 'Edge' ? 'contained' : 'outlined'}
            trackerLinkProps={{
              defaultRef: 'homepage',
              queryRefEnable: true,
              pathnameRefEnable: false,
            }}
            sx={{
              width: {
                xs: '100%',
                sm: 'auto',
              },
            }}
          />
        </Stack>
      </Stack>

      <YoutubePlayerBox
        borderRadius={8}
        youtubeLink={PRIMARY_YOUTUBE_VIDEO_EMBED_URL}
      />

      {/* panel */}
      <Typography variant={'h2'} pt={10} fontSize={22}>
        {t('home_page__write_better_with_confidence')}
      </Typography>
      <Typography variant={'body1'} fontSize={20}>
        1. {t('home_page__write_better_with_confidence__item1')}
      </Typography>
      <Typography variant={'body1'} fontSize={20}>
        2. {t('home_page__write_better_with_confidence__item2')}
      </Typography>
      <ResponsiveImage
        width={1600}
        height={1120}
        src={'/assets/chrome-extension/homepage/2.png'}
        alt={'Write better with confidence'}
      />
      {annoyingButton && <CtaBtn />}

      {/* panel */}
      <Typography variant={'h2'} pt={10} fontSize={22}>
        {t('home_page__read_easier_and_faster')}
      </Typography>
      <Typography variant={'body1'}>
        1. {t('home_page__read_easier_and_faster__item1')}
      </Typography>
      <Typography variant={'body1'}>
        2. {t('home_page__read_easier_and_faster__item2')}
      </Typography>
      <ResponsiveImage
        width={1600}
        height={1120}
        src={'/assets/chrome-extension/homepage/3.png'}
        alt={'Read easier and faster'}
      />
      {annoyingButton && <CtaBtn />}

      {/* panel */}
      <Typography variant={'h2'} pt={10} fontSize={22}>
        {t('home_page__reply_to_any_text_in_seconds')}
      </Typography>
      <Typography variant={'body1'} fontSize={20}>
        1. {t('home_page__reply_to_any_text_in_seconds__item1')}
      </Typography>
      <Typography variant={'body1'} fontSize={20}>
        2. {t('home_page__reply_to_any_text_in_seconds__item2')}
      </Typography>
      <ResponsiveImage
        width={1600}
        height={1120}
        src={'/assets/chrome-extension/homepage/4.png'}
        alt={'Reply to any text in seconds'}
      />
      {annoyingButton && <CtaBtn />}

      {/* panel */}
      <Typography variant={'h2'} pt={10} fontSize={22}>
        {t('home_page__summarize_chat_with_any_page')}
      </Typography>
      <Typography variant={'body1'} fontSize={20}>
        1. {t('home_page__summarize_chat_with_any_page__item1')}
      </Typography>
      <Typography variant={'body1'} fontSize={20}>
        2. {t('home_page__summarize_chat_with_any_page__item2')}
      </Typography>
      <ResponsiveImage
        width={1600}
        height={1120}
        src={'/assets/chrome-extension/homepage/5.png'}
        alt={`Summarize & chat with any page`}
      />
      {annoyingButton && <CtaBtn />}

      {/* panel */}
      <Typography variant={'h2'} pt={10} fontSize={22}>
        {t('home_page__compose_with_AI_anywhere')}
      </Typography>
      <Typography variant={'body1'} fontSize={20}>
        1. {t('home_page__compose_with_AI_anywhere__item1')}
      </Typography>
      <Typography variant={'body1'} fontSize={20}>
        2. {t('home_page__compose_with_AI_anywhere__item2')}
      </Typography>
      <ResponsiveImage
        width={1600}
        height={1120}
        src={'/assets/chrome-extension/homepage/6.png'}
        alt={'Compose with AI anywhere'}
      />
      {annoyingButton && <CtaBtn />}

      {/* panel */}
      <Typography variant={'h2'} pt={10} id={'how-to-use'} fontSize={22}>
        {t('home_page__ask_aI_anything_in_the_sidebar')}
      </Typography>
      <Typography variant={'body1'} fontSize={20}>
        1. {t('home_page__ask_aI_anything_in_the_sidebar__item1')}
      </Typography>
      <Typography variant={'body1'} fontSize={20}>
        2. {t('home_page__ask_aI_anything_in_the_sidebar__item2')}
      </Typography>
      <ResponsiveImage
        width={1600}
        height={1160}
        src={'/assets/chrome-extension/homepage/1.png'}
        alt={'Fastest access to ChatGPT'}
      />
      {annoyingButton && <CtaBtn />}

      {/* panel */}
      <Typography variant={'h2'} pt={7} fontSize={22}>
        <span>{t('home_page__why_is')} </span>
        <ProLink
          href={extensionLink}
          sx={{ color: 'inherit' }}
          target='_blank'
          underline={'always'}
        >
          {`MaxAI.me`}
        </ProLink>
        <span>{` ${t('home_page__is_best_extension')}`}</span>
      </Typography>
      <Stack
        pt={2}
        spacing={1}
        sx={{
          '& .MuiTypography-root': {
            display: 'flex',
            alignItems: 'baseline',
            gap: 1,
            '& > span': {
              width: 0,
              flex: 1,
            },
            '& .MuiBox-root': {
              position: 'relative',
              top: 3,
              width: 20,
              height: 20,
              borderRadius: '10px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'primary.main',
              flexShrink: 0,
              '& .MuiSvgIcon-root': {
                fontSize: 16,
                color: '#fff',
              },
            },
          },
        }}
      >
        <Typography variant={'body1'} component={'div'} fontSize={20}>
          <Box>
            <CheckIcon />
          </Box>
          <span>{t('home_page__best_extension__reason1')}</span>
        </Typography>
        <Typography variant={'body1'} component={'div'} fontSize={20}>
          <Box>
            <CheckIcon />
          </Box>
          <span>{t('home_page__best_extension__reason2')}</span>
        </Typography>
        <Typography variant={'body1'} component={'div'} fontSize={20}>
          <Box>
            <CheckIcon />
          </Box>
          <span>{t('home_page__best_extension__reason3')}</span>
        </Typography>
        <Typography variant={'body1'} component={'div'} fontSize={20}>
          <Box>
            <CheckIcon />
          </Box>
          <span>{t('home_page__best_extension__reason4')}</span>
        </Typography>
        <Typography variant={'body1'} component={'div'} fontSize={20}>
          <Box>
            <CheckIcon />
          </Box>
          <span>{t('home_page__best_extension__reason5')}</span>
        </Typography>
        <Typography variant={'body1'} component={'div'} fontSize={20}>
          <Box>
            <CheckIcon />
          </Box>
          <span>{t('home_page__best_extension__reason6')}</span>
        </Typography>
        <Typography variant={'body1'} component={'div'} fontSize={20}>
          <Box>
            <CheckIcon />
          </Box>
          <span>{t('home_page__best_extension__reason7')}</span>
        </Typography>
        <Typography variant={'body1'} component={'div'} fontSize={20}>
          <Box>
            <CheckIcon />
          </Box>
          <span>{t('home_page__best_extension__reason8')}</span>
        </Typography>
        <Typography variant={'body1'} component={'div'} fontSize={20}>
          <Box>
            <CheckIcon />
          </Box>
          <span>{t('home_page__best_extension__reason9')}</span>
        </Typography>
      </Stack>
      {annoyingButton && <CtaBtn />}

      {/* placeholder */}
      <Box pt={10} />

      {/* panel */}
      <Stack bgcolor='#f5f5f5' p={2} borderRadius={1} spacing={2}>
        <Typography variant={'h2'} fontSize={24}>
          🎁 {t('home_page__perk__title')}
        </Typography>
        <Stack pl={3.4} spacing={2}>
          <Stack spacing={1}>
            <Typography variant={'body1'} fontSize={20}>
              {t('home_page__perk__desc1')}
            </Typography>
            <Typography variant={'body1'} fontSize={20}>
              {t('home_page__perk__desc2')}
            </Typography>
          </Stack>
          <Button
            variant='outlined'
            href={`${MAXAI_WWW_PROMPT_SHARE_TRACKER_LINK}?ref=${ref}`}
            target={iniFrame ? '_blank' : '_self'}
            sx={{
              width: {
                sm: 'max-content',
                xs: '100%',
              },
              fontSize: {
                xs: 16,
                sm: 18,
              },
              fontWeight: 600,
            }}
          >
            {`${t('home_page__perk__get_it_for_free')} MaxAI.me/prompts`}
          </Button>
        </Stack>
      </Stack>

      <Box textAlign='center' pt={10} pb={12}>
        <CTAInstallButton
          variant={'contained'}
          trackerLinkProps={{
            queryRefEnable: true,
            pathnameRefEnable: false,
            defaultRef: 'homepage',
          }}
          iconSize={80}
          sx={{
            width: { xs: '100%', sm: 800 },
            height: '100%',
            minHeight: { xs: '100%', sm: 128 },
            flexWrap: 'wrap',
            fontSize: 48,
          }}
        />
      </Box>
    </Stack>
  );
};

export default HomePageContent;
