import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined'
import { Box, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { FC } from 'react'

import { useLanguages } from '@/i18n/hooks/useLanguages'
import LanguageSelectorList from '@/page_components/LanguagesPages/components/LanguageSelectorList'

import PopperMenuItem from './components/PopperMenuItem'

interface IProps {
  isSmallScreen?: boolean
}

const LanguageItem: FC<IProps> = ({ isSmallScreen }) => {
  const { t } = useTranslation()
  const { languageLabel, routerToLanguagesPagesLink } = useLanguages()

  const labelContent = (
    <Stack
      direction='row'
      alignItems='center'
      sx={{
        width: '100%',
        color: 'text.primary',
        fontSize: 16,
        lineHeight: 1.5,
        fontWeight: 500,
      }}
    >
      <LanguageOutlinedIcon
        sx={{
          fontSize: 20,
        }}
      />

      <Typography variant='custom' fontSize={'inherit'} ml={0.4}>
        {languageLabel}
      </Typography>
    </Stack>
  )

  return (
    <PopperMenuItem
      isSmallScreen={isSmallScreen}
      LabelContent={labelContent}
      SmallScreenContent={
        <Box px={2} py={1}>
          <Typography variant='h5' component={'p'} mb={2} fontWeight={900}>
            {t('pages:languages__title')}
          </Typography>
          <LanguageSelectorList
            containerProps={{
              sx: {
                pl: 2,
              },
            }}
            itemBreakpoints={{
              xs: 6,
              sm: 3,
            }}
          />
        </Box>
      }
      popperSx={{
        maxWidth: 1090,
        width: '100%',
      }}
      paperSx={{
        p: 4,
      }}
      BigScreenContent={
        <Box>
          <Typography variant='h5' component={'p'} mb={3} fontWeight={900}>
            {t('pages:languages__title')}
          </Typography>
          <LanguageSelectorList
            itemBreakpoints={{
              md: 2,
            }}
          />
        </Box>
      }
    />
  )
}

export default LanguageItem
