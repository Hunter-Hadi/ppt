import LoadingButton from '@mui/lab/LoadingButton'
import MuiAppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Toolbar from '@mui/material/Toolbar'
import debounce from 'lodash-es/debounce'
import React, { FC, useEffect, useMemo } from 'react'
import { useRecoilValue } from 'recoil'

import AuthAvatar, {
  IAuthAvatarProps,
} from '@/packages/auth/components/AuthAvatar'
import { useConnectMaxAIAccount } from '@/packages/auth/hooks/useConnectMaxAIAccount'
import { UserProfileState } from '@/packages/auth/store'
import AppLogo, { IAppLogoProps } from '@/packages/base-ui/components/AppLogo'
import MaxAIExtensionInstallButton, {
  IMaxAIExtensionInstallButtonProps,
} from '@/packages/browser-extension/components/MaxAIExtensionInstallButton'
import { useMaxAITranslation } from '@/packages/common'

interface IAppBarProps {
  hidden?: boolean // 隐藏 AppBar
  onHeightChange?: (height: number) => void // 当 AppBar 高度变化时触发
  maxWidth?: number | string // 最大宽度 默认值 1312
  MenuListComponents?: React.ReactNode // 菜单列表组件插槽
  CtaContentComponents?: React.ReactNode // 最右侧 CTAButton 内容组件插槽，如果传入 null 则不显示，不传则显示默认的 CTAButton 组件
  CtaInstallButtonProps?: IMaxAIExtensionInstallButtonProps //默认的 CTAButton 组件 Props
  hiddenSignInButton?: boolean // 隐藏登录按钮
  hiddenAvatar?: boolean // 隐藏头像
  AvatarProps?: IAuthAvatarProps // 头像组件 Props
  AppLogoProps?: IAppLogoProps // AppLogo 组件 Props
  BeforeLogoComponents?: React.ReactNode // logo 左侧的组件插槽
}

const AppBar: FC<IAppBarProps> = ({
  hidden = false,
  maxWidth = 1312,
  hiddenSignInButton = false,
  MenuListComponents,
  CtaContentComponents: propCtaContentComponents,
  CtaInstallButtonProps,
  hiddenAvatar,
  AvatarProps,
  AppLogoProps,
  onHeightChange,
  BeforeLogoComponents,
}) => {
  const { t } = useMaxAITranslation()
  const headerRef = React.useRef<HTMLDivElement>(null)
  const {
    connectMaxAIAccount,
    isLogin,
    loading: connectMaxAIAccountLoading,
  } = useConnectMaxAIAccount()
  const { loading: userProfileLoading, user: userProfile } =
    useRecoilValue(UserProfileState)

  const showAvatar = useMemo(() => {
    if (hiddenAvatar) {
      return false
    }

    return isLogin && userProfile
  }, [hiddenAvatar, isLogin, userProfile])

  const CtaContentComponents = useMemo(() => {
    if (propCtaContentComponents) {
      return propCtaContentComponents
    }

    if (propCtaContentComponents === null) {
      return null
    }

    return (
      <MaxAIExtensionInstallButton
        variant='contained'
        adaptiveLabel
        {...CtaInstallButtonProps}
      />
    )
  }, [CtaInstallButtonProps, propCtaContentComponents])

  useEffect(() => {
    const headerElement = headerRef.current

    if (!headerElement) {
      return
    }

    if (!onHeightChange || hidden) {
      return
    }

    // 监听 元素 变化, 触发 onHeightChange
    const resizeHandle = debounce(() => {
      if (headerElement) {
        console.log(`headerElement.offsetHeight`, headerElement.offsetHeight)
        onHeightChange(headerElement.offsetHeight)
      }
    }, 200)

    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (entry.target === headerElement) {
          resizeHandle()
        }
      }
    })

    resizeHandle()

    resizeObserver.observe(headerElement)

    return () => {
      resizeObserver.unobserve(headerElement)
      resizeObserver.disconnect()
    }
  }, [onHeightChange, hidden])

  if (hidden) {
    return null
  }

  return (
    <MuiAppBar
      id={'app-header'}
      ref={headerRef}
      component={'header'}
      position={'sticky'}
      sx={{
        bgcolor: 'background.paper',
        zIndex: (t) => t.zIndex.drawer + 10,
        boxShadow: (t) => (t.palette.mode === 'dark' ? 1 : 'none'),
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          boxSizing: 'border-box',
          color: 'text.primary',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxWidth: maxWidth,
          mx: 'auto',
          px: 2,
          py: {
            xs: 1,
            sm: 2,
          },
        }}
      >
        {BeforeLogoComponents}
        <AppLogo
          {...AppLogoProps}
          sx={{
            pb: '2px',
            pr: 2.5,
            ...AppLogoProps?.sx,
          }}
        />
        {MenuListComponents}
        {!showAvatar && !hiddenSignInButton ? (
          <LoadingButton
            loading={connectMaxAIAccountLoading || userProfileLoading}
            onClick={connectMaxAIAccount}
            sx={{
              fontSize: 16,
              lineHeight: 1.5,
              fontWeight: 500,
              color: 'text.primary',
              mr: CtaContentComponents ? 1.5 : 0,
            }}
          >
            {t('package__base_ui:app_bar__sign_in')}
          </LoadingButton>
        ) : null}
        {showAvatar && (
          <Box mr={CtaContentComponents ? 1.5 : 0}>
            <AuthAvatar {...AvatarProps} />
          </Box>
        )}
        {CtaContentComponents}
      </Toolbar>
      <Divider />
    </MuiAppBar>
  )
}

export default AppBar
