import CircularProgress from '@mui/material/CircularProgress'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import React, { FC } from 'react'

import TextOnlyTooltip, {
  TextOnlyTooltipProps,
} from '@/features/share_conversation/components/TextOnlyTooltip'

interface ITooltipIconButton extends Omit<IconButtonProps, 'title'> {
  title: React.ReactNode | string
  placement?: TextOnlyTooltipProps['placement']
  TooltipProps?: Omit<TextOnlyTooltipProps, 'children' | 'title'>
  loading?: boolean
}
const TooltipIconButton: FC<ITooltipIconButton> = (props) => {
  const {
    title,
    placement,
    TooltipProps,
    loading = false,
    children,
    ...iconButtonProps
  } = props
  return (
    <TextOnlyTooltip
      placement={placement || 'top'}
      title={title}
      PopperProps={{
        sx: {},
      }}
      {...TooltipProps}
    >
      <div>
        <IconButton {...iconButtonProps}>
          {loading ? (
            <CircularProgress size={16} sx={{ m: '0 auto' }} />
          ) : (
            children
          )}
        </IconButton>
      </div>
    </TextOnlyTooltip>
  )
}
export default TooltipIconButton
