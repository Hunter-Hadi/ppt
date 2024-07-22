import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import IconButton, { IconButtonProps } from '@mui/material/IconButton'
import React, { FC } from 'react'

interface IMaxAICloseButtonProps extends IconButtonProps {
  iconFontSize?: 'inherit' | 'large' | 'medium' | 'small'
}

const MaxAICloseButton: FC<IMaxAICloseButtonProps> = ({
  iconFontSize = 'medium',
  ...iconButtonProps
}) => {
  return (
    <IconButton
      aria-label='close'
      sx={{
        position: 'absolute',
        top: 8,
        right: 8,
      }}
      {...iconButtonProps}
    >
      <CloseOutlinedIcon fontSize={iconFontSize} />
    </IconButton>
  )
}

export default MaxAICloseButton
