import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'
import HorizontalRuleOutlinedIcon from '@mui/icons-material/HorizontalRuleOutlined'
import PlayCircleOutlinedIcon from '@mui/icons-material/PlayCircleOutlined'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import { SxProps } from '@mui/material/styles'
import SvgIcon from '@mui/material/SvgIcon'
import Tooltip from '@mui/material/Tooltip'
import Typography from '@mui/material/Typography'
import { useTranslation } from 'next-i18next'
import React, { FC, useMemo } from 'react'

import LazyLoadImage from '@/features/common/components/LazyLoadImage'
import { IWithMuiSxProps } from '@/features/common/types'
import { FeaturesIcons } from '@/features/pricing/components/FeaturesIcons'
import useVideoPopupController from '@/features/video_popup/hooks/useVideoPopupController'

import {
  IFeatureColumnType,
  IFeaturesCellDataType,
  IFeaturesRowType,
} from './type'
interface IProps {
  columnType: IFeatureColumnType
  data: IFeaturesCellDataType | null

  isPopular?: boolean
  sx?: SxProps

  iconSize?: number
  isDeepen?: boolean

  isFirstColumn: boolean
  isLastColumn: boolean
  isFirstRow: boolean
  isLastRow: boolean

  rowType?: IFeaturesRowType
}

