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
    // target: '_blank',
    href: `https://www.maxai.me/docs/help/ `, // link 最后加了一个 空格，是为了让 nextJs Link 组件不自动删除 尾斜杠
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
