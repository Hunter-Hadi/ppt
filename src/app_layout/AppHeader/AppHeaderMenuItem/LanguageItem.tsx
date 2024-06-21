import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { Stack, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { FC } from 'react';

import { useLanguages } from '@/i18n/hooks/useLanguages';
import LanguageSelectorList from '@/page_components/LanguagesPages/components/LanguageSelectorList';

import PopperMenuItem from './components/PopperMenuItem';

interface IProps {
  isSmallScreen?: boolean;
}

const LanguageItem: FC<IProps> = ({ isSmallScreen }) => {
  const { t } = useTranslation();
  const { languageLabel, routerToLanguagesPagesLink } = useLanguages();

  const labelContent = (
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
    </Stack>
  );

  return (
    <PopperMenuItem
      isSmallScreen={isSmallScreen}
      LabelContent={labelContent}
      SmallScreenContent={
        <Stack px={2}>
          <Typography variant='h5' mb={3} fontWeight={900}>
            {t('pages:languages__title')}
          </Typography>
          <LanguageSelectorList
            containerProps={{
              sx: {
                pl: 2,
              },
            }}
            itemBreakpoints={{
              xs: 6,
              sm: 3,
            }}
          />
        </Stack>
      }
      popperSx={{
        maxWidth: 1090,
        width: '100%',
      }}
      paperSx={{
        p: 4,
      }}
      BigScreenContent={
        <Stack>
          <Typography variant='h5' mb={3} fontWeight={900}>
            {t('pages:languages__title')}
          </Typography>
          <LanguageSelectorList
            itemBreakpoints={{
              md: 2,
            }}
          />
        </Stack>
      }
    />
  );
};

export default LanguageItem;
