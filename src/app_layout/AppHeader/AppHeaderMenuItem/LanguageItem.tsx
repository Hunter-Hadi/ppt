import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { MenuItem, Stack } from '@mui/material';
import React, { FC } from 'react';

import ProLink from '@/components/ProLink';
import { useLanguages } from '@/i18n/hooks/useLanguages';

interface IProps {
  isSmallScreen?: boolean;
}

const LanguageItem: FC<IProps> = ({ isSmallScreen }) => {
  const { languageLabel, routerToLanguagesPagesLink } = useLanguages();

  const textRender = () => (
    <ProLink
      href={routerToLanguagesPagesLink}
      underline='hover'
      adaptiveLocale={false}
      sx={{
        width: '100%',
        py: isSmallScreen ? 1 : 0,
        px: isSmallScreen ? 2 : 0,
      }}
    >
      <Stack
        direction='row'
        alignItems='center'
        sx={{
          color: 'text.primary',
          fontSize: 16,
          lineHeight: 1.5,
          fontWeight: 500,
        }}
      >
        <LanguageOutlinedIcon
          sx={{
            fontSize: 20,
            mr: 0.4,
          }}
        />
        {languageLabel}
      </Stack>
    </ProLink>
  );

  if (isSmallScreen) {
    return (
      <MenuItem
        sx={{
          p: 0,
        }}
      >
        {textRender()}
      </MenuItem>
    );
  }

  return <Stack px={0}>{textRender()}</Stack>;
};

export default LanguageItem;
