import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Popover from '@mui/material/Popover';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'next-i18next';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { ContextMenuIcon } from '@/features/share_conversation/components/ContextMenuIcon';
import TooltipIconButton from '@/features/share_conversation/components/TooltipIconButton';
import { IAIResponseMessage } from '@/features/share_conversation/types';
import {
  formatAIMessageContent,
  formatAIMessageContentForClipboard,
} from '@/features/share_conversation/utils/chatMessagesHelper';
import { findSelectorParent } from '@/features/share_conversation/utils/socialMedia/platforms/utils';

const SidebarCopyButton: FC<{
  message: IAIResponseMessage;
  onCopy?: () => void;
}> = (props) => {
  const { message, onCopy } = props;
  const { t } = useTranslation();
  const memoCopyText = useMemo(() => {
    return formatAIMessageContent(message);
  }, [message]);
  const copyButtonRef = useRef<HTMLButtonElement>(null);
  const [isHover, setIsHover] = useState(false);
  const [delayIsHover, setDelayIsHover] = useState(false);
  const [copyButtonKey, setCopyButtonKey] = useState('');
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null,
  );
  // 防止误触
  const mouseHoverTimer = useRef<ReturnType<typeof setTimeout>>();
  // 复制文本
  const copyTextWithStyles = async (buttonKey: string): Promise<void> => {
    const button = copyButtonRef.current as HTMLButtonElement;
    if (!button) {
      return;
    }
    const rootElement = findSelectorParent('.markdown-body', button);
    if (!rootElement) {
      return;
    }
    formatAIMessageContentForClipboard(message, rootElement);
    handleAfterCopy(buttonKey);
  };
  // 复制后需要更新icon和tooltip
  const copySuccessTimer = useRef<ReturnType<typeof setTimeout>>();
  const handleAfterCopy = (buttonKey: string) => {
    clearTimeout(copySuccessTimer.current);
    onCopy?.();
    setCopyButtonKey(buttonKey);
    copySuccessTimer.current = setTimeout(() => {
      setCopyButtonKey('');
    }, 1000);
  };
  useEffect(() => {
    if (isHover) {
      // delay 250ms
      const timer = setTimeout(() => {
        setDelayIsHover(isHover);
      }, 250);
      return () => {
        clearTimeout(timer);
      };
    } else {
      setDelayIsHover(false);
      clearTimeout(copySuccessTimer.current);
      setCopyButtonKey('');
      return () => {};
    }
  }, [isHover]);
  return (
    <React.Fragment>
      <Button
        ref={copyButtonRef}
        sx={{
          minWidth: 'unset',
          p: '5px',
          color: 'text.secondary',
        }}
        onMouseEnter={(event) => {
          setAnchorEl(event.currentTarget);
          mouseHoverTimer.current = setTimeout(() => {
            setIsHover(true);
          }, 100);
        }}
        onMouseLeave={() => {
          clearTimeout(mouseHoverTimer.current);
        }}
      >
        <Stack direction={'row'} alignItems={'center'}>
          <ContentCopyIcon sx={{ fontSize: '16px' }} />
          <ContextMenuIcon
            icon={'ExpandMore'}
            sx={{
              fontSize: '12px',
              transition: 'all 0.2s ease-in-out',
              transform: isHover ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </Stack>
      </Button>
      <Popover
        disableScrollLock
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        className='popper'
        // Note: The following zIndex style is specifically for documentation purposes and may not be necessary in your application.
        open={isHover}
        anchorEl={anchorEl}
        sx={{
          zIndex: 1200,
        }}
        PaperProps={{
          onMouseLeave: () => {
            setIsHover(false);
          },
        }}
      >
        <List
          sx={{
            py: 0,
          }}
        >
          <ListItem
            disablePadding
            sx={{
              '& > div': {
                width: '100%',
              },
            }}
          >
            <TooltipIconButton
              onClick={() => copyTextWithStyles('copy_with_formatting')}
              TooltipProps={{
                placement: 'right',
                disableInteractive: true,
                arrow: true,
              }}
              title={
                delayIsHover
                  ? copyButtonKey === 'copy_with_formatting'
                    ? t('common:copied')
                    : t('common:copy_to_clipboard')
                  : ''
              }
              sx={{
                width: '100%',
                color: 'text.primary',
                borderRadius: '4px',
              }}
              data-testid='ai-message-tools__copy-with-formatting'
            >
              <Stack
                direction={'row'}
                alignItems={'center'}
                gap={1}
                sx={{
                  width: '100%',
                }}
              >
                <ContextMenuIcon
                  icon={
                    copyButtonKey === 'copy_with_formatting'
                      ? 'Done'
                      : 'CopyTextOnly'
                  }
                  sx={{ fontSize: '16px' }}
                />
                <Typography fontSize={'16px'}>
                  {t('common:copy_with_formatting')}
                </Typography>
              </Stack>
            </TooltipIconButton>
          </ListItem>
          <ListItem
            disablePadding
            sx={{
              '& > div': {
                width: '100%',
              },
            }}
          >
            {/*NOTE: 因为消失的时候tooltip会有残影，所以要放个假按钮*/}
            {isHover ? (
              <CopyToClipboard
                text={memoCopyText}
                options={{
                  message: 'Copied!',
                  format: 'text/plain',
                }}
                onCopy={() => {
                  handleAfterCopy('copy_as_plain_text');
                }}
              >
                <TooltipIconButton
                  TooltipProps={{
                    placement: 'right',
                    arrow: true,
                    disableInteractive: true,
                  }}
                  title={
                    delayIsHover
                      ? copyButtonKey === 'copy_as_plain_text'
                        ? t('common:copied')
                        : t('common:copy_to_clipboard')
                      : ''
                  }
                  sx={{
                    width: '100%',
                    color: 'text.primary',
                    borderRadius: '4px',
                  }}
                  data-testid='ai-message-tools__copy-as-plain-text'
                >
                  <Stack
                    direction={'row'}
                    alignItems={'center'}
                    gap={1}
                    sx={{
                      width: '100%',
                    }}
                  >
                    <ContextMenuIcon
                      icon={
                        copyButtonKey === 'copy_as_plain_text' ? 'Done' : 'Copy'
                      }
                      sx={{ fontSize: '16px' }}
                    />
                    <Typography fontSize={'16px'}>
                      {t('common:copy_as_plain_text')}
                    </Typography>
                  </Stack>
                </TooltipIconButton>
              </CopyToClipboard>
            ) : (
              <Button
                sx={{
                  height: '40px',
                  width: '100%',
                  color: 'text.primary',
                  borderRadius: '4px',
                }}
              >
                <Stack
                  direction={'row'}
                  alignItems={'center'}
                  gap={1}
                  sx={{
                    width: '100%',
                  }}
                >
                  <ContextMenuIcon icon={'Copy'} sx={{ fontSize: '16px' }} />
                  <Typography fontSize={'16px'}>
                    {t('common:copy_as_plain_text')}
                  </Typography>
                </Stack>
              </Button>
            )}
          </ListItem>
        </List>
      </Popover>
    </React.Fragment>
  );
};
export default SidebarCopyButton;
