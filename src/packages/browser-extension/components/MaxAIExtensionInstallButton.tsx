import Button, { buttonClasses, ButtonProps } from '@mui/material/Button'
import { SxProps, useTheme } from '@mui/material/styles'
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon'
import useMediaQuery from '@mui/material/useMediaQuery'
import React, { FC, HTMLAttributeAnchorTarget, useMemo } from 'react'

import {
  CHROME_EXTENSION_INSTALL_LINK,
  EDGE_EXTENSION_INSTALL_LINK,
} from '@/packages/browser-extension/constants'
import { useMaxAITranslation } from '@/packages/common'
import useBrowserAgent from '@/packages/common/hooks/useBrowserAgent'

export interface IMaxAIExtensionInstallButtonProps {
  sx?: SxProps
  target?: HTMLAttributeAnchorTarget
  variant?: ButtonProps['variant']
  showAgent?: 'Edge' | 'Chrome'
  iconSize?: number
  text?: string

  // 是否开启 label 自适应长度（屏幕宽度变小，文本变短）
  adaptiveLabel?: boolean

  startIcon?: ButtonProps['startIcon']
  endIcon?: ButtonProps['endIcon']

  onClick?: (e: React.MouseEvent) => void
}

const MaxAIExtensionInstallButton: FC<IMaxAIExtensionInstallButtonProps> = ({
  sx,
  target = '_blank',
  variant = 'outlined',
  showAgent,
  iconSize = 32,
  text,
  adaptiveLabel = false,
  startIcon,
  endIcon,
  onClick,
}) => {
  const theme = useTheme()
  // const isDownSm = useMediaQuery(theme.breakpoints.down('sm')); // 屏幕宽度小于 768 时为 true
  const isDownLg = useMediaQuery(theme.breakpoints.down('lg')) // 屏幕宽度小于 1280 时为 true

  const { t } = useMaxAITranslation()

  const { browserAgent } = useBrowserAgent()

  const agent = showAgent ?? browserAgent

  const iconName = agent === 'Edge' ? 'EdgeColor' : 'ChromeColor'

  const label = useMemo(() => {
    if (text || text === '') {
      return text
    }

    if (adaptiveLabel && isDownLg) {
      return agent === 'Edge'
        ? t(
            'package__browser_extension:install_button__add_to_edge_for_free__mini',
          )
        : t(
            'package__browser_extension:install_button__add_to_chrome_for_free__mini',
          )
    }

    return agent === 'Edge'
      ? t('package__browser_extension:install_button__add_to_edge_for_free')
      : t('package__browser_extension:install_button__add_to_chrome_for_free')
  }, [agent, t, adaptiveLabel, isDownLg, text])

  const href = useMemo(() => {
    if (agent === 'Edge') {
      return EDGE_EXTENSION_INSTALL_LINK
    }

    return CHROME_EXTENSION_INSTALL_LINK
  }, [agent])

  const sxCache = useMemo(() => {
    return [
      {
        // width: { xs: '100%', sm: 300 },
        height: {
          xs: 48,
          sm: 56,
        },
        fontSize: {
          xs: 16,
          sm: 18,
        },
        fontWeight: 600,
        px: {
          xs: 1.5,
          lg: 3,
        },
        py: 1.5,
        borderRadius: 2,

        [`.${buttonClasses.startIcon}`]: {
          mr: label.length <= 0 ? 0 : 1.5,
        },
      },
      sx,
      adaptiveLabel
        ? {
            [`& .${buttonClasses.startIcon}`]: {
              display: {
                xs: 'none',
                sm: 'inherit',
              },
            },
          }
        : {},
    ]
  }, [sx, label, adaptiveLabel])

  const handleClick = (e: React.MouseEvent) => {
    onClick && onClick(e)
  }

  return (
    <Button
      component='a'
      href={href}
      target={target}
      startIcon={
        startIcon || startIcon === null ? (
          startIcon
        ) : iconName === 'EdgeColor' ? (
          <EdgeColor
            sx={{
              fontSize: `${iconSize}px !important`,
            }}
          />
        ) : (
          <ChromeColor
            sx={{
              fontSize: `${iconSize}px !important`,
            }}
          />
        )
      }
      endIcon={endIcon}
      variant={variant}
      sx={sxCache as SxProps}
      onClick={handleClick}
    >
      {label}
    </Button>
  )
}

