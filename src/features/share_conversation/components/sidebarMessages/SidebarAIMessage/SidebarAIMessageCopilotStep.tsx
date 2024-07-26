import { Box, Link, Tooltip } from '@mui/material'
import Card from '@mui/material/Card'
import CircularProgress from '@mui/material/CircularProgress'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'
import React, { FC, useMemo, useState } from 'react'

// import CitationTooltipContent from '@/components/CitationTooltipContent'
import { ContextMenuIcon } from '@/features/share_conversation/components/ContextMenuIcon';
import TextOnlyTooltip from '@/features/share_conversation/components/TextOnlyTooltip'

import ChatContainerIcon from '../../ChatContainerIcon'
type IAIResponseOriginalMessageCopilotStep = any
const SidebarAIMessageCopilotStep: FC<{
  messageIsComplete?: boolean
  copilot: IAIResponseOriginalMessageCopilotStep
}> = (props) => {
  const { messageIsComplete } = props
  const { title, icon, value, valueType = 'text', status } = props.copilot
  const [moreReading, setMoreReading] = useState(false)
  const { t } = useTranslation()

  const RenderValueDom = useMemo(() => {
    if (!value) return null
    switch (valueType) {
      case 'text': {
        return (
          <Card variant='outlined' sx={{ px: 1 }}>
            <TextOnlyTooltip title={String(value)}>
              <Typography
                fontSize={14}
                color={'text.primary'}
                noWrap
                maxWidth={256}
              >
                {String(value)}
              </Typography>
            </TextOnlyTooltip>
          </Card>
        )
      }
      case 'tags': {
        let tags: string[] = []
        if (typeof value === 'string') {
          tags = value.split(',')
        } else if (Array.isArray(value)) {
          tags = value
        }
        return (
          <Stack
            gap={1}
            direction={'row'}
            alignItems={'center'}
            flexWrap={'wrap'}
          >
            {tags.map((tag, index) => (
              <Card key={tag + index} variant='outlined' sx={{ px: 1 }}>
                <TextOnlyTooltip title={tag}>
                  <Typography
                    noWrap
                    maxWidth={160}
                    fontSize={14}
                    color={'text.secondary'}
                  >
                    {tag}
                  </Typography>
                </TextOnlyTooltip>
              </Card>
            ))}
          </Stack>
        )
      }
      case 'source': {
        return (
          <Stack
            gap={1}
            direction={'row'}
            alignItems={'center'}
            flexWrap={'wrap'}
          >
            {value.map((tag, index) => {
              if (!moreReading && index > 3) return null
              if (!moreReading && index == 3 && value.length > 4) {
                return (
                  <Card
                    key={tag + index}
                    variant='outlined'
                    sx={{
                      p: '2px 8px 2px 4px',
                      '&:hover': {
                        background: 'rgba(0, 0, 0, 0.08)',
                        cursor: 'pointer',
                      },
                    }}
                    onClick={() => setMoreReading(true)}
                  >
                    <Stack
                      height={16}
                      direction={'row'}
                      alignItems='center'
                      spacing={0.5}
                    >
                      <Typography fontSize={12} color='text.secondary' noWrap>
                        {`+ ${value.length - 3} ${t('share_conversion:more')}`}
                      </Typography>
                    </Stack>
                  </Card>
                )
              }
              return (
                <Card
                  key={tag + index}
                  variant='outlined'
                  sx={{
                    p: '2px 8px 2px 4px',
                    '&:hover': { background: 'rgba(0, 0, 0, 0.08)' },
                  }}
                >
                  <Tooltip
                    PopperProps={{
                      className: 'certationTooltp',
                      sx: {
                        [`& > .MuiTooltip-tooltip`]: {
                          background: 'transparent',
                        },
                      },
                    }}
                    sx={{ p: 0 }}
                    title={
                      // <CitationTooltipContent
                      //   source={tag}
                      // ></CitationTooltipContent>
                      ''
                    }
                  >
                    <Link href={tag.url} target={'_blank'} underline='none'>
                      <Stack
                        direction={'row'}
                        alignItems='center'
                        spacing={0.5}
                      >
                        <Box
                          width={16}
                          height={16}
                          borderRadius='50%'
                          overflow='hidden'
                          flexShrink={0}
                        >
                          <img
                            src={tag.favicon}
                            alt={tag?.from}
                            width='100%'
                            height='100%'
                          />
                        </Box>
                        <Typography fontSize={12} color='text.secondary' noWrap>
                          {tag?.from}
                        </Typography>
                      </Stack>
                    </Link>
                  </Tooltip>
                </Card>
              )
            })}
            {moreReading && value.length > 4 && (
              <Card
                variant='outlined'
                sx={{
                  p: '2px 4px 2px 4px',
                  '&:hover': {
                    background: 'rgba(0, 0, 0, 0.08)',
                    cursor: 'pointer',
                  },
                }}
                onClick={() => setMoreReading(false)}
              >
                <Stack
                  height={16}
                  direction={'row'}
                  alignItems='center'
                  spacing={0.5}
                  color='text.secondary'
                >
                  <Typography fontSize={12} color='text.secondary' noWrap>
                    {`${t('share_conversion:hide')}`}
                  </Typography>
                </Stack>
              </Card>
            )}
          </Stack>
        )
      }
      default:
        return null
    }
  }, [value, valueType, moreReading])
  return (
    <Stack spacing={0.5}>
      <Stack spacing={1} direction={'row'} alignItems={'center'}>
        <Stack
          alignItems={'center'}
          justifyContent={'center'}
          width={16}
          height={16}
        >
          {status === 'loading' && !messageIsComplete ? (
            <CircularProgress size={16} />
          ) : (
            <ChatContainerIcon
              sx={{
                color: 'primary.main',
                fontSize: 16,
              }}
              icon={icon}
            />
          )}
        </Stack>
        <Typography
          fontSize={16}
          color='text.primary'
          noWrap
          sx={{
            p: 0,
          }}
        >
          {title}
        </Typography>
      </Stack>
      {value && (
        <Stack spacing={1} direction={'row'} alignItems={'center'}>
          <Stack
            alignItems={'center'}
            justifyContent={'center'}
            width={16}
            height={16}
          />
          {RenderValueDom}
        </Stack>
      )}
    </Stack>
  )
}

export default SidebarAIMessageCopilotStep
