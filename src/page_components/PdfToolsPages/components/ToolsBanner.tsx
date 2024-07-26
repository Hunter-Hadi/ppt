import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'
import React from 'react'
import { FC } from 'react'

interface IToolsBannerProps {
  title: string
  description: string
  isSimplicityView?: boolean
}

const ToolsBanner: FC<IToolsBannerProps> = ({
  title,
  description,
  isSimplicityView,
}) => {
  const { t } = useTranslation()
  if (isSimplicityView) {
    return (
      <Stack
        flexDirection='row'
        alignItems='end'
        sx={{
          width: '100%',
          pt: 1,
          pb: 1,
          maxWidth: 1312,
          margin: '0 auto',
        }}
      >
        <Typography
          component='h1'
          variant='custom'
          sx={{
            fontSize: {
              xs: 16,
              lg: 16,
            },
            color: 'text.primary',
          }}
        >
          {t(title)}
        </Typography>

        <Typography
          sx={{
            fontSize: {
              xs: 10,
              lg: 12,
            },
            color: 'text.secondary',
          }}
        >
          {t(description)}
        </Typography>
      </Stack>
    )
  }
  return (
    <Box
      sx={{
        pt: {
          xs: 6,
          md: 6,
        },
        pb: {
          xs: 2,
          md: 5,
        },
        maxWidth: 1312,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography
        component='h1'
        variant='custom'
        sx={{
          fontSize: {
            xs: 30,
            lg: 36,
          },
          color: 'text.primary',
        }}
      >
        {t(title)}
      </Typography>

      <Typography
        sx={{
          fontSize: {
            xs: 14,
            lg: 16,
          },
          color: 'text.secondary',
        }}
        mt='24px'
      >
        {t(description)}
      </Typography>
    </Box>
  )
}

export default ToolsBanner
