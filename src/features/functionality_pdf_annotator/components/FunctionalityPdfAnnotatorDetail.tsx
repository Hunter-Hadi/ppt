import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { Box } from '@mui/material'
import React, { forwardRef, ForwardRefRenderFunction } from 'react'

import FunctionalityCommonOperatePdfToolViewMain from '@/features/functionality_common/components/FunctionalityCommonOperatePdfToolView/components/FunctionalityCommonOperatePdfToolViewMain'
import useFunctionalityEditDndContextHandle from '@/features/functionality_common/components/FunctionalityCommonOperatePdfToolView/hooks/useFunctionalityEditDndContextHandle'

import FunctionalityPdfAnnotatorOperationAreaInsertTools from './FunctionalityPdfAnnotatorOperationAreaInsertTools'
export interface IFunctionalityPdfAnnotatorDetailHandles {}
interface IFunctionalityPdfAnnotatorDetailProps {
  file: File
  onClearFile: () => void
}
const FunctionalityPdfAnnotatorDetail: ForwardRefRenderFunction<
  IFunctionalityPdfAnnotatorDetailHandles,
  IFunctionalityPdfAnnotatorDetailProps
> = ({ file, onClearFile }) => {
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 1,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        delay: 100,
        tolerance: 1,
      },
    }),
    useSensor(KeyboardSensor),
  )
  const { activeData, onDragStart, onDragEnd } =
    useFunctionalityEditDndContextHandle({
      onStart: () => {},
      onEnd: () => {},
    })

  return (
    <Box>
      <DndContext
        sensors={sensors}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
        // modifiers={[restrictToFirstScrollableAncestor]}
      >
        <FunctionalityPdfAnnotatorOperationAreaInsertTools />
        <Box
          sx={{
            width: 1000,
            height: 600,
          }}
        >
          <FunctionalityCommonOperatePdfToolViewMain
            file={file}
            isShowBottomOperation={true}
          />
        </Box>

        {activeData && (
          <DragOverlay
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              cursor: 'grabbing',
              justifyContent: 'center',
              width: activeData.width + 8,
              height: activeData.height + 8,
            }}
          >
            <Box
              id='pdf-text-drag-overlay'
              sx={{
                margin: '5px',
                border: '1px dashed #9065B0',
                width: 'calc(100% - 10px)',
                height: '100%',
              }}
            ></Box>
          </DragOverlay>
        )}
      </DndContext>
    </Box>
  )
}
export default forwardRef(FunctionalityPdfAnnotatorDetail)
