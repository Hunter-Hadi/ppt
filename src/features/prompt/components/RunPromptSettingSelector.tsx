import styled from '@emotion/styled';
import LaunchOutlinedIcon from '@mui/icons-material/LaunchOutlined';
import SendIcon from '@mui/icons-material/Send';
import {
  Box,
  Button,
  Grid,
  OutlinedTextFieldProps,
  Stack,
  SxProps,
  TextField,
  Typography,
} from '@mui/material';
import { cloneDeep, differenceBy } from 'lodash';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';

import AppLoadingLayout from '@/app_layout/AppLoadingLayout';
import CustomModal from '@/components/CustomModal';
import {
  DEFAULT_TEMPLATE_RESERVED_VARIABLE,
  RENDERED_TEMPLATE_PROMPT_DOM_ID,
} from '@/features/prompt/constant';
import { useRunThisPrompt, useRunThisPromptV2 } from '@/features/prompt/hooks';
import usePromptVariableController from '@/features/prompt/hooks/usePromptVariableController';
import {
  RenderedTemplatePromptAtom,
  RunPromptSettingsAtom,
} from '@/features/prompt/store/runPromptSettings';
import { IPromptDetailData, IPromptVariable } from '@/features/prompt/types';
import {
  checkIsDefaultVariable,
  generateVariableHtmlContent,
  handleVariableTypeWithInputVariable,
  isLiveCrawling,
  renderTemplate,
} from '@/features/prompt/utils';
import { APP_EXTERNAL_LINKS } from '@/global_constants';
import { ChromeExtensionDetectorState } from '@/store';
import { checkIsDomain } from '@/utils/dataHelper/stringHelper';

import { LanguageSelect } from './LanguageSelect';
import { ToneSelect } from './ToneSelect';
import { WritingStyleSelect } from './WritingStyleSelect';

interface IProps {
  promptId?: string | null;
  promptDetail?: IPromptDetailData | null;
  sx?: SxProps;
  loading?: boolean;
  colorInput?: boolean;
}

export interface IRunPromptType {
  tone: string;
  writingStyle: string;
  language: string;
  prompt: string;
}

const CssTextField = styled((props: OutlinedTextFieldProps) => (
  <TextField {...props} />
))((props) => {
  const color = props.inputProps?.color || '';
  return {
    '& label.Mui-focused': {
      color: color,
    },
    '& .MuiOutlinedInput-root': {
      '&:hover fieldset': {
        borderColor: color,
      },
      '&.Mui-focused fieldset': {
        borderColor: color,
      },
    },
  };
});

