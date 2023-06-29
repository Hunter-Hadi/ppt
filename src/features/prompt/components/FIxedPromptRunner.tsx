import CloseIcon from '@mui/icons-material/Close';
import { Box, Drawer, IconButton, Typography } from '@mui/material';
import React, { FC } from 'react';
import { useRecoilValue } from 'recoil';

import RunPromptSettingSelector from '@/features/prompt/components/RunPromptSettingSelector';
import { RenderedTemplatePromptAtom } from '@/features/prompt/store/runPromptSettings';
import { IPromptDetailData } from '@/features/prompt/types';

import { RENDERED_TEMPLATE_PROMPT_DOM_ID } from '../constant';

interface IProps {
  promptId?: string;
  prompt?: IPromptDetailData;
  onClose?: () => void;
  loading?: boolean;
}

const FIxedPromptRunner: FC<IProps> = ({
  promptId,
  prompt,
  loading,
  onClose,
}) => {
  const renderedTemplatePrompt = useRecoilValue(RenderedTemplatePromptAtom);

  const show = !!promptId;

  return (
    <Drawer
      anchor='bottom'
      open={show}
      onClose={onClose}
      sx={{
        zIndex: (t) => t.zIndex.drawer + 10,
      }}
    >
      <Box
        sx={{
          position: 'relative',
          mx: 'auto',
          my: 4,
          // width: 'max-content',
          width: 750,
          p: 2,
          borderRadius: 1,
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.16)',
        }}
      >
        {prompt && (
          <Box position='absolute' top={8} right={8}>
            <IconButton aria-label='delete' onClick={onClose}>
              <CloseIcon fontSize='inherit' />
            </IconButton>
          </Box>
        )}
        {!loading && prompt?.prompt_title && (
          <Typography
            variant='body2'
            color='#fff'
            bgcolor='#000'
            width={'max-content'}
            px={1}
            borderRadius={1}
            mb={2}
          >
            {prompt.prompt_title}
          </Typography>
        )}
        <RunPromptSettingSelector
          sx={{ minWidth: 750 }}
          promptDetail={prompt}
          colorInput={false}
          promptId={prompt?.id}
          loading={loading}
        />
        <Typography
          id={RENDERED_TEMPLATE_PROMPT_DOM_ID}
          sx={{
            width: '1px',
            height: '1px',
            zIndex: -1,
          }}
          overflow='hidden'
          dangerouslySetInnerHTML={{
            __html: renderedTemplatePrompt,
          }}
        />
      </Box>
    </Drawer>
  );
};

export default FIxedPromptRunner;
