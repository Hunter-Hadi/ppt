import { TextField } from '@mui/material';
import { FC, useEffect, useMemo, useState } from 'react';

const EmailTextField: FC<{
  whiteMode?: boolean;
  fullWidth?: boolean;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onEnter?: () => void;
  validate?: number;
}> = (props) => {
  const {
    defaultValue = '',
    onChange,
    whiteMode = true,
    fullWidth,
    validate = 0,
  } = props;
  const [email, setEmail] = useState(defaultValue);
  const [emailError, setEmailError] = useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const styleSx = useMemo(() => {
    const baseStyle = {
      width: '100%',
      pt: 2,
      maxWidth: {
        xs: '100%',
        sm: fullWidth ? '100%' : 240,
      },
    };
    return Object.assign(
      baseStyle,
      whiteMode
        ? {
            color: 'white',
            '& .MuiFormLabel-root ': {
              color: 'white',
            },
            '& .MuiInputBase-root': {
              height: 48,
              color: 'white',
              '&:hover': {
                '&:not(.Mui-disabled, .Mui-error):before': {
                  borderBottomColor: 'white',
                },
              },
              '&:before': {
                borderBottomColor: 'rgba(255, 255, 255, 0.6)',
              },
              '&:after': {
                borderBottomColor: 'white',
              },
              '&.MuiInputBase-root.Mui-error': {
                '&:hover': {
                  '&:not(.Mui-disabled, .Mui-error):before': {
                    borderBottomColor: '#d32f2f',
                  },
                },
                // color: '#d32f2f',
                '&:before': {
                  borderBottomColor: '#d32f2f',
                },
              },
            },
          }
        : {},
    );
  }, [whiteMode, fullWidth]);
  const validateEmail = (email: string) => {
    const emailRegex =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (emailRegex.test(email)) {
      setEmailError(false);
      setEmailErrorMessage('');
    } else {
      setEmailError(true);
      setEmailErrorMessage('Enter a valid email address');
    }
  };
  useEffect(() => {
    if (validate > 0) {
      validateEmail(email);
    }
  }, [email, validate]);
  return (
    <TextField
      onKeyDown={(event) => {
        if (event.key === 'Enter') {
          props.onEnter && props.onEnter();
        }
      }}
      id={'input-email'}
      type={'email'}
      helperText={emailErrorMessage || ''}
      error={emailError}
      sx={styleSx}
      onChange={(e) => {
        setEmail(e.target.value);
        onChange && onChange(e.target.value);
      }}
      onBlur={(event) => {
        validateEmail(event.target.value);
      }}
      value={email}
      placeholder='Enter email'
      variant='standard'
    />
  );
};
export default EmailTextField;
