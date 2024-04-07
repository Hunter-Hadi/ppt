import { Box, Tooltip, Typography } from '@mui/material';
import ceil from 'lodash-es/ceil';
import divide from 'lodash-es/divide';
import { FC, useMemo } from 'react';

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
}
const FunctionalityImage: FC<IFunctionalitySortableImageProps> = ({
  imageInfo,
  isActive,
  rightTopChildren,
  onClick,
  name,
}) => {
  const tooltipTitle = useMemo(() => {
    const { size, pages } = imageInfo;
    if (size && pages) {
      return `${ceil(divide(size, 1000))}kb - ${pages} pages`;
    } else if (size) {
      return `${ceil(divide(size, 1000))}kb`;
    } else if (pages) {
      return `${pages} pages`;
    }
  }, [imageInfo]);
  return (
    <Tooltip title={tooltipTitle} arrow placement='top'>
      <Box
        onClick={onClick}
        sx={{
          cursor: 'grab',
          position: 'relative',
          width: 150,
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
            style={{
              objectFit: 'contain',
              width: '100%',
              opacity: isActive ? 0 : 1,
            }}
            srcSet={imageInfo.imageUrlString}
            src={imageInfo.imageUrlString}
            loading='lazy'
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
              top: 0,
              right: 0,
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
    </Tooltip>
  );
};
export default FunctionalityImage;
