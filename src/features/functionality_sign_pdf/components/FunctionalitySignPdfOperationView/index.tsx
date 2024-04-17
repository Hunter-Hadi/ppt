import { useDraggable } from '@dnd-kit/core';
import { Box, Button, Stack } from '@mui/material';
import { FC } from 'react';

const FunctionalitySignPdfOperationDraggable: FC<{
  id: string;
  isPdfDrag: boolean;
  children: React.ReactNode;
}> = ({ id, isPdfDrag, children }) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: id,
    data: { id: id, isPdfDrag },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  return (
    <Box ref={setNodeRef} sx={style} {...listeners} {...attributes}>
      {children}
    </Box>
  );
};

interface IFunctionalitySignPdfOperationView {
  id: string;
  isPdfDrag: boolean;
}
const FunctionalitySignPdfOperationView: FC<
  IFunctionalitySignPdfOperationView
> = ({ id, isPdfDrag }) => {
  return (
    <Stack flexDirection='column'>
      <FunctionalitySignPdfOperationDraggable {...{ id, isPdfDrag }}>
        <Button
          size='large'
          variant='outlined'
          sx={{
            cursor: 'pointer',
          }}
        >
          我是一个签名
        </Button>
      </FunctionalitySignPdfOperationDraggable>
    </Stack>
  );
};
export default FunctionalitySignPdfOperationView;
