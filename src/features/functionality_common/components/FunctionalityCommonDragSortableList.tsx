import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import {
  rectSortingStrategy,
  SortableContext,
  useSortable,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { Box, Stack, Typography } from '@mui/material'
import { useTranslation } from 'next-i18next'
import React, { useCallback, useMemo, useState } from 'react'

import { MOBILE_CARD_WIDTH, PC_CARD_WIDTH } from '../constants'
import useFunctionalityCommonIsMobile from '../hooks/useFunctionalityCommonIsMobile'

type IBasicData = { id: string }
type DragDataItem<T> = T & IBasicData
interface IFunctionalitySortableItemProps<T> {
  imageInfo: DragDataItem<T>
  isActive: boolean
  childrenElement: (data: DragDataItem<T>) => JSX.Element
  disabled?: boolean
}

/**
 *
 * FunctionalitySortableImage 拖拽的子元素功能，需要useSortable所以单独放上面
 */
const FunctionalitySortableItem = <T,>({
  imageInfo,
  isActive,
  childrenElement,
  disabled,
}: IFunctionalitySortableItemProps<T>) => {
  const isMobile = useFunctionalityCommonIsMobile()
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: imageInfo.id, disabled: disabled })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isActive ? 1 : 0,
  }

  return (
    <Box
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      sx={{
        cursor: 'grab',
        width: isMobile ? MOBILE_CARD_WIDTH : PC_CARD_WIDTH,
      }}
    >
      {childrenElement(imageInfo)}
    </Box>
  )
}

const MemoFunctionalitySortableItem = React.memo(FunctionalitySortableItem)

interface IFunctionalityCommonDragSortableListProps<T> {
  list: DragDataItem<T>[]
  onUpdateList: (newList: DragDataItem<T>[]) => void
  children: (
    data: DragDataItem<T>,
    index: number,
    currentDragInfo?: DragDataItem<T>,
  ) => JSX.Element
  replacementElement?: (data: DragDataItem<T>) => JSX.Element
  disabled?: boolean
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
  disabled,
}: IFunctionalityCommonDragSortableListProps<T>) => {
  const isMobile = useFunctionalityCommonIsMobile()

  const { t } = useTranslation()
  const [activeDragId, setActiveDragId] = useState<string | null>(null)

  const handleDragEnd = useCallback(
    (event) => {
      // 拖拽结束 找到拖拽的元素和目标元素，进行排序
      const { active, over } = event
      setActiveDragId(null)
      if (over && active.id !== over.id) {
        const oldIndex = list.findIndex((item) => item.id === active.id)
        const newIndex = list.findIndex((item) => item.id === over.id)
        const newList = [...list]
        newList.splice(newIndex, 0, newList.splice(oldIndex, 1)[0])
        onUpdateList(newList)
      }
    },
    [list, onUpdateList],
  )

  const onDragStart = (event) => {
    setActiveDragId(event.active.id)
  }

  // const sensors = useSensors(
  //   useSensor(PointerSensor, {
  //     activationConstraint: {
  //       distance: 2, // 按住不动移动2px 时 才进行拖拽, 这样就可以触发点击事件
  //     },
  //   }),
  //   useSensor(KeyboardSensor),
  // );
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 2,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 300,
        tolerance: 2,
      },
    }),
    useSensor(KeyboardSensor),
  )
  const currentDragInfo = useMemo(
    () => list.find((item) => item.id === activeDragId),
    [activeDragId, list],
  )

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={handleDragEnd}
      collisionDetection={closestCenter}
    >
      {isMobile && (
        <style>{`
       html, body {
    -webkit-user-select: none; /* Prevents text selection */
  -webkit-touch-callout: none; /* Prevents callout menu to appear */
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0); /* Prevents tap highlight color */
}
      `}</style>
      )}
      <SortableContext items={list} strategy={rectSortingStrategy}>
        <Stack
          direction='row'
          flexWrap='wrap'
          justifyContent='center'
          my={3}
          gap={2}
        >
          {list.map((imageInfo, index) => (
            <MemoFunctionalitySortableItem
              key={imageInfo.id}
              isActive={activeDragId === imageInfo.id}
              imageInfo={imageInfo}
              disabled={disabled}
              childrenElement={(data) =>
                children(data as DragDataItem<T>, index, currentDragInfo)
              }
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
              {replacementElement
                ? replacementElement(currentDragInfo)
                : children(currentDragInfo, 0)}
            </DragOverlay>
          )}
        </Stack>
      </SortableContext>
      <Stack justifyContent='center' alignItems='center'>
        <Typography
          variant='custom'
          color='text.secondary'
          sx={{
            fontSize: 12,
          }}
        >
          {t('functionality__common:components__common__drag__dropping_tip')}
        </Typography>
      </Stack>
    </DndContext>
  )
}

export default FunctionalityCommonDragSortableList
