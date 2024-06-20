import Typography from '@mui/material/Typography';
import capitalize from 'lodash-es/capitalize';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';

import DropdownMenuItem from './components/DropdownMenuItem';

interface IProps {
  isSmallScreen?: boolean;
}

const RESOURCES_MENU_LIST = [
  {
    label: (t) => {
      return capitalize(t('affiliate:main_keywords'));
    },
    href: '/affiliate',
  },
  {
    label: 'modules:footer__pdf_tools',
    href: '/pdf-tools',
  },
  {
    label: 'app_footer:resource__learning_center__label',
    href: '/learning-center/',
  },
];

const ResourcesItem: FC<IProps> = ({ isSmallScreen }) => {
  const { t } = useTranslation();
  capitalize;
  return (
    <DropdownMenuItem
      menulist={RESOURCES_MENU_LIST}
      isSmallScreen={isSmallScreen}
    >
      <Typography
        variant='custom'
        fontSize={16}
        fontWeight={500}
        lineHeight={1.5}
      >
        {t('modules:header__menu__resources')}
      </Typography>
    </DropdownMenuItem>
  );
};

export default ResourcesItem;
