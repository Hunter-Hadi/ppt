import { Box, Grid, Paper, Stack, SvgIcon, Typography } from '@mui/material';
import React, { FC, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import CustomIcon from '@/components/CustomIcon';
import ProLink from '@/components/ProLink';
import { isInIframe } from '@/utils/utils';

const WHT_ME_REASON = [
  {
    iconsType: ['privacy'],
    desc: 'home_page__why_me__reason1__desc',
  },
  {
    iconsType: ['fastest'],
    desc: 'home_page__why_me__reason2__desc',
  },
  {
    iconsType: ['network', 'pdf'],
    desc: 'home_page__why_me__reason3__desc',
  },
  {
    iconsType: ['1-click'],
    desc: 'home_page__why_me__reason4__desc',
  },
  {
    iconsType: ['message'],
    desc: 'home_page__why_me__reason5__desc',
  },
  {
    iconsType: ['chatgpt', 'claude', 'gemini', 'bard', 'bing'],
    desc: 'home_page__why_me__reason6__desc',
  },
  {
    iconsType: ['chatgpt-black'],
    desc: 'home_page__why_me__reason7__desc',
  },
  {
    iconsType: ['chatgpt-outline'],
    desc: 'home_page__why_me__reason8__desc',
  },
  {
    iconsType: ['language'],
    desc: 'home_page__why_me__reason9__desc',
  },
];

const WhyMe = () => {
  const { t } = useTranslation('pages');

  return (
    <Box
      id='homepage-why-me'
      py={{
        xs: 7,
        md: 14,
      }}
      px={2}
      bgcolor='white'
    >
      <Box maxWidth={1312} mx='auto'>
        <Typography
          variant='custom'
          component='h2'
          textAlign={'center'}
          fontSize={{
            xs: 24,
            sm: 32,
            lg: 48,
          }}
          mb={6}
        >
          {t('home_page__why_me__title__part1')}{' '}
          <ProLink
            href={{
              pathname: '/',
            }}
            target={isInIframe() ? '_blank' : '_self'}
            muiLinkProps={{ title: 'MaxAI.me' }}
            underline='always'
            sx={{
              color: 'inherit',
              textDecorationColor: 'inherit',
            }}
          >
            MaxAI.me
          </ProLink>{' '}
          {t('home_page__why_me__title__part2')}
        </Typography>

        <Grid container spacing={4} direction='row' alignItems='stretch'>
          {WHT_ME_REASON.map((reasonItem, index) => {
            return (
              <Grid key={index} item xs={12} sm={6} md={4}>
                <Paper
                  elevation={0}
                  sx={{
                    borderRadius: 2,
                    border: '1px solid rgba(0, 0, 0, 0.16)',
                    height: '100%',
                  }}
                >
                  <Stack
                    spacing={{
                      xs: 2,
                      sm: 3,
                    }}
                    p={{
                      xs: 2,
                      sm: 3,
                    }}
                  >
                    <Stack direction={'row'} gap={2} flexWrap='wrap'>
                      {reasonItem.iconsType.map((iconType) => (
                        <WhyMeIconRender key={iconType} type={iconType} />
                      ))}
                    </Stack>
                    <Typography>{t(reasonItem.desc)}</Typography>
                  </Stack>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </Box>
  );
};

const WhyMeIconRender: FC<{ type: string }> = ({ type }) => {
  const icon = useMemo(() => {
    if (type === 'privacy') {
      return (
        <SvgIcon
          sx={{
            fontSize: 'inherit',
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 64 64'
            fill='none'
          >
            <g clip-path='url(#clip0_5647_57294)'>
              <rect width='64' height='64' rx='8' fill='#DEF9DF' />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M31.5321 12.2125C31.836 12.1128 32.1639 12.1128 32.4678 12.2125L48.3644 17.4308C48.9802 17.6329 49.3966 18.2078 49.3966 18.856V31.5804C49.5609 42.7699 34.7595 51.9411 31.9999 51.9411C29.2403 51.9411 14.4391 42.7699 14.6034 31.5804V18.856C14.6034 18.2079 15.0197 17.633 15.6356 17.4309L31.5321 12.2125ZM41.3015 25.8628C41.8371 25.3416 41.8386 24.4952 41.3047 23.9723C40.7709 23.4494 39.904 23.448 39.3684 23.9692L31.1252 31.9904C30.5421 32.5579 29.6129 32.557 29.0309 31.9884L26.2977 29.3182C25.7632 28.796 24.8962 28.7957 24.3613 29.3176C23.8264 29.8395 23.8262 30.6859 24.3607 31.2081L29.1067 35.8445C29.6407 36.3663 30.5067 36.3671 31.0417 35.8464L41.3015 25.8628Z'
                fill='#4CAF50'
              />
              <path
                d='M31.9999 12.1367C31.5938 12.1367 31.0021 12.3867 30.0321 12.7051L15.6356 17.431C15.0197 17.6332 14.6034 18.208 14.6034 18.8562V31.5806C14.4585 41.4465 25.948 49.7433 30.5598 51.5681C31.3301 51.8729 31.7148 51.9414 31.9999 51.9414V36.2511C31.9999 35.7519 31.3995 35.4984 31.0417 35.8466C30.5067 36.3673 29.6407 36.3664 29.1067 35.8447L24.3607 31.2082C23.8262 30.686 23.8264 29.8396 24.3613 29.3178C24.8962 28.7959 25.7632 28.7962 26.2977 29.3184L29.0309 31.9885C29.6129 32.5571 30.5421 32.558 31.1252 31.9906L31.546 31.5811C31.8362 31.2987 31.9999 30.911 31.9999 30.5061V12.1367Z'
                fill='#429846'
              />
            </g>
            <defs>
              <clipPath id='clip0_5647_57294'>
                <rect width='64' height='64' rx='8' fill='white' />
              </clipPath>
            </defs>
          </svg>
        </SvgIcon>
      );
    }

    if (type === 'fastest') {
      return (
        <SvgIcon
          sx={{
            fontSize: 'inherit',
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 64 64'
            fill='none'
          >
            <g clip-path='url(#clip0_5647_57309)'>
              <rect width='64' height='64' rx='8' fill='#FFF6D7' />
              <mask
                id='mask0_5647_57309'
                maskUnits='userSpaceOnUse'
                x='8'
                y='8'
                width='48'
                height='48'
              >
                <rect x='8' y='8' width='48' height='48' fill='#D9D9D9' />
              </mask>
              <g mask='url(#mask0_5647_57309)'>
                <path
                  d='M25.7296 52C24.8168 52 24.1156 51.1915 24.2447 50.2879L25.7555 39.7121C25.8846 38.8085 25.1834 38 24.2706 38H18.8629C17.6529 38 16.9409 36.641 17.6297 35.6462L33.5527 12.6462C33.8329 12.2415 34.2938 12 34.786 12H36.3009C37.2032 12 37.9012 12.7908 37.7893 13.6861L36.2108 26.3139C36.0989 27.2092 36.797 28 37.6993 28H44.7975C46.0693 28 46.764 29.4833 45.9499 30.4603L28.4499 51.4603C28.1649 51.8023 27.7427 52 27.2975 52H25.7296Z'
                  fill='#FBA700'
                />
                <path
                  d='M25.7555 39.7122L24.2706 50.2533C24.048 51.811 26.0684 52.6167 26.9789 51.3334L36.3201 34.635C37.0248 33.6417 36.3146 32.267 35.0967 32.267H30.0085C29.0438 32.267 28.3404 31.374 28.5422 30.4501C28.5582 30.377 28.5861 30.3072 28.6177 30.2395L36.2348 13.9423C36.7188 12.3074 34.5338 11.2608 33.5632 12.6627L17.6297 35.6462C16.9409 36.6411 17.6529 38 18.8629 38H24.2706C25.1834 38 25.8846 38.8085 25.7555 39.7122Z'
                  fill='#FBD300'
                />
              </g>
            </g>
            <defs>
              <clipPath id='clip0_5647_57309'>
                <rect width='64' height='64' rx='8' fill='white' />
              </clipPath>
            </defs>
          </svg>
        </SvgIcon>
      );
    }

    if (type === 'network') {
      return (
        <SvgIcon
          sx={{
            fontSize: 'inherit',
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 64 64'
            fill='none'
          >
            <g clip-path='url(#clip0_5647_57330)'>
              <rect
                width='64'
                height='64'
                rx='8'
                fill='white'
                fillOpacity='0.08'
              />
              <rect
                x='0.5'
                y='0.5'
                width='63'
                height='63'
                rx='7.5'
                stroke='black'
                stroke-opacity='0.16'
              />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M28.4585 13C23.1321 13 18.3158 15.1933 14.8672 18.7231C11.522 22.147 9.4585 26.8337 9.4585 32C9.4585 37.2094 11.5566 41.9311 14.9511 45.3623C18.3937 48.842 23.1751 51 28.4585 51C33.7419 51 38.5233 48.842 41.9659 45.3623C42.1038 45.2229 42.2396 45.0814 42.3731 44.9378L41.5081 42.4254C41.3739 42.5932 41.2366 42.7582 41.0961 42.9206C39.9196 41.8718 38.6113 40.967 37.199 40.2341C37.5116 38.9225 37.7513 37.5267 37.9082 36.0691H38.0698C39.1274 36.0691 39.9847 35.2117 39.9847 34.1541V33.149H45.1217C45.0633 34.0082 44.94 34.8496 44.7566 35.6682L46.9414 36.4205C47.2795 35.002 47.4585 33.5218 47.4585 32C47.4585 26.8337 45.395 22.147 42.0498 18.7231C38.6012 15.1933 33.7849 13 28.4585 13ZM17.3515 19.526C18.2561 20.3321 19.2487 21.0411 20.313 21.6368C21.0008 19.5114 21.9066 17.6542 22.9941 16.212C20.8912 16.9396 18.9789 18.0758 17.3515 19.526ZM28.4585 15.2979C27.3394 15.2979 26.1427 15.9411 24.9889 17.389C23.9828 18.6515 23.0884 20.4377 22.4101 22.6256C24.2844 23.3541 26.3236 23.7541 28.4585 23.7541C30.5934 23.7541 32.6326 23.3541 34.5069 22.6256C33.8286 20.4377 32.9342 18.6515 31.9281 17.389C30.7743 15.9411 29.5776 15.2979 28.4585 15.2979ZM36.604 21.6368C35.9162 19.5114 35.0104 17.6542 33.9229 16.212C36.0258 16.9397 37.9381 18.0758 39.5655 19.526C38.6609 20.3321 37.6683 21.0411 36.604 21.6368ZM35.0918 24.8616C33.0256 25.6315 30.79 26.052 28.4585 26.052C26.1269 26.052 23.8914 25.6315 21.8252 24.8616C21.6136 25.8369 21.4437 26.8635 21.3209 27.931H35.5961C35.4733 26.8635 35.3034 25.8369 35.0918 24.8616ZM37.9082 27.931H38.0698C39.1274 27.931 39.9847 28.7883 39.9847 29.8459V30.851H45.1217C44.8717 27.1683 43.4285 23.8142 41.174 21.1701C39.9866 22.2401 38.6633 23.1628 37.2327 23.9088C37.5289 25.1788 37.757 26.5261 37.9082 27.931ZM21.3209 36.0691C21.45 37.1909 21.631 38.2674 21.8578 39.2867C23.9149 38.5245 26.1392 38.1085 28.4585 38.1085C30.7778 38.1085 33.0021 38.5245 35.0592 39.2867C35.286 38.2674 35.467 37.1909 35.5961 36.0691H21.3209ZM19.0088 36.0691H18.8472C17.7896 36.0691 16.9322 35.2117 16.9322 34.1541V33.149H11.7953C12.0482 36.8739 13.5217 40.2626 15.8208 42.9206C16.9974 41.8718 18.3057 40.967 19.718 40.2341C19.4054 38.9225 19.1657 37.5267 19.0088 36.0691ZM16.9322 30.851V29.8459C16.9322 28.7883 17.7896 27.931 18.8472 27.931H19.0088C19.16 26.5261 19.3881 25.1788 19.6843 23.9088C18.2537 23.1628 16.9303 22.2401 15.743 21.1701C13.4885 23.8142 12.0453 27.1683 11.7953 30.851H16.9322ZM34.462 41.5175C32.6001 40.8 30.5764 40.4064 28.4585 40.4064C26.3406 40.4064 24.3169 40.8 22.455 41.5175C23.1348 43.6628 24.0231 45.4118 25.0188 46.6484C26.1638 48.0703 27.349 48.7021 28.4585 48.7021C29.568 48.7021 30.7532 48.0703 31.8982 46.6484C32.8939 45.4118 33.7822 43.6628 34.462 41.5175ZM33.9229 47.788C34.9876 46.376 35.8776 44.5669 36.5597 42.4989C37.6052 43.08 38.5821 43.7702 39.4748 44.5542C37.8672 45.9662 35.9869 47.0738 33.9229 47.788ZM22.9941 47.788C21.9294 46.376 21.0393 44.5669 20.3573 42.4989C19.3118 43.08 18.3349 43.7702 17.4422 44.5542C19.0498 45.9662 20.9301 47.0738 22.9941 47.788ZM20.2269 33.5654C20.3078 33.8518 20.5693 34.0496 20.8669 34.0496C21.1657 34.0496 21.4278 33.8503 21.5077 33.5624L22.1336 31.3066C22.138 31.2906 22.1525 31.2796 22.1691 31.2796C22.1856 31.2796 22.2002 31.2906 22.2046 31.3066L22.8308 33.5635C22.9105 33.8508 23.172 34.0496 23.4701 34.0496C23.7669 34.0496 24.0276 33.8525 24.1085 33.5669L24.9636 30.5474C25.0484 30.248 24.8235 29.9506 24.5123 29.9506C24.2967 29.9506 24.1088 30.0976 24.057 30.3069L23.4402 32.7972C23.4374 32.8086 23.4271 32.8167 23.4152 32.8167C23.4035 32.8167 23.3933 32.8088 23.3904 32.7974L22.7799 30.4219C22.7086 30.1445 22.4585 29.9506 22.1721 29.9506C21.8854 29.9506 21.6351 30.1449 21.5641 30.4228L20.9528 32.8147C20.9513 32.8206 20.9476 32.8255 20.9427 32.8287C20.9389 32.8313 20.9344 32.8327 20.9296 32.8327C20.9185 32.8327 20.9089 32.8252 20.9063 32.8145L20.279 30.3053C20.2269 30.0968 20.0395 29.9506 19.8246 29.9506C19.514 29.9506 19.2894 30.2474 19.3739 30.5463L20.2269 33.5654ZM26.5163 33.5654C26.5972 33.8518 26.8586 34.0496 27.1562 34.0496C27.4551 34.0496 27.7171 33.8503 27.797 33.5624L28.4229 31.3066C28.4241 31.3023 28.426 31.2984 28.4284 31.295C28.4352 31.2855 28.4463 31.2796 28.4585 31.2796C28.475 31.2796 28.4895 31.2906 28.4939 31.3066L29.1202 33.5635C29.1999 33.8508 29.4614 34.0496 29.7595 34.0496C30.0562 34.0496 30.3169 33.8525 30.3978 33.5669L31.2529 30.5474C31.3377 30.248 31.1128 29.9506 30.8016 29.9506C30.586 29.9506 30.3981 30.0976 30.3463 30.3069L29.7295 32.7972C29.7267 32.8086 29.7164 32.8167 29.7046 32.8167C29.6929 32.8167 29.6827 32.8088 29.6797 32.7974L29.0693 30.422C28.998 30.1445 28.7479 29.9506 28.4615 29.9506C28.1747 29.9506 27.9244 30.1449 27.8534 30.4228L27.2421 32.8147C27.2411 32.8187 27.2391 32.8223 27.2363 32.8252C27.2319 32.8299 27.2257 32.8327 27.2189 32.8327C27.2079 32.8327 27.1983 32.8252 27.1956 32.8145L26.5683 30.3053C26.5162 30.0968 26.3289 29.9506 26.1139 29.9506C25.8034 29.9506 25.5788 30.2474 25.6632 30.5463L26.5163 33.5654ZM33.4456 34.0496C33.1479 34.0496 32.8866 33.8518 32.8057 33.5654L31.9526 30.5463C31.8681 30.2474 32.0927 29.9506 32.4033 29.9506C32.6182 29.9506 32.8055 30.0968 32.8577 30.3053L33.485 32.8145C33.4861 32.819 33.4884 32.8229 33.4915 32.8259C33.4959 32.8301 33.5018 32.8327 33.5082 32.8327C33.5192 32.8327 33.5288 32.8253 33.5315 32.8147L34.1427 30.4228C34.2137 30.1449 34.464 29.9506 34.7508 29.9506C35.0372 29.9506 35.2873 30.1445 35.3586 30.422L35.9691 32.7974C35.972 32.8088 35.9822 32.8167 35.994 32.8167C35.9991 32.8167 36.004 32.8151 36.0081 32.8124C36.0133 32.809 36.0173 32.8036 36.0189 32.7972L36.6357 30.3069C36.6875 30.0976 36.8754 29.9506 37.091 29.9506C37.4022 29.9506 37.6271 30.248 37.5423 30.5474L36.6871 33.5669C36.6063 33.8525 36.3456 34.0496 36.0488 34.0496C35.7507 34.0496 35.4892 33.8508 35.4095 33.5635L34.7833 31.3066C34.7804 31.2963 34.7734 31.2881 34.7645 31.2836C34.7594 31.281 34.7537 31.2796 34.7478 31.2796C34.7312 31.2796 34.7167 31.2906 34.7123 31.3066L34.0864 33.5624C34.0065 33.8503 33.7444 34.0496 33.4456 34.0496Z'
                fill='black'
                fillOpacity='0.87'
              />
              <path
                d='M41.1794 37.5217C40.937 36.8177 41.6114 36.1434 42.3153 36.3858L53.2018 40.1343C53.7795 40.3332 53.9798 41.0282 53.6369 41.501C53.5807 41.5785 53.4977 41.6308 53.4099 41.6691L51.3697 42.5592C50.875 42.7751 50.7527 43.4212 51.1344 43.8029L54.3172 46.9856C54.6163 47.2848 54.6163 47.7697 54.3172 48.0689L52.9151 49.4709C52.616 49.77 52.131 49.77 51.8319 49.4709L48.6427 46.2817C48.2627 45.9018 47.6199 46.0209 47.4013 46.5117L46.4625 48.6195C46.4243 48.7052 46.3728 48.7862 46.297 48.8415C45.8242 49.1868 45.1271 48.9868 44.9279 48.4081L41.1794 37.5217Z'
                fill='black'
                fillOpacity='0.87'
              />
            </g>
            <defs>
              <clipPath id='clip0_5647_57330'>
                <rect width='64' height='64' rx='8' fill='white' />
              </clipPath>
            </defs>
          </svg>
        </SvgIcon>
      );
    }

    if (type === 'pdf') {
      return (
        <Box
          sx={{
            boxSizing: 'border-box',
            borderRadius: 1,
            bgcolor: '#FFE1E1',
            p: 1,
          }}
        >
          <CustomIcon
            icon='PDF'
            sx={{
              fontSize: {
                xs: 32,
                md: 48,
              },
            }}
          />
        </Box>
      );
    }

    if (type === '1-click') {
      return (
        <SvgIcon
          sx={{
            fontSize: 'inherit',
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 64 64'
            fill='none'
          >
            <g clip-path='url(#clip0_5647_57348)'>
              <rect width='64' height='64' rx='8' fill='#F2EAFF' />
              <mask
                id='mask0_5647_57348'
                maskUnits='userSpaceOnUse'
                x='8'
                y='8'
                width='48'
                height='48'
              >
                <rect x='8' y='8' width='48' height='48' fill='#D9D9D9' />
              </mask>
              <g mask='url(#mask0_5647_57348)'>
                <path
                  d='M12 32V28H18V32H12ZM18.8 43.1L16 40.2L20.2 36L23.1 38.8L18.8 43.1ZM20.2 24L16 19.8L18.8 16.9L23.1 21.2L20.2 24ZM44 48L34.5 38.5L32 46L26 26L46 32L38.6 34.6L48 44L44 48ZM28 20V14H32V20H28ZM39.8 24L36.9 21.2L41.2 16.9L44 19.7L39.8 24Z'
                  fill='#9065B0'
                />
                <path d='M12 28V32H18V28H12Z' fill='#C57DFF' />
                <path
                  d='M16 40.2L18.8 43.1L23.1 38.8L20.2 36L16 40.2Z'
                  fill='#C57DFF'
                />
                <path
                  d='M16 19.8L20.2 24L23.1 21.2L18.8 16.9L16 19.8Z'
                  fill='#C57DFF'
                />
                <path d='M28 14V20H32V14H28Z' fill='#C57DFF' />
                <path
                  d='M36.9 21.2L39.8 24L44 19.7L41.2 16.9L36.9 21.2Z'
                  fill='#C57DFF'
                />
              </g>
            </g>
            <defs>
              <clipPath id='clip0_5647_57348'>
                <rect width='64' height='64' rx='8' fill='white' />
              </clipPath>
            </defs>
          </svg>
        </SvgIcon>
      );
    }

    if (type === 'message') {
      return (
        <SvgIcon
          sx={{
            fontSize: 'inherit',
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 64 64'
            fill='none'
          >
            <g clip-path='url(#clip0_5647_57355)'>
              <rect width='64' height='64' rx='8' fill='#DEEBFF' />
              <path
                d='M50.8012 30.7893C50.8012 29.8141 50.0106 29.0234 49.0353 29.0234H28.2899C27.3146 29.0234 26.524 29.8141 26.524 30.7893V44.4715C26.524 45.4467 27.3146 46.2374 28.2899 46.2374H43.4448C44.0176 46.2374 44.5548 46.5152 44.8859 46.9826L47.5958 50.8088C48.591 52.2139 50.8035 51.5093 50.8027 49.7873L50.8012 30.7893Z'
                fill='#2BBCE6'
              />
              <path
                d='M13.1984 14.846C13.1984 13.5196 14.2737 12.4443 15.6001 12.4443H43.8147C45.1412 12.4443 46.2164 13.5196 46.2164 14.846V33.4543C46.2164 34.7807 45.1412 35.856 43.8147 35.856H23.2033C22.4243 35.856 21.6937 36.2339 21.2434 36.8696L17.5579 42.0733C16.2043 43.9844 13.1953 43.026 13.1963 40.6841L13.1984 14.846Z'
                fill='#1F7FE5'
              />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M24.5774 24.0155C24.5774 25.1621 23.6479 26.0916 22.5014 26.0916C21.3548 26.0916 20.4253 25.1621 20.4253 24.0155C20.4253 22.8689 21.3548 21.9395 22.5014 21.9395C23.6479 21.9395 24.5774 22.8689 24.5774 24.0155ZM31.7824 24.0155C31.7824 25.1621 30.8529 26.0916 29.7063 26.0916C28.5597 26.0916 27.6302 25.1621 27.6302 24.0155C27.6302 22.8689 28.5597 21.9395 29.7063 21.9395C30.8529 21.9395 31.7824 22.8689 31.7824 24.0155ZM36.9113 26.0916C38.0578 26.0916 38.9873 25.1621 38.9873 24.0155C38.9873 22.8689 38.0578 21.9395 36.9113 21.9395C35.7647 21.9395 34.8352 22.8689 34.8352 24.0155C34.8352 25.1621 35.7647 26.0916 36.9113 26.0916Z'
                fill='white'
              />
            </g>
            <defs>
              <clipPath id='clip0_5647_57355'>
                <rect width='64' height='64' rx='8' fill='white' />
              </clipPath>
            </defs>
          </svg>
        </SvgIcon>
      );
    }

    if (type === 'chatgpt') {
      return (
        <Box
          sx={{
            boxSizing: 'border-box',
            borderRadius: 1,
            bgcolor: '#0FA47F',
            p: 1,
          }}
        >
          <CustomIcon
            icon='ChatGPTLogo'
            sx={{
              fontSize: {
                xs: 32,
                md: 48,
              },
            }}
          />
        </Box>
      );
    }
    if (type === 'claude') {
      return (
        <Box
          sx={{
            boxSizing: 'border-box',
            borderRadius: 1,
            bgcolor: '#D19974',
            p: 1,
          }}
        >
          <CustomIcon
            icon='ClaudeLogo'
            sx={{
              fontSize: {
                xs: 32,
                md: 48,
              },
            }}
          />
        </Box>
      );
    }
    if (type === 'bard') {
      return (
        <Box
          sx={{
            boxSizing: 'border-box',
            borderRadius: 1,
            bgcolor: '#E2F6FA',
            p: 1.5,
          }}
        >
          <CustomIcon
            icon='BardLogo'
            sx={{
              fontSize: {
                xs: 24,
                md: 40,
              },
            }}
          />
        </Box>
      );
    }
    if (type === 'bing') {
      return (
        <Box
          sx={{
            boxSizing: 'border-box',
            borderRadius: 1,
            bgcolor: '#DEEBFF',
            p: 1.5,
          }}
        >
          <CustomIcon
            icon='BingLogo'
            sx={{
              fontSize: {
                xs: 24,
                md: 40,
              },
            }}
          />
        </Box>
      );
    }
    if (type === 'chatgpt-black') {
      return (
        <Box
          sx={{
            boxSizing: 'border-box',
            borderRadius: 1,
            bgcolor: 'black',
            p: 1.25,
          }}
        >
          <CustomIcon
            icon='ChatGPTLogoBlack'
            sx={{
              fontSize: { xs: 28, md: 44 },
            }}
          />
        </Box>
      );
    }
    if (type === 'chatgpt-outline') {
      return (
        <Box
          sx={{
            boxSizing: 'border-box',
            borderRadius: 1,
            border: '1px solid rgba(0, 0, 0, 0.08)',
            p: 1.375,
          }}
        >
          <CustomIcon
            icon='ChatGPTLogoOutLine'
            sx={{
              fontSize: {
                xs: 24,
                md: 40,
              },
            }}
          />
        </Box>
      );
    }
    if (type === 'language') {
      return (
        <SvgIcon
          sx={{
            fontSize: 'inherit',
          }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 64 64'
            fill='none'
          >
            <g clip-path='url(#clip0_5647_57413)'>
              <rect width='64' height='64' rx='8' fill='#EBF2FF' />
              <path
                fill-rule='evenodd'
                clip-rule='evenodd'
                d='M16.4344 19.0025C19.9242 14.3246 25.5053 11.292 31.7944 11.292C38.1077 11.292 43.7076 14.348 47.1946 19.0566C49.5518 22.2395 50.9462 26.1805 50.9462 30.4438C50.9462 34.7351 49.5335 38.6996 47.1482 41.8934C44.3125 45.6903 40.0989 48.4021 35.2442 49.2855C34.1243 49.4893 32.9713 49.5956 31.7944 49.5956C30.6781 49.5956 29.5833 49.5 28.518 49.3163C23.6133 48.4704 19.3499 45.7609 16.4808 41.9471C14.0712 38.7441 12.6426 34.7592 12.6426 30.4438C12.6426 26.1562 14.0528 22.1948 16.4344 19.0025ZM22.6083 20.7346C21.2931 20.3421 20.0974 19.8715 19.0459 19.3405C20.8381 17.2844 23.1185 15.6666 25.7062 14.6675C24.4248 16.2671 23.3737 18.3495 22.6083 20.7346ZM27.659 15.83C28.625 14.6952 29.6491 13.991 30.6785 13.6971L30.7257 21.9871C28.6256 21.9224 26.6271 21.6789 24.7899 21.2886C25.5312 19.0248 26.5257 17.1612 27.659 15.83ZM30.7322 29.3207V24.2345C28.4261 24.168 26.2218 23.898 24.1882 23.4568C23.7704 25.2632 23.5086 27.2392 23.439 29.3207H30.7322ZM17.6666 21.1555C18.9561 21.8416 20.4194 22.4284 22.0114 22.9005C21.5474 24.8907 21.2626 27.0544 21.1916 29.3207H14.9255C15.1224 26.3162 16.1036 23.5277 17.6666 21.1555ZM14.9255 31.5669H21.1916C21.2636 33.8633 21.5552 36.0544 22.0302 38.0665C20.4479 38.5345 18.9925 39.1157 17.7082 39.795C16.121 37.4092 15.1241 34.5979 14.9255 31.5669ZM19.0975 41.6061C20.1434 41.0823 21.33 40.618 22.6335 40.2305C23.3967 42.583 24.4391 44.6381 25.7071 46.2206C23.1444 45.2311 20.8823 43.6345 19.0975 41.6061ZM44.5283 41.5639C42.7378 43.6124 40.4621 45.2242 37.8817 46.2206C39.1555 44.6308 40.2017 42.5641 40.9659 40.1977C42.2777 40.5813 43.4732 41.0425 44.5283 41.5639ZM45.912 39.7475C44.6192 39.0725 43.156 38.496 41.5665 38.033C42.0368 36.0302 42.3255 33.8506 42.3972 31.5669H48.6633C48.466 34.5779 47.4809 37.372 45.912 39.7475ZM39.3874 37.4867C39.8128 35.6652 40.0793 33.67 40.1498 31.5669H32.9785V36.738C35.2337 36.8031 37.3914 37.0627 39.3874 37.4867ZM48.6633 29.3207H42.3972C42.3266 27.0671 42.0445 24.915 41.5852 22.9341C43.1844 22.4671 44.6556 21.885 45.9536 21.2033C47.4983 23.5651 48.4677 26.3364 48.6633 29.3207ZM40.1498 29.3207C40.0805 27.2488 39.8207 25.2815 39.4064 23.4818C37.4051 23.9082 35.2408 24.1693 32.9785 24.2345V29.3207H40.1498ZM32.972 21.9875C35.0334 21.9248 36.9972 21.6896 38.8067 21.3126C38.0661 19.0425 37.071 17.1732 35.9364 15.8376C34.973 14.7037 33.9517 13.9984 32.9248 13.7013L32.972 21.9875ZM37.8826 14.6675C39.1698 16.2743 40.2247 18.3685 40.9911 20.7675C42.3145 20.379 43.519 19.9116 44.5799 19.3831C42.7821 17.3067 40.4881 15.6735 37.8826 14.6675ZM23.439 31.5669H30.7322V36.738C28.4333 36.8043 26.2355 37.0729 24.2072 37.5116C23.7784 35.6834 23.5098 33.6796 23.439 31.5669ZM38.7803 39.6545C36.9781 39.2806 35.0234 39.0475 32.9719 38.9851L32.9249 47.1856C33.9452 46.8904 34.9601 46.192 35.9182 45.0706C37.0468 43.7496 38.0384 41.9009 38.7803 39.6545ZM24.8163 39.6784C26.6462 39.2914 28.6356 39.0498 30.7257 38.9855L30.6786 47.1898C29.6557 46.8978 28.638 46.2006 27.6771 45.0782C26.5499 43.7615 25.5589 41.9185 24.8163 39.6784Z'
                fill='#6DA3FD'
              />
              <path
                d='M49.9613 33.293H38.9405C36.7205 33.293 34.9209 35.0926 34.9209 37.3126V44.3667C34.9209 46.5866 36.7205 48.3863 38.9405 48.3863H43.9927C44.2875 48.3863 44.5716 48.4964 44.7894 48.695L48.8467 52.3957C49.6057 53.0879 50.8256 52.5495 50.8256 51.5222V49.2443C50.8256 48.6889 51.2229 48.2247 51.722 47.9811C53.0595 47.3284 53.9809 45.9551 53.9809 44.3667V37.3126C53.9809 35.0926 52.1813 33.293 49.9613 33.293Z'
                fill='#9065B0'
              />
              <path
                d='M13.6305 12.1807H24.6513C26.8713 12.1807 28.6709 13.9803 28.6709 16.2002V23.2544C28.6709 25.4743 26.8713 27.274 24.6513 27.274H19.5991C19.3043 27.274 19.0202 27.3841 18.8024 27.5827L14.7451 31.2834C13.9861 31.9756 12.7662 31.4372 12.7662 30.4099V28.132C12.7662 27.5766 12.3689 27.1124 11.8698 26.8688C10.5323 26.2161 9.6109 24.8428 9.6109 23.2544V16.2002C9.6109 13.9803 11.4105 12.1807 13.6305 12.1807Z'
                fill='#FACE1C'
              />
            </g>
            <defs>
              <clipPath id='clip0_5647_57413'>
                <rect width='64' height='64' rx='8' fill='white' />
              </clipPath>
            </defs>
          </svg>
        </SvgIcon>
      );
    }
    if (type === 'gemini') {
      return (
        <Box
          sx={{
            boxSizing: 'border-box',
            borderRadius: 1,
            bgcolor: '#040404',
            p: 1,
          }}
        >
          <CustomIcon
            icon='Gemini'
            sx={{
              fontSize: {
                xs: 32,
                md: 48,
              },
            }}
          />
        </Box>
      );
    }

    return null;
  }, [type]);

  return (
    <Box
      sx={{
        fontSize: {
          xs: 48,
          md: 64,
        },
        lineHeight: 0,
      }}
    >
      {icon}
    </Box>
  );
};

export default WhyMe;
