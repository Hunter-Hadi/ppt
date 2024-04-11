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
  useSortable,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useMemo, useState } from 'react';
type IBasicData = { id: string };

interface IFunctionalitySortableItemProps<T> {
  imageInfo: T & IBasicData;
  activeDragId: string | null;
  childrenElement: (data: T & IBasicData) => JSX.Element;
}
/**
 *
 * FunctionalitySortableImage 拖拽的子元素功能，需要useSortable所以单独放上面
 */
const FunctionalitySortableItem = <T,>({
  imageInfo,
  activeDragId,
  childrenElement,
}: IFunctionalitySortableItemProps<T>) => {
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
      {childrenElement(imageInfo)}
    </Box>
  );
};
interface IFunctionalityCommonDragSortableListProps<T> {
  list: (T & IBasicData)[];
  onUpdateList: (data: (T & IBasicData)[]) => void;
  children: (
    data: T & IBasicData,
    index: number,
    currentDragInfo?: T & IBasicData,
  ) => JSX.Element;
  replacementElement?: (data: T & IBasicData) => JSX.Element;
}

/**
 *
 * FunctionalityImageList带有拖拽排序列表功能。
 * @Param list  通过泛型只限制了需要id字段。
 * @Param onUpdateList 更新list排序
 * @param replacementElement 拖拽时替换的元素，如果不传则使用children
 *@param  children 列表元素视图，会传入data.index.currentDragInfo
 */
const FunctionalityCommonDragSortableList = <T,>({
  list,
  onUpdateList,
  replacementElement,
  children,
}: IFunctionalityCommonDragSortableListProps<T>) => {
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
      const oldIndex = list.findIndex(
        (imageInfo) => imageInfo.id === active.id,
      );
      const newIndex = list.findIndex((imageInfo) => imageInfo.id === over.id);
      const reorderedItems = [...list];
      const [movedItem] = reorderedItems.splice(oldIndex, 1);
      reorderedItems.splice(newIndex, 0, movedItem); //进行顺序调整
      onUpdateList(reorderedItems);
    }
  };
  const onDragMove = (event) => {
    if (event.active.id) {
      setActiveDragId(event.active.id);
      handleDragUpdateList(event, false);
    }
  };
  const currentDragInfo = useMemo(() => {
    return list.find((imageInfo) => imageInfo.id === activeDragId);
  }, [activeDragId]); //当前拖拽的图片信息，防止移动原来的图片，造成图片闪烁
  return (
    <DndContext
      sensors={sensors}
      onDragMove={onDragMove}
      onDragEnd={handleDragUpdateList}
    >
      <SortableContext items={list} strategy={verticalListSortingStrategy}>
        <Grid container item justifyContent='center' my={3} gap={2}>
          {list.map((imageInfo, index) => (
            <FunctionalitySortableItem
              key={imageInfo.id}
              imageInfo={imageInfo}
              activeDragId={activeDragId}
              childrenElement={(data) => children(data, index, currentDragInfo)}
            />
          ))}
          {currentDragInfo && (
            <DragOverlay
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'grabbing',
              }}
            >
              {replacementElement && replacementElement(currentDragInfo)}
              {!replacementElement && children(currentDragInfo, 0)}
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
export default FunctionalityCommonDragSortableList;
