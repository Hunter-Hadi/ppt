import { Box, Tooltip, TooltipProps, Typography } from '@mui/material';

export const FunctionalityTooltip = ({
  title,
  children,
  ...props
}: { title: string } & TooltipProps) => {
  return (
    <Tooltip
      title={
        title ? <Typography variant='subtitle1'>{title}</Typography> : null
      }
      arrow
      placement='top'
      {...props}
    >
      <Box>{children}</Box>
    </Tooltip>
  );
};
