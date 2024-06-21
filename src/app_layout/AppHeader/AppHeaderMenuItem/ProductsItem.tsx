import { Divider, Grid, MenuList, Stack, Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';

import ProLink, { isExternalUrl } from '@/components/ProLink';
import { APP_EXTERNAL_LINKS } from '@/global_constants';
import { isInIframe } from '@/utils/utils';

import PopperMenuItem from './components/PopperMenuItem';

interface IProps {
  isSmallScreen?: boolean;
}

const PRODUCTS_MENU_LIST = [
  {
    title: 'modules:header__menu__products__download',
    menuList: [
      {
        href: APP_EXTERNAL_LINKS.CHROME_EXTENSION,
        title: 'MaxAI for Chrome',
      },
      {
        href: APP_EXTERNAL_LINKS.EDGE_EXTENSION,
        title: 'MaxAI for Edge',
      },
    ],
  },
  {
    title: 'modules:header__menu__products__use_cases',
    menuList: [
      {
        href: `/use-cases/research`,
        title: 'modules:header__menu__products__use_cases__research',
      },
      {
        href: `/use-cases/writing`,
        title: 'modules:header__menu__products__use_cases__writing',
      },
      {
        href: `/prompt/library`,
        title: 'modules:header__menu__products__use_cases__ai_prompt_library',
      },
    ],
  },
  {
    title: 'modules:header__menu__products__features',
    menuList: [
      {
        href: '/features/ai-chat',
        title: 'modules:header__menu__products__features__ai_chat__label',
      },
      {
        href: '/features/ai-summary',
        title: 'modules:header__menu__products__features__ai_rewriter__label',
      },
      {
        href: '/features/ai-search',
        title: 'modules:header__menu__products__features__ai_summary__label',
      },
      {
        href: '/features/ai-rewriter',
        title:
          'modules:header__menu__products__features__ai_instant_reply__label',
      },
      {
        href: '/features/ai-reader',
        title:
          'modules:header__menu__products__features__ai_reading_assistant__label',
      },
      {
        href: '/features/ai-translator',
        title: 'modules:header__menu__products__features__ai_prompts__label',
      },
      {
        href: '/features/ai-instant-reply',
        title: 'modules:header__menu__products__features__ai_search__label',
      },
      {
        href: '/features/ai-prompts',
        title: 'modules:header__menu__products__features__ai_art__label',
      },
      {
        href: '/features/ai-vision',
        title: 'modules:header__menu__products__features__ai_translator__label',
      },
      {
        href: '/features/ai-art',
        title: 'modules:header__menu__products__features__ai_vision__label',
      },
    ],
  },
  {
    title: 'modules:header__menu__products__industries',
    menuList: [
      {
        href: `/industries/executives`,
        title: 'modules:header__menu__products__industries__executives__label',
      },
      {
        href: `/industries/marketing`,
        title: 'modules:header__menu__products__industries__marketing__label',
      },
      {
        href: `/industries/education`,
        title: 'modules:header__menu__products__industries__education__label',
      },
      {
        href: `/industries/consulting`,
        title: 'modules:header__menu__products__industries__consulting__label',
      },
      {
        href: `/industries/hr`,
        title: 'modules:header__menu__products__industries__hr__label',
      },
      {
        href: `/industries/finance`,
        title: 'modules:header__menu__products__industries__finance__label',
      },
      {
        href: `/industries/real-estate`,
        title: 'modules:header__menu__products__industries__real_estate__label',
      },
      {
        href: `/industries/tech`,
        title: 'modules:header__menu__products__industries__technical__label',
      },
    ],
  },
];

const ProductsItem: FC<IProps> = ({ isSmallScreen }) => {
  const { t } = useTranslation();

  const { pathname } = useRouter();

  return (
    <PopperMenuItem
      isSmallScreen={isSmallScreen}
      LabelContent={
        <Typography
          variant='custom'
          fontSize={16}
          lineHeight={1.5}
          fontWeight={500}
        >
          {t('modules:header__menu__products')}
        </Typography>
      }
      SmallScreenContent={
        <MenuList
          sx={{
            pl: 2,
            pt: 0,
          }}
        >
          {PRODUCTS_MENU_LIST.map((menuItem, index) => (
            <Stack key={menuItem.title} pl={2.5} py={1}>
              <Typography
                variant='custom'
                fontSize={16}
                lineHeight={1.5}
                fontWeight={900}
                color='text.primary'
              >
                {t(menuItem.title)}
              </Typography>
              <MenuList>
                {menuItem.menuList.map((secondaryMenuItem) => (
                  <MenuItem
                    selected={pathname === secondaryMenuItem.href}
                    key={secondaryMenuItem.title}
                  >
                    <ProLink
                      href={secondaryMenuItem.href}
                      hardRefresh
                      color='inherit'
                      sx={{
                        lineHeight: 1.5,
                        width: '100%',
                      }}
                      target={
                        isInIframe() || isExternalUrl(secondaryMenuItem.href)
                          ? '_blank'
                          : undefined
                      }
                    >
                      <Typography
                        variant='custom'
                        fontSize={16}
                        lineHeight={1.5}
                        fontWeight={400}
                        color='text.primary'
                      >
                        {t(secondaryMenuItem.title)}
                      </Typography>
                    </ProLink>
                  </MenuItem>
                ))}
              </MenuList>
              {index === PRODUCTS_MENU_LIST.length - 1 ? null : <Divider />}
            </Stack>
          ))}
        </MenuList>
      }
      popperSx={{
        maxWidth: 1090,
        width: '100%',
      }}
      BigScreenContent={
        <Grid container spacing={3}>
          {PRODUCTS_MENU_LIST.map((menuItem) => (
            <Grid key={menuItem.title} item xs={12} sm={6} md={3}>
              <Stack spacing={1.5}>
                <Typography
                  variant='custom'
                  fontSize={16}
                  lineHeight={1.5}
                  fontWeight={900}
                >
                  {t(menuItem.title)}
                </Typography>
                <Divider />
                {menuItem.menuList.map((secondaryMenuItem) => (
                  <ProLink
                    key={secondaryMenuItem.title}
                    href={secondaryMenuItem.href}
                    hardRefresh
                    color='inherit'
                    underline='hover'
                    sx={{
                      lineHeight: 1.5,
                    }}
                    target={
                      isInIframe() || isExternalUrl(secondaryMenuItem.href)
                        ? '_blank'
                        : undefined
                    }
                  >
                    <Typography variant='custom' fontSize={16} lineHeight={1.5}>
                      {t(secondaryMenuItem.title)}
                    </Typography>
                  </ProLink>
                ))}
              </Stack>
            </Grid>
          ))}
        </Grid>
      }
    />
  );
};

export default ProductsItem;
