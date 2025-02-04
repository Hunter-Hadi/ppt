import React, { FC } from 'react'

interface IResponsiveImageProps
  extends Omit<
    React.ImgHTMLAttributes<HTMLImageElement>,
    'src' | 'alt' | 'width' | 'height'
  > {
  src: string
  alt: string
  width: number
  height: number
}

const MaxAIResponsiveImage: FC<IResponsiveImageProps> = ({
  src,
  alt,
  width,
  height,
  ...rest
}) => (
  <div
    style={{
      position: 'relative',
      width: '100%',
      paddingTop: `${(height / width) * 100}%`,
    }}
  >
    <img
      src={src}
      alt={alt}
      {...rest}
      style={{
        position: 'absolute',
        height: '100%',
        width: '100%',
        inset: '0px',
        color: 'transparent',
        ...rest?.style,
      }}
    />
  </div>
)

export default MaxAIResponsiveImage
