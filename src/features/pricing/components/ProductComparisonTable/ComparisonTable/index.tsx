import CloseIcon from '@mui/icons-material/Close'
import DoneIcon from '@mui/icons-material/Done'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import { SxProps } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import debounce from 'lodash-es/debounce'
import { useTranslation } from 'next-i18next'
import React, { FC, useEffect, useMemo, useRef, useState } from 'react'

import useAppHeaderState from '@/hooks/useAppHeaderState'

import {
  COMPARISON_TABLE_AI_CHAT_DATA,
  COMPARISON_TABLE_HEADER,
  COMPARISON_TABLE_READING_DATA,
  COMPARISON_TABLE_SEARCH_DATA,
  COMPARISON_TABLE_WRITING_DATA,
} from './data'

interface IComparisonTableProps {
  sx?: SxProps
}

const ComparisonTable: FC<IComparisonTableProps> = ({ sx }) => {
  const { t } = useTranslation()

  // 是否显示 fixed table header
  const [showFixedHeader, setShowFixedHeader] = useState(false)

  const tableContainerRef = useRef<HTMLElement>(null)
  const tableFixedHeaderContainerRef = useRef<HTMLElement>(null)

  // fixed table header 的宽度
  // 需要在 resize 时，同步 table container 容器的宽度
  const [fixedHeaderWidth, setFixedHeaderWidth] = useState<number>(0)
  // fixed table header 的 left 值
  const [fixedHeaderLeft, setFixedHeaderLeft] = useState<number>(0)

  const { appHeaderHeight } = useAppHeaderState()

  useEffect(() => {
    // window.scroll 纵向滚动的监听
    const scrollHandler = () => {
      const tableContainer = tableContainerRef.current
      if (!tableContainer) return
      const tableContainerRect = tableContainer.getBoundingClientRect()

      setShowFixedHeader(
        tableContainerRect.top <= 30 && tableContainerRect.bottom >= 400,
      )

      const tableContainerEl = tableContainerRef.current

      if (tableContainerEl && tableFixedHeaderContainerRef.current) {
        const scrollLeft = tableContainerEl.scrollLeft
        tableFixedHeaderContainerRef.current.scrollLeft = scrollLeft
      }
    }

    window.addEventListener('scroll', scrollHandler)

    return () => {
      window.removeEventListener('scroll', scrollHandler)
    }
  }, [])

  useEffect(() => {
    // 初始化 fixed table header 的宽度
    if (tableContainerRef.current) {
      setFixedHeaderWidth(tableContainerRef.current?.clientWidth)
      const tableContainerRect =
        tableContainerRef.current.getBoundingClientRect()
      setFixedHeaderLeft(tableContainerRect.left)
    }
  }, [])

  useEffect(() => {
    const resizeHandle = () => {
      if (tableContainerRef.current) {
        setFixedHeaderWidth(tableContainerRef.current?.clientWidth)
        const tableContainerRect =
          tableContainerRef.current.getBoundingClientRect()
        setFixedHeaderLeft(tableContainerRect.left)
      }
    }

    const debouncedHandle = debounce(resizeHandle, 200)

    window.addEventListener('resize', debouncedHandle)

    return () => {
      window.removeEventListener('resize', debouncedHandle)
    }
  }, [])

  useEffect(() => {
    // table container 横向滚动的监听
    const tableContainerEl = tableContainerRef.current

    if (!tableContainerEl) {
      return
    }

    const horizontalScrollHandler = () => {
      if (tableFixedHeaderContainerRef.current) {
        const scrollLeft = tableContainerEl.scrollLeft
        tableFixedHeaderContainerRef.current.scrollLeft = scrollLeft
      }
    }

    tableContainerEl.addEventListener('scroll', horizontalScrollHandler)

    return () => {
      tableContainerEl.removeEventListener('scroll', horizontalScrollHandler)
    }
  }, [])

  return (
    <>
      {/* fixed header */}
      {showFixedHeader && (
        <Box
          overflow='hidden'
          sx={{
            position: 'fixed',
            top: appHeaderHeight,
            zIndex: (t) => t.zIndex.drawer + 10,
            left: fixedHeaderLeft,
            right: 0,
            width: fixedHeaderWidth,
            m: '0px !important',
            display: {
              xs: 'none',
              md: 'block',
            },
          }}
        >
          <Box
            sx={{
              // mx: 'auto',

              overflow: 'auto',

              /* Chrome/Safari/Opera */
              '&::-webkit-scrollbar': {
                display: 'none',
              },

              // Firefox
              'scrollbar-width': 'none',
            }}
            ref={tableFixedHeaderContainerRef}
            onScroll={(e) => {
              e.preventDefault()
            }}
          >
            <ComparisonTableHeader
              sx={{
                bgcolor: '#fff',
                // borderBottom: 0,
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: '20%',
                width: '20%',
                height: 'calc(100% - 1px)',
                border: '1px solid',
                borderColor: '#9065B0',
                borderBottom: 0,
                m: '0 !important',
                bgcolor: '#AC7EF714',
                borderTopLeftRadius: 8,
                borderTopRightRadius: 8,
              }}
            />
          </Box>
        </Box>
      )}
      <Stack sx={sx} spacing={5} position='relative' ref={tableContainerRef}>
        {/* header */}
        <ComparisonTableHeader />

        {/* content */}
        <ComparisonTableContentRender
          title={t(
            'pricing:ab_test_v5__product_comparison_table__ai_chat__title',
          )}
          data={COMPARISON_TABLE_AI_CHAT_DATA}
        />
        <ComparisonTableContentRender
          title={t(
            'pricing:ab_test_v5__product_comparison_table__reading__title',
          )}
          data={COMPARISON_TABLE_READING_DATA}
        />
        <ComparisonTableContentRender
          title={t(
            'pricing:ab_test_v5__product_comparison_table__writing__title',
          )}
          data={COMPARISON_TABLE_WRITING_DATA}
        />
        <ComparisonTableContentRender
          title={t(
            'pricing:ab_test_v5__product_comparison_table__search__title',
          )}
          data={COMPARISON_TABLE_SEARCH_DATA}
        />
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: '20%',
            width: '20%',
            height: 'calc(100% - 3px)',
            border: '1px solid',
            borderColor: '#9065B0',
            m: '0 !important',
            bgcolor: '#AC7EF714',
            borderRadius: 2,
          }}
        />
      </Stack>
    </>
  )
}

