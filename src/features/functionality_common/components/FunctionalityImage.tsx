import { Box, Typography } from '@mui/material';
import { CSSProperties, FC } from 'react';

interface IFunctionalityImageProps {
  id: string;
  size?: number;
  pages?: number;
  imageUrlString: string;
  file?: File;
}
interface IFunctionalitySortableImageProps {
  name?: string;
  imageInfo: IFunctionalityImageProps;
  isActive?: boolean;
  rightTopChildren?: React.ReactNode;
  onClick?: () => void;
  imageSize?: number | string;
}
/**
 * Functionality公共的图片视图，带有tooltip
 * @param name 底部显示的名称
 * @param imageInfo 图片信息
 * @param isActive 是否激活颜色区别
 * @param rightTopChildren 右上角的子元素
 * @param onClick 点击事件
 * @param imageSize 图片宽度尺寸
 */
const FunctionalityImage: FC<IFunctionalitySortableImageProps> = ({
  imageInfo,
  isActive,
  rightTopChildren,
  onClick,
  name,
  imageSize,
}) => {
  return (
    <Box
      onClick={onClick}
      sx={{
        cursor: 'grab',
        position: 'relative',
        width: imageSize || 200,
      }}
    >
      <Box
        sx={{
          padding: 1,
          backgroundColor: '#9065b00a',
          '&:hover': {
            backgroundColor: '#f0eded',
          },
          border: isActive ? '1px dashed #64467b' : '1px solid transparent',
          borderRadius: 1,

          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexWrap: 'wrap',
        }}
      >
        <img
          style={
            {
              objectFit: 'contain',
              width: '100%',
              opacity: isActive ? 0 : 1,
              userSelect: 'none',
              WebkitUserDrag: 'none',
              maxHeight: 500,
              minHeight: 60,
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
          }}
        >
          {name}
        </Typography>
      </Box>
      {rightTopChildren && (
        <Box
          sx={{
            position: 'absolute',
            top: 5,
            right: 5,
            height: 20,
            width: 20,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 3,
            '&:hover': {
              backgroundColor: '#f0eded',
            },
            cursor: 'pointer',
          }}
        >
          {rightTopChildren}
        </Box>
      )}
    </Box>
  );
};
export default FunctionalityImage;
