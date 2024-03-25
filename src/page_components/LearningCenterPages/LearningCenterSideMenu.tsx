import { Box, MenuItem, MenuList, Typography } from '@mui/material';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect, useMemo } from 'react';

import { PLAN_FEATURES_CATEGORY } from '@/features/pricing/constant';
import useAppHeaderState from '@/hooks/useAppHeaderState';

interface IMenuItem {
  id: string;
  label: string;
  children?: IMenuItem[];
}

const LearningCenterSideMenu = () => {
  const { appHeaderHeight } = useAppHeaderState();

  const { isReady, asPath } = useRouter();

  const { t } = useTranslation();

  const MENU_LIST: IMenuItem[] = useMemo(
    () => [
      {
        label: t('pages:learning_center__introduction__title'),
        id: 'introduction',
      },
      {
        label: t('pages:learning_center__basic_usage__title'),
        id: 'basic-usage',
      },
      {
        label: t('pages:learning_center__features__title'),
        id: 'features',
        children: PLAN_FEATURES_CATEGORY.map((categoryItem) => ({
          label: t(`${categoryItem.name}`),
          id: t(`${categoryItem.name}`),
        })),
      },
    ],
    [t],
  );

  const scrollIntoElement = (id: string) => {
    console.log(`id`, id);
    const element = document.querySelector<HTMLElement>(
      `*[data-testid="${id}"]`,
    );
    if (element) {
      var elementPosition = element.offsetTop;
      var offsetPosition = elementPosition - appHeaderHeight - 16;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (isReady && asPath) {
      const hash = asPath.split('#')[1];
      hash && scrollIntoElement(hash);
    }
  }, [isReady, asPath]);

  const renderMenuItem = (menuItem: IMenuItem, level = 0) => {
    if (menuItem.children) {
      return (
        <>
          <MenuItem
            key={menuItem.id}
            sx={{
              px: 2 + level * 2,
              py: 1.5,
            }}
            onClick={() => {
              scrollIntoElement(menuItem.id);
            }}
          >
            <Typography
              variant='body2'
              color='inherit'
              sx={{
                textWrap: 'wrap',
              }}
            >
              {menuItem.label}
            </Typography>
          </MenuItem>
          {menuItem.children.map((menuItem) => renderMenuItem(menuItem, 1))}
        </>
      );
    }

    return (
      <MenuItem
        key={menuItem.id}
        sx={{
          px: 2 + level * 2,
          py: 1.5,
        }}
        onClick={() => {
          scrollIntoElement(menuItem.id);
        }}
      >
        <Typography
          variant='body2'
          color='inherit'
          sx={{
            textWrap: 'wrap',
          }}
        >
          {menuItem.label}
        </Typography>
      </MenuItem>
    );
  };

  return (
    <Box
      flexShrink={0}
      sx={{
        position: 'sticky',
        top: appHeaderHeight + 16,
        maxWidth: 280,
        flexDirection: 'column',
        maxHeight: 880,
        mr: 8,

        display: {
          xs: 'none',
          sm: 'none',
          md: 'flex',
        },
      }}
    >
      <MenuList
        sx={{
          py: 0,
        }}
      >
        {MENU_LIST.map((menuItem) => {
          return renderMenuItem(menuItem, 0);
        })}
      </MenuList>
    </Box>
  );
};

export default LearningCenterSideMenu;