const ComparisonTableHeader: FC<{
  fixed?: boolean
  sx?: SxProps
}> = ({ sx }) => {
  return (
    <Stack
      direction={'row'}
      sx={{
        borderBottom: '1px solid',
        borderColor: '#EAECF0',

        ...sx,
      }}
    >
      {COMPARISON_TABLE_HEADER.map((item) => (
        <Stack
          key={item.key}
          justifyContent={'center'}
          alignItems={'center'}
          sx={{
            flexBasis: '20%',
            p: 3,
            color: item.key === 'maxai' ? 'primary.main' : 'text.primary',
          }}
        >
          <Typography
            variant='custom'
            fontSize={18}
            lineHeight={1.5}
            fontWeight={700}
          >
            {item.title}
          </Typography>
        </Stack>
      ))}
    </Stack>
  )
}

const ComparisonTableContentRender: FC<{
  data: {
    title: string
    maxai: string
    chatgpt: string
    claude: string
    gemini: string
  }[]
  title: string
}> = ({ data, title }) => {
  const { t } = useTranslation()
  const itemSx = useMemo<SxProps>(() => {
    return {
      width: '20%',
      px: 3,
      py: 1.5,
      flexBasis: '20%',
      flexGrow: 0,
      flexShrink: 0,
      boxSizing: 'border-box',
    }
  }, [])
  return (
    <Stack>
      <Stack py={2.5} px={3} bgcolor='#F9FAFB'>
        <Typography
          variant='custom'
          fontSize={20}
          lineHeight={1.5}
          fontWeight={600}
          color='primary.main'
        >
          {title}
        </Typography>
      </Stack>
      {data.map((dataItem) => (
        <Stack key={dataItem.title} direction={'row'} alignItems='center'>
          <Stack
            sx={{
              height: 72,
              ...itemSx,
            }}
            justifyContent={'center'}
            // alignItems={'center'}
          >
            <Typography variant='custom' fontSize={16} lineHeight={1.5}>
              {dataItem.title.includes(':')
                ? t(dataItem.title)
                : dataItem.title}
            </Typography>
          </Stack>
          <Stack justifyContent={'center'} alignItems={'center'} sx={itemSx}>
            <ComparisonTableFlagRender icon={dataItem.maxai} />
          </Stack>
          <Stack justifyContent={'center'} alignItems={'center'} sx={itemSx}>
            <ComparisonTableFlagRender icon={dataItem.chatgpt} />
          </Stack>
          <Stack justifyContent={'center'} alignItems={'center'} sx={itemSx}>
            <ComparisonTableFlagRender icon={dataItem.claude} />
          </Stack>
          <Stack justifyContent={'center'} alignItems={'center'} sx={itemSx}>
            <ComparisonTableFlagRender icon={dataItem.gemini} />
          </Stack>
        </Stack>
      ))}
    </Stack>
  )
}

const ComparisonTableFlagRender: FC<{
  icon: string
}> = ({ icon }) => {
  if (icon === 'done') {
    return (
      <DoneIcon
        sx={{
          color: '#34A853',
        }}
      />
    )
  }
  if (icon === 'none') {
    return (
      <CloseIcon
        sx={{
          color: '#EA4335',
        }}
      />
    )
  }
  return null
}

export default ComparisonTable