// TODO: EdgeColor、ChromeColor 需要等 packages CustomIcon 实现后移出
const EdgeColor: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon viewBox='0 0 20 20' sx={props.sx}>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' fill='none'>
        <path
          d='M40.8701 34.2064C40.3089 34.4999 39.7302 34.7585 39.1372 34.9808C37.2497 35.687 35.2502 36.0468 33.2349 36.0429C25.4551 36.0429 18.6781 30.6914 18.6781 23.824C18.6881 22.9029 18.9437 22.0012 19.4186 21.2119C19.8934 20.4226 20.5703 19.7743 21.3794 19.334C14.3427 19.6299 12.5342 26.9626 12.5342 31.2586C12.5342 43.4051 23.7288 44.6365 26.1407 44.6365C27.4411 44.6365 29.4025 44.2584 30.5797 43.8868L30.7951 43.8145C35.325 42.2485 39.1867 39.1869 41.7447 35.1337C41.8231 35.0103 41.8581 34.8642 41.8441 34.7187C41.8302 34.5731 41.7682 34.4364 41.6679 34.33C41.5676 34.2237 41.4347 34.1538 41.2902 34.1314C41.1457 34.109 40.9979 34.1354 40.8701 34.2064Z'
          fill='url(#paint0_linear_5830_54282)'
        />
        <path
          opacity='0.35'
          d='M40.8701 34.2064C40.3089 34.4999 39.7302 34.7585 39.1372 34.9808C37.2497 35.687 35.2502 36.0468 33.2349 36.0429C25.4551 36.0429 18.6781 30.6914 18.6781 23.824C18.6881 22.9029 18.9437 22.0012 19.4186 21.2119C19.8934 20.4226 20.5703 19.7743 21.3794 19.334C14.3427 19.6299 12.5342 26.9626 12.5342 31.2586C12.5342 43.4051 23.7288 44.6365 26.1407 44.6365C27.4411 44.6365 29.4025 44.2584 30.5797 43.8868L30.7951 43.8145C35.325 42.2485 39.1867 39.1869 41.7447 35.1337C41.8231 35.0103 41.8581 34.8642 41.8441 34.7187C41.8302 34.5731 41.7682 34.4364 41.6679 34.33C41.5676 34.2237 41.4347 34.1538 41.2902 34.1314C41.1457 34.109 40.9979 34.1354 40.8701 34.2064Z'
          fill='url(#paint1_radial_5830_54282)'
        />
        <path
          d='M20.2632 42.5714C18.7968 41.6613 17.5259 40.4686 16.5245 39.0629C15.3832 37.4992 14.5978 35.7047 14.2234 33.8053C13.849 31.9059 13.8947 29.9476 14.3573 28.0677C14.8199 26.1878 15.6882 24.4319 16.9013 22.9232C18.1144 21.4144 19.6429 20.1893 21.3795 19.3338C21.8925 19.0922 22.7688 18.6548 23.9345 18.6762C24.7557 18.6822 25.5644 18.8783 26.2972 19.2491C27.03 19.6199 27.6669 20.1554 28.1581 20.8135C28.822 21.7 29.1881 22.774 29.2038 23.8814C29.2038 23.8469 33.2252 10.7944 16.051 10.7944C8.83349 10.7944 2.89832 17.6437 2.89832 23.6529C2.86985 26.8316 3.54999 29.9768 4.88931 32.8598C7.07814 37.5299 10.9058 41.2337 15.6454 43.2677C20.3851 45.3017 25.7066 45.5243 30.5996 43.8933C28.8864 44.4334 27.0764 44.5956 25.2944 44.3685C23.5125 44.1414 21.801 43.5305 20.278 42.578L20.2632 42.5714Z'
          fill='url(#paint2_linear_5830_54282)'
        />
        <path
          opacity='0.41'
          d='M20.2632 42.5714C18.7968 41.6613 17.5259 40.4686 16.5245 39.0629C15.3832 37.4992 14.5978 35.7047 14.2234 33.8053C13.849 31.9059 13.8947 29.9476 14.3573 28.0677C14.8199 26.1878 15.6882 24.4319 16.9013 22.9232C18.1144 21.4144 19.6429 20.1893 21.3795 19.3338C21.8925 19.0922 22.7688 18.6548 23.9345 18.6762C24.7557 18.6822 25.5644 18.8783 26.2972 19.2491C27.03 19.6199 27.6669 20.1554 28.1581 20.8135C28.822 21.7 29.1881 22.774 29.2038 23.8814C29.2038 23.8469 33.2252 10.7944 16.051 10.7944C8.83349 10.7944 2.89832 17.6437 2.89832 23.6529C2.86985 26.8316 3.54999 29.9768 4.88931 32.8598C7.07814 37.5299 10.9058 41.2337 15.6454 43.2677C20.3851 45.3017 25.7066 45.5243 30.5996 43.8933C28.8864 44.4334 27.0764 44.5956 25.2944 44.3685C23.5125 44.1414 21.801 43.5305 20.278 42.578L20.2632 42.5714Z'
          fill='url(#paint3_radial_5830_54282)'
        />
        <path
          d='M27.9243 27.3538C27.7911 27.5264 27.3818 27.7648 27.3818 28.2844C27.3818 28.7135 27.6613 29.1261 28.1578 29.473C30.522 31.1171 34.9791 30.9001 34.9906 30.9001C36.7424 30.8959 38.4611 30.4218 39.9673 29.5273C41.4868 28.6401 42.7478 27.371 43.6254 25.8459C44.503 24.3209 44.9666 22.5929 44.9702 20.8334C45.013 17.1489 43.655 14.6992 43.1058 13.6141C39.622 6.79939 32.1019 2.87988 23.9242 2.87988C18.3938 2.87934 13.0855 5.05583 9.14729 8.93864C5.20911 12.8214 2.95765 18.0984 2.87988 23.6283C2.9588 17.6208 8.93014 12.7691 16.0326 12.7691C16.608 12.7691 19.8896 12.825 22.9378 14.4247C25.6242 15.8353 27.0316 17.5386 28.0098 19.2271C29.0259 20.9813 29.2067 23.1976 29.2067 24.0804C29.2067 24.9633 28.7562 26.272 27.9243 27.3538Z'
          fill='url(#paint4_radial_5830_54282)'
        />
        <path
          d='M27.9243 27.3538C27.7911 27.5264 27.3818 27.7648 27.3818 28.2844C27.3818 28.7135 27.6613 29.1261 28.1578 29.473C30.522 31.1171 34.9791 30.9001 34.9906 30.9001C36.7424 30.8959 38.4611 30.4218 39.9673 29.5273C41.4868 28.6401 42.7478 27.371 43.6254 25.8459C44.503 24.3209 44.9666 22.5929 44.9702 20.8334C45.013 17.1489 43.655 14.6992 43.1058 13.6141C39.622 6.79939 32.1019 2.87988 23.9242 2.87988C18.3938 2.87934 13.0855 5.05583 9.14729 8.93864C5.20911 12.8214 2.95765 18.0984 2.87988 23.6283C2.9588 17.6208 8.93014 12.7691 16.0326 12.7691C16.608 12.7691 19.8896 12.825 22.9378 14.4247C25.6242 15.8353 27.0316 17.5386 28.0098 19.2271C29.0259 20.9813 29.2067 23.1976 29.2067 24.0804C29.2067 24.9633 28.7562 26.272 27.9243 27.3538Z'
          fill='url(#paint5_radial_5830_54282)'
        />
        <defs>
          <linearGradient
            id='paint0_linear_5830_54282'
            x1='12.5342'
            y1='31.9885'
            x2='41.8549'
            y2='31.9885'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#0C59A4' />
            <stop offset='1' stopColor='#114A8B' />
          </linearGradient>
          <radialGradient
            id='paint1_radial_5830_54282'
            cx='0'
            cy='0'
            r='1'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(28.7285 32.2196) scale(15.6813 14.8973)'
          >
            <stop offset='0.72' stopOpacity='0' />
            <stop offset='0.95' stopOpacity='0.53' />
            <stop offset='1' />
          </radialGradient>
          <linearGradient
            id='paint2_linear_5830_54282'
            x1='27.9921'
            y1='19.2697'
            x2='9.67855'
            y2='39.2175'
            gradientUnits='userSpaceOnUse'
          >
            <stop stopColor='#1B9DE2' />
            <stop offset='0.16' stopColor='#1595DF' />
            <stop offset='0.67' stopColor='#0680D7' />
            <stop offset='1' stopColor='#0078D4' />
          </linearGradient>
          <radialGradient
            id='paint3_radial_5830_54282'
            cx='0'
            cy='0'
            r='1'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(14.4866 35.5985) rotate(-81.3844) scale(23.5805 19.0507)'
          >
            <stop offset='0.76' stopOpacity='0' />
            <stop offset='0.95' stopOpacity='0.5' />
            <stop offset='1' />
          </radialGradient>
          <radialGradient
            id='paint4_radial_5830_54282'
            cx='0'
            cy='0'
            r='1'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(7.13191 10.6691) rotate(92.2906) scale(33.3079 70.939)'
          >
            <stop stopColor='#35C1F1' />
            <stop offset='0.11' stopColor='#34C1ED' />
            <stop offset='0.23' stopColor='#2FC2DF' />
            <stop offset='0.31' stopColor='#2BC3D2' />
            <stop offset='0.67' stopColor='#36C752' />
          </radialGradient>
          <radialGradient
            id='paint5_radial_5830_54282'
            cx='0'
            cy='0'
            r='1'
            gradientUnits='userSpaceOnUse'
            gradientTransform='translate(42.3499 15.6061) rotate(73.7398) scale(16.0036 13.0141)'
          >
            <stop stopColor='#66EB6E' />
            <stop offset='1' stopColor='#66EB6E' stopOpacity='0' />
          </radialGradient>
        </defs>
      </svg>
    </SvgIcon>
  )
}
const ChromeColor: FC<SvgIconProps> = (props) => {
  return (
    <SvgIcon viewBox='0 0 20 20' sx={props.sx}>
      <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 48 48' fill='none'>
        <path
          d='M23.9065 2.88415C23.9065 2.88415 36.3365 2.32467 42.9244 14.8163H22.8499C22.8499 14.8163 19.0589 14.6917 15.8267 19.2911C14.8949 21.2181 13.9007 23.207 15.0192 27.1218C13.4032 24.3878 6.44238 12.2685 6.44238 12.2685C6.44238 12.2685 11.3525 3.38103 23.9065 2.88415Z'
          fill='#DA4537'
        />
        <path
          d='M6.44238 12.2681C6.44238 12.2681 13.4032 24.3874 15.0192 27.1214C14.3881 24.9124 14.4296 23.3166 14.7531 21.9992L6.44238 12.2681Z'
          fill='#B63729'
        />
        <path
          d='M42.277 34.5998C42.277 34.5998 36.5452 45.6426 22.4326 45.1001C24.1738 42.0868 32.4721 27.7167 32.4721 27.7167C32.4721 27.7167 34.4757 24.4962 32.1104 19.3978C31.593 18.636 31.0716 17.8585 30.3309 17.141C29.3496 16.1905 27.9836 15.3454 25.7326 14.7814C28.9094 14.7502 42.8845 14.7835 42.8845 14.7835C42.8845 14.7835 48.1246 23.48 42.277 34.5998Z'
          fill='#FFCD3F'
        />
        <path
          d='M5.6251 34.6841C5.6251 34.6841 -1.07237 24.1973 6.45491 12.2476L16.4882 29.6352C16.4882 29.6352 18.2754 32.9804 23.874 33.4812C24.8832 33.4076 25.9112 33.3391 27.0139 32.9783C28.2439 32.5758 29.5667 31.8097 31.0599 30.2671C29.4991 33.0333 22.4814 45.1197 22.4814 45.1197C22.4814 45.1197 12.3303 45.309 5.6251 34.6841Z'
          fill='#0A9E58'
        />
        <path
          d='M14.4502 24.1729C14.4502 18.9793 18.6608 14.7681 23.8555 14.7681C29.0498 14.7681 33.26 18.9793 33.26 24.1729C33.26 29.368 29.0498 33.5786 23.8555 33.5786C18.6608 33.5786 14.4502 29.3682 14.4502 24.1729Z'
          fill='white'
        />
        <path
          d='M16.4795 24.1729C16.4795 20.1003 19.7815 16.7983 23.8545 16.7983C27.9263 16.7983 31.2289 20.1003 31.2289 24.1729C31.2289 28.246 27.9264 31.5479 23.8545 31.5479C19.7815 31.5479 16.4795 28.2459 16.4795 24.1729Z'
          fill='#577FC0'
        />
        <path
          d='M42.8842 14.7835C42.8842 14.7835 28.9092 14.7502 25.7324 14.7814C27.9834 15.3454 29.3494 16.1905 30.3307 17.141L42.8842 14.7835Z'
          fill='#E5A630'
        />
        <path
          d='M22.4814 45.1196C22.4814 45.1196 29.4991 33.0332 31.0599 30.2671C29.5668 31.8096 28.2439 32.5758 27.014 32.9782L22.4814 45.1196Z'
          fill='#109155'
        />
      </svg>
    </SvgIcon>
  )
}
export default MaxAIExtensionInstallButton
