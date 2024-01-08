import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import { Box, Stack } from '@mui/material';
import React, { FC, useEffect, useRef } from 'react';

import LanguageSelect from '@/components/select/LanguageSelect';
import { usePreferredLanguage } from '@/i18n/hooks';

interface IProps {
  mini?: boolean;
}

const LanguageItem: FC<IProps> = ({ mini }) => {
  const { currentLanguage, changeLanguage, languageLabel } =
    usePreferredLanguage();

  const templateLanguageRef = useRef<HTMLElement>(null);

  const [inputWidth, setInputWidth] = React.useState(80);

  useEffect(() => {
    if (templateLanguageRef.current) {
      setInputWidth(templateLanguageRef.current.offsetWidth);
    }
  }, [languageLabel]);

  return (
    <Stack
      direction='row'
      spacing={0}
      alignItems='center'
      sx={{
        px: mini ? 2 : 0,
        py: mini ? 0.75 : 0,
      }}
    >
      <Box
        ref={templateLanguageRef}
        sx={{
          position: 'absolute',
          opacity: 0,
          pointerEvents: 'none',
        }}
      >
        {languageLabel}
      </Box>
      <LanguageOutlinedIcon
        sx={{
          fontSize: 20,
        }}
      />
      <LanguageSelect
        sx={{
          // minWidth: 220,
          maxWidth: 120,
          width: inputWidth + 30,
          '& .MuiInputBase-root': {
            p: '0px !important',

            '.MuiInputBase-input': {
              fontSize: 16,
              fontWeight: 500,
              p: '0px !important',
              pl: '4px !important',
            },
            '& > fieldset': {
              borderWidth: 0,
              p: 0,
            },
            '.MuiAutocomplete-endAdornment': {
              position: 'static',
            },
          },
        }}
        defaultValue={currentLanguage}
        onChange={changeLanguage}
        popperSx={{
          width: '160px !important',
        }}
      />
    </Stack>
  );
};

export default LanguageItem;
