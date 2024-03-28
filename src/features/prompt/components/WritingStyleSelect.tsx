import {
  Autocomplete,
  SxProps,
  TextField,
  TextFieldProps,
} from '@mui/material';
import React, { FC } from 'react';

const WRITING_STYLES_OPTIONS = [
  { label: `Default`, value: `` },
  { value: `Academic`, label: `Academic` },
  { value: `Analytical`, label: `Analytical` },
  { value: `Argumentative`, label: `Argumentative` },
  { value: `Conversational`, label: `Conversational` },
  { value: `Creative`, label: `Creative` },
  { value: `Critical`, label: `Critical` },
  { value: `Descriptive`, label: `Descriptive` },
  { value: `Epigrammatic`, label: `Epigrammatic` },
  { value: `Epistolary`, label: `Epistolary` },
  { value: `Expository`, label: `Expository` },
  { value: `Informative`, label: `Informative` },
  { value: `Instructive`, label: `Instructive` },
  { value: `Journalistic`, label: `Journalistic` },
  { value: `Metaphorical`, label: `Metaphorical` },
  { value: `Narrative`, label: `Narrative` },
  { value: `Persuasive`, label: `Persuasive` },
  { value: `Poetic`, label: `Poetic` },
  { value: `Satirical`, label: `Satirical` },
  { value: `Technical`, label: `Technical` },
];

interface IWritingStyleSelectProps {
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

const WritingStyleSelect: FC<IWritingStyleSelectProps> = (props) => {
  const {
    label = 'Writing style',
    defaultValue = '',
    onChange = (value: string) => {
      console.log(value);
    },
    sx,
  } = props;
  const [value, setValue] = React.useState<{ label: string; value: string }>(
    () => {
      return (
        WRITING_STYLES_OPTIONS.find(
          (option) => option.value === defaultValue,
        ) || WRITING_STYLES_OPTIONS[0]
      );
    },
  );
  return (
    <Autocomplete
      disableClearable
      value={value}
      size={'small'}
      sx={{ width: 160, ...sx }}
      autoHighlight
      getOptionLabel={(option) => option.label}
      options={WRITING_STYLES_OPTIONS}
      onChange={(event: any, newValue) => {
        setValue(newValue);
        onChange(newValue.value);
      }}
      filterOptions={filterOptions}
      renderInput={(params) => (
        <TextField
          {...(params as TextFieldProps)}
          label={label}
          inputProps={{
            ...params.inputProps,
            autoComplete: 'new-password', // disable autocomplete and autofill
          }}
        />
      )}
    ></Autocomplete>
  );
};

export { WritingStyleSelect };
