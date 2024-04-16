import { useDraggable } from '@dnd-kit/core';
import { Box, Button } from '@mui/material';

const FunctionalitySignPdfOperationView = () => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: 'draggable',
  });
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;
  return (
    <Box>
      <Button
        ref={setNodeRef}
        style={style}
        {...listeners}
        {...attributes}
        size='large'
        variant='contained'
        sx={{
          cursor: 'pointer',
        }}
      >
        签名拖动测试
      </Button>
    </Box>
  );
};
export default FunctionalitySignPdfOperationView;
