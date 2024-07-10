import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Checkbox,
  Container,
  FormControlLabel,
  Stack,
  SxProps,
  TextField,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { shuffle } from 'lodash-es';
import React, { FC, useMemo, useState } from 'react';

import { list2Options } from '@/utils/dataHelper/arrayHelper';
import { getFingerPrintAsync } from '@/utils/fingerPrint';
import { GaContent, generateGaEvent } from '@/utils/gtag';

export type ISingleSurveySubmitDataType = {
  surveyName: string;
  _Reason: string;
  _Email: string;
  _FP: string;
  reasons: {
    [key: string]: string;
  };
};
type IOptionValueType = string | number;

type IOptionType = {
  label: string;
  value: IOptionValueType;
  // eslint-disable-next-line
  origin?: any;
};

const CustomTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '&:hover fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.87)',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'rgba(0, 0, 0, 0.87)',
    },
  },
});

const REASION_KEY = '__reason';

const WebChatGPTSingleSurvey: FC<{
  surveyName: string;
  title: string;
  description?: string;
  options: string[] | IOptionType[];
  surveyType?: 'checkbox' | 'radio';
  okText?: string;
  cancelText?: string;
  checkBox?: boolean;
  checkBoxSx?: SxProps;
  required?: boolean;
  randomOptions?: boolean;
  explain?: boolean;
  enableEmail?: boolean;
  onSubmit?: (_: ISingleSurveySubmitDataType) => Promise<void>;
  onCancel?: (_: ISingleSurveySubmitDataType) => Promise<void>;
  passSubmitVerification?: boolean;
  passCancelVerification?: boolean;
  submitButtonProps?: SxProps;
  cancelButtonProps?: SxProps;
  disabledInValid?: boolean;
  hiddenSubmitWithoutSelected?: boolean;
  ExplainComponent?: keyof JSX.IntrinsicElements | any;
}> = (props) => {
  const {
    surveyName,
    title,
    description,
    options,
    okText = 'submit',
    cancelText = 'cancel',
    randomOptions = false,
    explain = false,
    surveyType = 'checkbox',
    required = true,
    enableEmail = false,
    onSubmit,
    onCancel,
    // passSubmitVerification,
    // passCancelVerification,
    submitButtonProps,
    cancelButtonProps,
    disabledInValid,
    ExplainComponent,
    checkBoxSx,
    hiddenSubmitWithoutSelected,
  } = props;
  const [values, setValues] = useState<string[]>([]);
  const [currentClickValue, setCurrentClickValue] = useState<
    string | undefined
  >();
  const [reason, setReason] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [buttonLoading, setButtonLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>();

  // 是否禁用提交
  const disabledSubmit = useMemo(() => {
    if (!required) {
      return false;
    }
    let isValid = true;
    const errorMsg = '';

    if (values.includes(REASION_KEY)) {
      if (reason === '') {
        isValid = false;
        // errorMsg = 'Please fill in reason details to continue.';
      }
    } else {
      // 当勾掉的时候清空已经输入的reason
      setReason('');
    }
    if (values.join('') === '') {
      isValid = false;
    }

    if (!isValid && errorMsg) {
      setError(errorMsg);
    } else {
      setError(null);
    }
    return !isValid;
  }, [required, values, reason]);

  // 最终渲染的选项
  const currentOptions = useMemo(() => {
    let finallyOptions = options as IOptionType[];
    if (typeof options[0] === 'string') {
      finallyOptions = list2Options(options as string[]) as IOptionType[];
    }
    const reasonOption = {
      value: REASION_KEY,
      label: 'Other reason',
    };
    return randomOptions
      ? shuffle(finallyOptions).concat(reasonOption)
      : finallyOptions.concat(reasonOption);
  }, [options]);
  // 提交
  const handleClick = async (isSubmit: boolean) => {
    if (disabledSubmit) return;
    try {
      setButtonLoading(true);
      const submitData: ISingleSurveySubmitDataType = {
        surveyName,
        _FP: (await getFingerPrintAsync()) || 'unknown',
        _Reason: reason,
        _Email: email || 'unknown',
        reasons: {},
      };
      currentOptions.forEach((option) => {
        if (
          values.includes(option.value as string) &&
          option.value !== REASION_KEY
        ) {
          submitData.reasons[option.label] = option.value as string;
        }
      });
      if (isSubmit) {
        onSubmit && (await onSubmit(submitData));
      } else {
        onCancel && (await onCancel(submitData));
      }
    } catch (e) {
      console.log('sample survey click error: \t', e);
    } finally {
      setButtonLoading(false);
    }
  };

  const hasExplain = useMemo(() => {
    return explain && ExplainComponent;
  }, [explain, ExplainComponent]);

  const ExplainComponentMemo = useMemo(
    () => <ExplainComponent surveyName={currentClickValue} />,
    [currentClickValue, ExplainComponent],
  );

  const showSubmitButton = useMemo(() => {
    if (hiddenSubmitWithoutSelected) {
      return values.length > 0;
    } else {
      return true;
    }
  }, [hiddenSubmitWithoutSelected, values]);

  return (
    <Container>
      <Stack
        direction='row'
        spacing={{
          xs: 0,
          sm: 8,
        }}
        justifyContent={'center'}
      >
        {hasExplain ? (
          <Box
            flex={1}
            flexShrink={0}
            sx={{
              display: {
                xs: 'none',
                sm: 'block',
              },
            }}
          >
            {ExplainComponentMemo}
          </Box>
        ) : null}
        <Stack flex={hasExplain ? 1 : 0} flexShrink={0} pt={1}>
          <Typography
            fontWeight={700}
            fontSize={16}
            variant={'custom'}
            component={'h6'}
          >
            {title}
            {required && (
              <span style={{ color: '#FF5A5F', fontWeight: 'lighter' }}>
                {' (Required)'}
              </span>
            )}
          </Typography>
          {description && (
            <Typography color={'text.secondary'} variant={'body1'} mt={1}>
              {description}
            </Typography>
          )}
          {surveyType === 'checkbox' && (
            <Stack gap={0} mt={2}>
              {currentOptions.map((option) => {
                return (
                  <FormControlLabel
                    key={option.value}
                    value={option.value}
                    checked={values.includes(option.value as string)}
                    control={<Checkbox sx={checkBoxSx} />}
                    label={
                      <Typography variant='body2'>{option.label}</Typography>
                    }
                    onChange={(event) => {
                      const checked = (
                        event as React.ChangeEvent<HTMLInputElement>
                      ).target.checked;
                      const checkBoxValue = option.value as string;
                      if (checked) {
                        setCurrentClickValue(
                          checkBoxValue !== REASION_KEY
                            ? checkBoxValue
                            : undefined,
                        );
                      } else {
                        setCurrentClickValue(undefined);
                      }
                      const oldIndex = values.findIndex(
                        (value) => checkBoxValue === value,
                      );
                      if (checked && oldIndex === -1) {
                        setValues((prevState) =>
                          prevState.concat(checkBoxValue),
                        );
                      } else {
                        setValues((prevState) =>
                          prevState.filter((value) => value !== checkBoxValue),
                        );
                      }
                    }}
                  />
                );
              })}
              {values.includes(REASION_KEY) && (
                <CustomTextField
                  sx={{ width: 400, mt: 1 }}
                  inputProps={{
                    sx: {
                      fontSize: '16px !important',
                    },
                  }}
                  id='outlined-multiline-static'
                  size='small'
                  multiline
                  placeholder={'Tell us your thoughts'}
                  rows={4}
                  onInput={(event) => {
                    setReason(
                      (event as React.ChangeEvent<HTMLInputElement>).target
                        .value,
                    );
                  }}
                />
              )}
            </Stack>
          )}
          {error && (
            <Stack direction={'row'} alignItems='center' spacing={1} mt={2}>
              <ErrorOutlineIcon sx={{ color: '#FF5A5F' }} />
              <Typography variant={'body1'} color={'#FF5A5F'}>
                {error}
              </Typography>
            </Stack>
          )}
          {enableEmail && showSubmitButton && (
            <Stack spacing={2} mt={2}>
              <Typography
                fontWeight={700}
                fontSize={16}
                variant={'custom'}
                component={'h6'}
              >
                Need help? Leave your email and our friendly team will contact
                you.
                {required && (
                  <span style={{ color: '#666', fontWeight: 'lighter' }}>
                    {' (Optional)'}
                  </span>
                )}
              </Typography>
              <CustomTextField
                sx={{ width: 400 }}
                inputProps={{
                  sx: {
                    fontSize: '16px !important',
                  },
                }}
                size='small'
                placeholder={'Enter your email (Optional)'}
                rows={4}
                onInput={(event) => {
                  setEmail(
                    (event as React.ChangeEvent<HTMLInputElement>).target.value,
                  );
                }}
              />
            </Stack>
          )}

          <Stack spacing={1} direction={'row'} mt={4}>
            {okText !== '' && (
              <GaContent
                gaEvent={generateGaEvent('click', 'survey_submit_button', {
                  type: surveyName,
                  value: okText,
                })}
              >
                <LoadingButton
                  disabled={disabledInValid && disabledSubmit}
                  sx={{ minWidth: 200, height: 46, ...submitButtonProps }}
                  loading={buttonLoading}
                  variant={'contained'}
                  disableElevation
                  onClick={async () => {
                    generateGaEvent(
                      'click',
                      'survey_submit_button',
                      {
                        type: surveyName,
                      },
                      true,
                    );
                    await handleClick(true);
                  }}
                >
                  <span>{okText}</span>
                </LoadingButton>
              </GaContent>
            )}
            {cancelText !== '' && (
              <GaContent
                gaEvent={generateGaEvent('click', 'survey_cancel_button', {
                  type: surveyName,
                  value: cancelText,
                })}
              >
                <LoadingButton
                  disabled={disabledInValid && disabledSubmit}
                  sx={{ minWidth: 200, ...cancelButtonProps }}
                  loading={buttonLoading}
                  variant={'contained'}
                  color={'info'}
                  disableElevation
                  onClick={async () => {
                    generateGaEvent(
                      'click',
                      'survey_cancel_button',
                      {
                        type: surveyName,
                      },
                      true,
                    );
                    await handleClick(false);
                  }}
                >
                  <span>{cancelText}</span>
                </LoadingButton>
              </GaContent>
            )}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
};
export default WebChatGPTSingleSurvey;