const RunPromptSettingSelector: FC<IProps> = ({
  promptId,
  sx,
  loading = false,
  colorInput = true,
  promptDetail,
}) => {
  const { runThisPrompt: V1 } = useRunThisPrompt();
  const { runThisPrompt: V2 } = useRunThisPromptV2();

  const { checkIsInstalled } = useRecoilValue(ChromeExtensionDetectorState);

  const [runPromptSettings, setRunPromptSettings] = useRecoilState(
    RunPromptSettingsAtom,
  );
  const { batchGenerateVariable } = usePromptVariableController();
  const [renderedTemplatePrompt, setRenderedTemplatePrompt] = useRecoilState(
    RenderedTemplatePromptAtom,
  );

  const [promptInputError, setPromptInputError] = useState('');

  const originalPromptTemplate = promptDetail?.prompt_template;
  // const variables = promptDetail?.variables;

  const variables = useMemo(() => {
    return promptDetail?.variables && promptDetail?.variable_types
      ? handleVariableTypeWithInputVariable(
          promptDetail?.variables,
          promptDetail?.variable_types,
        )
      : promptDetail?.variables;
  }, [promptDetail]);

  const isLiveCrawlingFlag = isLiveCrawling(variables);

  // const handleEnterRunPrompt = (input: HTMLInputElement) => {
  //   if (input) {
  //     // fix hacker
  //     // 避免插件获取到当前 input 先 disabled，等模拟 selection 动作结束后，恢复
  //     input.disabled = true;
  //     handleRunPrompt();
  //     setTimeout(() => {
  //       input.disabled = false;
  //     }, 1000);
  //   }
  // };

  const [runInterceptModalOpen, setRunInterceptModalOpen] = useState(false);

  const handleRunPrompt = async () => {
    if (!originalPromptTemplate) {
      console.error('template is empty');
      return;
    }
    if (!checkIsInstalled()) {
      return;
    }

    // 20230810 由于网页版不支持跑 livecrawling、websearch 类型的prompt，所以都引导到webchatgpt插件里运行
    // 需求：https://ikjt09m6ta.larksuite.com/docx/KAAidHvq5oInKmxHLqEu0S7dsWh
    if (
      promptDetail.variable_types?.some(
        (type) => type === 'livecrawling' || type === 'websearch',
      )
    ) {
      setRunInterceptModalOpen(true);
      return;
    }

    const liveCrawlingVariable = runPromptSettings.variables.find(
      (item) => item.type === 'livecrawling',
    );
    if (
      isLiveCrawlingFlag &&
      liveCrawlingVariable &&
      !checkIsDomain(liveCrawlingVariable?.value || '')
    ) {
      setPromptInputError('Please enter a valid Url');
      return;
    }

    if (renderedTemplatePrompt) {
      setPromptInputError('');

      if (!liveCrawlingVariable) {
        await V1(`#${RENDERED_TEMPLATE_PROMPT_DOM_ID}`);
      } else {
        const templatePromptEl = document.querySelector(
          `#${RENDERED_TEMPLATE_PROMPT_DOM_ID}`,
        );
        if (templatePromptEl && templatePromptEl.textContent) {
          await V2(
            originalPromptTemplate,
            {
              PROMPT: liveCrawlingVariable?.value,
            },
            liveCrawlingVariable,
          );
        }
      }
    }
  };

  const handleUpdateVariableValue = (name: string, value: string) => {
    setRunPromptSettings((preValue) => {
      const newVariables = cloneDeep(preValue.variables);
      const index = newVariables.findIndex((item) => item.name === name);
      if (index !== -1) {
        newVariables[index].value = value;
      }
      return {
        ...preValue,
        variables: newVariables,
      };
    });
  };

  useEffect(() => {
    if (variables) {
      const { newVariables } = batchGenerateVariable(
        differenceBy(variables, DEFAULT_TEMPLATE_RESERVED_VARIABLE, 'name'),
        0,
      );
      setRunPromptSettings((preValue) => ({
        ...preValue,
        variables: newVariables.map((item) => ({ ...item, value: '' })),
      }));
    }
  }, [variables]);

  useEffect(() => {
    if (!promptDetail?.prompt_template) {
      return;
    }
    try {
      const { tone, writingStyle, language, variables } = runPromptSettings;
      let promptToneAndWritingStyle =
        promptDetail?.optional_prompt_template || '';
      if (String(tone + writingStyle).trim() === '') {
        // not select tone and writing style
        promptToneAndWritingStyle = '';
      }
      if (promptToneAndWritingStyle) {
        if (!promptToneAndWritingStyle.startsWith('\n')) {
          promptToneAndWritingStyle = '\n' + promptToneAndWritingStyle;
        }
      }
      const moreVariables = variables.reduce((pre, cur) => {
        pre[cur.name] = generateVariableHtmlContent(
          {
            name: cur.value || `{{${cur.name}}}`,
            color: cur.color,
          } as IPromptVariable,
          false,
          false,
        );

        return pre;
      }, {} as Record<string, any>);
      const result = renderTemplate(
        promptDetail.prompt_template + promptToneAndWritingStyle,
        {
          TONE: tone ? String(tone).toLowerCase() : '{{TONE}}',
          TARGET_LANGUAGE: language ?? '{{TARGET_LANGUAGE}}',
          WRITTINGSTYLE: writingStyle
            ? String(writingStyle || '').toLowerCase()
            : '{{WRITTINGSTYLE}}',
          ...moreVariables,
        },
      );
      if (result.data && !result.error) {
        setRenderedTemplatePrompt(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [promptId, promptDetail, runPromptSettings]);

  useEffect(() => {
    // clear error when change prompt
    setPromptInputError('');
  }, [promptId]);

  const checkIsNotNeedShowVariable = (variable: IPromptVariable) => {
    // 不需要显示出来的变量
    const hiddenVariables = [
      'Live Crawling Crawled Text',
      'Live Crawling Crawled Html',
      'Web Search Results',
      'System Current Date',
    ];

    return (
      checkIsDefaultVariable(variable) &&
      hiddenVariables.includes(variable.name)
    );
  };

  const renderRunPromptVariables = useMemo(() => {
    return runPromptSettings.variables.filter(
      (item) => !checkIsNotNeedShowVariable(item),
    );
  }, [runPromptSettings.variables]);

  // console.log('runPromptSettings', runPromptSettings);

  return (
    <AppLoadingLayout loading={loading}>
      <Stack spacing={2} sx={sx}>
        <Stack direction={'row'} alignItems={'center'} spacing={2}>
          <LanguageSelect
            defaultValue={runPromptSettings.language}
            onChange={(value) => {
              setRunPromptSettings((pre) => ({
                ...pre,
                language: value,
              }));
            }}
            sx={{ width: '100%' }}
          />
          <ToneSelect
            defaultValue={runPromptSettings.tone}
            onChange={(value) => {
              setRunPromptSettings((pre) => ({
                ...pre,
                tone: value,
              }));
            }}
            sx={{ width: '100%' }}
          />
          <WritingStyleSelect
            defaultValue={runPromptSettings.writingStyle}
            onChange={(value) => {
              setRunPromptSettings((pre) => ({
                ...pre,
                writingStyle: value,
              }));
            }}
            sx={{ width: '100%' }}
          />
        </Stack>

        {promptId && (
          <Box>
            <Grid container rowSpacing={2} columnSpacing={2}>
              {renderRunPromptVariables.map((variable, index) => {
                const length = renderRunPromptVariables.length;
                const xs = length % 2 !== 0 && index + 1 === length ? 12 : 6;

                return (
                  <Grid item key={variable.name} xs={xs}>
                    <CssTextField
                      label={variable.name}
                      placeholder={variable.hint || variable.name}
                      value={variable.value}
                      onChange={(e) => {
                        handleUpdateVariableValue(
                          variable.name,
                          `${e.target.value}`,
                        );
                      }}
                      onKeyDown={(e) => {
                        setPromptInputError('');

                        if (e.key === 'Enter') {
                          handleRunPrompt();
                        }
                      }}
                      inputProps={{
                        color: colorInput ? variable.color : undefined,
                      }}
                      sx={{
                        width: '100%',
                        minHeight: '100%',
                      }}
                      size={'small'}
                      variant='outlined'
                      error={!!promptInputError}
                      helperText={!!promptInputError && promptInputError}
                      FormHelperTextProps={{ sx: { ml: 0 } }}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        )}
        {promptId && (
          <Stack direction={'row'} justifyContent={'flex-end'}>
            <Button
              sx={{ flexShrink: 0, height: 45 }}
              variant={'contained'}
              color={'primary'}
              startIcon={<SendIcon fontSize={'inherit'} />}
              onClick={handleRunPrompt}
            >
              Run this prompt
            </Button>
          </Stack>
        )}
        <CustomModal
          width={500}
          height={'max-content'}
          sx={{
            mt: '25vh',
          }}
          show={runInterceptModalOpen}
          onClose={() => {
            setRunInterceptModalOpen(false);
          }}
        >
          <Stack p={4} spacing={2} alignItems='flex-start'>
            <Typography>
              Complete the following steps to run this special prompt on
              ChatGPT:
            </Typography>
            <Button
              variant='outlined'
              endIcon={<LaunchOutlinedIcon />}
              target={'_blank'}
              href={'https://www.webchatgpt.app/'}
            >
              Step 1: Install WebChatGPT if not already
            </Button>
            <Button
              variant='outlined'
              endIcon={<LaunchOutlinedIcon />}
              target={'_blank'}
              href={APP_EXTERNAL_LINKS.CHATGPT}
            >
              Step 2: Open ChatGPT
            </Button>
          </Stack>
        </CustomModal>
      </Stack>
    </AppLoadingLayout>
  );
};

export default RunPromptSettingSelector;
