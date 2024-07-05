import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { Box, Stack, Typography } from '@mui/material';
import { SxProps } from '@mui/material/styles';
import React, { FC, useEffect } from 'react';

import { useMaxAITranslation } from '@/packages/common';
import languageCodeMap from '@/packages/common/constants/languageCodeMap.json';
import LanguageSelectorList from '@/packages/nextjs-ui/components/LanguageSelector/LanguageSelectorList';

import LanguageSelectorPopup from './LanguageSelectorPopup';

interface ILanguageSelectorProps {
  defaultLanguageCode?: string;
  sx?: SxProps;
  PopperSx?: SxProps;
  PaperSx?: SxProps;
}

const LanguageSelector: FC<ILanguageSelectorProps> = (props) => {
  const { defaultLanguageCode, sx, PopperSx, PaperSx } = props;
  const { t } = useMaxAITranslation();
  const [languageLabel, setLanguageLabel] = React.useState<string>('English');
  useEffect(() => {
    const locale = window.location.pathname.split('/').find((path) => {
      return /^[A-Za-z]{2,4}([_-][A-Za-z]{4})?([_-]([A-Za-z]{2}|[0-9]{3}))?$/.test(
        path,
      );
    });
    if (locale && languageCodeMap[locale]) {
      setLanguageLabel(languageCodeMap[locale].label);
    } else if (defaultLanguageCode && languageCodeMap[defaultLanguageCode]) {
      setLanguageLabel(languageCodeMap[defaultLanguageCode].label);
    } else {
      setLanguageLabel('English');
    }
  }, []);

  const labelContent = (
    <Stack
      direction='row'
      alignItems='center'
      sx={{
        color: 'text.primary',
        fontSize: '16px',
        lineHeight: 1.5,
        fontWeight: 500,
      }}
    >
      <LanguageOutlinedIcon
        sx={{
          fontSize: '20px',
        }}
      />

      <Typography variant='custom' fontSize={'inherit'} ml={0.4}>
        {languageLabel}
      </Typography>
    </Stack>
  );

  return (
    <LanguageSelectorPopup
      LabelContent={labelContent}
      SmallScreenContent={
        <Box px={2} py={1}>
          <Typography variant='h5' mb={2} fontWeight={900}>
            {t('package__nextjs_ui:language_selector__title')}
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
        </Box>
      }
      ButtonSx={sx}
      PopperSx={{
        maxWidth: 1090,
        width: '100%',
        ...PopperSx,
      }}
      PaperSx={{
        p: 4,
        ...PaperSx,
      }}
      BigScreenContent={
        <Box>
          <Typography variant='h5' mb={3} fontWeight={900}>
            {t('package__nextjs_ui:language_selector__title')}
          </Typography>
          <LanguageSelectorList
            itemBreakpoints={{
              md: 2,
            }}
          />
        </Box>
      }
    />
  );
};

export default LanguageSelector;
