import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box } from '@mui/material';
import { FC } from 'react';

import FunctionalityImage from '@/features/functionality_common/components/FunctionalityImage';
import FunctionalityIcon from '@/features/functionality_pdf_merge/components/FunctionalityIcon';
import { IFunctionalityPdfInfoProps } from '@/features/functionality_pdf_merge/components/FunctionalityPdfMerge';
interface IFunctionalitySortableImageProps {
  imageInfo: IFunctionalityPdfInfoProps;
  isImageSelect: boolean;
  onDelete: (id: string) => void;
  activeDragId: string | null;
  isShowOperate: boolean;
}
const FunctionalitySortableImage: FC<IFunctionalitySortableImageProps> = ({
  imageInfo,
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
  return (
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
      <FunctionalityImage
        imageInfo={imageInfo}
        isActive={isActiveImage}
        name={imageInfo.name}
        rightTopChildren={
          isImageSelect &&
          isShowOperate && (
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#d1d5db',
                borderRadius: 5,
              }}
              onClick={() => onDelete(imageInfo.id)}
            >
              <FunctionalityIcon
                name='CloseTwoTone'
                sx={{
                  fontSize: 16,
                }}
              />
            </Box>
          )
        }
      />
    </Box>
  );
};
export default FunctionalitySortableImage;
