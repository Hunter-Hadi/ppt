import { useDroppable } from '@dnd-kit/core'
import { Box } from '@mui/material'
import React from 'react'
import { FC } from 'react'

const FunctionalityCommonOperateDroppable: FC<{
  children: React.ReactNode
  pdfIndex: number
}> = ({ children, pdfIndex }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `droppable-${pdfIndex}`,
    data: {
      pdfIndex: pdfIndex,
    },
  })

  return (
    <Box
      ref={setNodeRef}
      id={`droppable-${pdfIndex}`}
      sx={{
        color: isOver ? 'green' : undefined,
        position: 'relative',
      }}
    >
      {children}
    </Box>
  )
}
export default FunctionalityCommonOperateDroppable
