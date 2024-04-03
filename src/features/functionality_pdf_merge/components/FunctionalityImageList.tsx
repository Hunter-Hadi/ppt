import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { FC, useMemo, useState } from 'react';

import EllipsisTextWithTooltip from '@/components/EllipsisTextWithTooltip';

import { IFunctionalityPdfInfoProps } from './FunctionalityPdfMerge';
import FunctionalitySortableImage from './FunctionalitySortableImage';

interface IFunctionalityImageList {
  imageList: IFunctionalityPdfInfoProps[];
  isImageSelect: boolean;
  onDelete: (id: string) => void;
  updateImageList: (data: IFunctionalityPdfInfoProps[]) => void;
  isShowOperate: boolean;
}

const FunctionalityImageList: FC<IFunctionalityImageList> = ({
  imageList,
  isImageSelect = true,
  onDelete,
  updateImageList,
  isShowOperate,
}) => {
  const { t } = useTranslation();

  const [activeDragId, setActiveDragId] = useState(null);
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2, // 按住不动移动5px 时 才进行拖拽, 这样就可以触发点击事件
      },
    }),
    useSensor(KeyboardSensor),
  );

  const handleDragUpdateList = (event, isEnd = true) => {
    const { active, over } = event;
    if (isEnd) {
      setActiveDragId(null);
    }
    if (over && active.id !== over.id) {
      const oldIndex = imageList.findIndex(
        (imageInfo) => imageInfo.id === active.id,
      );
      const newIndex = imageList.findIndex(
        (imageInfo) => imageInfo.id === over.id,
      );
      const reorderedItems = [...imageList];
      const [movedItem] = reorderedItems.splice(oldIndex, 1);
      reorderedItems.splice(newIndex, 0, movedItem);
      updateImageList(reorderedItems);
    }
  };
  const onDragMove = (event) => {
    if (event.active.id) {
      setActiveDragId(event.active.id);
      handleDragUpdateList(event, false);
    }
  };
  const currentDragImageInfo = useMemo(() => {
    return imageList.find((imageInfo) => imageInfo.id === activeDragId);
  }, [activeDragId]);

  return (
    <DndContext
      sensors={sensors}
      onDragMove={onDragMove}
      onDragEnd={handleDragUpdateList}
    >
      <SortableContext items={imageList} strategy={verticalListSortingStrategy}>
        <Grid container item justifyContent='center' my={3}>
          {imageList.map((imageInfo, index) => (
            <EllipsisTextWithTooltip key={imageInfo.id} tip='yes'>
              <FunctionalitySortableImage
                key={imageInfo.id}
                isShowOperate={isShowOperate}
                imageInfo={imageInfo}
                activeDragId={activeDragId}
                index={index}
                isImageSelect={isImageSelect}
                onDelete={onDelete}
              />
            </EllipsisTextWithTooltip>
          ))}
          {currentDragImageInfo && (
            <DragOverlay
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'grabbing',
              }}
            >
              <img
                style={{
                  objectFit: 'contain',
                  width: 130,
                }}
                srcSet={currentDragImageInfo.imageUrlString}
                src={currentDragImageInfo.imageUrlString}
                loading='lazy'
              />
              <Typography
                variant='custom'
                sx={{
                  fontSize: 10,
                  marginTop: 1,
                }}
              >
                {currentDragImageInfo.name}
              </Typography>
            </DragOverlay>
          )}
        </Grid>
      </SortableContext>
      <Box
        sx={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <Typography
          variant='custom'
          color='text.secondary'
          sx={{
            fontSize: 12,
          }}
        >
          {t('functionality__pdf_merge:components__pdf_merge__pdf_dropping')}
        </Typography>
      </Box>
    </DndContext>
  );
};
export default FunctionalityImageList;
