import { Box, Tooltip, Typography } from '@mui/material';
import ceil from 'lodash-es/ceil';
import divide from 'lodash-es/divide';
import { FC, useMemo } from 'react';

interface IFunctionalityImageProps {
  id: string;
  name: string;
  size?: number;
  pages?: number;
  imageUrlString: string;
  file?: File;
}
interface IFunctionalitySortableImageProps {
  imageInfo: IFunctionalityImageProps;
  isActive: boolean;
  rightTopChildren?: React.ReactNode;
}
const FunctionalityImage: FC<IFunctionalitySortableImageProps> = ({
  imageInfo,
  isActive,
  rightTopChildren,
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
        sx={{
          cursor: 'grab',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexWrap: 'wrap',
          width: 150,
        }}
      >
        <Box
          sx={{
            padding: 1,
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: '#f0eded',
            },
            border: isActive ? '1px dashed #64467b' : '1px solid transparent',
            borderRadius: 1,
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
        </Box>

        <Typography
          variant='custom'
          sx={{
            fontSize: 10,
            marginTop: 1,
          }}
        >
          {imageInfo.name}
        </Typography>
        {rightTopChildren && (
          <Box
            sx={{
              position: 'absolute',
              top: 0,
              right: 0,
              backgroundColor: '#d1d5db',
              height: 20,
              width: 20,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 5,
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
