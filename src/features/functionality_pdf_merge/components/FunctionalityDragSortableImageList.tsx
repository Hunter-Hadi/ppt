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

import FunctionalityImage from '@/features/functionality_common/components/FunctionalityImage';
import { IFunctionalityPdfInfoProps } from '@/features/functionality_pdf_merge/components/FunctionalityPdfMergeMain';
import FunctionalitySortableImage from '@/features/functionality_pdf_merge/components/FunctionalitySortableImage';

interface IFunctionalityImageList {
  imageList: IFunctionalityPdfInfoProps[];
  isImageSelect: boolean;
  onDelete: (id: string) => void;
  updateImageList: (data: IFunctionalityPdfInfoProps[]) => void;
  isShowOperate: boolean;
}
/**
 *
 * FunctionalityImageList带有拖拽排序功能
 * 后期看需求是否需要抽离出来
 */
const FunctionalityDragSortableImageList: FC<IFunctionalityImageList> = ({
  imageList,
  isImageSelect = true,
  onDelete,
  updateImageList,
  isShowOperate,
}) => {
  const { t } = useTranslation();

  const [activeDragId, setActiveDragId] = useState(null); //选中的id
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 2, // 按住不动移动2px 时 才进行拖拽, 这样就可以触发点击事件
      },
    }),
    useSensor(KeyboardSensor),
  );

  const handleDragUpdateList = (event, isDragEnd = true) => {
    //拖拽更新父级数据
    const { active, over } = event;
    if (isDragEnd) {
      //为DragEnd则说明结束，释放 选中的
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
      reorderedItems.splice(newIndex, 0, movedItem); //进行顺序调整
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
  }, [activeDragId]); //当前拖拽的图片信息，防止移动原来的图片，造成图片闪烁

  return (
    <DndContext
      sensors={sensors}
      onDragMove={onDragMove}
      onDragEnd={handleDragUpdateList}
    >
      <SortableContext items={imageList} strategy={verticalListSortingStrategy}>
        <Grid container item justifyContent='center' my={3} gap={2}>
          {imageList.map((imageInfo) => (
            <FunctionalitySortableImage
              key={imageInfo.id}
              isShowOperate={isShowOperate}
              imageInfo={imageInfo}
              activeDragId={activeDragId}
              isImageSelect={isImageSelect}
              onDelete={onDelete}
            />
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
              <FunctionalityImage imageInfo={currentDragImageInfo} />
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
export default FunctionalityDragSortableImageList;
