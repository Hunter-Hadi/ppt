import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import { Box, IconButton, Stack, Tooltip, Typography } from '@mui/material';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { FC } from 'react';

import EllipsisTextWithTooltip from '@/components/EllipsisTextWithTooltip';
import ProLink from '@/components/ProLink';
import {
  DEFAULT_PROMPT_AUTHOR,
  DEFAULT_PROMPT_AUTHOR_LINK,
} from '@/features/prompt/constant';
import { IPromptCardData } from '@/features/prompt/types';
import { APP_PROJECT_LINK } from '@/global_constants';

// import { isLiveCrawling } from '../utils';
import PromptTypeList from './PromptTypeList';
dayjs.extend(utc);

const PromptCard: FC<{
  active?: boolean;
  prompt: IPromptCardData;
  onPromptClick?: (prompt: IPromptCardData) => void;
}> = ({ active, prompt, onPromptClick }) => {
  // href={`/prompts/${prompt.id}`}

  const author = prompt?.author || DEFAULT_PROMPT_AUTHOR;
  const authorLink = prompt?.author_url || DEFAULT_PROMPT_AUTHOR_LINK;

  // const isLiveCrawlingFlag = isLiveCrawling(prompt.variables);

  return (
    <Stack
      p={2}
      spacing={2}
      onClick={() => {
        onPromptClick && onPromptClick(prompt);
      }}
      sx={{
        color: 'text.primary',
        border: '1px solid',
        cursor: 'pointer',
        borderRadius: '4px',
        transition: 'all 0.2s ease-in-out',
        height: 'calc(100% - 16px - 16px)',
        borderColor: active ? 'primary.main' : 'rgba(0, 0, 0, 0.08)',
        boxShadow: active
          ? '0px 4px 8px rgba(0, 0, 0, 0.36) !important'
          : 'none',
        '&:hover': {
          boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.16)',
        },
      }}
    >
      <Stack direction='row' spacing={2} justifyContent='space-between'>
        <Typography
          variant={'body1'}
          sx={{
            fontSize: '20px',
            lineHeight: '24px',
            MozBoxOrient: 'vertical',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: `3`,
            boxOrient: 'vertical',
            lineClamp: `3`,
            display: '-webkit-box',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'normal',
            wordBreak: 'break-word',
            fontWeight: 700,
            minHeight: 72,
          }}
        >
          {prompt.prompt_title}
        </Typography>
        <Stack direction='row' fontSize={16} height='max-content'>
          <Tooltip title='View prompt details'>
            <IconButton
              size='small'
              href={`/prompts/${prompt.id}`}
              onClick={(event) => {
                event.stopPropagation();
              }}
            >
              <RemoveRedEyeIcon
                sx={{
                  fontSize: 16,
                }}
              />
            </IconButton>
          </Tooltip>
          <Tooltip title='Add to Favorite'>
            <IconButton
              size='small'
              onClick={(e) => {
                e.stopPropagation();
                location.href = `${APP_PROJECT_LINK}/prompts?favoritesId=${prompt.id}`;
              }}
            >
              <FavoriteBorderOutlinedIcon
                sx={{
                  fontSize: 16,
                }}
              />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
      <Stack direction={'row'} alignItems={'center'} spacing={1}>
        <PromptCardTag
          tag={`${prompt.category}${
            prompt.use_case ? ` / ${prompt.use_case}` : ''
          }`}
        />
      </Stack>
      <Stack
        direction={'row'}
        alignItems={'center'}
        spacing={0.5}
        fontSize={12}
        color='rgba(0, 0, 0, 0.6)'
      >
        {prompt?.type === 'private' ? (
          <LockOutlinedIcon fontSize='inherit' />
        ) : (
          <LanguageOutlinedIcon fontSize='inherit' />
        )}
        <Typography variant='caption' fontSize={12}>
          ·
        </Typography>
        <ProLink
          href={authorLink}
          target='_blank'
          underline='always'
          sx={{
            color: 'inherit',
          }}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          {author}
        </ProLink>
        {prompt.update_time && (
          <>
            <Typography variant='caption' fontSize={12}>
              ·
            </Typography>
            <Typography variant='caption' fontSize={12}>
              {dayjs.utc(prompt.update_time).fromNow()}
            </Typography>
          </>
        )}
      </Stack>

      <EllipsisTextWithTooltip
        variant={'custom'}
        color={'text.secondary'}
        fontSize={16}
        tip={prompt.teaser}
        sx={{
          whiteSpace: 'normal',
          wordBreak: 'break-word',
        }}
      >
        <PromptTypeList
          typeList={prompt.variable_types}
          variables={prompt.variables}
        />
        {prompt.teaser}
      </EllipsisTextWithTooltip>
      <Stack></Stack>
      {/* <Stack
        direction={'row'}
        alignItems={'center'}
        justifyContent={'flex-end'}
        spacing={1}
        mt={'auto !important'}
      >
        <Button
          href={`/prompts/${prompt.id}`}
          variant={'text'}
          color={'primary'}
          sx={{ fontWeight: 500, fontSize: 14 }}
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          Try this prompt
        </Button>
      </Stack> */}
    </Stack>
  );
};

const PromptCardTag: FC<{ tag: string }> = (props) => {
  const { tag } = props;
  return (
    <Box>
      <Typography
        variant={'custom'}
        sx={{
          borderRadius: '4px',
          display: 'inline-flex',
          bgcolor: 'rgb(235,235,235)',
          color: 'text.secondary',
          fontSize: '14px',
          lineHeight: '20px',
          px: 0.5,
        }}
      >
        {tag}
      </Typography>
    </Box>
  );
};

export { PromptCard, PromptCardTag };
