import { Box, Stack, SxProps, Typography } from '@mui/material'
import { CSSProperties, FC } from 'react'
import React from 'react'

import { MOBILE_CARD_WIDTH, PC_CARD_WIDTH } from '../constants'
import useFunctionalityCommonIsMobile from '../hooks/useFunctionalityCommonIsMobile'
import { IFunctionalityCommonImageInfo } from '../types/functionalityCommonImageType'

interface IFunctionalitySortableImageProps {
  name?: string
  imageInfo: IFunctionalityCommonImageInfo
  children?: React.ReactNode
  onClick?: () => void
  wrapSx?: SxProps
  sx?: SxProps
  imgStyle?: CSSProperties
  pageNumber?: number // 展示pdf页码
}
/**
 * Functionality公共的图片视图
 * @param name 底部显示的名称
 * @param imageInfo 图片信息
 * @param isActive 是否激活颜色区别
 * @param rightTopChildren 右上角的子元素
 * @param onClick 点击事件
 * @param imgStyle 图片style信息
 */
const FunctionalityCommonImage: FC<IFunctionalitySortableImageProps> = ({
  imageInfo,
  children,
  onClick,
  name,
  sx,
  wrapSx,
  imgStyle,
  pageNumber,
}) => {
  const isMobile = useFunctionalityCommonIsMobile()

  return (
    <Box
      onClick={onClick}
      sx={{
        cursor: 'grab',
        position: 'relative',
        width: isMobile ? MOBILE_CARD_WIDTH : PC_CARD_WIDTH,
        ...wrapSx,
      }}
    >
      <Stack
        flexDirection='column'
        alignItems='center'
        flexWrap='wrap'
        sx={{
          padding: 1,
          bgcolor: '#9065b00a',
          overflow: 'hidden',
          '&:hover': {
            bgcolor: '#f0eded',
          },
          borderRadius: 1,
          ...sx,
        }}
      >
        <img
          style={
            {
              objectFit: 'contain',
              width: '100%',
              userSelect: 'none',
              WebkitUserDrag: 'none',
              pointerEvents: 'none', // 取消图片的指针事件
              maxHeight: 500,
              minHeight: 60,
              ...imgStyle,
            } as CSSProperties
          }
          srcSet={imageInfo.imageUrlString}
          src={imageInfo.imageUrlString}
          loading='lazy'
          alt='image'
        />
        <Typography
          variant='custom'
          sx={{
            fontSize: 10,
            marginTop: 1,
            width: '100%',
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 2,
            lineClamp: 2, // 支持非webkit浏览器
            textOverflow: 'ellipsis',
            textAlign: 'center',
          }}
        >
          {name}
        </Typography>
        {pageNumber && (
          <Typography
            variant='custom'
            sx={{
              fontSize: 10,
              marginTop: 1,
              width: '100%',
              display: '-webkit-box',
              overflow: 'hidden',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: 2,
              lineClamp: 2, // 支持非webkit浏览器
              textOverflow: 'ellipsis',
              textAlign: 'center',
            }}
          >
            {pageNumber}
          </Typography>
        )}
      </Stack>
      {children}
    </Box>
  )
}
export default FunctionalityCommonImage
