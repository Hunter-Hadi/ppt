import Stack from '@mui/material/Stack'
import { SxProps, useTheme } from '@mui/material/styles'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'
import useMediaQuery from '@mui/material/useMediaQuery'
import React, { FC } from 'react'

import ProLink from '@/packages/base-ui/components/ProLink'

export interface IAppLogoProps {
  sx?: SxProps
  href?: string
}

const AppLogo: FC<IAppLogoProps> = ({ sx, href = '/' }) => {
  const theme = useTheme()
  const isDownSm = useMediaQuery(theme.breakpoints.down('sm')) // 屏幕宽度小于 768 时为 true

  return (
    <ProLink href={href} target={'_self'} sx={sx}>
      <Stack direction={'row'} alignItems={'center'} gap={1}>
        <LogoSvg
          sx={{
            width: isDownSm ? 24 : 32,
            height: isDownSm ? 24 : 32,
          }}
        />
        <Typography
          variant='custom'
          color='text.primary'
          fontSize={isDownSm ? 16 : 20}
          fontWeight={800}
        >
          MaxAI.me
        </Typography>
      </Stack>
    </ProLink>
  )
}

const LogoSvg: FC<{ sx?: SxProps }> = ({ sx }) => {
  return (
    <SvgIcon sx={sx}>
      <svg viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <mask
          id='mask0_6397_8221'
          style={{
            maskType: 'alpha',
          }}
          maskUnits='userSpaceOnUse'
          x='0'
          y='0'
          width='32'
          height='32'
        >
          <rect width='32' height='32' fill='#D9D9D9' />
        </mask>
        <g mask='url(#mask0_6397_8221)'>
          <path
            d='M25.3335 11.9997L23.6668 8.33301L20.0002 6.66634L23.6668 4.99967L25.3335 1.33301L27.0002 4.99967L30.6668 6.66634L27.0002 8.33301L25.3335 11.9997ZM25.3335 30.6663L23.6668 26.9997L20.0002 25.333L23.6668 23.6663L25.3335 19.9997L27.0002 23.6663L30.6668 25.333L27.0002 26.9997L25.3335 30.6663ZM12.0002 26.6663L8.66683 19.333L1.3335 15.9997L8.66683 12.6663L12.0002 5.33301L15.3335 12.6663L22.6668 15.9997L15.3335 19.333L12.0002 26.6663Z'
            fill='#9065B0'
          />
        </g>
      </svg>
    </SvgIcon>
  )
}

export default AppLogo
