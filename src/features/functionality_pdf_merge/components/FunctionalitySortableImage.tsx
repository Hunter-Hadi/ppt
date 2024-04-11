import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box } from '@mui/material';
import { ceil, divide } from 'lodash-es';
import { FC } from 'react';

import FunctionalityCommonIcon from '@/features/functionality_common/components/FunctionalityCommonIcon';
import FunctionalityCommonImage from '@/features/functionality_common/components/FunctionalityCommonImage';
import FunctionalityCommonTooltip from '@/features/functionality_common/components/FunctionalityCommonTooltip';

import { IFunctionalityPdfFileInfoType } from './FunctionalityPdfMergeMain';
interface IFunctionalitySortableImageProps {
  imageInfo: IFunctionalityPdfFileInfoType;
  isImageSelect: boolean;
  onDelete: (id: string) => void;
  activeDragId: string | null;
  isShowOperate: boolean;
}
/**
 *
 * FunctionalitySortableImage 拖拽的子元素功能
 * 后期看需求是否需要抽离出来
 */
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
        width: 200,
      }}
    >
      <FunctionalityCommonTooltip
        title={`${ceil(divide(imageInfo.size, 1000))}kb - ${
          imageInfo.pages
        } pages`}
      >
        <FunctionalityCommonImage
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
                <FunctionalityCommonIcon
                  name='CloseTwoTone'
                  sx={{
                    fontSize: 18,
                  }}
                />
              </Box>
            )
          }
        />
      </FunctionalityCommonTooltip>
    </Box>
  );
};
export default FunctionalitySortableImage;
