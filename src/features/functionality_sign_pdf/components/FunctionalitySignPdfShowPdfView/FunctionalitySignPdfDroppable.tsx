import { useDroppable } from '@dnd-kit/core';
import { Box } from '@mui/material';
import { FC } from 'react';

const FunctionalitySignPdfShowPdfViewDroppable: FC<{
  children: React.ReactNode;
  index: number;
}> = ({ children, index }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: `droppable-${index}`,
    data: { pdfIndex: index },
  });

  return (
    <Box
      id={`droppable-${index}`}
      ref={setNodeRef}
      sx={{
        color: isOver ? 'green' : undefined,
        position: 'relative',
      }}
    >
      {children}
    </Box>
  );
};
export default FunctionalitySignPdfShowPdfViewDroppable;
