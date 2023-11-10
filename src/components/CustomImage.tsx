import { Box, SxProps } from '@mui/material';
import { random } from 'lodash-es';
import Image from 'next/image';
import React, { FC, useEffect, useRef, useState } from 'react';

import { useUnmounted } from '@/utils/utils';

declare type ImgElementStyle = NonNullable<
  JSX.IntrinsicElements['img']['style']
>;

interface IProps {
  alt?: string | undefined;
  src?: string | undefined;
  width?: string | number | undefined;
  height?: string | number | undefined;
  isBase64?: boolean;
  layout?: 'fill' | 'fixed' | 'intrinsic' | 'responsive' | undefined;
  objectFit?: ImgElementStyle['objectFit'] | undefined;
  productURL?: string | undefined;
  refreshId?: string;
  cb?: (images: string[]) => void;
  // 最大重试次数
  retriesLeft?: number;
  replaceErrorImage?: string;
  errorImage?: string;
  // 加载失败 和 图片重试失败 之后的回调 用于通知父级组件 图片加载失败
  errorCb?: () => void;
  priority?: boolean;
}

// 图片错误
const DEFAULT_ERROE_IMAGE = '/assets/img_error.svg';

// 产品已下架
const DEFAULT_PRODUCT_REMOVE_IMAGE = '/assets/product_removed.svg';

const CustomImage: FC<IProps> = ({
  width = 0,
  height = 0,
  alt = '',
  src: srcProp,
  layout = 'responsive',
  isBase64,
  objectFit = 'cover',
  retriesLeft = 2,
  replaceErrorImage,
  errorImage: defaultErrorImage,
  priority,
  cb,
  errorCb,
}) => {
  const unmountedRef = useUnmounted();
  const retriesLeftRef = useRef(retriesLeft);
  const [isError, setIsError] = useState(false);
  const [src, setSrc] = useState(srcProp);
  const [errorImage, setErrorImage] = useState(defaultErrorImage);
  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str);

  useEffect(() => {
    setSrc(srcProp);
  }, [srcProp]);

  const shimmer = (
    w: string | number | undefined,
    h: string | number | undefined,
  ) => `
  <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <defs>
      <linearGradient id="g">
        <stop stopColor="#f5f5f5" offset="20%" />
        <stop stopColor="#f5f5f5" offset="50%" />
        <stop stopColor="#f5f5f5" offset="70%" />
      </linearGradient>
    </defs>
    <rect width="${w}" height="${h}" fill="#f1f1f1" />
    <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
    <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="2s" repeatCount="indefinite"  />
  </svg>`;

  // const handleError = (e: SyntheticEvent<HTMLImageElement, Event>) => {
  //   e.target.onerror = null;
  //   e.target.src = 'http://placekitten.com/g/200/300';
  // };

  return (
    <Image
      fill={layout === 'fill'}
      alt={alt || ''}
      unoptimized
      src={
        isError && !isBase64
          ? errorImage || DEFAULT_ERROE_IMAGE
          : src || DEFAULT_ERROE_IMAGE
      }
      width={width as number}
      height={height as number}
      placeholder={height <= 40 || width <= 40 || isBase64 ? 'empty' : 'blur'}
      blurDataURL={
        isBase64
          ? undefined
          : `data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`
      }
      onError={async () => {
        if (unmountedRef) return;
        if (retriesLeftRef.current === 0) {
          return;
        }
        setIsError(true);
        retriesLeftRef.current = retriesLeftRef.current - 1;

        if (replaceErrorImage) {
          const blogImageURL = window.sessionStorage.getItem(replaceErrorImage);
          if (blogImageURL) {
            setIsError(false);
            setSrc(() => blogImageURL);
          } else {
            const number = random(1, 10);
            const blogImageURL = `https://images.simplytrends.co/simplyshop_blog_cover${number}.jpg`;
            window.sessionStorage.setItem(replaceErrorImage, blogImageURL);
            setIsError(false);
            setSrc(() => blogImageURL);
          }
        }
      }}
      priority={priority}
    />
  );
};

/**
 *
 * 为解决 CustomImage 外部必须用 position: relative 的 div 容器包装
 * 导致使用组件需要写多余代码的问题
 */

interface ICustomImageBoxProps extends IProps {
  boxSx?: SxProps;
}

export const CustomImageBox: FC<ICustomImageBoxProps> = (props) => {
  const { boxSx, ...rest } = props;
  return (
    <Box
      position='relative'
      width={rest.width}
      height={rest.height}
      sx={{
        ...boxSx,
        '& img': {
          objectFit: rest.objectFit,
        },
      }}
    >
      <CustomImage {...rest} />
    </Box>
  );
};

export default CustomImage;
