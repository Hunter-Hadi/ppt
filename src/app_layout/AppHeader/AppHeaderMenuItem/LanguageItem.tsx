import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { Stack } from '@mui/material';
import React, { FC } from 'react';

import ProLink from '@/components/ProLink';
import { useLanguages } from '@/i18n/hooks/useLanguages';

interface IProps {
  isSmallScreen?: boolean;
}

const LanguageItem: FC<IProps> = ({ isSmallScreen }) => {
  const { languageLabel, routerToLanguagesPagesLink } = useLanguages();

  return (
    <ProLink href={routerToLanguagesPagesLink} underline='hover'>
      <Stack
        direction='row'
        alignItems='center'
        sx={{
          px: isSmallScreen ? 2 : 0,
          py: isSmallScreen ? 0.75 : 0,
          color: 'text.primary',
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
};

export default LanguageItem;
