import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import KeyboardArrowLeftOutlinedIcon from '@mui/icons-material/KeyboardArrowLeftOutlined';
import {
  Divider,
  Drawer,
  Grid,
  MenuList,
  Stack,
  Typography,
} from '@mui/material';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Popover from '@mui/material/Popover';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { FC, useState } from 'react';

import { APP_HEADER_ID } from '@/app_layout/AppHeader';
import ProLink from '@/components/ProLink';
import { APP_EXTERNAL_LINKS } from '@/global_constants';
import useAppHeaderState from '@/hooks/useAppHeaderState';
import { isInIframe } from '@/utils/utils';

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
  const { appHeaderHeight } = useAppHeaderState();

  const [expanded, setExpanded] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const appHeaderElement = document.getElementById(APP_HEADER_ID);
    if (appHeaderElement) {
      setAnchorEl(appHeaderElement);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    // setExpanded(false);
  };

  const handleExpanded = () => {
    setExpanded(true);
  };

  if (isSmallScreen) {
    // 小屏幕显示的内容
    return (
      <>
        <MenuItem
          onClick={() => {
            handleExpanded();
          }}
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
            py: 2,
          }}
        >
          <Typography
            variant='custom'
            fontSize={16}
            lineHeight={1.5}
            fontWeight={500}
          >
            {t('modules:header__menu__products')}
          </Typography>
          <ChevronRightOutlinedIcon
            sx={{
              width: 24,
              height: 24,
              rotate: expanded ? '90deg' : 0,
              transition: 'all 0.3s ease',
            }}
          />
        </MenuItem>
        <Drawer
          anchor={'right'}
          open={expanded}
          onClose={() => setExpanded(false)}
          PaperProps={{
            sx: {
              width: '100%',
              mt: `${appHeaderHeight}px`,
            },
          }}
        >
          <MenuList
            sx={{
              pl: 2,
            }}
          >
            <MenuItem
              onClick={() => {
                setExpanded(false);
              }}
            >
              <KeyboardArrowLeftOutlinedIcon />
            </MenuItem>
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
                        target={isInIframe() ? '_blank' : '_self'}
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
        </Drawer>
      </>
    );
  } else {
    // 大屏幕显示的内容
    return (
      <>
        <Button
          onClick={handleClick}
          sx={{
            display: isSmallScreen ? 'none' : 'flex',
            fontSize: 16,
            fontWeight: 500,
            lineHeight: 1.5,
            color: 'text.primary',
            px: 2,
            py: 1.5,
            '&:hover': {
              backgroundColor: '#eee',
            },
            '&:active': {
              backgroundColor: 'rgba(0,0,0,0.08)',
            },
            '& .MuiButton-endIcon': {
              ml: 0.5,
            },
          }}
          endIcon={
            <ChevronRightOutlinedIcon
              sx={{
                width: 24,
                height: 24,
                rotate: open ? '90deg' : 0,
                transition: 'all 0.3s ease',
              }}
            />
          }
        >
          {t('modules:header__menu__products')}
        </Button>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
          }}
          PaperProps={{
            elevation: 2,
            sx: {
              p: 3,
              maxWidth: 1000,
              width: '100%',
            },
          }}
        >
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
                      target={isInIframe() ? '_blank' : '_self'}
                    >
                      <Typography
                        variant='custom'
                        fontSize={16}
                        lineHeight={1.5}
                      >
                        {t(secondaryMenuItem.title)}
                      </Typography>
                    </ProLink>
                  ))}
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Popover>
      </>
    );
  }
};

export default ProductsItem;
