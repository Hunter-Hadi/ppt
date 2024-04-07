import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Tooltip, Typography } from '@mui/material';
import ceil from 'lodash-es/ceil';
import divide from 'lodash-es/divide';
import { FC, useMemo } from 'react';

import FunctionalityIcon from '@/features/functionality_pdf_merge/components/FunctionalityIcon';
import { IFunctionalityPdfInfoProps } from '@/features/functionality_pdf_merge/components/FunctionalityPdfMerge';
interface IFunctionalitySortableImageProps {
  imageInfo: IFunctionalityPdfInfoProps;
  index: number;
  isImageSelect: boolean;
  onDelete: (id: string) => void;
  activeDragId: string | null;
  isShowOperate: boolean;
}
const FunctionalitySortableImage: FC<IFunctionalitySortableImageProps> = ({
  imageInfo,
  index,
  isImageSelect,
  onDelete,
  activeDragId,
  isShowOperate,
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: imageInfo.id });
  const isActiveImage = activeDragId === imageInfo.id;
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isActiveImage ? 1 : 0,
  };
  const tooltipTitle = useMemo(() => {
    return `${ceil(divide(imageInfo.size, 1000))}kb - ${imageInfo.pages} pages`;
  }, [imageInfo]);
  return (
    <Tooltip title={tooltipTitle} arrow placement='top'>
      <Box
        ref={setNodeRef}
        style={{
          ...style,
          backgroundColor: 'transparent',
        }}
        {...listeners}
        {...attributes}
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
            border: isActiveImage
              ? '1px dashed #64467b'
              : '1px solid transparent',
            borderRadius: 1,
          }}
        >
          <img
            style={{
              objectFit: 'contain',
              width: '100%',
              opacity: isActiveImage ? 0 : 1,
            }}
            srcSet={imageInfo.imageUrlString}
            src={imageInfo.imageUrlString}
            loading='lazy'
            alt={`imageInfo-${index + 1}`}
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
        {isImageSelect && isShowOperate && (
          <Box
            onClick={(event) => {
              console.log('simply delete');
              event.stopPropagation();
              onDelete(imageInfo.id);
            }}
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
            <FunctionalityIcon
              name='CloseTwoTone'
              sx={{
                fontSize: 16,
              }}
            />
          </Box>
        )}
      </Box>
    </Tooltip>
  );
};
export default FunctionalitySortableImage;