const FeaturesTableContentCell: FC<IProps> = ({
  columnType,
  isPopular,
  data,
  sx,

  isFirstColumn,
  isLastColumn,
  isFirstRow,
  isLastRow,

  iconSize = 24,
  isDeepen,
  rowType,
}) => {
  const { openVideoPopup } = useVideoPopupController()
  const { t } = useTranslation()

  const renderCellData = () => {
    const fontSize = rowType === 'secondary' ? 14 : 16
    const color = rowType === 'secondary' ? 'text.secondary' : 'text.primary'
    if (!data) {
      return (
        <Box
          sx={{
            boxSizing: 'border-box',
          }}
        />
      )
    }

    if (data.status) {
      return (
        <Stack
          direction={'row'}
          key={data.title}
          alignItems='center'
          justifyContent={'center'}
          textAlign={'center'}
          spacing={1}
          sx={[
            {
              px: 2,
              py: 1.5,
              boxSizing: 'border-box',
              height: '100%',
            },
          ]}
        >
          {data.status === 'checked' && (
            <CheckCircleOutlineOutlinedIcon
              sx={{
                color: 'text.primary',
                fontSize: iconSize,
              }}
            />
          )}
          {data.status === 'checked-color' && (
            <Stack
              alignItems={'center'}
              justifyContent='center'
              borderRadius={'50%'}
              width={iconSize}
              height={iconSize}
            >
              <CheckedColorIcon
                sx={{
                  fontSize: iconSize,
                }}
              />
            </Stack>
          )}
          {data.status === 'limit-color' && (
            <Stack
              alignItems={'center'}
              justifyContent='center'
              borderRadius={'50%'}
              width={iconSize}
              height={iconSize}
            >
              <LimitColorIcon
                sx={{
                  fontSize: iconSize,
                }}
              />
            </Stack>
          )}
          {data.status === 'none-color' && (
            <Stack
              alignItems={'center'}
              justifyContent='center'
              borderRadius={'50%'}
              width={iconSize}
              height={iconSize}
            >
              <NoneColorIcon
                sx={{
                  fontSize: iconSize,
                }}
              />
            </Stack>
          )}
          {data.status === 'none' && (
            <HorizontalRuleOutlinedIcon
              sx={{
                color: '#ADB2C3',
                fontSize: iconSize,
              }}
            />
          )}

          {data.status === 'value' && data.statusText ? (
            <Stack direction={'row'} alignItems='center' spacing={1}>
              <Typography
                variant='custom'
                fontSize={fontSize}
                fontWeight={500}
                lineHeight={1.5}
                color='text.primary'
              >
                {t(data.statusText)}
                {data.meta?.perInfo && ` ${t(data.meta?.perInfo)}`}
              </Typography>
              {data.tooltip && (
                <Tooltip
                  title={
                    data.tooltip.desc ? (
                      <Typography variant='caption'>
                        {t(data.tooltip.desc)}
                      </Typography>
                    ) : null
                  }
                  arrow
                  placement='top'
                >
                  <Stack
                    alignItems={'center'}
                    justifyContent='center'
                    borderRadius={'50%'}
                    width={16}
                    height={16}
                  >
                    <TooltipIcon />
                  </Stack>
                </Tooltip>
              )}
            </Stack>
          ) : null}
        </Stack>
      )
    }

    if (data.categoryTitle) {
      return (
        <Stack
          direction='row'
          px={{
            xs: 2,
            md: 3,
          }}
          alignItems='center'
          spacing={1}
          sx={{
            boxSizing: 'border-box',
            pb: 1.5,
            pt: 6,
            height: '100%',
          }}
        >
          <Typography
            variant='custom'
            fontSize={20}
            lineHeight={1.4}
            fontWeight={700}
            color={'primary.main'}
            component={'h3'}
          >
            {t(data.categoryTitle)}
          </Typography>
        </Stack>
      )
    }

    if (data.title) {
      const tooltipMaxWidth = data.tooltip?.imageLink ? 432 : 300
      return (
        <Stack
          key={data.title}
          spacing={0.5}
          justifyContent='center'
          sx={[
            {
              px: {
                xs: 2,
                md: 3,
              },
              py: rowType === 'secondary' ? 1 : 1.5,
              boxSizing: 'border-box',
              flexShrink: 0,
              height: '100%',
            },
          ]}
        >
          <Stack direction={'row'} alignItems='center' spacing={1}>
            {data.icon && (
              <FeaturesIcons
                name={data.icon}
                sx={{
                  fontSize: 20,
                }}
              />
            )}
            <Typography
              variant='custom'
              fontSize={fontSize}
              lineHeight={1.5}
              color={color}
            >
              {t(data.title)}
            </Typography>
            <Tooltip
              componentsProps={{
                tooltip: {
                  sx: {
                    maxWidth: tooltipMaxWidth,
                    p: 0,
                  },
                },
              }}
              title={
                data.tooltip ? (
                  <Stack spacing={1.5} p={1.5} maxWidth={tooltipMaxWidth}>
                    {data.tooltip.imageLink && (
                      <Box width='100%'>
                        <LazyLoadImage
                          width={'100%'}
                          src={data.tooltip.imageLink}
                          skeletonHeight={260}
                          alt={''}
                        />
                      </Box>
                    )}
                    {data.tooltip?.videoUrl && (
                      <Button
                        size='small'
                        variant='outlined'
                        startIcon={<PlayCircleOutlinedIcon />}
                        sx={{
                          width: 'max-content',
                          borderColor: '#E9D7FE !important',
                          bgcolor: '#fff !important',
                          color: 'primary.main !important',
                          px: 1,
                          py: 0.2,
                          fontSize: 14,
                          lineHeight: 1.5,
                        }}
                        onClick={() => {
                          data.tooltip?.videoUrl &&
                            openVideoPopup(data.tooltip.videoUrl)
                        }}
                      >
                        {t('pricing:features__tooltips__play_video')}
                      </Button>
                    )}
                    {data.tooltip?.title && (
                      <Typography variant='body1'>
                        {t(data.tooltip.title)}
                      </Typography>
                    )}
                    {data.tooltip?.desc && (
                      <Typography variant='caption'>
                        {t(data.tooltip.desc)}
                      </Typography>
                    )}
                    {data.tooltip?.moreDescription && (
                      <Typography variant='caption'>
                        {t(data.tooltip.moreDescription)}
                      </Typography>
                    )}
                  </Stack>
                ) : null
              }
              arrow
              placement='top'
            >
              {data.tooltip ? (
                <Stack
                  alignItems={'center'}
                  justifyContent='center'
                  borderRadius={'50%'}
                  width={16}
                  height={16}
                >
                  <TooltipIcon />
                </Stack>
              ) : (
                <></>
              )}
            </Tooltip>
            {data.video && data.video?.link && (
              <Stack
                direction={'row'}
                spacing={0.2}
                alignItems='center'
                borderRadius={100}
                bgcolor='#00000014'
                pl={'4px'}
                pr={'6px'}
                py={'2px'}
                sx={{
                  cursor: 'pointer',
                }}
                onClick={() => {
                  data.video?.link && openVideoPopup(data.video.link)
                }}
              >
                <PlayCircleOutlinedIcon
                  sx={{
                    fontSize: 16,
                    color: 'text.secondary',
                  }}
                />
                {data.video.time && (
                  <Typography
                    variant='custom'
                    fontSize={12}
                    color='customText.secondary'
                  >
                    {data.video.time}
                  </Typography>
                )}
              </Stack>
            )}
          </Stack>
          {data.desc && (
            <Typography
              variant='custom'
              fontSize={14}
              color='customText.tertiary'
              lineHeight={1.5}
            >
              {t(data.desc)}
            </Typography>
          )}
        </Stack>
      )
    }
  }

  const sxMemo = useMemo(() => {
    const borderColor = isPopular ? 'primary.main' : 'customColor.borderColor'
    let resultSx: SxProps = {
      boxSizing: 'border-box',
      borderColor: 'transparent',
      borderStyle: 'solid',
      borderWidth: 1,
      borderTopWidth: 0,
      borderBottomWidth: 0,
      bgcolor: isPopular ? '#F9F5FF' : 'transparent',

      flexShrink: 0,

      borderRadius: 0,

      ...sx,
    }

    // 没有数据渲染 空白内容，页不需要边框
    if (!data) {
      resultSx = {
        ...resultSx,
        borderRightColor: 'transparent',
        borderLeftColor: 'transparent',
      }
    }

    // 第一列 需要左边框
    if (isFirstColumn) {
      resultSx = {
        ...resultSx,
        borderLeftColor: borderColor,
      }
    }

    // 最后一行 需要下边框
    if (isLastRow) {
      resultSx = {
        ...resultSx,
        borderBottomColor: borderColor,
        borderBottomWidth: 1,
      }
    }

    // 最后一列 需要右边框
    if (isLastColumn) {
      resultSx = {
        ...resultSx,
        borderRightColor: borderColor,
      }
    }

    // 有数据渲染的情况下 需要左边框
    if (data) {
      resultSx = {
        ...resultSx,
        borderLeftColor: borderColor,
      }
    }

    // 促销列 需要左右边框
    if (isPopular) {
      resultSx = {
        ...resultSx,
        borderLeftColor: borderColor,
        borderRightColor: borderColor,
        // borderRightWidth: 1,
      }
    }

    if (isDeepen && isPopular) {
      resultSx = {
        ...resultSx,
        bgcolor: '#9E77ED14',
      }
    }

    return resultSx
  }, [
    isFirstColumn,
    isLastColumn,
    isFirstRow,
    isLastRow,
    isPopular,
    data,
    sx,
    columnType,
    isDeepen,
  ])

  return <Box sx={sxMemo}>{renderCellData()}</Box>
}

