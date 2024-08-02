import { Box, Typography } from '@mui/material'
import Button, { ButtonProps } from '@mui/material/Button'
import React from 'react'
import { FC, useEffect, useMemo, useState } from 'react'

import FunctionalityCommonButtonPopover from './FunctionalityCommonButtonPopover'
interface IFunctionalitySignPdfColorButtonPopoverProps {
  currentFont?: string
  optionShowTitle?: string
  onSelectedFont: (fonts: string) => void
  isShowFontsName?: boolean
  fontSize?: number
  fontsList?: string[]
  title?: React.ReactNode
  buttonProps?: ButtonProps
  children?: React.ReactNode
}
/**
 * 用于选择字体的弹出式按钮
 */
const FunctionalityCommonFontsButtonPopover: FC<
  IFunctionalitySignPdfColorButtonPopoverProps
> = ({
  onSelectedFont,
  optionShowTitle,
  currentFont,
  fontSize,
  fontsList,
  title,
  buttonProps,
  children,
}) => {
  const defaultAndCustomFontsList = useMemo(
    () => [...(fontsList || [])],
    [fontsList],
  )
  const [newCurrentFont, setNewCurrentFont] = useState(
    defaultAndCustomFontsList[0],
  )

  const handleColorSelect = (fonts) => {
    onSelectedFont(fonts)
    setNewCurrentFont(fonts)
  }
  useEffect(() => {
    if (currentFont) {
      setNewCurrentFont(currentFont)
    }
  }, [currentFont])
  return (
    <FunctionalityCommonButtonPopover
      buttonProps={{
        sx: {
          borderRadius: 0,
        },
        ...buttonProps,
      }}
      popoverView={
        <Box>
          {defaultAndCustomFontsList.map((fonts) => (
            <Box key={fonts}>
              <Button
                size='small'
                sx={{
                  width: '100%',
                  bgcolor: newCurrentFont === fonts ? '#d1d5db' : 'transparent',
                }}
                onClick={() => handleColorSelect(fonts)}
              >
                <Typography
                  color={'text.primary'}
                  sx={{
                    fontWeight: 'bold',
                    fontFamily: fonts,
                    fontSize: {
                      xs: fontSize || 25,
                      lg: fontSize || 25,
                    },
                  }}
                >
                  {optionShowTitle || fonts}
                </Typography>
              </Button>
            </Box>
          ))}
        </Box>
      }
    >
      {children}
    </FunctionalityCommonButtonPopover>
  )
}
export default FunctionalityCommonFontsButtonPopover
