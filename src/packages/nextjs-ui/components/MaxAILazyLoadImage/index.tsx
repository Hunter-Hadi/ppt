import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'
import Image from 'next/image'
import React, { FC, useState } from 'react'

interface IMaxAILazyLoadImageProps {
  src: string
  alt: string
  width?: number | `${number}`
  height?: number | `${number}`
}
/**
 *
 * 依赖 nextjs Image 组件自带的 lazy Loading 能力，加在 Skeleton 的过度
 *
 * @returns
 */
const MaxAILazyLoadImage: FC<IMaxAILazyLoadImageProps> = ({
  src,
  alt,
  width,
  height,
}) => {
  const [isLoaded, setIsLoaded] = useState(false)

  return (
    <Box style={{ position: 'relative', width, height }}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        onLoadingComplete={() => setIsLoaded(true)}
        style={{
          position: isLoaded ? 'relative' : 'absolute',
        }}
      />
      {!isLoaded && (
        <Skeleton
          variant='rectangular'
          width={width}
          height={height}
          style={{ position: 'absolute', top: 0, left: 0 }}
        />
      )}
    </Box>
  )
}

export default MaxAILazyLoadImage
