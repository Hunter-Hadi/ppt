import { Box, Tooltip, TooltipProps, Typography } from '@mui/material';
/**
 * FunctionalityTooltip 做了统一的居上, 字体放大的tooltip
 * @param title tooltip的标题
 * @param children 子元素
 *
 *
 */
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
