import { Box, Stack, Typography } from '@mui/material'
import React, { FC } from 'react'

import ProLink from '@/components/ProLink'
import { GaContent, generateGaEvent } from '@/utils/gtag'

const FooterList: FC<{
  title: string
  data: {
    label: string
    icon?: React.ReactNode
    link: string
    target?: React.HTMLAttributeAnchorTarget
  }[]
}> = ({ title, data }) => {
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
        {data.map(({ label, icon, link, target }) => (
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
                muiLinkProps={{ title: label ?? '' }}
              >
                <Typography
                  variant='custom'
                  component='span'
                  color='text.primary'
                  fontSize={14}
                  lineHeight={1.5}
                >
                  {label}
                </Typography>
              </ProLink>
            </Stack>
          </GaContent>
        ))}
      </Stack>
    </Box>
  )
}

export default FooterList
