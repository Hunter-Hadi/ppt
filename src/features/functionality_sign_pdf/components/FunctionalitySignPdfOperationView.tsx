import { useDraggable } from '@dnd-kit/core';
import { Button, Stack } from '@mui/material';

const FunctionalitySignPdfOperationView = () => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable-1',
    data: { test: 'test', id: 'draggable-1' },
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  return (
    <Stack flexDirection='column'>
      <Button
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        size='large'
        variant='outlined'
        sx={{
          cursor: 'pointer',
        }}
      >
        我是一个签名
      </Button>
    </Stack>
  );
};
export default FunctionalitySignPdfOperationView;
