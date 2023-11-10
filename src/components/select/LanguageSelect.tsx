import Autocomplete from '@mui/material/Autocomplete';
import { SxProps } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { LANGUAGE_CODE_MAP } from '@/i18n/types';

// 将 LANGUAGE_CODE_MAP 对象转为 options
// value 是 key，label 是 value
const LANGUAGES_OPTIONS = Object.keys(LANGUAGE_CODE_MAP).map((key) => ({
  value: key,
  label: LANGUAGE_CODE_MAP[key].en_label,
  origin: LANGUAGE_CODE_MAP[key],
}));

interface LanguageSelectProps {
  label?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  sx?: SxProps;
}

function filterOptions(options: any[], { inputValue }: any) {
  return options.filter((option) => {
    const label = option.label.toLowerCase();
    const value = option.value.toLowerCase();
    const input = inputValue.toLowerCase();
    return label.includes(input) || value.includes(input);
  });
}

const LanguageSelect: FC<LanguageSelectProps> = (props) => {
  const {
    label = '',
    defaultValue = '',
    onChange = (value: string) => {
      console.log(value);
    },
    sx,
  } = props;
  const { t } = useTranslation(['common']);
  const [value, setValue] = React.useState<{ label: string; value: string }>(
    () => {
      return (
        LANGUAGES_OPTIONS.find((option) => option.value === defaultValue) ||
        LANGUAGES_OPTIONS[0]
      );
    },
  );

  return (
    <Autocomplete
      noOptionsText={t('common:no_options')}
      disableClearable
      value={value}
      size={'small'}
      sx={{ width: 160, ...sx }}
      autoHighlight
      getOptionLabel={(option) => option.label}
      options={LANGUAGES_OPTIONS}
      onChange={(event: any, newValue) => {
        setValue(newValue);
        onChange(newValue.value);
      }}
      filterOptions={filterOptions}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'off', // disable autocomplete and autofill
          }}
        />
      )}
    />
  );
};

export default LanguageSelect;