export default FeaturesTableContentCell

const TooltipIcon = () => {
  return (
    <svg
      width='20'
      height='20'
      viewBox='0 0 20 20'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g clipPath='url(#clip0_9998_254249)'>
        <path
          d='M20 10C20 4.47715 15.5228 0 10 0C4.47715 0 0 4.47715 0 10C0 15.5228 4.47715 20 10 20C15.5228 20 20 15.5228 20 10Z'
          fill='black'
          fillOpacity='0.08'
        />
        <path
          d='M9.41247 15V7.36364H10.5857V15H9.41247ZM10.009 6.09091C9.78037 6.09091 9.58316 6.01302 9.41744 5.85724C9.25504 5.70147 9.17383 5.5142 9.17383 5.29545C9.17383 5.0767 9.25504 4.88944 9.41744 4.73366C9.58316 4.57789 9.78037 4.5 10.009 4.5C10.2377 4.5 10.4333 4.57789 10.5957 4.73366C10.7614 4.88944 10.8442 5.0767 10.8442 5.29545C10.8442 5.5142 10.7614 5.70147 10.5957 5.85724C10.4333 6.01302 10.2377 6.09091 10.009 6.09091Z'
          fill='black'
          fillOpacity='0.6'
        />
      </g>
      <defs>
        <clipPath id='clip0_9998_254249'>
          <rect width='20' height='20' fill='white' />
        </clipPath>
      </defs>
    </svg>
  )
}

