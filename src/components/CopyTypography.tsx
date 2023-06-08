import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Button, Stack, SxProps, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import { TypographyProps } from '@mui/material/Typography';
import React, { FC, useCallback, useState } from 'react';
// @ts-ignore
import { CopyToClipboard } from 'react-copy-to-clipboard';

import { GaContent, gaEvent, generateGaEvent } from '@/utils/gtag';

export interface ICopyTypographyProps extends TypographyProps {
  text: string;
  onCopy?: () => void;
  options?: {
    debug?: boolean; // Boolean. Optional. Enable output to console.
    message?: string; // String. Optional. Prompt message. *
    format?: string; // String. Optional. Set the MIME type of what you want to copy as. Use text/html to copy as HTML, text/plain to avoid inherited styles showing when pasted into rich text editor.
    feedbackType?: 'tooltip' | 'cover'; //Feedback type after successful copy
  };
  sx?: SxProps;
  justifyContent?: 'center' | 'space-between';
}
const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.common.black,
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.common.black,
  },
}));
const CopyTypography: FC<
  ICopyTypographyProps & { buttonText?: string; wrapperMode?: boolean }
> = ({
  text,
  onCopy,
  options,
  buttonText,
  children,
  sx,
  justifyContent = 'center',
  wrapperMode = false,
  ...props
}) => {
  const [openTooltip, setOpenTooltip] = useState(false);
  const {
    debug = false,
    message = 'Copied!',
    format = 'text/plain',
    feedbackType = 'tooltip',
  } = options || {};
  const handleOpenTooltip = () => {
    setOpenTooltip(true);
    setTimeout(() => {
      setOpenTooltip(false);
    }, 2500);
  };

  const handleOnCopy = useCallback(() => {
    onCopy && onCopy();
    handleOpenTooltip();
    gaEvent(
      generateGaEvent('click', 'copy', {
        value: text,
      }),
    );
  }, [onCopy, text]);

  const renderWithFeedback = useCallback(() => {
    if (wrapperMode) {
      return (
        <BootstrapTooltip
          title={
            <Typography fontSize={16} variant={'body1'}>
              {message}
            </Typography>
          }
          placement={'top'}
          open={openTooltip}
        >
          {children as any}
        </BootstrapTooltip>
      );
    }
    if (feedbackType === 'tooltip') {
      return (
        <BootstrapTooltip
          title={
            <Typography fontSize={16} variant={'body1'}>
              {message}
            </Typography>
          }
          placement={'top'}
          open={openTooltip}
        >
          <Button variant={'text'} sx={{ py: 0, px: 1, ...sx }}>
            <GaContent
              gaEvent={generateGaEvent('click', 'copy', {
                value: text,
              })}
            >
              <Typography component={'div'} {...(props as any)}>
                <Stack direction={'row'} gap={1} alignItems={'center'}>
                  {children}
                  {buttonText ? (
                    <Button
                      variant={'contained'}
                      disableElevation
                      sx={{ px: 4 }}
                    >
                      <span>{buttonText}</span>
                    </Button>
                  ) : (
                    <ContentCopyIcon fontSize={'inherit'} />
                  )}
                </Stack>
              </Typography>
            </GaContent>
          </Button>
        </BootstrapTooltip>
      );
    }

    if (feedbackType === 'cover') {
      return (
        <Button variant={'text'} sx={{ py: 0, px: 1, ...sx }}>
          <GaContent
            gaEvent={generateGaEvent('click', 'copy', {
              value: text,
            })}
          >
            <Typography {...props}>
              <Stack
                direction={'row'}
                gap={1}
                alignItems={'center'}
                justifyContent={justifyContent}
              >
                {!openTooltip ? (
                  children
                ) : (
                  <Typography color='text.secondary'>
                    Copied to clipboard
                  </Typography>
                )}
                {buttonText ? (
                  <Button variant={'contained'} disableElevation sx={{ px: 4 }}>
                    <span>{buttonText}</span>
                  </Button>
                ) : (
                  <ContentCopyIcon fontSize={'inherit'} />
                )}
              </Stack>
            </Typography>
          </GaContent>
        </Button>
      );
    }
  }, [openTooltip, message, props, text, children, wrapperMode]);
  return (
    <CopyToClipboard
      text={text}
      onCopy={handleOnCopy}
      options={{ debug, message: '', format }}
    >
      {renderWithFeedback()}
    </CopyToClipboard>
  );
};
export default CopyTypography;
