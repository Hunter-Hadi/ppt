import { Box, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React from 'react'

import AppDefaultSeoLayout from '@/app_layout/AppDefaultSeoLayout'

import LanguageSelectorList from './components/LanguageSelectorList'

const LanguagesPages = () => {
  const { t } = useTranslation()

  return (
    <Box pt={5} pb={10}>
      <AppDefaultSeoLayout />
      <Box maxWidth={1312} mx='auto' px={4}>
        <Typography variant='h1' mb={4}>
          {t('pages:languages__title')}
        </Typography>
        <LanguageSelectorList />
      </Box>
    </Box>
  )
}

export default LanguagesPages
