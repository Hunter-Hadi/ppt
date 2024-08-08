import Skeleton from '@mui/material/Skeleton'
import { styled, SxProps } from '@mui/material/styles'
import Tooltip, { tooltipClasses, TooltipProps } from '@mui/material/Tooltip'
import React, { FC, useEffect, useRef, useState } from 'react'
import { v4 as uuidV4 } from 'uuid'

const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.background.paper,
    color: 'rgba(0, 0, 0, 0.87)',
    fontSize: 12,
    boxShadow: theme.shadows[1],
    maxWidth: 'none',
  },
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.background.paper,
  },
}))

interface IMaxAILazyLoadImageProps {
  src: string
  alt: string
  width?: number | string
  height?: number | string
  skeletonHeight?: number
  maxRetryTimes?: number
  SkeletonSx?: SxProps
  preview?: boolean
  placement?: TooltipProps['placement']
  imgStyle?: React.CSSProperties
}
const MaxAILazyLoadImage: FC<IMaxAILazyLoadImageProps> = (props) => {
  const {
    src,
    alt,
    width,
    height,
    skeletonHeight,
    maxRetryTimes = 1,
    SkeletonSx,
    preview,
    placement,
    imgStyle,
  } = props

  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const lazyImageIdRef = useRef(uuidV4())

  useEffect(() => {
    console.log(`[LazyLoadImage] useEffect`, src)
    const loadImage = async () => {
      const loadOneTimesImage = async () => {
        return new Promise((resolve) => {
          const image = new window.Image()
          image.src = src
          image.onload = () => {
            setImageSrc(src)
            setIsLoading(false)
            resolve(true)
          }
          image.onerror = () => {
            resolve(false)
          }
        })
      }
      // 因为有时候图片加载失败，所以需要重试
      for (let i = -1; i < maxRetryTimes; i++) {
        if (await loadOneTimesImage()) {
          break
        }
      }
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadImage()
          observer.unobserve(entry.target)
        }
      })
    })
    const lazyImageId = `#lazy-image-${lazyImageIdRef.current}`
    let target: HTMLElement | null = null

    target = document.querySelector(lazyImageId) as HTMLElement
    if (target) {
      observer.observe(target)
    }
    return () => {
      if (target) {
        observer.unobserve(target)
      }
    }
  }, [src, maxRetryTimes])

  return (
    <>
      {isLoading ? (
        <Skeleton
          id={`lazy-image-${lazyImageIdRef.current}`}
          variant='rectangular'
          height={skeletonHeight || height}
          sx={{
            width: width,
            ...SkeletonSx,
          }}
        />
      ) : (
        <LightTooltip
          placement={placement || 'top'}
          title={
            preview ? (
              <img
                style={{
                  objectFit: 'contain',
                  ...imgStyle,
                }}
                src={imageSrc as string}
                alt={alt}
                width={256}
                height={256}
              />
            ) : null
          }
        >
          <img src={src} alt={alt} width={width} height={height} />
        </LightTooltip>
      )}
    </>
  )
}

export default MaxAILazyLoadImage
