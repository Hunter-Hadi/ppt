import { useDroppable } from '@dnd-kit/core'
import { Box } from '@mui/material'
import React from 'react'
import { FC } from 'react'

const FunctionalitySignPdfShowPdfViewDroppable: FC<{
  children: React.ReactNode
  index: number
}> = ({ children, index }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `droppable-${index}`,
    data: { pdfIndex: index },
  })

  return (
    <Box
      id={`droppable-${index}`}
      ref={setNodeRef}
      sx={{
        color: isOver ? 'green' : undefined,
        position: 'relative',
        width: '100%',
        height: '100%',
      }}
    >
      {children}
    </Box>
  )
}
export default FunctionalitySignPdfShowPdfViewDroppable
