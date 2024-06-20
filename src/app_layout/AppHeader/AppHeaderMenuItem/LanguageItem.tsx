import ChevronRightOutlinedIcon from '@mui/icons-material/ChevronRightOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { Stack, Typography } from '@mui/material';
import React, { FC } from 'react';

import { useLanguages } from '@/i18n/hooks/useLanguages';

import MenuLinkItem from './components/MenuLinkItem';

interface IProps {
  isSmallScreen?: boolean;
}

const LanguageItem: FC<IProps> = ({ isSmallScreen }) => {
  const { languageLabel, routerToLanguagesPagesLink } = useLanguages();

  return (
    <MenuLinkItem
      link={routerToLanguagesPagesLink}
      isSmallScreen={isSmallScreen}
    >
      <Stack
        direction='row'
        alignItems='center'
        sx={{
          width: '100%',
          color: 'text.primary',
          fontSize: 16,
          lineHeight: 1.5,
          fontWeight: 500,
        }}
      >
        <LanguageOutlinedIcon
          sx={{
            fontSize: 20,
          }}
        />

        <Typography variant='custom' fontSize={'inherit'} ml={0.4}>
          {languageLabel}
        </Typography>

        <ChevronRightOutlinedIcon
          sx={{
            fontSize: 24,
            // width: 24,
            // height: 24,
            // // rotate: expanded === 'panel1' ? '90deg' : 0,
            ml: isSmallScreen ? 'auto' : 0.5,
            transition: 'all 0.3s ease',
          }}
        />
      </Stack>
    </MenuLinkItem>
  );
};

export default LanguageItem;