const LimitColorIcon: FC<IWithMuiSxProps> = ({ sx }) => (
  <SvgIcon sx={sx}>
    <svg viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <mask
        id='mask0_10526_64613'
        style={{
          maskType: 'alpha',
        }}
        maskUnits='userSpaceOnUse'
        x='2'
        y='2'
        width='16'
        height='17'
      >
        <rect x='2' y='2.5' width='16' height='16' fill='#D9D9D9' />
      </mask>
      <g mask='url(#mask0_10526_64613)'>
        <path
          d='M7.07451 7.54839C7.84228 7.14809 8.70502 6.89967 9.62533 6.84523C12.5684 6.67112 15.1607 8.53631 16.0255 11.2179C16.2241 11.8308 16.3317 12.4846 16.3326 13.1634L16.3327 13.1719C16.3327 13.6575 15.9391 14.0511 15.4535 14.0511C14.9679 14.0511 14.5741 13.6574 14.5741 13.1718C14.5741 13.0002 14.564 12.8308 14.5456 12.664C14.5249 12.4752 14.4928 12.2902 14.4501 12.1094C14.4282 12.0173 14.4039 11.926 14.3765 11.8361C13.777 9.85786 11.883 8.47305 9.72884 8.60048C9.26897 8.62769 8.829 8.72193 8.41787 8.87316L7.07451 7.54839Z'
          fill='#F4C06D'
        />
        <path
          d='M6.25541 10.5379L5.26708 8.9591C4.5396 9.77744 4.02308 10.7833 3.79622 11.888C3.71086 12.3026 3.66602 12.732 3.66602 13.1719C3.66602 13.6575 4.05964 14.0511 4.54521 14.0511C5.03077 14.0511 5.4244 13.6575 5.4244 13.1719C5.4244 12.3534 5.63941 11.585 6.01602 10.9202L6.01444 10.919C6.08858 10.7879 6.16903 10.6607 6.25541 10.5379Z'
          fill='#F4C06D'
        />
        <path
          d='M10.6849 13.926C10.8864 13.7662 11.0116 13.5489 11.0606 13.2741C11.1097 12.9994 11.039 12.7663 10.8486 12.575L6.24818 7.89106C6.19741 7.84004 6.1402 7.81445 6.07658 7.81429C6.01295 7.81414 5.95054 7.83689 5.88935 7.88256C5.8358 7.92569 5.80258 7.97906 5.7897 8.04266C5.77682 8.10625 5.78939 8.16991 5.82741 8.23363L9.31097 13.77C9.45547 14.002 9.66704 14.1291 9.94568 14.1514C10.2243 14.1737 10.4707 14.0986 10.6849 13.926Z'
          fill='#F4C06D'
        />
      </g>
    </svg>
  </SvgIcon>
)

const CheckedColorIcon: FC<IWithMuiSxProps> = ({ sx }) => (
  <SvgIcon sx={sx}>
    <svg viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <mask
        id='mask0_10526_63455'
        style={{
          maskType: 'alpha',
        }}
        maskUnits='userSpaceOnUse'
        x='0'
        y='0'
        width='20'
        height='21'
      >
        <rect y='0.5' width='20' height='20' fill='#D9D9D9' />
      </mask>
      <g mask='url(#mask0_10526_63455)'>
        <path
          d='M8.33333 14.1663L5 10.833L6.16667 9.66634L8.33333 11.833L13.8333 6.33301L15 7.49967L8.33333 14.1663Z'
          fill='#34A853'
        />
      </g>
    </svg>
  </SvgIcon>
)
const NoneColorIcon: FC<IWithMuiSxProps> = ({ sx }) => (
  <SvgIcon sx={sx}>
    <svg viewBox='0 0 20 20' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <mask
        id='mask0_10526_63541'
        style={{
          maskType: 'alpha',
        }}
        maskUnits='userSpaceOnUse'
        x='0'
        y='0'
        width='20'
        height='21'
      >
        <rect y='0.5' width='20' height='20' fill='#D9D9D9' />
      </mask>
      <g mask='url(#mask0_10526_63541)'>
        <path
          d='M6.99967 14.667L5.83301 13.5003L8.83301 10.5003L5.83301 7.52116L6.99967 6.35449L9.99967 9.35449L12.9788 6.35449L14.1455 7.52116L11.1455 10.5003L14.1455 13.5003L12.9788 14.667L9.99967 11.667L6.99967 14.667Z'
          fill='#ED5050'
        />
      </g>
    </svg>
  </SvgIcon>
)
