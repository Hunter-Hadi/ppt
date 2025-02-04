import { Box, Typography } from '@mui/material'
import Button from '@mui/material/Button'
import React from 'react'
import { FC, useEffect, useMemo, useState } from 'react'

import { SIGN_TYPING_FONT_FAMILY_LIST } from '../../constants'
import FunctionalityCommonButtonPopover from './FunctionalityCommonButtonPopover'
interface IFunctionalityCommonColorButtonPopoverProps {
  currentFont?: string
  optionShowTitle?: string
  onSelectedFont: (fonts: string) => void
  isShowFontsName?: boolean
  fontSize?: number
  fontsList?: string[]
  title?: React.ReactNode
}
/**
 * 用于选择字体的弹出式按钮
 */
const FunctionalityCommonFontsButtonPopover: FC<
  IFunctionalityCommonColorButtonPopoverProps
> = ({
  onSelectedFont,
  optionShowTitle,
  currentFont,
  fontSize,
  fontsList,
  title,
}) => {
  const defaultAndCustomFontsList = useMemo(
    () => [...(fontsList || []), ...SIGN_TYPING_FONT_FAMILY_LIST],
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
        variant: 'outlined',
      }}
      popoverView={
        <Box>
          {defaultAndCustomFontsList.map((fonts) => (
            <Box key={fonts}>
              <Button
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
      <Box>
        <Typography
          color='text.secondary'
          sx={{
            fontWeight: 'bold',
            fontSize: {
              xs: 12,
              lg: 16,
            },
          }}
        >
          {title || newCurrentFont}
        </Typography>
      </Box>
    </FunctionalityCommonButtonPopover>
  )
}
export default FunctionalityCommonFontsButtonPopover
