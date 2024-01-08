import { Tooltip, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { tooltipClasses, TooltipProps } from '@mui/material/Tooltip';
import { TypographyProps } from '@mui/material/Typography';
import React, { FC } from 'react';

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.tooltip}`]: {
    padding: '8px',
    backgroundColor: 'rgba(0, 0, 0, 0.87)',
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: 'rgba(0, 0, 0, 0.87)',
  },
}));

export interface IWikiTextProps {
  text: React.ReactNode;
  wiki: TooltipProps['title'] | string;
  textProps?: TypographyProps<'span'>;
  tooltipProps?: Omit<TooltipProps, 'children' | 'title'>;
}

const WikiText: FC<IWikiTextProps> = (props) => {
  const { textProps, wiki, text, tooltipProps } = props;
  return (
    <StyledTooltip
      placement={'top'}
      title={
        typeof wiki === 'string' ? (
          <Typography variant={'custom'} fontSize={14}>
            {wiki}
          </Typography>
        ) : (
          wiki
        )
      }
      arrow
      {...tooltipProps}
    >
      <Typography
        component={'span'}
        color={'inherit'}
        fontSize={'inherit'}
        fontWeight={'inherit'}
        {...textProps}
        sx={{
          ...textProps?.sx,
          cursor: 'pointer',
          borderImageSlice: 1,
          borderWidth: 0,
          borderBottom: '1px solid',
          borderImageSource:
            'repeating-linear-gradient(90deg,rgba(31,35,41,.6),rgba(31,35,41,.6) 2px,transparent 0,transparent 4px)',
          '&:hover': {
            color: 'primary.main',
          },
        }}
      >
        {text}
      </Typography>
    </StyledTooltip>
  );
};
export default WikiText;
