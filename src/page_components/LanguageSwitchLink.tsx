import { Link as MuiLink, LinkProps as MuiLinkProps } from '@mui/material'
import { cloneDeep } from 'lodash-es'
import { useRouter } from 'next/router'
import React, { FC, useMemo } from 'react'

import { objectToQueryString } from '@/features/common/utils/dataHelper/objectHelper'
import { SUPPORT_PROXY_BASE_PATHS } from '@/global_constants'
import { removeLocaleInPathname } from '@/i18n/utils'
import { I18nTypes } from '@/packages/common'
import toolsCodeMap from '@/page_components/PdfToolsPages/constant/pdfToolsCodeMap.json'
import { getPdfToolKeyWithLocale } from '@/page_components/PdfToolsPages/utils'

interface IProps extends Omit<MuiLinkProps, 'href'> {
  locale: string
  children: React.ReactNode
  href?: string
}

const LanguageSwitchLink: FC<IProps> = (props) => {
  const { locale, children, href, ...resetProps } = props

  const router = useRouter()

  const coverHref = useMemo(() => {
    const queryClone = cloneDeep(router.query)

    if (queryClone.redirect) {
      delete queryClone.redirect
    }
    if (queryClone.locale) {
      delete queryClone.locale
    }

    let fixedHref = href ? href : removeLocaleInPathname(router.pathname)

    // 临时处理，pdf-tools 的产品
    // TODO: 在 “www  项目的 language selector 用 packages 里的” 开始时需要优化掉这段逻辑
    if (fixedHref.includes(`/${toolsCodeMap.topUrlKey}/`)) {
      const targetPdfToolKey = getPdfToolKeyWithLocale(
        router.query.urlKey as string,
        router.query.locale as I18nTypes,
        locale,
      )
      if (targetPdfToolKey) {
        fixedHref = fixedHref.replace(`[urlKey]`, targetPdfToolKey)
        delete queryClone['urlKey']
      }
    }

    // 排查 fixedHref 有没有 query 中的动态参数
    const queryKeys = Object.keys(queryClone)
    queryKeys.forEach((key) => {
      if (fixedHref.includes(`[${key}]`)) {
        fixedHref = fixedHref.replace(`[${key}]`, queryClone[key] as string)
        delete queryClone[key]
      }
    })

    const queryString = objectToQueryString(queryClone)

    const fixedQueryString = queryString.length > 0 ? `?${queryString}` : ''

    // 针对 basePath 进行处理
    // 如果检测到是被代理的 basePath，则需要将 basePath 放在 locale 之前
    const hitBasePath = SUPPORT_PROXY_BASE_PATHS.find((basePath) =>
      fixedHref.startsWith(basePath),
    )
    let basePath = ''
    if (hitBasePath) {
      fixedHref = fixedHref.replace(hitBasePath, '')
      basePath = hitBasePath
    }

    if (fixedHref === '/') {
      fixedHref = ''
    }

    if (fixedHref.endsWith('/')) {
      fixedHref = fixedHref.slice(0, -1)
    }

    return `${basePath}/${locale}${fixedHref}${fixedQueryString}`
  }, [router, locale, href])

  return (
    <MuiLink href={coverHref} {...resetProps}>
      {children}
    </MuiLink>
  )
}

export default LanguageSwitchLink
