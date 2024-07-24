import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { SxProps } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'
import React, { FC } from 'react'

import ComparisonTable from './ComparisonTable'

interface IProps {
  sx?: SxProps
}

const ProductComparisonTable: FC<IProps> = ({ sx }) => {
  const { t } = useTranslation()
  return (
    <Stack sx={sx} spacing={8}>
      <Stack
        justifyContent={'center'}
        alignItems='center'
        maxWidth={800}
        mx='auto'
      >
        <Typography
          variant='custom'
          fontSize={48}
          lineHeight={1.5}
          fontWeight={700}
          component='h2'
        >
          {t('pricing:ab_test_v5__product_comparison_table__title')}
        </Typography>
        <Typography
          variant='custom'
          fontSize={18}
          lineHeight={1.5}
          textAlign='center'
        >
          {t('pricing:ab_test_v5__product_comparison_table__description')}
        </Typography>
      </Stack>

      <Box
        sx={{
          maxWidth: 1250,
          overflow: 'auto',
        }}
      >
        <ComparisonTable
          sx={{
            width: {
              xs: 1250,
              md: 'unset',
            },
          }}
        />
      </Box>
    </Stack>
  )
}

export default ProductComparisonTable
