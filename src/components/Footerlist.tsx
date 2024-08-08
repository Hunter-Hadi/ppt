import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { TFunction, useTranslation } from 'next-i18next'
import React, { FC } from 'react'

import ProLink from '@/components/ProLink'
import { GaContent, generateGaEvent } from '@/utils/gtag'

const FooterList: FC<{
  title: string
  data: {
    label: string | ((t: TFunction) => string)
    icon?: React.ReactNode
    link: string
    target?: React.HTMLAttributeAnchorTarget
    adaptiveLocale?: boolean
  }[]
}> = ({ title, data }) => {
  const { t } = useTranslation()
  return (
    <Box>
      <Typography
        variant='custom'
        component={'p'}
        mb={1.5}
        fontWeight={600}
        fontSize={16}
      >
        {title}
      </Typography>
      <Stack spacing={1.5}>
        {data.map(({ label, icon, link, target, adaptiveLocale }) => {
          const labelNode = typeof label === 'function' ? label(t) : label
          return (
            <GaContent
              boxClickAutoSend
              gaEvent={generateGaEvent('click', 'footer_link', {
                type: title,
                value: label,
                link: link,
              })}
              key={link + label}
            >
              <Stack
                direction={'row'}
                spacing={1.5}
                component='span'
                alignItems='center'
                key={link}
              >
                {icon && (
                  <Box height={24} color={'text.main'}>
                    {icon}
                  </Box>
                )}
                <ProLink
                  href={link}
                  underline='hover'
                  sx={{ display: 'inline-block' }}
                  target={target}
                  hardRefresh
                  muiLinkProps={{ title: labelNode ?? '' }}
                  adaptiveLocale={adaptiveLocale}
                >
                  <Typography
                    variant='custom'
                    component='span'
                    color='text.primary'
                    fontSize={14}
                    lineHeight={1.5}
                  >
                    {labelNode}
                  </Typography>
                </ProLink>
              </Stack>
            </GaContent>
          )
        })}
      </Stack>
    </Box>
  )
}

export default FooterList
